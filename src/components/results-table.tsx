import Link from "next/link";
import type { ResultRow } from "@/lib/data";
import { cn, formatResultTime } from "@/lib/utils";

function RankMark({ rank }: { rank: number | null }) {
  if (rank == null) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs text-greige">
        –
      </span>
    );
  }
  const medal =
    rank === 1
      ? "bg-gold/20 text-[#8a6d1e]"
      : rank === 2
      ? "bg-ink/[0.07] text-ink"
      : rank === 3
      ? "bg-ember-50 text-ember-600"
      : "text-greige";
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-sm font-medium",
        medal
      )}
    >
      {rank}
    </span>
  );
}

export function ResultsTable({
  rows,
  showEvent = false,
  emptyLabel = "No results found.",
}: {
  rows: ResultRow[];
  showEvent?: boolean;
  emptyLabel?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-cream p-10 text-center text-sm text-greige">
        {emptyLabel}
      </div>
    );
  }

  const cols = showEvent
    ? "grid-cols-[3rem_1.6fr_1.4fr_1fr_1fr]"
    : "grid-cols-[3rem_1.8fr_1.2fr_1fr]";

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-cream">
      <div
        className={cn(
          "hidden items-center gap-4 border-b border-line px-5 py-3 font-mono text-[0.68rem] uppercase tracking-wider text-greige sm:grid",
          cols
        )}
      >
        <span>Pos</span>
        <span>Rider</span>
        {showEvent ? <span>Event</span> : <span>Team</span>}
        <span>Category</span>
        <span className="text-right">Time</span>
      </div>

      <ul>
        {rows.map((r) => (
          <li
            key={`${r.eventId}-${r.athleteId}-${r.category}`}
            className="border-b border-line last:border-0 transition-colors hover:bg-paper/60"
          >
            {/* Desktop */}
            <div className={cn("hidden items-center gap-4 px-5 py-3.5 sm:grid", cols)}>
              <RankMark rank={r.rank} />
              <Link
                href={`/athletes/${r.athlete.slug}`}
                className="truncate font-medium text-ink hover:text-ember"
              >
                {r.athlete.name}
              </Link>
              {showEvent ? (
                <Link
                  href={`/events/${r.event.slug}`}
                  className="truncate text-sm text-greige hover:text-ink"
                >
                  {r.event.name}
                </Link>
              ) : (
                <span className="truncate text-sm text-greige">{r.athlete.team ?? "—"}</span>
              )}
              <span className="text-sm text-greige">{r.category}</span>
              <span className="text-right font-mono text-sm text-ink">
                {formatResultTime(r.timeSeconds, r.status)}
              </span>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-3 px-4 py-3 sm:hidden">
              <RankMark rank={r.rank} />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/athletes/${r.athlete.slug}`}
                  className="block truncate font-medium text-ink"
                >
                  {r.athlete.name}
                </Link>
                <span className="block truncate text-xs text-greige">
                  {showEvent ? r.event.name : r.athlete.team ?? "Independent"} · {r.category}
                </span>
              </div>
              <span className="font-mono text-sm text-ink">
                {formatResultTime(r.timeSeconds, r.status)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
