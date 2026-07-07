import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Race #06 — Bangalore Classic Road Race",
  description:
    "Race #06 of the BBCh 2026 season — Bangalore Classic Road Race. 19 July 2026, KIADB ITIR, Doddaballapura Road. Elite, Amateur, Women, U-18, Masters and Pioneer categories. Register on Konfhub.",
};

const REG_URL = "https://konfhub.com/bbch26-race06";

const categories = [
  { name: "Elite", distance: "161 km", start: "6:30 AM", fee: 999, cutoff: "12:30 PM (360 min)", note: "Open to all men racing irrespective of age — experienced/competitive riders." },
  { name: "Men Master (40+)", distance: "161 km", start: "6:30 AM", fee: 999, cutoff: "12:30 PM", note: "For riders 40 years and older. Mirrors Elite's distance and course." },
  { name: "Women", distance: "81 km", start: "7:30 AM", fee: 999, cutoff: "12:00 PM", note: "Open to all women. Girls under 18 may opt in here instead of U-18." },
  { name: "Amateur", distance: "81 km", start: "8:00 AM", fee: 999, cutoff: "12:00 PM", note: "Open to anyone racing irrespective of age." },
  { name: "U-18", distance: "81 km", start: "8:05 AM", fee: 999, cutoff: "12:00 PM", note: "Riders under 18 as of race day. Photo + birth-date ID mandatory; guardian must accompany." },
  { name: "Pioneer", distance: "~41.4 km", start: "8:15 AM", fee: 699, cutoff: "Non-competitive", note: "First-time racers only. No podium — for the joy of riding the course." },
  { name: "Non-Road Bike", distance: "~41.4 km", start: "8:15 AM", fee: 699, cutoff: "Non-competitive", note: "Hybrid, MTB or foldie only. Fixie / single-speed not permitted." },
];

const generalRules = [
  {
    q: "Where should I put my bib?",
    a: "On the front handlebar of your bicycle. Bibs must be clearly displayed — altering, cutting, or placing unauthorised sponsor logos on your number will result in a fine and/or disqualification.",
  },
  {
    q: "What conduct is expected on course?",
    a: "No offensive or abusive language, no unsportsmanlike conduct, and full respect for volunteers and officials. You and your supporters are responsible for acting sensibly before, during and after the event.",
  },
  {
    q: "Can I shortcut or alter the course?",
    a: "No. You must follow the official route exactly — cutting the course results in disqualification. You may not move markers, tape or obstacles without consulting race officials.",
  },
  {
    q: "What if I need to overtake or pull out?",
    a: "Let faster riders pass safely without obstruction. If you DNF, you must notify the timing station or nearest marshal so all riders are accounted for.",
  },
  {
    q: "Is mechanical support provided on course?",
    a: "No — riders race self-supported: your own toolkit, flat-fixing, and towing if required. Emergency ambulance support is provided by Sparsh Hospital and Spectrum Physio.",
  },
  {
    q: "Who do I contact on race day?",
    a: "The race director's number is active only on race day: +91 98860 46777. The race referee has sole discretion on any on-course situation, and their ruling is final.",
  },
];

