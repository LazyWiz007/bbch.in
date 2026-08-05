import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";
import { partners } from "@/lib/partners";
import { gallery } from "@/lib/gallery";
import { TypeBadge } from "@/components/ui/badge";
import { getRecentEvents, getStats, events, getTopAthletes, getResultsForEvent } from "@/lib/data";
import { formatResultTime } from "@/lib/utils";
import { LatestRaceResults, type CategoryPodium } from "@/components/latest-race-results";
import { getTeamStandings } from "@/lib/team-standings";
import { TeamStandings } from "@/components/team-standings";
import { TopAthletesPodium } from "@/components/top-athletes-podium";
import { ProtectedGalleryGrid } from "@/components/protected-gallery-grid";
import { FacebookFeed } from "@/components/facebook-feed";
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

  // Podium (top 3) per category for the most recent race.
  const latestResults = latest ? getResultsForEvent(latest.id) : [];
  const latestPodiums: CategoryPodium[] = (latest?.categories ?? [])
    .map((category) => ({
      category,
      riders: latestResults
        .filter((r) => r.category === category && r.rank != null)
        .slice(0, 3)
        .map((r) => ({
          rank: r.rank as number,
          name: r.athlete.name,
          slug: r.athlete.slug,
          team: r.athlete.team ?? null,
          time: formatResultTime(r.timeSeconds, r.status),
        })),
    }))
    .filter((p) => p.riders.length > 0);
  const teamStandings = getTeamStandings().slice(0, 8);
  const maxYear = events.length > 0 ? Math.max(...events.map((e) => e.year)) : new Date().getFullYear();
  const topAthletesAllTime = getTopAthletes();
  const topAthletesThisSeason = getTopAthletes(maxYear);

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
            className="object-cover object-[70%_center] opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1436] via-[#13268f]/70 to-[#1d3fcc]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1436]/90 via-transparent to-[#0d1436]/10" />
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
            <Link
              href={nextUp.detailsUrl || nextUp.registrationUrl || "/events"}
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
                View details <span aria-hidden="true">→</span>
              </span>
            </Link>
          )}
        </Container>
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2.5" />
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
            <div className="mt-10">
              {upcoming.length === 1 ? (
                <FeaturedUpcomingCard event={upcoming[0]} />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((e) => (
                    <UpcomingCard key={e.id} event={e} />
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* LATEST RACE PODIUM */}
      {latest && latestPodiums.length > 0 && (
        <section className="border-b border-line bg-paper py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Latest results"
              title={latest.name}
              action={{ href: `/events/${latest.slug}`, label: "Full results" }}
            />
            <p className="mt-3 max-w-xl text-sm text-greige">
              Podium finishers from the most recent race. Pick a category to see
              its top three.
            </p>
            <div className="mt-8">
              <LatestRaceResults podiums={latestPodiums} />
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

      {/* TOP ATHLETES & TEAM CHAMPIONSHIP */}
      {teamStandings.length > 0 && (
        <section className="border-b border-line bg-paper py-16 sm:py-20">
          <Container>
            {/* TOP ATHLETES */}
            <div className="mb-16 pb-16 border-b border-line">
              <SectionHeading
                eyebrow="Rider standings"
                title="Top athletes"
                action={{ href: "/athletes", label: "All athletes" }}
              />
              <p className="mt-3 max-w-xl text-sm text-greige mb-12">
                The most dominant riders based on cumulative points. Top 3 riders showcased for this season and all time.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
                <TopAthletesPodium athletes={topAthletesThisSeason} title="This season" />
                <TopAthletesPodium athletes={topAthletesAllTime} title="All time" />
              </div>
            </div>

            {/* TEAM CHAMPIONSHIP */}
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
            onDark
          />
        </Container>
        <ProtectedGalleryGrid />
      </section>

      {/* SOCIAL FEED */}
      <section className="border-b border-line bg-paper py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Follow the action"
            title="Latest from BBCh"
          />
          <p className="mt-3 max-w-xl text-sm text-greige">
            Stay up to date with race updates, results, and community highlights straight from our social channels.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Facebook Page Plugin */}
            <div className="flex flex-col">
              <div className="mb-4 flex items-center gap-2.5">
                {/* Facebook icon */}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877f2]">
                  <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4" aria-hidden="true">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.313 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </span>
                <span className="font-display font-semibold text-ink">Facebook</span>
                <a
                  href="https://www.facebook.com/BangaloreBicycleChampionships/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-sm font-medium text-ember hover:underline"
                >
                  Visit page →
                </a>
              </div>
              <FacebookFeed />
            </div>

            {/* Instagram follow CTA */}
            <div className="flex flex-col">
              <div className="mb-4 flex items-center gap-2.5">
                {/* Instagram icon */}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                  <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <span className="font-display font-semibold text-ink">Instagram</span>
                <a
                  href="https://www.instagram.com/bangalorebicyclechampionships/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-sm font-medium text-ember hover:underline"
                >
                  Visit profile →
                </a>
              </div>
              {/* Instagram CTA card */}
              <a
                href="https://www.instagram.com/bangalorebicyclechampionships/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 flex-col items-center justify-center gap-5 rounded-xl border border-line bg-gradient-to-br from-[#fdf0f8] via-white to-[#f0eaff] p-10 text-center transition-colors hover:border-[#ee2a7b]/30"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-lg">
                  <svg viewBox="0 0 24 24" fill="white" className="h-10 w-10" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-ink">@bangalorebicyclechampionships</p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-greige">
                    Race day shots, behind-the-scenes moments and rider stories. Follow us on Instagram to stay in the loop.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ee2a7b] to-[#6228d7] px-6 py-2.5 text-sm font-bold text-white transition-opacity group-hover:opacity-90">
                  Follow on Instagram
                </span>
              </a>
            </div>
          </div>
        </Container>
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
      <Link href={event.detailsUrl || event.registrationUrl || "/events"} className="relative block aspect-[16/9] overflow-hidden bg-ink">
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
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={event.detailsUrl || event.registrationUrl || "/events"}>
          <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink hover:text-ember">
            {event.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-sm text-greige">
          {formatDate(event.date)} · {event.location}
        </p>
        <div className="mt-5 flex flex-1 items-end">
          {event.detailsUrl ? (
            <ButtonLink href={event.detailsUrl} size="sm" className="w-full">
              View details &amp; register
            </ButtonLink>
          ) : event.registrationUrl ? (
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

function FeaturedUpcomingCard({ event }: { event: UpcomingEvent }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-yellow/50 sm:flex-row">

      {/* Poster — official race banner, rendered uncropped with no overlays so
          the artwork (logo, title, date) stays fully visible. */}
      <div className="relative w-full shrink-0 overflow-hidden sm:w-80 md:w-96 lg:w-[420px]">
        <Image
          src={event.cover}
          alt={event.name}
          width={1920}
          height={1005}
          unoptimized
          priority
          sizes="(max-width: 640px) 100vw, 420px"
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow text-ember">Upcoming Event</span>
            <TypeBadge type={event.discipline} className="px-2.5 py-1 text-xs font-semibold" />
            <span className="h-1.5 w-1.5 rounded-full bg-ember/30" />
            <span className="text-sm font-semibold text-greige">{formatDate(event.date)}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
            {event.name}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-greige">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {event.detailsUrl && (
            <ButtonLink
              href={event.detailsUrl}
              variant="outline"
              size="md"
              className="px-8 text-base font-bold h-14 active:scale-[0.98] transition-transform"
            >
              View details
            </ButtonLink>
          )}
          {event.registrationUrl ? (
            <ButtonLink
              href={event.detailsUrl ? `${event.detailsUrl}#register` : event.registrationUrl}
              external={!event.detailsUrl}
              variant="yellow"
              size="md"
              className="px-10 text-base font-bold h-14 active:scale-[0.98] transition-transform"
            >
              Register now →
            </ButtonLink>
          ) : !event.detailsUrl ? (
            <div className="inline-flex items-center gap-2 rounded-lg bg-paper px-4 py-3 text-sm font-semibold text-greige border border-line">
              <span className="h-2 w-2 rounded-full bg-yellow" />
              Registration opening soon
            </div>
          ) : null}
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
