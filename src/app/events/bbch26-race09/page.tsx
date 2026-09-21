import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { RaceStructuredData, Breadcrumbs } from "@/components/structured-data";

const REGISTER_URL = "https://www.explara.com/e/bbch26-race09";
const FB_EVENT_URL = "https://www.facebook.com/events/1777720650210607/";
const VENUE_MAP_URL = "https://goo.gl/maps/gqvZvtromXVbGxyV9";

/* Official Race #09 banner (1925x1104). Key artwork sits in the corners —
   venue/date, logo, "MTB XC RACE", "TRAIL RUN 10KM" — so always render it
   uncropped, never inside a fixed or square aspect box. */
const POSTER = "/covers/BBCh26Race09_FB.jpg";

export const metadata: Metadata = {
  title: "Race #09 — MTB XC & Trail Run · 18 Oct 2026",
  description:
    "Register for BBCh26 Race #09 — MTB cross-country race and trail run, Sunday 18 October 2026 at Avathi, Nandi Hill Road, Bangalore. Elite, Amateur, Women, U-18, U-16, U-11 and kids categories. Entries close 15 October.",
  alternates: { canonical: "/events/bbch26-race09" },
  openGraph: {
    title: "BBCh26 Race #09 — MTB XC Race & Trail Run · 18 Oct 2026",
    description:
      "Cross-country mountain biking and a 10 km trail run at Avathi, Nandi Hill Road. Entries close Thursday 15 October 2026.",
    images: [{ url: POSTER, width: 1925, height: 1104, alt: "BBCh26 Race #09 MTB XC Race & Trail Run — 18 October 2026" }],
  },
  twitter: { card: "summary_large_image", images: [POSTER] },
};

const categories = [
  { name: "Elite", eligibility: "Competitive riders", fee: 999, note: "The sharp end of the field — experienced racers." },
  { name: "Amateur", eligibility: "Open to anyone, any age", fee: 999, note: "The open category for riders racing without the Elite experience barrier." },
  { name: "Women", eligibility: "Open to all women", fee: 999, note: "Girls under 18 may choose to race here instead of U-18." },
  { name: "U-18", eligibility: "16+ to under 18", fee: 999, note: "Photo + date-of-birth ID mandatory. A parent or guardian must accompany the rider." },
  { name: "U-16 Boys / Girls", eligibility: "11+ to under 16", fee: 799, note: "Junior cross-country racing on the same circuit, fewer laps." },
  { name: "U-11 Boys / Girls", eligibility: "6 to under 11", fee: 799, note: "Young riders' category — guardian must be present." },
  { name: "Kids U-06", eligibility: "Under 6 (born 18 Oct 2020 or later)", fee: 199, note: "Non-competitive fun ride. No podium — just the joy of riding." },
  { name: "Trail Run — Open Men / Women", eligibility: "Runners, all abilities", fee: 999, note: "Roughly 10 km: three laps of the ~3.4 km trail loop." },
];

const rules = [
  "Your BIB must be displayed on the handlebars of your bicycle.",
  "Shortcutting the course is not permitted — following the official route is your responsibility.",
  "The race is self-supported: mechanical issues and flat repairs are the rider's own responsibility.",
  "If you withdraw, you must notify the timing station so you're recorded as a DNF.",
  "No spot registration on race day. Entries close Thursday 15 October at midnight.",
  "Registration tickets are non-refundable and non-transferable.",
];

