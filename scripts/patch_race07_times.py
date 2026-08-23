"""
Patch Race #07 (2026-race-07-xc) results.json with correct times.

The original import missed all times because the Excel header says "Total"
instead of "Time" / "Race Time". This script reads the Excel directly,
builds a bib→time map, and patches results.json in-place.

Also removes the dummy DNF entry "ZU16 Dummy 01" (bib 22).
"""

import openpyxl, json, datetime, re

XLSX = "/Users/parashramgore/Desktop/Dharma/Clients/BBch/website/public/2026 results/Result_ BBCh26 Race #07 - MTB (XCO) Race.xlsx"
RESULTS_JSON = "/Users/parashramgore/Desktop/Dharma/Clients/BBch/website/src/data/generated/results.json"
EVENT_ID = "2026-race-07-xc"

# ---------- helpers ----------

def fmt_time(t: datetime.time) -> str:
    """Format datetime.time as H:MM:SS.ss (drop trailing zeros after decimal)"""
    total_ms = t.microsecond // 10000  # centiseconds
    s = t.second + t.microsecond / 1_000_000
    if t.hour:
        base = f"{t.hour}:{t.minute:02d}:{t.second:02d}"
    else:
        base = f"{t.minute}:{t.second:02d}"
    # append centiseconds
    cs = t.microsecond // 10000
    return f"{base}.{cs:02d}"

def time_to_secs(t: datetime.time) -> float:
    return t.hour * 3600 + t.minute * 60 + t.second + t.microsecond / 1_000_000

# ---------- read Excel ----------

wb = openpyxl.load_workbook(XLSX)

# bib_times: { (bib: int) -> (secs: float, raw: str) }
bib_times: dict[int, tuple[float, str]] = {}

# Sheets that carry results: XCO Open, U-16, U-09
# Header row 2: Pos | Bib | Name | Team Name | Total | Lap1 ...
for sn in ["XCO Open", "U-16", "U-09"]:
    ws = wb[sn]
    for row in ws.iter_rows(min_row=3, values_only=True):
        pos, bib, name, team, total = (row[i] if i < len(row) else None for i in range(5))
        if bib is None or not isinstance(bib, (int, float)):
            continue
        bibn = int(bib)
        if isinstance(total, datetime.time):
            bib_times[bibn] = (round(time_to_secs(total), 2), fmt_time(total))
        # DNF/DNS rows have "-" or similar strings — we leave those as-is (None)

wb.close()
print(f"Times read for {len(bib_times)} bibs from Excel")

# ---------- patch results.json ----------

with open(RESULTS_JSON) as f:
    results = json.load(f)

patched = 0
removed_dummies = 0
new_results = []

for r in results:
    if r.get("eventId") != EVENT_ID:
        new_results.append(r)
        continue

    # Drop dummy test entries
    if r.get("athleteId", "").startswith("zu") or "dummy" in r.get("athleteId", "").lower():
        print(f"  Removing dummy entry: {r['athleteId']} (bib {r['bib']})")
        removed_dummies += 1
        continue

    bib = r.get("bib")
    if bib is not None and bib in bib_times:
        secs, raw = bib_times[bib]
        r["timeSeconds"] = secs
        r["rawTime"] = raw
        patched += 1
    else:
        print(f"  WARNING: no time found for bib {bib} ({r.get('athleteId')}) cat={r.get('category')}")

    new_results.append(r)

print(f"\nPatched times: {patched}")
print(f"Removed dummies: {removed_dummies}")

# Verify
r7 = [r for r in new_results if r.get("eventId") == EVENT_ID]
print(f"\nFinal Race #07 results: {len(r7)}")
for r in r7:
    print(f"  rank={r['rank']} cat={r['category']:5s} bib={r['bib']:3d}  {r['rawTime']:12s}  {r.get('athleteId')}")

# Write back
with open(RESULTS_JSON, "w") as f:
    json.dump(new_results, f, ensure_ascii=False, separators=(",", ":"))

print("\n✅ results.json updated")
