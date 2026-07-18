#!/usr/bin/env node
/**
 * Import approved rider photos from the "BBCh Rider Photos" Google Sheet into
 * the site.
 *
 * For every row whose Status column is "approved", this:
 *   1. downloads the photo from its Google Drive link,
 *   2. saves it to  public/riders/<slug>.jpg,
 *   3. sets that rider's imageUrl in src/data/generated/athletes.json,
 * so the photo shows up on the rider's profile after the next deploy.
 *
 * USAGE
 *   1. In the Google Sheet: File → Download → Comma-separated values (.csv)
 *   2. node scripts/import-photos.mjs ~/Downloads/BBCh\ Rider\ Photos.csv
 *
 *   You can also pass a "Publish to web" CSV URL instead of a file path.
 *   Add --dry-run to preview without writing anything.
 *
 * Sheet columns (in order, header row optional):
 *   Timestamp | Status | Rider slug | Rider name | Team | Instagram | Photo link
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ATHLETES_PATH = join(ROOT, "src/data/generated/athletes.json");
const RIDERS_DIR = join(ROOT, "public/riders");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const source = args.find((a) => !a.startsWith("--"));

if (!source) {
  console.error(
    "Usage: node scripts/import-photos.mjs <path-to-csv | published-csv-url> [--dry-run]"
  );
  process.exit(1);
}

/* ---------------- tiny CSV parser (handles quoted fields) ---------------- */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // ignore
    } else field += c;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function driveIdFromLink(link) {
  const m =
    link.match(/\/d\/([A-Za-z0-9_-]+)/) || link.match(/[?&]id=([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

async function main() {
  // 1. Load the CSV (file or URL)
  let csv;
  if (/^https?:\/\//.test(source)) {
    console.log(`Fetching CSV from ${source}`);
    const res = await fetch(source);
    if (!res.ok) throw new Error(`Failed to fetch CSV: HTTP ${res.status}`);
    csv = await res.text();
  } else {
    csv = await readFile(source, "utf8");
  }

  const rows = parseCsv(csv).filter((r) => r.some((c) => c.trim() !== ""));
  if (rows.length === 0) {
    console.log("No rows found in the CSV.");
    return;
  }

  // Skip a header row if the first cell isn't a date/timestamp.
  const first = rows[0];
  const looksLikeHeader = /timestamp|status/i.test(first[1] ?? "") || /status/i.test(first[0] ?? "");
  const dataRows = looksLikeHeader ? rows.slice(1) : rows;

  // 2. Keep only "approved" rows; last one per slug wins (newest upload).
  const approvedBySlug = new Map();
  for (const r of dataRows) {
    const [, status, slug, name, , , link] = r;
    if ((status ?? "").trim().toLowerCase() !== "approved") continue;
    if (!slug?.trim() || !link?.trim()) continue;
    approvedBySlug.set(slug.trim(), { slug: slug.trim(), name: (name ?? "").trim(), link: link.trim() });
  }

  if (approvedBySlug.size === 0) {
    console.log('No rows marked "approved" found. Nothing to import.');
    console.log('   (Set the Status column to "approved" for photos you want live.)');
    return;
  }

  console.log(`Found ${approvedBySlug.size} approved photo(s) to import.\n`);

  // 3. Load athletes.json
  const athletes = JSON.parse(await readFile(ATHLETES_PATH, "utf8"));
  const bySlug = new Map(athletes.map((a) => [a.slug, a]));

  if (!dryRun) await mkdir(RIDERS_DIR, { recursive: true });

  let imported = 0;
  const problems = [];

  for (const { slug, name, link } of approvedBySlug.values()) {
    const athlete = bySlug.get(slug);
    if (!athlete) {
      problems.push(`No rider with slug "${slug}" (${name}) in athletes.json — skipped.`);
      continue;
    }
    const id = driveIdFromLink(link);
    if (!id) {
      problems.push(`Couldn't read a Drive file id from "${link}" (${slug}) — skipped.`);
      continue;
    }

    const dest = join(RIDERS_DIR, `${slug}.jpg`);
    const publicPath = `/riders/${slug}.jpg`;

    if (dryRun) {
      console.log(`  [dry-run] ${slug} → ${publicPath}`);
      athlete.imageUrl = publicPath;
      imported++;
      continue;
    }

    const dlUrl = `https://drive.google.com/uc?export=download&id=${id}`;
    const res = await fetch(dlUrl);
    const type = res.headers.get("content-type") || "";
    if (!res.ok || !type.startsWith("image/")) {
      problems.push(
        `Download for ${slug} didn't return an image (HTTP ${res.status}, ${type}). ` +
          `Make sure the file is shared "anyone with the link" — skipped.`
      );
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    athlete.imageUrl = publicPath;
    imported++;
    console.log(`  ✓ ${slug}  (${(buf.length / 1024).toFixed(0)} KB) → ${publicPath}`);
  }

  // 4. Save athletes.json
  if (!dryRun && imported > 0) {
    await writeFile(ATHLETES_PATH, JSON.stringify(athletes, null, 2) + "\n");
  }

  console.log(
    `\n${dryRun ? "[dry-run] would import" : "Imported"} ${imported} photo(s).` +
      (imported > 0 && !dryRun ? " athletes.json updated." : "")
  );
  if (problems.length) {
    console.log(`\n${problems.length} skipped:`);
    for (const p of problems) console.log(`  • ${p}`);
  }
  if (!dryRun && imported > 0) {
    console.log("\nNext: commit the changes and deploy to publish the photos.");
  }
}

main().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