export default function Race09Page() {
  return (
    <>
      <RaceStructuredData
        name="BBCh26 Race #09 — MTB XC Race & Trail Run"
        slug="bbch26-race09"
        startDate="2026-10-18T06:30:00+05:30"
        endDate="2026-10-18T12:00:00+05:30"
        location="Avathi, Nandi Hill Road"
        description="MTB cross-country racing and a 10 km trail run at Avathi, Nandi Hill Road. Elite, Amateur, Women, U-18, U-16, U-11 and kids categories."
        image={POSTER}
        registrationUrl={REGISTER_URL}
        status="scheduled"
      />
      <Breadcrumbs
        items={[
          { name: "Events", path: "/events" },
          { name: "Race #09 — MTB XC & Trail Run", path: "/events/bbch26-race09" },
        ]}
      />

      {/* COVER — full-width official banner, never cropped */}
      <section className="bg-ink">
        <Image
          src={POSTER}
          alt="BBCh26 Race #09 — MTB XC Race and Trail Run 10km. Avathi, 18 Oct 2026. Register at bbch.in"
          width={1925}
          height={1104}
          priority
          unoptimized
          sizes="100vw"
          className="h-auto w-full"
        />
      </section>

      {/* HERO */}
      <section className="gloss-blue relative overflow-hidden text-white">
        <Container className="relative py-10 sm:py-14">
          <Link href="/events" className="text-sm text-white/70 transition-colors hover:text-yellow">
            ← All events
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-yellow">Race #09 · BBCh 2026 season</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              MTB XC Race &amp; Trail Run
            </h1>

            <div className="mt-6 flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-8">
              <span>📅 Sunday, 18 October 2026</span>
              <span>📍 Avathi, Nandi Hill Road, Bangalore</span>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-yellow/40 bg-yellow/10 px-4 py-2 text-sm font-semibold text-yellow">
              <span className="h-2 w-2 shrink-0 rounded-full bg-yellow" />
              Registration open — closes 15 October
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={REGISTER_URL} external variant="yellow">
                Register now →
              </ButtonLink>
              <ButtonLink href="#categories" variant="outlineLight">
                Categories &amp; fees
              </ButtonLink>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/60">
              Early bird: ₹100 off until 30 September. No spot registration on race day.
            </p>
          </div>
        </Container>
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
      </section>

      {/* QUICK FACTS */}
      <section className="border-b border-line bg-paper py-8 sm:py-10">
        <Container className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-6">
          <Fact k="Trail run" v="7:30 AM" sub="Report 6:30 AM · ~10 km" />
          <Fact k="MTB XC" v="8:00 AM" sub="Reporting onwards, category-wise" />
          <Fact k="Lap distance" v="~3.4 km" sub="Cross-country circuit" />
          <Fact k="Venue" v="Avathi" sub="Nandi Hill Road" />
        </Container>
      </section>

      {/* TWO RACES */}
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-ember">Two events, one morning</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Ride it or run it
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="gloss-card rounded-xl border border-line p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-ink">MTB Cross-Country (XCO)</h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
              <li>~3.4 km circuit, lap count varies by category</li>
              <li>Reporting from 8:00 AM, category-wise starts</li>
              <li>Start times published the Friday or Saturday before</li>
            </ul>
          </div>
          <div className="gloss-card rounded-xl border border-line p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-ink">Trail Run</h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
              <li>Roughly 10 km — three laps of the ~3.4 km loop</li>
              <li>Open Men and Open Women</li>
              <li>Report 6:30 AM, flag-off 7:30 AM</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* CATEGORIES & FEES */}
      <section className="scroll-mt-20 bg-cream py-12 sm:py-16 lg:py-20" id="categories">
        <Container>
          <p className="eyebrow text-ember">Race overview</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Categories &amp; fees
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
            Fees exclude payment gateway charges, with ₹100 off every entry until
            30 September.
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

          <div className="mt-8">
            <ButtonLink href={REGISTER_URL} external variant="yellow">
              Register now →
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* VENUE */}
      <Container className="py-12 sm:py-16 lg:py-20">
        <p className="eyebrow text-ember">Getting there</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Venue &amp; course
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="gloss-card rounded-xl border border-line p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-ink">Race venue</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Avathi, Nandi Hill Road, Bangalore. Trail runners report from
              6:30 AM; MTB riders from 8:00 AM. Arrive early to collect your BIB
              and preview the circuit.
            </p>
            <div className="mt-4 border-t border-line pt-4">
              <a href={VENUE_MAP_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ember hover:underline">
                📍 Open venue on Google Maps →
              </a>
            </div>
          </div>
          <div className="gloss-card rounded-xl border border-line p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-ink">On the day</h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
              <li>Emergency ambulance support on site throughout</li>
              <li>Courtesy Sparsh Hospital and Spectrum Physio</li>
              <li>Race-day hotline: +91 98860 46777</li>
            </ul>
            <div className="mt-4 border-t border-line pt-4">
              <a href={FB_EVENT_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ember hover:underline">
                Facebook event →
              </a>
            </div>
          </div>
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
            . Full details are on the{" "}
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-ember hover:underline">
              Explara event page
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
              <p>Race-day hotline: +91 98860 46777 (active on race day only)</p>
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

      {/* CTA */}
      <Container className="scroll-mt-20 py-12 text-center sm:py-16" id="register">
        <h2 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
          Entries close 15 October
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-greige">
          No spot registrations on race day — and ₹100 off every entry until 30 September.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={REGISTER_URL} external variant="yellow">
            Register now →
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
