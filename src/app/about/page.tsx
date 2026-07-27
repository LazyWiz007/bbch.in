import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "BBCh — India's longest-running cycling event. Established 2009, volunteer-run, and still the launchpad for the country's top racing talent.",
};

const disciplines = [
  { name: "Road Race", desc: "Mass-start races on open roads, from fast criteriums to long endurance loops." },
  { name: "MTB (XC)", desc: "Cross-country mountain-bike racing on Bengaluru's trails and grasslands." },
  { name: "ITT", desc: "Solo efforts against the clock, most famously up the Nandi Hills climb." },
  { name: "TTT", desc: "Small teams racing together against the clock, in tight formation." },
  { name: "Criterium", desc: "High-speed, closed-circuit racing — laps, primes and elbow-to-elbow racing." },
  { name: "Downhill & Cyclocross", desc: "Off-road and technical formats that round out the BBCh calendar." },
];

const values = [
  {
    n: "01",
    title: "No prize money",
    text: "The reward lies in the experience, the challenge, and the camaraderie — not a cheque.",
  },
  {
    n: "02",
    title: "International standards",
    text: "Every race is designed and run to international standards in race design, safety, and sportsmanship.",
  },
  {
    n: "03",
    title: "Entirely volunteer-run",
    text: "BBCh is organised and delivered by volunteers, non-profit, season after season.",
  },
  {
    n: "04",
    title: "Community-owned",
    text: "Ownership by the community keeps the platform authentic, transparent, and focused on the riders.",
  },
];

const timeline = [
  {
    year: "2009",
    text: "BBCh begins as informal Sunday rides up Nandi Hills — a simple idea to bring people together to race, ride, and grow the sport.",
  },
  {
    year: "2015",
    text: "The calendar matures into a structured, professionally executed race season — and digital results record-keeping begins.",
  },
  {
    year: "Today",
    text: "16 years on: 10 annual races, a fully digitised results archive, and a platform where every rider's history lives on.",
  },
];

export default function AboutPage() {
  const stats = getStats();

  return (
    <>
      {/* HERO — full-bleed editorial */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Image
            src="/gallery/g13.jpg"
            alt="A BBCh rider celebrates crossing the line, arms raised, with the peloton behind on an open highway"
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1436] via-[#0d1436]/70 to-[#0d1436]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1436]/90 via-transparent to-transparent" />
        </div>
        <Container className="relative py-24 sm:py-32">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-yellow">Est. 2009 · Bengaluru, India</p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
                India&apos;s longest-running
                <br />
                <span className="text-yellow">cycling event.</span>
              </h1>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <p className="font-display text-6xl font-extrabold leading-none sm:text-7xl">{stats.yearsRunning}</p>
              <p className="eyebrow mt-1 text-white/60">years running</p>
            </div>
          </div>
        </Container>
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
      </section>

      {/* FOUNDING STORY — asymmetric text + photo */}
      <Container className="py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-ember">Our story</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              From Sunday rides to Nandi Hills, to a national racing calendar
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink/80">
              <p>
                BBCh started with a simple but powerful idea: to bring people
                together to race, ride, and grow the sport of cycling. What
                began as informal Sunday rides up Nandi Hills evolved, year on
                year, into a structured, professionally executed race
                calendar — now ten races deep, every season.
              </p>
              <p>
                Today, riders travel from across India to Bengaluru to
                compete. Many of the country&apos;s national champions began
                their careers on a BBCh start line.
              </p>
            </div>
            <blockquote className="mt-8 border-l-4 border-ember pl-5 font-display text-xl font-bold italic text-ink sm:text-2xl">
              &ldquo;A launchpad for India&apos;s top cycling talent.&rdquo;
            </blockquote>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="/gallery/g06.jpg"
              alt="A group of BBCh riders, one wearing a 'live to race' t-shirt, posing with their road bikes"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {/* MISSION / VISION — glossy blue panel */}
      <section className="gloss-blue py-16 text-white sm:py-20">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-yellow">Mission</p>
              <p className="mt-3 font-display text-2xl font-bold leading-snug sm:text-3xl">
                To grow competitive cycling culture in India by making racing
                accessible, inclusive, fair, and exciting.
              </p>
            </div>
            <div>
              <p className="eyebrow text-yellow">Vision</p>
              <p className="mt-3 font-display text-2xl font-bold leading-snug sm:text-3xl">
                A sustainable, community-driven platform where everyday
                riders, weekend warriors, and aspiring athletes can test their
                limits.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <Container className="py-20">
        <p className="eyebrow text-ember">What we stand for</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Run by riders, for riders
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.n} className="gloss-card p-6">
              <span className="font-display text-sm font-bold text-ember">{v.n}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* PHOTO STRIP */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {["/gallery/g08.jpg", "/gallery/g04.jpg", "/gallery/g01.jpg", "/gallery/g12.jpg"].map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt="BBCh race moment"
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* WHAT WE RACE */}
      <Container className="py-20">
        <p className="eyebrow text-ember">The calendar</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          What we race
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d) => (
            <div key={d.name} className="gloss-card rounded-xl border border-line p-6">
              <h3 className="font-display text-lg font-bold text-ink">{d.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{d.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* TIMELINE */}
      <section className="bg-cream py-20">
        <Container>
          <p className="eyebrow text-ember">16 years, three chapters</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            The story so far
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {timeline.map((t) => (
              <div key={t.year} className="relative pl-6">
                <span className="stripe-yellow absolute left-0 top-1 h-full w-1" />
                <span className="font-display text-2xl font-extrabold text-ink">{t.year}</span>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{t.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-line bg-paper py-14">
        <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatBlock value={String(stats.yearsRunning)} label="Years running" />
          <StatBlock value={stats.athletes.toLocaleString()} label="Riders on record" />
          <StatBlock value={String(stats.events)} label="Events archived" />
          <StatBlock value={stats.results.toLocaleString()} label="Results logged" />
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-20">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Come and race with us
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            The next event is always around the corner. Find it on the
            calendar and register online.
          </p>
          <div className="mt-8">
            <ButtonLink href="/events" variant="yellow">
              View events
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{value}</p>
      <p className="mt-1 text-sm text-greige">{label}</p>
    </div>
  );
}
