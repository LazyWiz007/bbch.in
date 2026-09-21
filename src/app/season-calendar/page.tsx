import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Season 2026 — Race Calendar & Standings",
  alternates: { canonical: "/season-calendar" },
  description:
    "BBCh 2026 Season Calendar — India's longest-running cycling championship enters its 18th edition with 10 epic races across Bengaluru. Road races, MTB, Gravel, ITT and the legendary Nandi Epic.",
};

interface Race {
  id: string;
  raceNo: number;
  name: string;
  subtitle?: string;
  month: string;
  day: number;
  dayNote?: string;
  location: string;
  distances?: string;
  discipline: "MTB" | "ITT" | "Road" | "Multi";
  cover: string;
  status: "completed" | "upcoming" | "next";
  /** Internal results/details page on this site */
  detailsUrl?: string;
  /** External registration link */
  registrationUrl?: string;
}

const RACES: Race[] = [
  {
    id: "race01",
    raceNo: 1,
    name: "BLR Retro MTB Race",
    month: "JAN",
    day: 25,
    location: "Avathi",
    discipline: "MTB",
    cover: "/season-2026/race01-blr-retro-mtb.png",
    status: "completed",
    detailsUrl: "/results",
  },
  {
    id: "race02",
    raceNo: 2,
    name: "Namma ITT",
    subtitle: "Individual Time Trial",
    month: "MAR",
    day: 15,
    location: "KIADB, STRR",
    discipline: "ITT",
    cover: "/season-2026/race02-namma-itt.png",
    status: "completed",
    detailsUrl: "/results",
  },
  {
    id: "race03",
    raceNo: 3,
    name: "Urban MTB Race",
    month: "APR",
    day: 19,
    location: "School / University",
    discipline: "MTB",
    cover: "/season-2026/race03-urban-mtb.png",
    status: "completed",
    detailsUrl: "/results",
  },
  {
    id: "race04",
    raceNo: 4,
    name: "Velocity Express",
    month: "MAY",
    day: 17,
    location: "STRR",
    distances: "50km, 100km",
    discipline: "Road",
    cover: "/season-2026/race04-velocity-express.png",
    status: "completed",
    detailsUrl: "/results",
  },
  {
    id: "race05",
    raceNo: 5,
    name: "Gravel / Crit / MTB Race",
    month: "JUN",
    day: 21,
    location: "Avathi",
    discipline: "Multi",
    cover: "/season-2026/race05-gravel-crit-mtb.png",
    status: "completed",
    detailsUrl: "/results",
  },
  {
    id: "race06",
    raceNo: 6,
    name: "Bangalore Classic",
    month: "JUL",
    day: 19,
    location: "STRR",
    distances: "40km, 80km, 160km",
    discipline: "Road",
    cover: "/season-2026/race06-bangalore-classic.png",
    status: "completed",
    detailsUrl: "/events/bbch26-race06",
  },
  {
    id: "race07",
    raceNo: 7,
    name: "Adventure MTB Race",
    month: "AUG",
    day: 16,
    location: "School / University",
    discipline: "MTB",
    cover: "/season-2026/race07-adventure-mtb.png",
    status: "next",
    detailsUrl: "/events/bbch26-race07",
    registrationUrl: "https://www.explara.com/e/bbch26-race07/checkout",
  },
  {
    id: "race08",
    raceNo: 8,
    name: "Apex ITT",
    subtitle: "Individual Time Trial",
    month: "SEP",
    day: 20,
    location: "KIADB, STRR",
    discipline: "ITT",
    cover: "/season-2026/race08-apex-itt.png",
    status: "upcoming",
  },
  {
    id: "race09",
    raceNo: 9,
    name: "Supreme MTB Race",
    month: "OCT",
    day: 11,
    location: "Avathi / School / University",
    discipline: "MTB",
    cover: "/covers/BBCh26Race09_FB.jpg",
    status: "upcoming",
  },
  {
    id: "race10",
    raceNo: 10,
    name: "Nandi Epic Road Race",
    month: "NOV",
    day: 20,
    dayNote: "Friday",
    location: "STRR, Nandi Hill",
    distances: "50km, 100km",
    discipline: "Road",
    cover: "/season-2026/race10-nandi-epic.png",
    status: "upcoming",
  },
];

