import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

/** Direct-to-checkout link — skips the Explara landing page. */
const REGISTER_URL = "https://www.explara.com/e/bbch26-race07/checkout";
const EXPLARA_URL = "https://www.explara.com/e/bbch26-race07";
const VENUE_MAP_URL = "https://goo.gl/maps/gqvZvtromXVbGxyV9";

/* Official Race #07 banner (1920×1005). Key artwork sits in the corners —
   always render it uncropped, never inside a fixed/square aspect box. */
const POSTER = "/covers/BBCh26Race07_FB.jpg";

export const metadata: Metadata = {
  title: "Race #07 — MTB XC Race · 16 Aug 2026",
  description:
    "Register for BBCh26 Race #07 — MTB XC cross-country race on Sunday 16 August 2026 at Avathi, Nandi Hill Road, Bangalore. Elite, Amateur, Women, U-18, U-16, U-12, U-09 and fun-ride categories. Entries close 13 August.",
  alternates: { canonical: "/events/bbch26-race07" },
  openGraph: {
    title: "BBCh26 Race #07 — MTB XC Race · 16 Aug 2026",
    description:
      "Cross-country mountain bike racing at Avathi, Nandi Hill Road. Entries close Thursday 13 August 2026.",
    images: [
      {
        url: "/covers/BBCh26Race07_FB.jpg",
        width: 1920,
        height: 1005,
        alt: "BBCh26 Race #07 MTB XC Race — Avathi, 16th August 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/covers/BBCh26Race07_FB.jpg"],
  },
};

/** Exactly the ticket types available on Explara checkout. */
const categories = [
  { name: "Elite", eligibility: "Open — competitive riders, 23+", fee: 999, group: "Open" },
  { name: "Amateur", eligibility: "Open to all, irrespective of age", fee: 999, group: "Open" },
  { name: "Women", eligibility: "Open to all women", fee: 999, group: "Open" },
  { name: "U-18 Boys", eligibility: "16+ to under 18 on race day", fee: 999, group: "Junior" },
  { name: "U-18 Girls", eligibility: "16+ to under 18 on race day", fee: 999, group: "Junior" },
  { name: "U-16 Boys", eligibility: "12+ to under 16 on race day", fee: 799, group: "Junior" },
  { name: "U-16 Girls", eligibility: "12+ to under 16 on race day", fee: 799, group: "Junior" },
  { name: "U-12 Boys", eligibility: "9+ to under 12 on race day", fee: 799, group: "Junior" },
  { name: "U-12 Girls", eligibility: "9+ to under 12 on race day", fee: 799, group: "Junior" },
  { name: "U-09 Boys", eligibility: "6+ to under 9 on race day", fee: 799, group: "Junior" },
  { name: "U-09 Girls", eligibility: "6+ to under 9 on race day", fee: 799, group: "Junior" },
  { name: "U-06 Open", eligibility: "Under 6 — boys & girls, fun ride", fee: 199, group: "Fun ride" },
  { name: "Trail Fun Ride", eligibility: "Male & female — non-competitive", fee: 499, group: "Fun ride" },
];

const rules = [
  "Your BIB must be mounted on the front handlebars only — not on your back or helmet.",
  "Shortcutting the course is not permitted. Altering the marked course means disqualification.",
  "The race is self-supported — mechanical repairs on course are the rider's responsibility.",
  "Offensive conduct towards volunteers, marshals or fellow riders means disqualification.",
  "No spot registration on race day. Entries close Thursday 13 August at midnight.",
  "Juniors must carry photo ID showing date of birth; a guardian must accompany U-18 riders.",
];

export default function Race07Page() {
  return (
    <>
      {/* COVER — full-width official race banner, never cropped */}
      <section className="bg-ink">
        <Image
          src={POSTER}
          alt="BBCh26 Race #07 MTB XC Race — Avathi, 16th August 2026. Register at bbch.in"
          width={1920}
          height={1005}
          priority
          unoptimized
          sizes="100vw"
          className="h-auto w-full"
        />
      </section>

      {/* HERO */}
      <section className="gloss-blue relative overflow-hidden text-white">
        <Container className="relative py-12 sm:py-16">
          <Link
            href="/events"
            className="text-sm text-white/70 transition-colors hover:text-yellow"
          >
            ← All events
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-yellow">Race #07 · BBCh 2026 season</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
              MTB XC Race
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
              <span>📅 Sunday, 16 August 2026</span>
              <span>📍 Avathi, Nandi Hill Road, Bangalore</span>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-yellow/40 bg-yellow/10 px-4 py-2 text-sm font-semibold text-yellow">
              <span className="h-2 w-2 rounded-full bg-yellow" />
              Registration open — closes 13 August
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={REGISTER_URL} external variant="yellow">
                Register now →
              </ButtonLink>
              <ButtonLink href="#categories" variant="outlineLight">
                Categories &amp; fees
              </ButtonLink>
            </div>

            <p className="mt-4 text-xs text-white/60">
              Save ₹100 per entry on bulk registrations (1–10 riders) until 1 August.
            </p>
          </div>
        </Container>
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
      </section>

      {/* QUICK FACTS */}
      <section className="border-b border-line bg-paper py-10">
        <Container className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Fact k="Reporting" v="7:00 AM" sub="Onwards, category-wise" />
          <Fact k="Race window" v="6:00 – 10:45 AM" sub="Staggered category starts" />
          <Fact k="Lap distance" v="~4.1 km" sub="Cross-country circuit" />
          <Fact k="Discipline" v="MTB XC" sub="Mountain bike cross-country" />
        </Container>
      </section>

      {/* CATEGORIES & FEES */}
      <Container className="scroll-mt-20 py-16 sm:py-20" id="categories">
        <p className="eyebrow text-ember">Race overview</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Categories &amp; fees
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
          Thirteen categories from Elite down to a U-06 fun ride. Lap counts and
          exact start times per category are published on the Friday or Saturday
          before race day. Fees exclude payment gateway charges.
        </p>

        <div className="gloss-card mt-8 overflow-hidden rounded-xl border border-line">
          <div className="hidden grid-cols-[1.1fr_2fr_0.7fr] gap-3 border-b border-line bg-ember-50 px-5 py-3 font-display text-[0.68rem] font-bold uppercase tracking-wider text-ember-600 sm:grid">
            <span>Category</span>
            <span>Eligibility</span>
            <span className="text-right">Fee</span>
          </div>
          <ul>
            {categories.map((c) => (
              <li key={c.name} className="border-b border-line px-5 py-4 last:border-0">
                <div className="hidden grid-cols-[1.1fr_2fr_0.7fr] items-center gap-3 sm:grid">
                  <span className="font-display font-bold text-ink">{c.name}</span>
                  <span className="text-sm text-greige">{c.eligibility}</span>
                  <span className="text-right font-display text-sm font-bold text-ink">
                    ₹{c.fee}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:hidden">
                  <span className="font-display font-bold text-ink">{c.name}</span>
                  <span className="font-display text-sm font-bold text-ink">₹{c.fee}</span>
                  <span className="w-full text-xs text-greige">{c.eligibility}</span>
                </div>
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

      {/* VENUE */}
      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <p className="eyebrow text-ember">Getting there</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Venue &amp; course
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="gloss-card rounded-xl border border-line p-6">
              <h3 className="font-display text-base font-bold text-ink">Race venue</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Avathi, Nandi Hill Road, Bangalore, Karnataka. Reporting opens at
                7:00 AM — arrive early to collect your BIB and warm up on the
                circuit before your category is flagged off.
              </p>
              <div className="mt-4 border-t border-line pt-4">
                <a
                  href={VENUE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-ember hover:underline"
                >
                  📍 Open venue on Google Maps →
                </a>
              </div>
            </div>

            <div className="gloss-card rounded-xl border border-line p-6">
              <h3 className="font-display text-base font-bold text-ink">The circuit</h3>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
                <li>• Cross-country loop of roughly 4.1 km per lap</li>
                <li>• Lap count varies by category — confirmed before race day</li>
                <li>• Category-wise start times published the Friday/Saturday prior</li>
                <li>• Emergency ambulance support on site throughout the race</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* RULES */}
      <Container className="py-16 sm:py-20">
        <p className="eyebrow text-ember">Before you race</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Key rules
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {rules.map((r) => (
            <li
              key={r}
              className="rounded-xl border border-line bg-surface p-5 text-sm leading-relaxed text-ink/75"
            >
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-greige">
          Full rules and the complete event description are on the{" "}
          <a
            href={EXPLARA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ember hover:underline"
          >
            Explara event page
          </a>
          , alongside our{" "}
          <Link href="/rules-and-regulations" className="font-medium text-ember hover:underline">
            general race regulations
          </Link>
          .
        </p>
      </Container>

      {/* ORGANISER */}
      <section className="gloss-dark py-16 text-white sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow text-yellow">Organiser</p>
            <p className="mt-2 font-display text-xl font-bold">
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

      {/* CTA — #register is the deep-link target from the homepage card */}
      <Container className="scroll-mt-20 py-16 text-center" id="register">
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Entries close 13 August
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-greige">
          No spot registrations on race day — secure your slot before Thursday
          midnight.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
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
      <p className="text-xs font-semibold uppercase tracking-wider text-greige">{k}</p>
      <p className="mt-1 font-display text-2xl font-extrabold text-ink">{v}</p>
      <p className="mt-0.5 text-xs text-greige">{sub}</p>
    </div>
  );
}
