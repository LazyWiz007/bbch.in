import type { TeamStanding } from "@/lib/team-standings";
import { cn } from "@/lib/utils";

/** Tour de France–style team classification table, built from real results. */
export function TeamStandings({ teams }: { teams: TeamStanding[] }) {
  return (
    <div className="gloss-card overflow-hidden rounded-xl border border-line">
      <div className="hidden grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-3 border-b border-line bg-ember-50 px-5 py-3 font-display text-[0.68rem] font-bold uppercase tracking-wider text-ember-600 sm:grid">
        <span>Pos</span>
        <span>Team</span>
        <span className="text-right">Wins</span>
        <span className="text-right">Podiums</span>
        <span className="text-right">Points</span>
      </div>
      <ul>
        {teams.map((t, i) => {
          const pos = i + 1;
          return (
            <li key={t.team} className="border-b border-line last:border-0">
              {/* Desktop row */}
              <div
                className={cn(
                  "hidden grid-cols-[3rem_1fr_5rem_5rem_5rem] items-center gap-3 px-5 py-3.5 sm:grid",
                  pos === 1 && "bg-[#fff8dd]"
                )}
              >
                <span
                  className={cn(
                    "font-display text-lg font-extrabold",
                    pos === 1 ? "text-[#b8860b]" : "text-ink"
                  )}
                >
                  {pos}
                </span>
                <span className="font-display font-bold text-ink">{t.team}</span>
                <span className="text-right font-display text-sm font-bold text-ember">{t.wins}</span>
                <span className="text-right text-sm text-greige">{t.podiums}</span>
                <span className="text-right font-display text-base font-extrabold text-ink">{t.points}</span>
              </div>

              {/* Mobile card */}
              <div className={cn("flex items-center gap-3 px-4 py-3 sm:hidden", pos === 1 && "bg-[#fff8dd]")}>
                <span
                  className={cn(
                    "font-display text-base font-extrabold",
                    pos === 1 ? "text-[#b8860b]" : "text-ink"
                  )}
                >
                  {pos}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block truncate font-display text-sm font-bold text-ink">{t.team}</span>
                  <span className="block text-xs text-greige">{t.wins} wins · {t.podiums} podiums</span>
                </div>
                <span className="font-display text-base font-extrabold text-ink">{t.points}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
