"use client";

import { useState } from "react";
import type { BbchEvent } from "@/lib/types";
import { EventCard } from "./event-card";
import { cn } from "@/lib/utils";

export function EventsBrowser({
  events,
  seasons,
}: {
  events: BbchEvent[];
  seasons: number[];
}) {
  const [year, setYear] = useState(seasons[0]);
  const yearEvents = events.filter((e) => e.year === year);

  return (
    <div>
      {/* Year filter */}
      <div className="-mx-5 mb-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {seasons.map((y) => {
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

      {/* Selected season */}
      <div className="mb-6 flex items-baseline gap-3">
        <h2 className="font-display text-3xl font-medium tracking-tight">{year}</h2>
        <span className="text-sm text-greige">
          {yearEvents.length} {yearEvents.length === 1 ? "race" : "races"}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {yearEvents.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}
