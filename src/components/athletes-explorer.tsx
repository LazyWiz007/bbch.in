"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { AthleteSummary } from "@/lib/data";

const PAGE = 60;

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function AthletesExplorer({ athletes }: { athletes: AthleteSummary[] }) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return athletes;
    return athletes.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        (a.team ?? "").toLowerCase().includes(q)
    );
  }, [athletes, query]);

  const shown = filtered.slice(0, limit);

  return (
    <div>
      <div className="relative max-w-md">
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
          placeholder="Search rider or team…"
          className="h-11 w-full rounded-md border border-line bg-cream pl-9 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-greige focus:border-ink"
        />
      </div>

      <p className="mt-3 text-sm text-greige">
        {filtered.length.toLocaleString()} riders
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <Link
            key={a.id}
            href={`/athletes/${a.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-line bg-cream p-5 transition-all hover:-translate-y-0.5 hover:border-ink/20"
          >
            {a.imageUrl ? (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-ink">
                <Image
                  src={a.imageUrl}
                  alt={a.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-medium text-paper">
                {initials(a.name)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-ink group-hover:text-ember">{a.name}</p>
              <p className="truncate text-sm text-greige">{a.team ?? "Independent"}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-ink">{a.races}</p>
              <p className="font-mono text-[0.62rem] uppercase tracking-wider text-greige">races</p>
              {a.wins > 0 && (
                <span className="mt-1 inline-block rounded bg-gold/20 px-1.5 py-0.5 font-mono text-[0.6rem] text-[#8a6d1e]">
                  {a.wins}× win{a.wins > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length > limit && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setLimit((l) => l + PAGE)}
            className="inline-flex h-11 items-center justify-center rounded-md border border-ink/20 px-6 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03]"
          >
            Show more ({(filtered.length - limit).toLocaleString()} more)
          </button>
        </div>
      )}
    </div>
  );
}
