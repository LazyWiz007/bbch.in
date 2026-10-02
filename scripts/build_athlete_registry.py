#!/usr/bin/env python3
"""
Build the athlete identity registry: src/data/athlete-registry.json

This is the source of truth for WHO a rider is. Every rider gets a permanent
UID (bbchNNNNN) that never changes, so the same person can be recognised
across seasons and used to register them next time.

Inputs
  1. The owner's reviewed workbook, which carries both the UID column and the
     duplicate markings ("Use this" / "Duplicate (Merge this)" / "Remove").
  2. The current generated athletes.json, to catch riders who have raced since
     the owner last updated the sheet (they get freshly minted UIDs).

Run once to create the registry. After that the registry is committed and
import_results.py only reads it, minting a UID only for a genuinely new name.
Re-running is safe: existing UIDs are always preserved.
"""
import json, os, re, sys, unicodedata
from collections import Counter, OrderedDict

try:
    import openpyxl
except ImportError:
    sys.exit("pip install openpyxl")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY = os.path.join(ROOT, "src/data/athlete-registry.json")
ATHLETES = os.path.join(ROOT, "src/data/generated/athletes.json")
RESULTS  = os.path.join(ROOT, "src/data/generated/results.json")
WORKBOOK = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(
    "~/Downloads/athletes_uid_list (1).xlsx")

UID_RE = re.compile(r"^bbch(\d{5})$")


def norm(s):
    """Match key: case, punctuation and spacing insensitive."""
    if not s:
        return ""
    s = unicodedata.normalize("NFKD", str(s))
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


# Import artifacts and placeholder rows that are not people.
JUNK = re.compile(
    r"dummy|^\s*\*|^\s*-|\bdnf\b|\bdns\b|^z[aemu]\d*\s*(dummy|$)|^test\b",
    re.I)


def is_junk(name):
    return bool(JUNK.search(name or "")) or len(norm(name)) < 2


def classify(remark):
    """-> 'keep' | 'dup' | 'remove' | None"""
    if not remark:
        return None
    r = str(remark).strip().lower()
    if r == "remark":
        return None
    if r.startswith("remove"):
        return "remove"
    if "duplicate" in r:
        return "dup"
    if r.startswith("use th"):
        return "keep"
    return None


def field_fix(remark):
    """Pull team/gender corrections out of a parenthetical instruction."""
    fix = {}
    if not remark:
        return fix
    r = str(remark)
    m = re.search(r"(?:update|add)\s+team\s+name\s*[-:]\s*([^)]+)", r, re.I)
    if m:
        fix["team"] = m.group(1).strip()
    if re.search(r"remove\s+team\s+name", r, re.I):
        fix["team"] = None
    m = re.search(r"update\s+gender\s*[-:]\s*([MF])\b", r, re.I)
    if m:
        fix["gender"] = m.group(1).upper()
    return fix


def rename_target(name, remark):
    """'Remove 782 from name' / 'Remove Star from name' -> cleaned name."""
    if not remark:
        return None
    m = re.search(r"remove\s+(.+?)\s+from\s+name", str(remark), re.I)
    if not m:
        return None
    token = m.group(1).strip()
    if token.lower() == "star":
        out = name.replace("*", "")
    else:
        out = re.sub(re.escape(token), "", name)
    out = re.sub(r"\s+", " ", out).strip(" -_")
    return out or None