export default function Race06Page() {
  return (
    <>
      {/* HERO */}
      <section className="gloss-blue relative overflow-hidden text-white">
        <Container className="relative py-16 sm:py-20">
          <Link href="/events" className="text-sm text-white/70 transition-colors hover:text-yellow">
            ← All events
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-yellow">Race #06 · BBCh 2026 season</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
                Bangalore Classic
                <br />
                Road Race
              </h1>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
                <span>📅 Sunday, 19 July 2026</span>
                <span>📍 KIADB ITIR, Doddaballapura Road, STRR</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#register" variant="yellow">
                  Register now
                </ButtonLink>
                <ButtonLink href="#categories" variant="outlineLight">
                  See categories &amp; fees
                </ButtonLink>
              </div>
              <p className="mt-4 text-xs text-white/60">
                Registration closes Thursday, 16 July 2026 (midnight) · online only, no spot registration.
              </p>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/covers/bbch-classic-2026.png"
                alt="Bangalore Classic Race #06 official poster — 19 July 2026, KIADB ITIR STRR. Distances: 81km (U-18, Women, Amateur, Non-Road Bike, Women Master), 162km (Elite, Men Master), 41km (Pioneer Category)."
                fill
                unoptimized
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
        <div className="stripe-yellow absolute bottom-0 left-0 right-0 h-2" />
      </section>

      {/* QUICK FACTS */}
      <section className="border-b border-line bg-paper py-10">
        <Container className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Fact k="Reporting time" v="5:30 AM" sub="50 min before your category's start" />
          <Fact k="Race start" v="6:30 AM" sub="Category-wise, staggered" />
          <Fact k="Entry fee" v="₹699 – ₹999" sub="Excl. gateway charges" />
          <Fact k="Registration closes" v="16 Jul, midnight" sub="Online only — no spot entry" />
        </Container>
      </section>

      {/* REGISTER — embedded Konfhub widget */}
      <Container className="scroll-mt-20 py-16 sm:py-20" id="register">
        <p className="eyebrow text-ember">Direct booking</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Register
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
          Pick your category and check out securely — right here, powered by
          Konfhub.
        </p>
        <div className="gloss-card mt-8 overflow-hidden rounded-xl border border-line p-1 sm:p-2">
          <iframe
            id="konfhub-widget"
            title="Register for BBCh26 Race #06 | Bangalore Classic Road Race | 19-JUL-2026"
            src="https://konfhub.com/widget/bbch26-race06?desc=true&secondaryBg=F4F6FF&ticketBg=F4F6FF&borderCl=E6E9F5&bg=FFFFFF&fontColor=0D1436&ticketCl=0D1436&btnColor=1D3FCC&fontFamily=Hind&borderRadius=8&widget_type=standard&tickets=104361%2C104362%2C104363%2C104364%2C104365%2C104366%2C104371&ticketId=104361%7C%3B104362%7C%3B104363%7C%3B104364%7C%3B104365%7C%3B104366%7C%3B104371%7C"
            width="100%"
            height="760"
            loading="lazy"
            className="rounded-lg"
          />
        </div>
        <p className="mt-4 text-center text-sm text-greige">
          Widget not loading?{" "}
          <a href={REG_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-ember hover:underline">
            Open registration on Konfhub ↗
          </a>
        </p>
      </Container>

      {/* CATEGORIES & FEES */}
      <Container className="py-16 sm:py-20" id="categories">
        <p className="eyebrow text-ember">Pick your race</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Categories &amp; fees
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
          Three distances, seven categories. Whoever races Elite or Men/Women
          Master must stay in that category for the rest of the season — no
          switching back to Amateur mid-season.
        </p>

        <div className="mt-8 gloss-card overflow-hidden rounded-xl border border-line">
          <div className="hidden grid-cols-[1.4fr_0.9fr_0.9fr_0.7fr_1.1fr] gap-3 border-b border-line bg-ember-50 px-5 py-3 font-display text-[0.68rem] font-bold uppercase tracking-wider text-ember-600 sm:grid">
            <span>Category</span>
            <span>Distance</span>
            <span>Start</span>
            <span className="text-right">Fee</span>
            <span className="text-right">Cut-off</span>
          </div>
          <ul>
            {categories.map((c) => (
              <li key={c.name} className="border-b border-line px-5 py-4 last:border-0">
                <div className="hidden grid-cols-[1.4fr_0.9fr_0.9fr_0.7fr_1.1fr] items-center gap-3 sm:grid">
                  <span className="font-display font-bold text-ink">{c.name}</span>
                  <span className="text-sm text-greige">{c.distance}</span>
                  <span className="font-mono text-sm text-ink">{c.start}</span>
                  <span className="text-right font-display text-sm font-bold text-ink">₹{c.fee}</span>
                  <span className="text-right text-sm text-greige">{c.cutoff}</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:hidden">
                  <span className="font-display font-bold text-ink">{c.name}</span>
                  <span className="font-display text-sm font-bold text-ink">₹{c.fee}</span>
                  <span className="text-xs text-greige">{c.distance} · starts {c.start}</span>
                  <span className="text-xs text-greige">Cut-off: {c.cutoff}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <ButtonLink href={REG_URL} external variant="primary">
            Register on Konfhub
          </ButtonLink>
        </div>
      </Container>

      {/* ROUTE & MAPS */}
      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <p className="eyebrow text-ember">The course</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Route &amp; maps
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-greige">
            Distances are as per car odometer / Google Maps — they may vary
            slightly from your cyclo-computer or Garmin reading.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <RouteCard
              title="161 km — Elite &amp; Men Master"
              points={[
                "Lap distance: 81.6 km — 2 laps required",
                "Final-lap finish is on the main flyover, 0.7 km before the usual start",
              ]}
              links={[
                ["Race start point", "https://maps.app.goo.gl/8DCJFnAhutV3VG6m6"],
                ["Finish line (flyover)", "https://maps.app.goo.gl/AFAmTcF9ZX49AVNX8"],
                ["Hoskote-side U-turn", "https://maps.app.goo.gl/GDQXN4tSiUhZmtQr7"],
                ["Dobbaspet-side U-turn", "https://maps.app.goo.gl/EmKQFMUmQfmuZN41A"],
              ]}
            />
            <RouteCard
              title="81 km — Amateur, Women, U-18, Non-Road"
              points={["Single-lap route sharing the same start/finish as the 161 km race"]}
              links={[
                ["Race start point", "https://maps.app.goo.gl/8DCJFnAhutV3VG6m6"],
                ["Finish line (flyover)", "https://maps.app.goo.gl/AFAmTcF9ZX49AVNX8"],
                ["Hoskote-side U-turn", "https://maps.app.goo.gl/GDQXN4tSiUhZmtQr7"],
                ["Dobbaspet-side U-turn", "https://maps.app.goo.gl/EmKQFMUmQfmuZN41A"],
              ]}
            />
            <RouteCard
              title="41.4 km — Pioneer (non-racing)"
              points={[
                "Lap distance: ~41 km",
                "Finish line is on the main road, opposite the start line",
              ]}
              links={[
                ["Race start point", "https://maps.app.goo.gl/8DCJFnAhutV3VG6m6"],
                ["Finish line (opp. start)", "https://maps.app.goo.gl/PKnTcTGrVFmbipUx7"],
                ["Hoskote-side U-turn", "https://maps.app.goo.gl/GDQXN4tSiUhZmtQr7"],
              ]}
            />
          </div>

          <div className="mt-6">
            <a
              href="https://maps.app.goo.gl/WKcSzKNWogGSq2pp9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ember hover:underline"
            >
              📍 Venue / assembly / parking on Google Maps →
            </a>
          </div>
        </Container>
      </section>

      {/* GENERAL RULES */}
      <Container className="py-16 sm:py-20">
        <p className="eyebrow text-ember">Read before race day</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Race-day rules
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {generalRules.map((r) => (
            <div key={r.q} className="gloss-card p-6">
              <h3 className="font-display text-base font-bold text-ink">{r.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{r.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-greige">
          Full rules and regulations:{" "}
          <a href="https://bbch.in/rules-and-regulations/" target="_blank" rel="noopener noreferrer" className="font-semibold text-ember hover:underline">
            bbch.in/rules-and-regulations
          </a>
        </p>
      </Container>

      {/* ORGANISER & DISCLAIMER */}
      <section className="gloss-dark py-16 text-white sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow text-yellow">Organiser</p>
            <p className="mt-2 font-display text-xl font-bold">Bangalore Bicycle Championships</p>
            <div className="mt-4 space-y-1 text-sm text-white/75">
              <p>
                Email:{" "}
                <a href="mailto:council@bbch.in" className="text-yellow hover:underline">
                  council@bbch.in
                </a>
              </p>
              <p>Race-day emergency contact: +91 98860 46777 (active on race day only)</p>
              <p>
                Ambulance support courtesy Sparsh Hospital and Spectrum Physio.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-yellow">A note from the organisers</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              BBCh is run entirely by volunteers. Around race day there may be
              a few unintentional human errors — we ask riders to bear with
              us, as resolving them can take a little longer than expected
              given how lean the team is. Thank you for your understanding.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-16 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Ready to line up?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-greige">
          Online registration only — no spot entries on race day.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href={REG_URL} external variant="primary">
            Register on Konfhub
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

function RouteCard({
  title,
  points,
  links,
}: {
  title: string;
  points: string[];
  links: [string, string][];
}) {
  return (
    <div className="gloss-card rounded-xl border border-line p-6">
      <h3 className="font-display text-base font-bold text-ink" dangerouslySetInnerHTML={{ __html: title }} />
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
        {points.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>
      <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
        {links.map(([label, url]) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ember hover:underline"
            >
              {label} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
