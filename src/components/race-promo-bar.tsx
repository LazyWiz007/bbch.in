import Link from "next/link";
import { getUpcomingEvents, formatDate } from "@/lib/upcoming";

/**
 * Thin site-wide strip promoting the next race, shown above the navbar on
 * every page. Reads from the same upcoming-events list as the homepage, so
 * it retires itself the day after the race rather than needing to be taken
 * down by hand.
 */
export function RacePromoBar() {
  const next = getUpcomingEvents()[0];
  if (!next) return null;

  const href = next.detailsUrl ?? next.registrationUrl ?? "/events";

  return (
    <Link
      href={href}
      className="group block bg-crimson text-white transition-colors hover:bg-[#c7084f]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-xs font-semibold sm:text-sm">
        <span className="rounded bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest">
          Registrations open
        </span>
        <span>
          {next.name} · {formatDate(next.date)}
        </span>
        <span className="underline-offset-4 group-hover:underline">
          Register →
        </span>
      </div>
    </Link>
  );
}
