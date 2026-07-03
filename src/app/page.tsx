import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";
import { partners } from "@/lib/partners";
import { gallery } from "@/lib/gallery";
import { TypeBadge } from "@/components/ui/badge";
import { getRecentEvents, getStats, events } from "@/lib/data";
import { getTeamStandings } from "@/lib/team-standings";
import { TeamStandings } from "@/components/team-standings";
import {
  getUpcomingEvents,
  dateParts,
  formatDate,
  type UpcomingEvent,
} from "@/lib/upcoming";

export default function Home() {
  const stats = getStats();
  const recent = getRecentEvents(6);
  const upcoming = getUpcomingEvents();
  const nextUp = upcoming[0];
  const latest = events[0];
  const teamStandings = getTeamStandings().slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-home.jpg"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[70%_center] opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1436] via-[#13268f]/85 to-[#1d3fcc]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1436] via-transparent to-[#0d1436]/30" />
        </div>
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow text-yellow">Bangalore Bicycle Championships</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              India&apos;s longest-running
              <br />
              <span className="text-yellow">cycling event.</span>
            </h1>
            <p className="mt-3 font-script text-4xl leading-none text-yellow sm:text-5xl">
              live to race
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Bengaluru&apos;s home of competitive cycling since 2009. Road
              races, MTB, time trials and more — with a decade of results and
              rider histories, all in one place.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {latest && (
                <ButtonLink href={`/events/${latest.slug}`} variant="yellow">
                  Latest results
                </ButtonLink>
              )}
              <ButtonLink href="/events" variant="outlineLight">
                Browse events
              </ButtonLink>
            </div>
          </div>

          {nextUp && (
            <a
              href={nextUp.registrationUrl || "/events"}
              {...(nextUp.registrationUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="gloss-dark group mt-14 flex flex-col gap-4 rounded-xl border border-line-dark p-5 transition-colors hover:border-yellow/50 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="flex items-center gap-5">
                <div className="stripe-yellow flex flex-col items-center rounded-lg px-3.5 py-2 text-ink">
                  <span className="font-display text-xl font-extrabold leading-none">{dateParts(nextUp.date).day}</span>
                  <span className="font-mono text-[0.6rem] tracking-widest">{dateParts(nextUp.date).month}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="eyebrow text-yellow">Next up</span>
                    <TypeBadge type={nextUp.discipline} className="bg-white/10 text-white/80" />
                  </div>
                  <p className="mt-1 font-display text-lg font-bold text-white">{nextUp.name}</p>
                  <p className="text-sm text-white/65">{formatDate(nextUp.date)} · {nextUp.location}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-white transition-colors group-hover:text-yellow">
                Register now <span aria-hidden="true">→</span>
              </span>
            </a>
          )}
        </Container>
        <div className="stripe-yellow absolute bottom-0 left-0 right-0 h-2.5" />
      </section>

      {/* UPCOMING */}
      {upcoming.length > 0 && (
        <section className="border-b border-line bg-cream py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Next up"
              title="Upcoming events"
              action={{ href: "/events", label: "All events" }}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => (
                <UpcomingCard key={e.id} event={e} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* STATS */}
      <section className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          <Stat value={stats.athletes.toLocaleString()} label="Riders on record" />
          <Stat value={String(stats.yearsRunning)} label="Years of racing" />
          <Stat value={String(stats.events)} label="Events archived" />
          <Stat value={stats.results.toLocaleString()} label="Results logged" />
        </Container>
      </section>

      {/* TEAM CHAMPIONSHIP */}
      {teamStandings.length > 0 && (
        <section className="border-b border-line bg-paper py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Team championship"
              title="All-time team standings"
              action={{ href: "/results", label: "All results" }}
            />
            <p className="mt-3 max-w-xl text-sm text-greige">
              Cumulative team points across every BBCh season on record
              (2015–2026) — 25 points for a win, descending through the top 15
              finishers in every category.
            </p>
            <div className="mt-8">
              <TeamStandings teams={teamStandings} />
            </div>
          </Container>
        </section>
      )}

      {/* RECENT EVENTS */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Race archive" title="Recent events" action={{ href: "/events", label: "All events" }} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.slice(0, 3).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-ember">The championship</p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              16 years of racing, one home for every rider
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              BBCh has run competitive cycling in and around Bengaluru since
              2009 — from criteriums and cross-country to punishing time
              trials up Nandi Hills. Now every event, result and rider profile
              lives in one modern platform, so your racing history follows you
              season after season.
            </p>
            <div className="mt-7">
              <ButtonLink href="/about" variant="dark" size="sm">About BBCh</ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FactCard k="Since" v="2009" />
            <FactCard k="Disciplines" v="Road · MTB · TT" />
            <FactCard k="Home base" v="Bengaluru" />
            <FactCard k="Riders" v={`${stats.athletes.toLocaleString()}+`} />
          </div>
        </Container>
      </section>

      {/* GALLERY */}
      <section className="bg-ink py-20">
        <Container>
          <SectionHeading
            eyebrow="On the road"
            title="Race gallery"
            action={{ href: "/gallery", label: "View gallery" }}
            onDark
          />
        </Container>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.slice(0, 8).map((photo, i) => (
            <Link
              key={photo.src}
              href="/gallery"
              className="group relative aspect-square overflow-hidden bg-onyx-800"
            >
              <Image
                src={photo.src}
                alt={`BBCh race photo ${i + 1}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 stripe-yellow opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-y border-line bg-paper py-16">
        <Container>
          <p className="text-center eyebrow text-greige">Our partners</p>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-greige">
            Proud to be supported by brands who back cycling in Bengaluru.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex h-32 items-center justify-center rounded-xl border border-line bg-surface px-6 py-5"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={220}
                  height={110}
                  unoptimized
                  className="max-h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-8">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-14 text-center text-paper sm:px-12 sm:py-20">
            <HeroBackdrop />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Looking for a result?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-greige-400">
                Search over a decade of BBCh races by rider name, year, discipline
                or category.
              </p>
              <div className="mt-8">
                <ButtonLink href="/results">Search results</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function UpcomingCard({ event }: { event: UpcomingEvent }) {
  const d = dateParts(event.date);
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-16px_rgba(11,11,13,0.25)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-ink">
        <Image
          src={event.cover}
          alt={event.discipline}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-lg bg-ember px-3 py-2 text-white">
          <span className="font-display text-2xl font-medium leading-none">{d.day}</span>
          <span className="font-mono text-[0.6rem] tracking-widest">{d.month}</span>
        </div>
        <div className="absolute right-4 top-4">
          <TypeBadge type={event.discipline} className="bg-paper/90 backdrop-blur" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink">
          {event.name}
        </h3>
        <p className="mt-1.5 text-sm text-greige">
          {formatDate(event.date)} · {event.location}
        </p>
        <div className="mt-5 flex flex-1 items-end">
          {event.registrationUrl ? (
            <ButtonLink href={event.registrationUrl} external size="sm" className="w-full">
              Register now
            </ButtonLink>
          ) : (
            <span className="text-sm text-greige">Registration opening soon</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">{value}</p>
      <p className="mt-1 text-sm text-greige">{label}</p>
    </div>
  );
}

function FactCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-line bg-cream p-5">
      <p className="eyebrow text-greige">{k}</p>
      <p className="mt-2 font-display text-xl font-medium text-ink">{v}</p>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="#f4f1ea" strokeWidth="1" fill="none">
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={i} x1={-200 + i * 50} y1="0" x2={200 + i * 50} y2="600" />
        ))}
      </g>
      <circle cx="1000" cy="140" r="120" stroke="#e2542c" strokeWidth="2" fill="none" />
      <circle cx="1000" cy="140" r="70" stroke="#e2542c" strokeWidth="1" fill="none" />
    </svg>
  );
}
