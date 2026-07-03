# Historic results importer

Parses the Excel archive → `src/data/generated/{events,athletes,results}.json`,
which the site reads via `src/lib/data.ts`.

## Run
```
pip3 install openpyxl        # once
python3 scripts/import_results.py
```
Edit `BASE` at the top of the script if the archive path changes.

## What it does
- Walks `year / race / *.xlsx`, one tab per category.
- Normalises category names (see CAT_MAP), excludes summary/standings tabs,
  Trail Run and the virtual challenges.
- Deduplicates riders by normalised name (Name + Team). NOTE: spelling variants
  of the same rider can still split into two profiles — manual merge TODO.
- Parses times to seconds; marks DNF/DNS.