const DISCIPLINE_COLORS: Record<Race["discipline"], string> = {
  MTB: "bg-leaf/20 text-leaf border-leaf/30",
  ITT: "bg-ember-50 text-ember border-ember/30",
  Road: "bg-blue-50 text-blue-600 border-blue-200",
  Multi: "bg-yellow/15 text-yellow-deep border-yellow/30",
};

const DISCIPLINE_LABELS: Record<Race["discipline"], string> = {
  MTB: "MTB",
  ITT: "Time Trial",
  Road: "Road Race",
  Multi: "Multi",
};

function RaceCard({ race }: { race: Race }) {
  const isCompleted = race.status === "completed";
  const isNext = race.status === "next";

  // Determine primary href: details page → registration → results fallback
  const primaryHref = race.detailsUrl ?? race.registrationUrl ?? "/results";
  const isExternal = !race.detailsUrl && !!race.registrationUrl;

  return (
    <article
      id={`race-${race.id}`}
      className={[
        "group relative flex flex-col overflow-hidden rounded-xl border",
        isCompleted
          ? "border-line/60 bg-surface/90"
          : isNext
          ? "border-crimson/50 bg-surface shadow-[0_0_0_2px_rgba(229,9,99,0.1)]"
          : "border-line bg-surface shadow-sm",
      ].join(" ")}
    >
      {/* Clickable poster image with aspect ratio optimized for size */}
      <Link
        href={primaryHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-ink"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={race.cover}
          alt={`${race.name} — BBCh 2026`}
          fill
          unoptimized
          priority={isNext}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={[
            "object-cover",
            isCompleted ? "grayscale-[20%]" : "",
          ].join(" ")}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/20" />

        {/* Large Race Number Badge */}
        <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-white border border-white/20 shadow-lg backdrop-blur-sm">
          <span className="font-display text-base font-extrabold">
            {String(race.raceNo).padStart(2, "0")}
          </span>
        </div>

        {/* Dynamic Status Badge */}
        {isCompleted && (
          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-ink/80 px-4 py-1.5 border border-white/10 shadow-md backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-greige-400" />
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white/80">Done</span>
          </div>
        )}
        {isNext && (
          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-crimson px-4 py-1.5 shadow-lg border border-white/20">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white">Next Race</span>
          </div>
        )}
        {race.status === "upcoming" && (
          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-ember/90 px-4 py-1.5 border border-white/10 shadow-md backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-yellow" />
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white">Upcoming</span>
          </div>
        )}

        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-1.5" />
      </Link>

      {/* Card body - increased padding for breathing room */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {/* Date + discipline row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-md bg-crimson px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-white shadow-sm">
              {race.month}
            </span>
            <span className="stripe-yellow inline-flex items-center rounded-md px-3 py-1 font-display text-xs font-extrabold text-ink shadow-sm">
              {race.day}
              {race.dayNote && (
                <span className="ml-1 font-mono text-[0.65rem] font-normal lowercase opacity-85">
                  [{race.dayNote}]
                </span>
              )}
            </span>
          </div>
          <span
            className={[
              "rounded-full border px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider",
              DISCIPLINE_COLORS[race.discipline],
            ].join(" ")}
          >
            {DISCIPLINE_LABELS[race.discipline]}
          </span>
        </div>

        {/* Race title & subtitle */}
        <Link
          href={primaryHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="mt-4 block font-display text-xl sm:text-2xl font-black uppercase leading-tight tracking-tight text-ink transition-colors hover:text-ember"
        >
          {race.name}
          {race.subtitle && (
            <span className="block mt-1 font-sans text-sm font-normal normal-case tracking-normal text-greige">
              {race.subtitle}
            </span>
          )}
        </Link>

        {/* Location & distances */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-yellow-deep">
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{race.location}</span>
          </div>
          {race.distances && (
            <div className="flex items-center gap-2 font-mono text-xs text-greige">
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m11.5 11.5-6 6" />
                <path d="m16 16-6 6" />
                <path d="m9 9-6 6" />
                <path d="m20 20-6 6" />
                <rect width="20" height="8" x="2" y="8" rx="2" transform="rotate(-45 12 12)" />
              </svg>
              <span>Distances: {race.distances}</span>
            </div>
          )}
        </div>

        <div className="mt-6 mb-5 border-t border-line" />

        {/* CTA Footer buttons - highly improved touch targets & design */}
        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-greige">
            Race #{String(race.raceNo).padStart(2, "0")} · BBCh 2026
          </span>

          <div className="w-full sm:w-auto">
            {isCompleted && (
              <ButtonLink
                href={race.detailsUrl ?? "/results"}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto font-bold justify-center"
              >
                View Results →
              </ButtonLink>
            )}

            {isNext && (
              <div className="flex flex-col gap-2 w-full sm:flex-row">
                {race.detailsUrl && (
                  <ButtonLink
                    href={race.detailsUrl}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto font-bold justify-center"
                  >
                    Race Details
                  </ButtonLink>
                )}
                {race.registrationUrl && (
                  <ButtonLink
                    href={race.registrationUrl}
                    external
                    variant="yellow"
                    size="sm"
                    className="w-full sm:w-auto font-bold justify-center shadow-lg"
                  >
                    Register Now →
                  </ButtonLink>
                )}
              </div>
            )}

            {race.status === "upcoming" && (
              <div className="flex flex-col gap-2 w-full sm:flex-row">
                {race.detailsUrl && (
                  <ButtonLink
                    href={race.detailsUrl}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto font-bold justify-center"
                  >
                    Race Details
                  </ButtonLink>
                )}
                <span className="inline-flex h-9 px-4 items-center justify-center rounded-md font-semibold font-display text-sm bg-cream text-greige-400 border border-line w-full sm:w-auto cursor-default">
                  Coming Soon
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SeasonCalendarPage() {
  const completedCount = RACES.filter((r) => r.status === "completed").length;
  const upcomingCount = RACES.filter((r) => r.status !== "completed").length;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-onyx-900 pb-0">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.07]"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={i}
                x1={-200 + i * 75}
                y1={0}
                x2={200 + i * 75}
                y2={600}
                stroke="#f4a92b"
                strokeWidth="1.5"
              />
            ))}
            <circle cx="950" cy="300" r="260" stroke="#e50963" strokeWidth="2" fill="none" opacity="0.5" />
            <circle cx="950" cy="300" r="180" stroke="#e50963" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="950" cy="300" r="28" stroke="#e50963" strokeWidth="3" fill="none" opacity="0.7" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={950 + 28 * Math.cos(angle)}
                  y1={300 + 28 * Math.sin(angle)}
                  x2={950 + 260 * Math.cos(angle)}
                  y2={300 + 260 * Math.sin(angle)}
                  stroke="#e50963"
                  strokeWidth="1"
                  opacity="0.35"
                />
              );
            })}
          </svg>
          <div className="absolute -top-24 right-0 h-[520px] w-[720px] rounded-full bg-crimson opacity-[0.07] blur-[130px]" />
          <div className="absolute bottom-0 left-[-100px] h-[280px] w-[480px] rounded-full bg-yellow opacity-[0.06] blur-[80px]" />
        </div>

        <Container className="relative py-20 sm:py-28">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-yellow">Bangalore Bicycle Championships · 18th Edition</p>
              <h1 className="mt-3 font-display text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                Season{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #e50963 0%, #e0632e 55%, #f4a92b 100%)",
                  }}
                >
                  2026
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                India&apos;s longest-running competitive cycling championship returns for its{" "}
                <strong className="text-white/90">18th edition</strong> — 10 races from January to
                November across Bengaluru&apos;s iconic roads, trails and hills.
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  { label: "Total Races", value: "10" },
                  { label: "Completed", value: String(completedCount) },
                  { label: "Remaining", value: String(upcomingCount) },
                  { label: "Edition", value: "18th" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="font-display text-3xl font-extrabold text-white">{s.value}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="gloss-yellow rounded-2xl px-8 py-6 text-center shadow-xl">
                <p className="font-display text-4xl font-extrabold leading-none text-white">
                  18<sup className="text-xl">th</sup>
                </p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/80">Edition</p>
                <p className="mt-0.5 font-display text-lg font-extrabold text-white/90">2026</p>
              </div>
            </div>
          </div>
        </Container>

        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
      </section>

      {/* TIMELINE SCRUBBER */}
      <section className="border-b border-line bg-cream py-6">
        <Container>
          <div className="flex items-start justify-between gap-2 overflow-x-auto pb-1">
            {RACES.map((race) => (
              <a
                key={race.id}
                href={`#race-${race.id}`}
                title={race.name}
                className="group flex flex-col items-center gap-1.5 hover:opacity-100"
              >
                <div
                  className={[
                    "h-2 w-8 rounded-full transition-all duration-300 group-hover:w-12",
                    race.status === "completed"
                      ? "bg-greige-400"
                      : race.status === "next"
                      ? "animate-pulse bg-crimson shadow-[0_0_10px_2px_rgba(229,9,99,0.6)]"
                      : "bg-yellow",
                  ].join(" ")}
                />
                <span className="whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-wider text-greige">
                  {race.month} {race.day}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* RACE CARDS GRID - CHANGED TO 2 COLUMNS FOR BIGGER CARDS */}
      <section className="py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-ember">Full Schedule</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">
                All 10 Races
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {[
                { dot: "bg-greige-400", label: "Completed" },
                { dot: "bg-crimson", label: "Next Race" },
                { dot: "bg-yellow", label: "Upcoming" },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-greige">
                  <span className={`h-2 w-2 rounded-full ${l.dot}`} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {RACES.map((race) => (
              <RaceCard key={race.id} race={race} />
            ))}
          </div>
        </Container>
      </section>

      {/* PROGRESS BAR */}
      <section className="border-t border-line bg-cream py-14">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="eyebrow text-ember">Season Progress</p>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              {completedCount} of 10 Races Complete
            </h2>
            <div className="w-full max-w-2xl">
              <div className="h-3 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="stripe-warm h-full rounded-full"
                  style={{ width: `${(completedCount / 10) * 100}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-xs uppercase tracking-wider text-greige">
                <span>Jan 2026</span>
                <span>{Math.round((completedCount / 10) * 100)}% Complete</span>
                <span>Nov 2026</span>
              </div>
            </div>
            <div className="flex w-full max-w-2xl items-end justify-between gap-1">
              {RACES.map((r) => (
                <a key={r.id} href={`#race-${r.id}`} title={r.name} className="flex flex-col items-center gap-1">
                  <div
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      r.status === "completed" ? "bg-greige-400" : r.status === "next" ? "bg-crimson" : "bg-yellow",
                    ].join(" ")}
                  />
                  <span className="hidden font-mono text-[0.55rem] uppercase text-greige sm:block">
                    {r.month}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* DISCIPLINES */}
      <section className="gloss-dark py-14">
        <Container>
          <p className="eyebrow text-center text-yellow">Race Types</p>
          <h2 className="mt-2 text-center font-display text-2xl font-extrabold tracking-tight text-white">
            Four Disciplines, One Championship
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Road Race",
                bgImage: "/gallery/g01.jpg",
                desc: "High-speed racing on tarmac — STRR, Nandi Hill roads",
                count: RACES.filter((r) => r.discipline === "Road").length,
                href: "/results?discipline=Road+Race",
                borderColor: "#3b62cf",
              },
              {
                label: "MTB",
                bgImage: "/gallery/g08.jpg",
                desc: "Mountain bike cross-country through Avathi trails",
                count: RACES.filter((r) => r.discipline === "MTB").length,
                href: "/results?discipline=MTB+%28XC%29",
                borderColor: "#7cb342",
              },
              {
                label: "Time Trial",
                bgImage: "/gallery/g06.jpg",
                desc: "Solo race against the clock — KIADB, STRR",
                count: RACES.filter((r) => r.discipline === "ITT").length,
                href: "/results?discipline=ITT",
                borderColor: "#332a86",
              },
              {
                label: "Multi-Discipline",
                bgImage: "/gallery/g05.jpg",
                desc: "Gravel, Criterium & MTB combined in one day",
                count: RACES.filter((r) => r.discipline === "Multi").length,
                href: "/events",
                borderColor: "#f4a92b",
              },
            ].map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className="relative overflow-hidden rounded-xl p-6 flex flex-col justify-end min-h-[200px] group transition-all"
                style={{
                  borderLeft: `4px solid ${d.borderColor}`,
                }}
              >
                {/* Background Image */}
                <Image
                  src={d.bgImage}
                  alt={d.label}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:via-black/50 transition-colors" />

                {/* Content */}
                <div className="relative z-10">
                  <p className="font-display text-xl font-extrabold text-white">{d.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">{d.desc}</p>
                  <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-white/50">
                    {d.count} {d.count === 1 ? "race" : "races"} this season
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
