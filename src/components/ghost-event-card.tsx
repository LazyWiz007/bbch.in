import Image from "next/image";
import type { GhostEvent } from "@/lib/ghost-events";

/**
 * A non-interactive card for races that have an official poster but no
 * results data yet. Matches the visual footprint of EventCard but is not
 * clickable and shows a "Results not available" label instead.
 */
export function GhostEventCard({ event }: { event: GhostEvent }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-line/60 bg-surface opacity-80"
      aria-label={event.name}
    >
      {/* Poster image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-ink">
        <Image
          src={event.poster}
          alt={event.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Gradient overlay — same as EventCard */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-transparent" />

        {/* Year badge */}
        <div className="absolute left-4 top-4 bg-white px-3 py-1.5">
          <span className="font-display text-lg font-extrabold leading-none text-ink">
            {event.year}
          </span>
        </div>

        {/* Bottom stripe */}
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-1.5" />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink">
          {event.name}
        </h3>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-greige">
            {/* Archive icon */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" />
              <path d="M1 2h14v2H1z" />
              <path strokeLinecap="round" d="M6 8h4" />
            </svg>
            No results data
          </span>
        </div>
      </div>
    </div>
  );
}
