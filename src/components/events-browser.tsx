"use client";

import { useState } from "react";
import type { BbchEvent } from "@/lib/types";
import { EventCard } from "./event-card";
import { GhostEventCard } from "./ghost-event-card";
import { getGhostEventsForYear, getGhostYears } from "@/lib/ghost-events";
import { cn } from "@/lib/utils";

export function EventsBrowser({
  events,
  seasons,
}: {
  events: BbchEvent[];
  seasons: number[];
}) {
  const [year, setYear] = useState(seasons[0]);

  // Merge real seasons with ghost-only years (e.g. 2014, 2016) and sort descending
  const allYears = [...new Set([...seasons, ...getGhostYears()])].sort(
    (a, b) => b - a
  );

  const yearEvents = events.filter((e) => e.year === year);
  const ghostEvents = getGhostEventsForYear(year);
  const totalRaces = yearEvents.length + ghostEvents.length;

  // Merge real and ghost events, sorted by race number (raceNo 99 = misc, goes last)
  type CardItem =
    | { kind: "real"; event: BbchEvent }
    | { kind: "ghost"; event: (typeof ghostEvents)[0] };

  const allCards: CardItem[] = [
    ...yearEvents.map((e) => ({ kind: "real" as const, event: e })),
    ...ghostEvents.map((e) => ({ kind: "ghost" as const, event: e })),
  ].sort((a, b) => {
    const aNo = a.event.raceNo === 99 ? 999 : a.event.raceNo;
    const bNo = b.event.raceNo === 99 ? 999 : b.event.raceNo;
    // Real events are shown before ghost events of the same race number
    if (aNo !== bNo) return bNo - aNo; // descending — newest race first (matches existing sort)
    return a.kind === "ghost" ? 1 : -1;
  });

  return (
    <div>
      {/* Year filter */}
      <div className="-mx-5 mb-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {allYears.map((y) => {
            const active = y === year;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-cream text-greige hover:border-ink/30 hover:text-ink"
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected season heading */}
      <div className="mb-6 flex items-baseline gap-3">
        <h2 className="font-display text-3xl font-medium tracking-tight">{year}</h2>
        <span className="text-sm text-greige">
          {totalRaces} {totalRaces === 1 ? "race" : "races"}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCards.map((item) =>
          item.kind === "real" ? (
            <EventCard key={item.event.id} event={item.event} />
          ) : (
            <GhostEventCard key={item.event.id} event={item.event} />
          )
        )}
      </div>

      {/* Footnote — only shown when ghost events are present in this year */}
      {ghostEvents.length > 0 && (
        <p className="mt-8 text-xs text-greige/70">
          * Dimmed cards are races that took place but whose results have not yet
          been added to the archive.
        </p>
      )}
    </div>
  );
}