def main():
    wb = openpyxl.load_workbook(WORKBOOK, read_only=True, data_only=True)

    # --- owner UIDs -------------------------------------------------------
    owner_uid = {}
    if "Sheet1" in wb.sheetnames:
        for row in wb["Sheet1"].iter_rows(min_row=2, values_only=True):
            uid, name = (row + (None, None))[:2]
            if uid and name and UID_RE.match(str(uid).strip()):
                owner_uid.setdefault(norm(name), str(uid).strip())

    # --- the reviewed sheet ----------------------------------------------
    sheet = "Latest - Updated sheet"
    if sheet not in wb.sheetnames:
        sys.exit(f"missing sheet: {sheet}")
    rows = []
    for row in wb[sheet].iter_rows(min_row=1, values_only=True):
        row = row + (None,) * (5 - len(row))
        rows.append({"name": (str(row[1]).strip() if row[1] else None),
                     "remark": row[2], "gender": row[3], "team": row[4]})
    wb.close()
    rows = [r for r in rows if r["name"]]

    # --- group contiguous marked runs -------------------------------------
    merges, removes, renames, fixes = {}, set(), {}, {}
    canonical, unpaired = {}, []
    i = 0
    while i < len(rows):
        if not classify(rows[i]["remark"]):
            i += 1
            continue
        j = i
        while j < len(rows) and classify(rows[j]["remark"]):
            j += 1
        run = rows[i:j]

        for r in run:
            if classify(r["remark"]) == "remove":
                new = rename_target(r["name"], r["remark"])
                if new:                      # "Remove 782 from name" = rename
                    renames[norm(r["name"])] = new
                else:
                    removes.add(norm(r["name"]))

        # A run can hold several independent merge groups back to back, e.g.
        #   Huditya            Duplicate
        #   Huditya Umesh      Use this
        #   Hugo De Souza      Use this
        #   Hugo F. de Souza   Duplicate
        # Pair each duplicate with its NEAREST keeper, never with the first
        # keeper in the run, or unrelated riders get merged together.
        keeper_at = [k for k, r in enumerate(run)
                     if classify(r["remark"]) == "keep"]
        for k in keeper_at:
            f = field_fix(run[k]["remark"])
            if f:
                fixes.setdefault(norm(run[k]["name"]), {}).update(f)

        if keeper_at:
            for d, r in enumerate(run):
                if classify(r["remark"]) != "dup":
                    continue
                k = min(keeper_at, key=lambda x: (abs(x - d), x))
                survivor = run[k]
                merges[norm(r["name"])] = norm(survivor["name"])
                canonical[norm(survivor["name"])] = survivor["name"]
                f = field_fix(r["remark"])
                if f:
                    fixes.setdefault(norm(survivor["name"]), {}).update(f)
        else:
            # Duplicates with no keeper in the run: the owner marked them to
            # merge but did not say into what. Guessing could fuse two real
            # riders, so leave them standing and report them.
            for r in run:
                if classify(r["remark"]) == "dup":
                    unpaired.append(r["name"])
        i = j

    # collapse merge chains (a -> b -> c  ==>  a -> c)
    def resolve(k, seen=None):
        seen = seen or set()
        while k in merges and k not in seen:
            seen.add(k)
            k = merges[k]
        return k
    merges = {k: resolve(v) for k, v in merges.items() if resolve(v) != k}

    # --- current riders ---------------------------------------------------
    athletes = json.load(open(ATHLETES))
    results = json.load(open(RESULTS))
    race_count = Counter(r["athleteId"] for r in results)

    entries = OrderedDict()   # survivor norm-key -> entry
    for a in athletes:
        key = norm(a["name"])
        if key in removes or is_junk(a["name"]):
            continue
        was = None
        if key in renames:
            was = a["name"]          # keep the old spelling resolvable
            a = dict(a, name=renames[key])
            key = norm(a["name"])
        target = merges.get(key, key)
        e = entries.get(target)
        if e is None:
            e = {"uid": None, "name": canonical.get(target, a["name"]),
                 "gender": a["gender"], "team": a["team"],
                 "aliases": set(), "races": 0}
            entries[target] = e
        # The owner's "Use this" row decides the display name, whatever order
        # the records happen to arrive in.
        if target in canonical:
            e["name"] = canonical[target]
        elif norm(a["name"]) == target:
            e["name"] = a["name"]
        if norm(a["name"]) != norm(e["name"]):
            e["aliases"].add(a["name"])
        if was and norm(was) != norm(e["name"]):
            e["aliases"].add(was)
        for al in a.get("aliases") or []:
            if norm(al) != target and not is_junk(al):
                e["aliases"].add(al)
        e["races"] += race_count.get(a["id"], 0)
        # Prefer the survivor's own gender/team, fill gaps from merged rows.
        if norm(a["name"]) == target:
            e["gender"] = a["gender"]
            if a["team"]:
                e["team"] = a["team"]
        elif not e["team"] and a["team"]:
            e["team"] = a["team"]

    # --- apply owner field fixes -----------------------------------------
    for key, f in fixes.items():
        tgt = merges.get(key, key)
        if tgt in entries:
            if "team" in f:
                entries[tgt]["team"] = f["team"]
            if "gender" in f:
                entries[tgt]["gender"] = f["gender"]

    # --- assign UIDs ------------------------------------------------------
    taken, minted = set(), 0
    for key, e in entries.items():
        uid = owner_uid.get(key)
        if uid and uid not in taken:
            e["uid"] = uid
            taken.add(uid)
    next_n = max([int(UID_RE.match(u).group(1)) for u in taken] or [0]) + 1
    for key, e in sorted(entries.items(), key=lambda kv: kv[1]["name"].lower()):
        if e["uid"]:
            continue
        # Reuse a UID the owner gave one of this rider's merged-away spellings.
        for al in sorted(e["aliases"]):
            cand = owner_uid.get(norm(al))
            if cand and cand not in taken:
                e["uid"] = cand
                taken.add(cand)
                break
        if not e["uid"]:
            while f"bbch{next_n:05d}" in taken:
                next_n += 1
            e["uid"] = f"bbch{next_n:05d}"
            taken.add(e["uid"])
            minted += 1

    # --- retired UIDs: merged-away spellings the owner had numbered -------
    for key, e in entries.items():
        retired = set()
        for al in e["aliases"]:
            u = owner_uid.get(norm(al))
            if u and u != e["uid"]:
                retired.add(u)
        e["retiredUids"] = sorted(retired)

    out = {
        "schemaVersion": 1,
        "note": ("Permanent rider identities. A UID is assigned once and never "
                 "reused or changed. 'aliases' are other spellings that resolve "
                 "to this rider; 'retiredUids' are UIDs merged into this one."),
        "nextUid": f"bbch{next_n + 1:05d}",
        "athletes": [
            {"uid": e["uid"], "name": e["name"], "gender": e["gender"],
             "team": e["team"], "aliases": sorted(e["aliases"]),
             "retiredUids": e["retiredUids"]}
            for e in sorted(entries.values(), key=lambda x: x["uid"])
        ],
    }
    os.makedirs(os.path.dirname(REGISTRY), exist_ok=True)
    json.dump(out, open(REGISTRY, "w"), ensure_ascii=False, indent=1)

    if unpaired:
        print(f"  ! {len(unpaired)} duplicate(s) with no keeper marked, left "
              f"standing: {', '.join(sorted(unpaired))}")
    print(f"  source rows          : {len(rows)}")
    print(f"  merges applied       : {len(merges)}")
    print(f"  source rows dropped  : {sum(1 for a in athletes if norm(a['name']) in removes or is_junk(a['name']))}")
    print(f"  renames              : {len(renames)}")
    print(f"  field fixes          : {len(fixes)}")
    print(f"  --")
    print(f"  riders in registry   : {len(entries)}")
    print(f"  owner UIDs reused    : {len(entries) - minted}")
    print(f"  new UIDs minted      : {minted}")
    print(f"  wrote {os.path.relpath(REGISTRY, ROOT)}")


if __name__ == "__main__":
    main()
