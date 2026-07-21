"use client";

import { useEffect, useMemo, useState } from "react";
import { ResultsTable } from "./results-table";
import { cn } from "@/lib/utils";
import type { ResultRow } from "@/lib/data";

/**
 * Event results: search for a rider, or browse one category at a time.
 *
 * - Empty search → the selected category's table (same as the season filter
 *   on /events), so the page stays short instead of stacking every category.
 * - With a search → matches across ALL categories in the race, because riders
 *   often don't remember which category they were entered in.
 */
export function EventResults({
  categories,
  results,
}: {
  categories: string[];
  results: ResultRow[];
}) {
  const [cat, setCat] = useState(categories[0] ?? "");
  const [query, setQuery] = useState("");

  // Keep older anchor links (/events/foo#Elite) and shared links working.
  useEffect(() => {
    const fromHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (fromHash && categories.includes(fromHash)) setCat(fromHash);
  }, [categories]);

  function selectCategory(next: string) {
    setCat(next);
    setQuery(""); // picking a category clears the search
    window.history.replaceState(null, "", `#${encodeURIComponent(next)}`);
  }

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const rows = useMemo(() => {
    if (!searching) return results.filter((r) => r.category === cat);
    return results.filter(
      (r) =>
        r.athlete.name.toLowerCase().includes(q) ||
        (r.athlete.team ?? "").toLowerCase().includes(q) ||
        (r.bib != null && String(r.bib) === q)
    );
  }, [searching, q, results, cat]);

  if (categories.length === 0) {
    return (
      <p className="mt-3 text-sm text-greige">
        Results for this event haven&apos;t been published yet.
      </p>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mt-4 max-w-sm">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-greige">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search riders in this race"
          placeholder="Search your name, team or bib…"
          className="h-11 w-full rounded-md border border-line bg-cream pl-9 pr-9 text-sm text-ink outline-none transition-colors placeholder:text-greige focus:border-ink"
        />
        {searching && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-sm text-greige transition-colors hover:text-ink"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="-mx-5 mt-4 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {categories.map((c) => {
            const active = !searching && c === cat;
            return (
              <button
                key={c}
                onClick={() => selectCategory(c)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-cream text-greige hover:border-ink/30 hover:text-ink"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Heading */}
      <div className="mb-4 mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-xl font-medium tracking-tight">
          {searching ? "Search results" : cat}
        </h3>
        <span className="text-sm text-greige">
          {rows.length} {rows.length === 1 ? "rider" : "riders"}
          {searching && " · all categories"}
        </span>
      </div>

      {rows.length > 0 ? (
        <ResultsTable rows={rows} />
      ) : (
        <p className="rounded-xl border border-line bg-cream px-5 py-8 text-center text-sm text-greige">
          No rider matches &ldquo;{query.trim()}&rdquo; in this race.
        </p>
      )}
    </div>
  );
}
