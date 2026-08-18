import Link from "next/link";
import Image from "next/image";
import type { BbchEvent } from "@/lib/types";
import { TypeBadge } from "./ui/badge";
import { disciplineCover, racePosterCover } from "@/lib/covers";

export function EventCard({ event }: { event: BbchEvent }) {
  const cover = racePosterCover(event.id) ?? disciplineCover(event.discipline);
  return (
    <Link
      href={`/events/${event.slug}`}
      className="gloss-card group flex flex-col overflow-hidden rounded-xl border border-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(29,63,204,0.4)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink">
        {cover ? (
          <Image
            src={cover}
            alt={`${event.discipline} — BBCh`}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <EventPattern />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 bg-white px-3 py-1.5">
          <span className="font-display text-lg font-extrabold leading-none text-ink">
            {event.year}
          </span>
        </div>
        <div className="absolute right-4 top-4">
          <TypeBadge type={event.discipline} className="border-transparent bg-white/90 text-ember-600 backdrop-blur" />
        </div>
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-1.5" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink">
          {event.name}
        </h3>
        <div className="mt-3 flex flex-1 flex-wrap content-start items-start gap-1.5">
          {event.categories.slice(0, 4).map((c) => (
            <span
              key={c}
              className="inline-flex h-6 items-center rounded-sm bg-ember-50 px-2.5 text-[0.7rem] font-medium leading-none text-ember-600"
            >
              {c}
            </span>
          ))}
          {event.categories.length > 4 && (
            <span className="inline-flex h-6 items-center rounded-sm bg-ember-50 px-2.5 text-[0.7rem] font-medium leading-none text-ember-600">
              +{event.categories.length - 4}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="font-mono text-xs uppercase tracking-wider text-greige">
            {event.resultCount} finishers
          </span>
          <span className="text-sm font-medium text-ink group-hover:text-ember">
            View results →
          </span>
        </div>
      </div>
    </Link>
  );
}

function EventPattern() {
  return (
    <div className="absolute inset-0">
      <svg
        className="h-full w-full opacity-[0.16]"
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="#f4f1ea" strokeWidth="1" fill="none">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={-50 + i * 40} y1="0" x2={50 + i * 40} y2="225" />
          ))}
        </g>
        <circle cx="320" cy="55" r="42" stroke="#e2542c" strokeWidth="2" fill="none" opacity="0.9" />
      </svg>
      <div className="absolute inset-0 flex items-center">
        <span className="pl-6 font-display text-[2.4rem] font-medium leading-none text-paper/90">
          BBCh
        </span>
      </div>
    </div>
  );
}
