"use client";

import { useEffect, useState } from "react";
import { ResultsTable } from "./results-table";
import { cn } from "@/lib/utils";
import type { ResultRow } from "@/lib/data";

/**
 * Event results, filtered one category at a time — same interaction as the
 * season filter on /events. Only the selected category's table is rendered,
 * so the page stays short instead of stacking every category end-to-end.
 */
export function EventResults({
  categories,
  results,
}: {
  categories: string[];
  results: ResultRow[];
}) {
  const [cat, setCat] = useState(categories[0] ?? "");

  // Keep older anchor links (/events/foo#Elite) and shared links working.
  useEffect(() => {
    const fromHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (fromHash && categories.includes(fromHash)) setCat(fromHash);
  }, [categories]);

  function select(next: string) {
    setCat(next);
    // Update the URL so the category can be shared, without jumping the page.
    window.history.replaceState(null, "", `#${encodeURIComponent(next)}`);
  }

  if (categories.length === 0) {
    return (
      <p className="mt-3 text-sm text-greige">
        Results for this event haven&apos;t been published yet.
      </p>
    );
  }

  const rows = results.filter((r) => r.category === cat);

  return (
    <div>
      {/* Category filter */}
      <div className="-mx-5 mt-4 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {categories.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => select(c)}
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

      {/* Selected category */}
      <div className="mb-4 mt-8 flex items-baseline gap-3">
        <h3 className="font-display text-xl font-medium tracking-tight">{cat}</h3>
        <span className="text-sm text-greige">
          {rows.length} {rows.length === 1 ? "rider" : "riders"}
        </span>
      </div>

      <ResultsTable rows={rows} />
    </div>
  );
}
