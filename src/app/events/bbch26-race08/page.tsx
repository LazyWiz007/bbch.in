import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { RaceStructuredData, Breadcrumbs } from "@/components/structured-data";
import { EventResults } from "@/components/event-results";
import { getEventBySlug, getResultsForEvent } from "@/lib/data";

const REGISTER_URL = "https://konfhub.com/bbch26-race08";
const EVENT_SLUG = "2026-race-08-apex-itt";
const FB_EVENT_URL = "https://www.facebook.com/events/1576143650552955/";
const VENUE_MAP_URL = "https://maps.app.goo.gl/wkehsn2i1nQQvZz7A";

/* Official Race #08 posters now in /public/covers.
   Insta square used for the hero (fits the aspect-square container perfectly).
   FB Event banner used for OpenGraph / Twitter cards. */
const POSTER_SQUARE = "/covers/BBCh26Race08_Insta.jpg";
const POSTER_BANNER = "/covers/BBCh26Race08_FBEvent.jpg";

export const metadata: Metadata = {
  title: "Race #08 — Apex ITT · Results",
  description:
    "Official results for BBCh26 Race #08 — Apex Individual Time Trial, Sunday 20 September 2026 at KIADB ITIR, STRR, Bangalore. 41 km against the clock across Elite, Amateur, Women and Men Master categories.",
  alternates: { canonical: "/events/bbch26-race08" },
  openGraph: {
    title: "BBCh26 Race #08 — Apex ITT · Results",
    description:
      "Official results from the 41 km individual time trial on the STRR, 20 September 2026.",
    images: [{ url: POSTER_BANNER, width: 1200, height: 628, alt: "BBCh26 Race #08 Apex ITT — 20 September 2026" }],
  },
  twitter: { card: "summary_large_image", images: [POSTER_BANNER] },
};

const categories = [
  {
    name: "Elite",
    eligibility: "All men, any age",
    fee: 999,
    note: "Where most professionals race — a good level of experience is expected. Riders who have represented a state or UT must race Elite. Once you race Elite you stay Elite for the rest of the season.",
  },
  {
    name: "Amateur",
    eligibility: "Open to anyone, any age",
    fee: 999,
    note: "The open category for riders who want to race without the Elite experience barrier.",
  },
  {
    name: "Women",
    eligibility: "Open to all women",
    fee: 999,
    note: "Girls under 18 may choose to race here instead of U-18 Open.",
  },
  {
    name: "Men Master (40+)",
    eligibility: "Men aged 40 and over",
    fee: 999,
    note: "Mirrors the Elite distance. Needs at least 10 riders on race day — otherwise it merges into Elite and everyone shares one podium.",
  },
  {
    name: "Women Master (40+)",
    eligibility: "Women aged 40 and over",
    fee: 999,
    note: "Mirrors the Women's distance. Needs at least 10 riders on race day — otherwise it merges into Women.",
  },
  {
    name: "U-18 Open",
    eligibility: "Boys and girls under 18",
    fee: 999,
    note: "One shared podium regardless of gender. Photo + date-of-birth ID mandatory, and a parent, guardian or team manager must accompany the rider and sign the indemnity form before the BIB is issued.",
  },
  {
    name: "Non-Road Bike",
    eligibility: "Hybrid, MTB or foldie",
    fee: 999,
    note: "Fixie and single-speed bikes are not allowed in this category — register those under another category.",
  },
];

const ittFacts = [
  "Riders start one at a time, roughly 30 seconds apart — the interval can change with entry numbers.",
  "Start order is seeded from last season's results, with the defending winner going off last.",
  "Drafting is not allowed. Any assistance between riders is forbidden.",
  "Two clocks are published: race clock (from the first rider) and your real start time in IST.",
  "Line up 5 minutes before your slot. Miss it and you either lose that time or start last — the organisers' call.",
  "Your BIB must be on the front handlebars of your bicycle.",
];

const rules = [
  "Race BIBs must be displayed on the handlebars. Altering or cutting numbers, or adding unauthorised sponsor logos, means a fine and/or disqualification.",
  "Shortcutting the course is not permitted — following the official route is your responsibility.",
  "No offensive or abusive language, unsportsmanlike conduct, or disrespect toward volunteers and officials.",
  "No spot registration on race day. Entries close Thursday 17 September at midnight.",
  "U-18 riders must carry photo + date-of-birth ID and be accompanied by a parent or guardian.",
];

