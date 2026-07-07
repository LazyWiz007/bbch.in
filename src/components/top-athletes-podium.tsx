import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AthleteStanding } from "@/lib/data";

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function TopAthletesPodium({ athletes, title }: { athletes: AthleteStanding[], title: string }) {
  // We expect up to 3 athletes. We want to display them in this order: 2nd, 1st, 3rd
  const top3 = athletes.slice(0, 3);
  
  if (top3.length === 0) {
    return null;
  }

  // Reorder for podium: [2nd, 1st, 3rd]
  const podiumOrder = [];
  if (top3[1]) podiumOrder.push({ athlete: top3[1], place: 2 });
  if (top3[0]) podiumOrder.push({ athlete: top3[0], place: 1 });
  if (top3[2]) podiumOrder.push({ athlete: top3[2], place: 3 });

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-8 font-display text-2xl font-bold tracking-tight text-ink">{title}</h3>
      <div className="flex w-full items-end justify-center gap-2 sm:gap-6">
        {podiumOrder.map(({ athlete: a, place }) => {
          const isFirst = place === 1;
          const height = isFirst ? "h-32 sm:h-40" : place === 2 ? "h-24 sm:h-32" : "h-20 sm:h-28";
          const bgColor = isFirst ? "bg-[#f0c000]/20 border-[#f0c000]" : place === 2 ? "bg-greige-300 border-greige-400" : "bg-greige-200 border-greige-300";
          
          return (
            <Link 
              key={a.athleteId} 
              href={`/athletes/${a.slug}`}
              className="group flex flex-1 flex-col items-center max-w-[120px] sm:max-w-[160px]"
            >
              {/* Profile Image */}
              <div className={cn(
                "relative z-10 -mb-6 shrink-0 overflow-hidden rounded-full border-4 border-paper bg-onyx-700 transition-transform group-hover:-translate-y-2 duration-300",
                isFirst ? "h-20 w-20 sm:h-24 sm:w-24 border-yellow shadow-lg shadow-yellow/20" : "h-16 w-16 sm:h-20 sm:w-20 shadow-md"
              )}>
                {a.imageUrl ? (
                  <Image src={a.imageUrl} alt={a.name} fill className="object-cover" unoptimized />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-display text-lg font-medium text-paper">
                    {initials(a.name)}
                  </span>
                )}
              </div>

              {/* Podium Block */}
              <div className={cn("flex w-full flex-col items-center justify-start rounded-t-lg border-t-2 pt-8 px-2 text-center transition-colors group-hover:bg-opacity-70", bgColor, height)}>
                <span className={cn("font-display font-bold text-ink", isFirst ? "text-3xl" : "text-2xl")}>{place}</span>
              </div>
              
              {/* Info */}
              <div className="mt-4 text-center">
                <p className="font-medium leading-tight text-ink group-hover:text-ember">{a.name}</p>
                <p className="mt-1 text-xs text-greige truncate w-full px-1">{a.team ?? "Independent"}</p>
                <div className="mt-2 inline-flex items-center rounded-full bg-cream px-2 py-0.5 text-xs font-semibold text-ink border border-line">
                  {a.points} pts
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
