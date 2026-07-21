"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PodiumRider {
  rank: number;
  name: string;
  slug: string;
  team: string | null;
  time: string;
}

export interface CategoryPodium {
  category: string;
  riders: PodiumRider[];
}

/** Gold / silver / bronze badge for a podium place. */
function medalClass(rank: number): string {
  if (rank === 1) return "bg-yellow text-ink";
  if (rank === 2) return "bg-greige-400 text-white";
  return "bg-[#c98a4b] text-white";
}

/**
 * Landing-page podium for the most recent race: pick a category, see the
 * top three and their finishing times.
 */
export function LatestRaceResults({ podiums }: { podiums: CategoryPodium[] }) {
  const [cat, setCat] = useState(podiums[0]?.category ?? "");
  const current = podiums.find((p) => p.category === cat) ?? podiums[0];

  if (!current) return null;

  return (
    <div>
      {/* Category filter */}
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {podiums.map((p) => {
            const active = p.category === cat;
            return (
              <button
                key={p.category}
                onClick={() => setCat(p.category)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-cream text-greige hover:border-ink/30 hover:text-ink"
                )}
              >
                {p.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Podium */}
      <ol className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
        {current.riders.map((r) => (
          <li
            key={`${r.slug}-${r.rank}`}
            className="flex items-center gap-4 px-4 py-4 sm:px-6"
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold",
                medalClass(r.rank)
              )}
            >
              {r.rank}
            </span>
            <div className="min-w-0 flex-1">
              <Link
                href={`/athletes/${r.slug}`}
                className="font-display font-bold leading-tight text-ink transition-colors hover:text-ember"
              >
                {r.name}
              </Link>
              {r.team && (
                <p className="truncate text-sm text-greige">{r.team}</p>
              )}
            </div>
            <span className="shrink-0 font-mono text-sm tabular-nums text-ink">
              {r.time}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