export default async function Race08Page() {
  const event = await getEventBySlug(EVENT_SLUG);
  const results = event ? await getResultsForEvent(event.id) : [];
  const raceCategories = [...new Set(results.map((r) => r.category))].sort();

  return (
    <>
      <RaceStructuredData
        name="BBCh26 Race #08 — Apex ITT"
        slug="bbch26-race08"
        startDate="2026-09-20T06:00:00+05:30"
        endDate="2026-09-20T11:00:00+05:30"
        location="KIADB ITIR, STRR"
        description="41 km individual time trial on the STRR — the race of truth. Elite, Amateur, Women, Masters, U-18 and Non-Road Bike categories."
        image={POSTER_BANNER}
        registrationUrl={REGISTER_URL}
        status="completed"
      />
      <Breadcrumbs
        items={[
          { name: "Events", path: "/events" },
          { name: "Race #08 — Apex ITT", path: "/events/bbch26-race08" },
        ]}
      />

      {/* HERO */}
      <section className="gloss-blue relative overflow-hidden text-white">
        <Container className="relative py-12 sm:py-16 lg:py-20">
          <Link href="/events" className="text-sm text-white/70 transition-colors hover:text-yellow">
            ← All events
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow text-yellow">Race #08 · BBCh 2026 season</p>
              <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                Apex ITT
              </h1>
              <p className="mt-3 font-script text-2xl leading-none text-yellow sm:text-3xl">
                the race of truth
              </p>

              <div className="mt-6 flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-8">
                <span>📅 Sunday, 20 September 2026</span>
                <span>📍 KIADB ITIR, STRR, Bangalore</span>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-yellow/40 bg-yellow/10 px-4 py-2 text-sm font-semibold text-yellow">
                <span className="h-2 w-2 shrink-0 rounded-full bg-yellow" />
Race complete — results published
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="#results" variant="yellow">
                  View results
                </ButtonLink>
                <ButtonLink href="/results" variant="outlineLight">
                  Search all results
                </ButtonLink>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-xl shadow-2xl sm:max-w-sm">
              <Image
                src={POSTER_SQUARE}
                alt="BBCh26 Race #08 Apex ITT — Sunday 20 September 2026, KIADB ITIR, STRR."
                fill
                unoptimized
                priority
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
      </section>

      {/* QUICK FACTS */}
      <section className="border-b border-line bg-paper py-8 sm:py-10">
        <Container className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-6">
          <Fact k="Reporting" v="6:00 AM" sub="30 min before your start" />
          <Fact k="First start" v="7:00 AM" sub="Individual, ~30s apart" />
          <Fact k="Distance" v="41 km" sub="Out and back on the STRR" />
          <Fact k="Cut-off" v="80 min" sub="90 min for Women, U-18, Non-Road" />
        </Container>
      </section>

      {/* RESULTS */}
      <Container className="scroll-mt-20 py-12 sm:py-16" id="results">
        <p className="eyebrow text-ember">Official results</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Race #08 results
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
          Apex ITT · 20 September 2026 · KIADB ITIR, STRR
          {results.length > 0 && ` · ${results.length} riders`}
        </p>

        {results.length === 0 ? (
          <div className="mt-8 rounded-xl border border-line bg-cream p-10 text-center">
            <p className="font-display text-lg font-bold text-ink">Results coming soon</p>
            <p className="mt-2 text-sm text-greige">
              Results are being processed. Check back shortly or{" "}
              <Link href="/results" className="font-semibold text-ember hover:underline">
                search the full archive
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <EventResults categories={raceCategories} results={results} />
          </div>
        )}
      </Container>

      {/* WHAT IS AN ITT */}
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div>
            <p className="eyebrow text-ember">The format</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              What is an ITT?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              An individual time trial is a road race where you ride alone
              against the clock — literally &ldquo;against the watch&rdquo;. It&apos;s
              called the race of truth because winning depends only on your own
              strength and endurance, with no teammates ahead to shelter behind.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">
              Riders set off at fixed intervals rather than in a bunch, so the
              fastest time wins — not the first across the line.
            </p>
          </div>
          <div className="gloss-card rounded-xl border border-line p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-ink">How race day works</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink/70">
              {ittFacts.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* CATEGORIES & FEES */}
      <section className="scroll-mt-20 bg-cream py-12 sm:py-16 lg:py-20" id="categories">
        <Container>
          <p className="eyebrow text-ember">Race overview</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Entry categories &amp; fees
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
            Seven categories, all racing the same 41 km course. Entry is ₹999
            (excluding gateway charges), with ₹100 off until 28 August.
          </p>

          <div className="gloss-card mt-8 overflow-hidden rounded-xl border border-line">
            <div className="hidden grid-cols-[1.2fr_1.4fr_0.6fr] gap-3 border-b border-line bg-ember-50 px-5 py-3 font-display text-[0.68rem] font-bold uppercase tracking-wider text-ember-600 sm:grid">
              <span>Category</span>
              <span>Eligibility</span>
              <span className="text-right">Fee</span>
            </div>
            <ul>
              {categories.map((c) => (
                <li key={c.name} className="border-b border-line px-4 py-4 last:border-0 sm:px-5">
                  <div className="hidden grid-cols-[1.2fr_1.4fr_0.6fr] items-baseline gap-3 sm:grid">
                    <span className="font-display font-bold text-ink">{c.name}</span>
                    <span className="text-sm text-greige">{c.eligibility}</span>
                    <span className="text-right font-display text-sm font-bold text-ink">₹{c.fee}</span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 sm:hidden">
                    <span className="font-display font-bold text-ink">{c.name}</span>
                    <span className="font-display text-sm font-bold text-ink">₹{c.fee}</span>
                    <span className="w-full text-xs text-greige">{c.eligibility}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ROUTE & MAPS */}
      <Container className="py-12 sm:py-16 lg:py-20">
        <p className="eyebrow text-ember">The course</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Route &amp; maps
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
          Out and back along the STRR: start on the service road and join the
          highway immediately, stay on it for roughly 20 km, U-turn under the
          flyover and finish on the flyover. Distances are per car odometer and
          may read slightly differently on your Garmin.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
          <RouteCard
            title="Race start"
            points={["Service road, joining the highway immediately"]}
            href="https://maps.app.goo.gl/8DCJFnAhutV3VG6m6"
            label="Open start point"
          />
          <RouteCard
            title="U-turn"
            points={["Dobbaspet side, under the flyover at ~20 km"]}
            href="https://maps.app.goo.gl/G6mmiTnPnB4izMcE8"
            label="Open U-turn"
          />
          <RouteCard
            title="Finish — 41.4 km"
            points={["On the flyover, opposite the start line"]}
            href="https://maps.app.goo.gl/PKnTcTGrVFmbipUx7"
            label="Open finish line"
          />
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <a href={VENUE_MAP_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ember hover:underline">
            📍 Venue on Google Maps →
          </a>
          <a href={FB_EVENT_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ember hover:underline">
            Facebook event →
          </a>
        </div>
      </Container>

      {/* RULES */}
      <section className="bg-cream py-12 sm:py-16 lg:py-20">
        <Container>
          <p className="eyebrow text-ember">Before you race</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Key rules
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {rules.map((r) => (
              <li key={r} className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink/75 sm:p-5">
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-greige">
            These sit alongside our{" "}
            <Link href="/rules-and-regulations" className="font-medium text-ember hover:underline">
              general race regulations
            </Link>
            . Full event details are on the{" "}
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-ember hover:underline">
              KonfHub event page
            </a>
            .
          </p>
        </Container>
      </section>

      {/* ORGANISER */}
      <section className="gloss-dark py-12 text-white sm:py-16 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="eyebrow text-yellow">Organiser</p>
            <p className="mt-2 font-display text-lg font-bold sm:text-xl">
              Bangalore Bicycle Championships
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/75">
              <p>
                Email:{" "}
                <a href="mailto:council@bbch.in" className="text-yellow hover:underline">
                  council@bbch.in
                </a>
              </p>
              <p>Race-day emergency contact: +91 98860 46777 (active on race day only)</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-yellow">A note from the organisers</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              BBCh is run entirely by volunteers. Around race day there may be a
              few unintentional human errors — we ask riders to bear with us, as
              resolving them can take a little longer than expected given how
              lean the team is. Thank you for your understanding.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA — #register kept so older shared links still land somewhere sensible */}
      <Container className="scroll-mt-20 py-12 text-center sm:py-16" id="register">
        <h2 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
          Find your result
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-greige">
          Search by rider name, year, discipline or category across every BBCh season.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="/results" variant="primary">
            Search results
          </ButtonLink>
          <ButtonLink href="/events" variant="outline">
            Back to all events
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

function Fact({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div>
      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-greige sm:text-xs">{k}</p>
      <p className="mt-1 font-display text-xl font-extrabold text-ink sm:text-2xl">{v}</p>
      <p className="mt-0.5 text-[0.7rem] leading-snug text-greige sm:text-xs">{sub}</p>
    </div>
  );
}

function RouteCard({
  title,
  points,
  href,
  label,
}: {
  title: string;
  points: string[];
  href: string;
  label: string;
}) {
  return (
    <div className="gloss-card rounded-xl border border-line p-5 sm:p-6">
      <h3 className="font-display text-base font-bold text-ink">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="mt-4 border-t border-line pt-4">
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ember hover:underline">
          {label} →
        </a>
      </div>
    </div>
  );
}
