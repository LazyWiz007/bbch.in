"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ResultRow } from "@/lib/data";

interface CategoryResults {
  cat: string;
  finishers: ResultRow[];
  dnf: ResultRow[];
}

export function RaceResultsTabs({
  groups,
}: {
  groups: CategoryResults[];
}) {
  const [active, setActive] = useState(groups[0]?.cat ?? "");
  const current = groups.find((g) => g.cat === active);

  if (!current) return null;

  const { finishers, dnf } = current;

  return (
    <div>
      {/* Category pill tabs */}
      <div className="-mx-5 mb-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2 pb-1">
          {groups.map((g) => {
            const isActive = g.cat === active;
            return (
              <button
                key={g.cat}
                onClick={() => setActive(g.cat)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-cream text-greige hover:border-ink/30 hover:text-ink"
                )}
              >
                {g.cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active category table */}
      <div className="overflow-hidden rounded-xl border border-line">
        {/* Table header */}
        <div className="flex items-center justify-between border-b border-line bg-ember-50 px-5 py-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ember-600">
            {active}
          </h3>
          <span className="text-xs text-greige">
            {finishers.length} finisher{finishers.length !== 1 ? "s" : ""}
            {dnf.length > 0 ? ` · ${dnf.length} DNF/DNS` : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-paper/60 text-left text-[0.68rem] font-bold uppercase tracking-wider text-greige">
                <th className="w-12 px-4 py-2.5">Pos</th>
                <th className="px-4 py-2.5">Rider</th>
                <th className="hidden px-4 py-2.5 sm:table-cell">Team</th>
                <th className="px-4 py-2.5 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {finishers.map((r, i) => (
                <tr
                  key={`${r.athleteId}-${i}`}
                  className={cn(
                    "border-b border-line/60 last:border-0 transition-colors hover:bg-cream/60",
                    r.rank === 1 && "bg-yellow/5"
                  )}
                >
                  <td className="w-12 px-4 py-3">
                    {r.rank === 1 ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow text-xs font-extrabold text-ink">
                        1
                      </span>
                    ) : r.rank === 2 ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-greige/30 text-xs font-extrabold text-ink">
                        2
                      </span>
                    ) : r.rank === 3 ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ember/20 text-xs font-extrabold text-ink">
                        3
                      </span>
                    ) : (
                      <span className="font-mono text-greige">{r.rank}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink">
                    <Link
                      href={`/athletes/${r.athlete.slug}`}
                      className="transition-colors hover:text-ember"
                    >
                      {r.athlete.name}
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 text-greige sm:table-cell">
                    {r.athlete.team ?? (
                      <span className="text-greige/50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-ink">
                    {r.rawTime || <span className="text-greige/50">—</span>}
                  </td>
                </tr>
              ))}
              {dnf.map((r, i) => (
                <tr
                  key={`dnf-${r.athleteId}-${i}`}
                  className="border-b border-line/60 last:border-0 opacity-50"
                >
                  <td className="w-12 px-4 py-3">
                    <span className="text-xs font-bold text-greige">
                      {r.status ?? "DNF"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-greige">
                    <Link
                      href={`/athletes/${r.athlete.slug}`}
                      className="transition-colors hover:text-ember"
                    >
                      {r.athlete.name}
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 text-greige sm:table-cell">
                    {r.athlete.team ?? (
                      <span className="text-greige/50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-greige/60">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
