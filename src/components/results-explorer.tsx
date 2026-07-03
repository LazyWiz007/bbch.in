"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchRow } from "@/lib/data";
import { formatResultTime } from "@/lib/utils";

const PAGE = 50;

export function ResultsExplorer({
  rows,
  years,
  disciplines,
  categories,
}: {
  rows: SearchRow[];
  years: number[];
  disciplines: string[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (year && String(r.year) !== year) return false;
      if (discipline && r.discipline !== discipline) return false;
      if (category && r.category !== category) return false;
      if (q && !r.athleteName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, query, year, discipline, category]);

  const hasFilters = query || year || discipline || category;
  const shown = filtered.slice(0, limit);

  const selectCls =
    "h-11 w-full rounded-md border border-line bg-cream px-3 text-sm text-ink outline-none transition-colors focus:border-ink";

  return (
    <div>
      <div className="rounded-xl border border-line bg-cream p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.3fr_1.3fr]">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-greige"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }}
              placeholder="Search rider name…"
              className="h-11 w-full rounded-md border border-line bg-cream pl-9 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-greige focus:border-ink"
            />
          </div>

          <select value={year} onChange={(e) => { setYear(e.target.value); setLimit(PAGE); }} className={selectCls}>
            <option value="">All years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>

          <select value={discipline} onChange={(e) => { setDiscipline(e.target.value); setLimit(PAGE); }} className={selectCls}>
            <option value="">All disciplines</option>
            {disciplines.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          <select value={category} onChange={(e) => { setCategory(e.target.value); setLimit(PAGE); }} className={selectCls}>
            <option value="">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-greige">
            {filtered.length.toLocaleString()} {filtered.length === 1 ? "result" : "results"}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setQuery(""); setYear(""); setDiscipline(""); setCategory(""); setLimit(PAGE); }}
              className="text-sm text-greige underline-offset-4 transition-colors hover:text-ember hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-5">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line bg-cream p-10 text-center text-sm text-greige">
            No results match your search. Try a different name or clear the filters.
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-line bg-cream">
              <div className="hidden grid-cols-[3rem_1.6fr_1.5fr_1fr_1fr] gap-4 border-b border-line px-5 py-3 font-mono text-[0.68rem] uppercase tracking-wider text-greige sm:grid">
                <span>Pos</span><span>Rider</span><span>Event</span><span>Category</span><span className="text-right">Time</span>
              </div>
              <ul>
                {shown.map((r) => (
                  <li key={r.id} className="border-b border-line last:border-0 transition-colors hover:bg-paper/60">
                    <div className="hidden grid-cols-[3rem_1.6fr_1.5fr_1fr_1fr] items-center gap-4 px-5 py-3.5 sm:grid">
                      <span className="font-mono text-sm font-medium text-greige">{r.rank ?? r.status ?? "–"}</span>
                      <Link href={`/athletes/${r.athleteSlug}`} className="truncate font-medium text-ink hover:text-ember">{r.athleteName}</Link>
                      <Link href={`/events/${r.eventSlug}`} className="truncate text-sm text-greige hover:text-ink">{r.eventName}</Link>
                      <span className="text-sm text-greige">{r.category}</span>
                      <span className="text-right font-mono text-sm text-ink">{formatResultTime(r.timeSeconds, r.status)}</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 sm:hidden">
                      <span className="w-8 shrink-0 font-mono text-sm font-medium text-greige">{r.rank ?? r.status ?? "–"}</span>
                      <div className="min-w-0 flex-1">
                        <Link href={`/athletes/${r.athleteSlug}`} className="block truncate font-medium text-ink">{r.athleteName}</Link>
                        <span className="block truncate text-xs text-greige">{r.eventName} · {r.category}</span>
                      </div>
                      <span className="font-mono text-sm text-ink">{formatResultTime(r.timeSeconds, r.status)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {filtered.length > limit && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setLimit((l) => l + PAGE)}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-ink/20 px-6 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03]"
                >
                  Show more ({(filtered.length - limit).toLocaleString()} more)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
