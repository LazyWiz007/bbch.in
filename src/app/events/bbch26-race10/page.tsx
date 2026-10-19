import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { RaceStructuredData, Breadcrumbs } from "@/components/structured-data";

const REGISTER_URL = "https://www.explara.com/e/bbch26-race10";

/* Official Nandi Epic artwork. Both crops carry baked-in text in the
   corners, so they are always rendered uncropped: the wide one on desktop,
   the portrait one on phones where a 16:9 letterbox would shrink it to a
   strip. */
const POSTER_WIDE = "/covers/BBCh26Race10_NandiEpic_Wide.jpg";
const POSTER_TALL = "/covers/BBCh26Race10_NandiEpic_Portrait.jpg";

export const metadata: Metadata = {
  title: "Nandi Epic — Race #10 · 102 km & 50 km Road Race · 20 Nov 2026",
  description:
    "Register for the Nandi Epic, BBCh 2026's season finale — Friday 20 November 2026 at Nandi Hills, Bengaluru. 102 km for Elite and Men Masters, 50 km for Women, Amateur, Non-Road and Women Masters, plus Nandi 7.3, the hill climb experience.",
  keywords: [
    "Nandi Epic",
    "Nandi Hills cycling race",
    "102 km road race Bangalore",
    "Nandi 7.3 hill climb",
    "BBCh Race 10",
    "road race Bengaluru 2026",
    "cycling event Nandi Hills",
  ],
  alternates: { canonical: "/events/bbch26-race10" },
  openGraph: {
    type: "website",
    title: "Nandi Epic — BBCh26 Race #10 · 20 Nov 2026",
    description:
      "The season finale at Nandi Hills. 102 km, 50 km, and Nandi 7.3 — the hill climb experience. Registrations open.",
    images: [
      { url: POSTER_WIDE, width: 1963, height: 1126, alt: "Nandi Epic — 20 November 2026, Nandi Hills, Bengaluru" },
    ],
  },
  twitter: { card: "summary_large_image", images: [POSTER_WIDE] },
};

const distances = [
  {
    km: "102 KM",
    who: "Elite · Men Masters",
    blurb:
      "The full Nandi Epic. The longest road race on the BBCh calendar and the one the season is measured by.",
    featured: true,
  },
  {
    km: "50 KM",
    who: "Women · Amateur · Non-Road · Women Masters",
    blurb:
      "The same roads, half the distance — the way into the Epic for riders stepping up to a long race.",
  },
  {
    km: "Nandi 7.3",
    who: "The hill climb experience",
    blurb:
      "The 7.3 km climb to the top of Nandi Hills, raced on its own. One effort, one time, nowhere to hide.",
  },
];

export default function Race10Page() {
  return (
    <>
      <RaceStructuredData
        name="Nandi Epic — BBCh26 Race #10"
        description="Road race at Nandi Hills, Bengaluru. 102 km, 50 km and the Nandi 7.3 hill climb."
        startDate="2026-11-20"
        location="Nandi Hills, Bengaluru"
        slug="bbch26-race10"
        image={POSTER_WIDE}
        status="scheduled"
        registrationUrl={REGISTER_URL}
      />
      <Breadcrumbs
        items={[
          { name: "Events", path: "/events" },
          { name: "Nandi Epic — Race #10", path: "/events/bbch26-race10" },
        ]}
      />

      {/* COVER — official artwork, never cropped */}
      <section className="bg-ink">
        <Image
          src={POSTER_WIDE}
          alt="Nandi Epic — 20 November 2026, Nandi Hills, Bengaluru. 102 km, 50 km and Nandi 7.3 hill climb."
          width={1963}
          height={1126}
          priority
          unoptimized
          sizes="100vw"
          className="hidden h-auto w-full sm:block"
        />
        <Image
          src={POSTER_TALL}
          alt="Nandi Epic — 20 November 2026, Nandi Hills, Bengaluru. 102 km, 50 km and Nandi 7.3 hill climb."
          width={1600}
          height={2000}
          priority
          unoptimized
          sizes="100vw"
          className="h-auto w-full sm:hidden"
        />
      </section>

      {/* HERO */}
      <section className="gloss-blue relative overflow-hidden text-white">
        <Container className="relative py-10 sm:py-14">
          <Link href="/events" className="text-sm text-white/70 transition-colors hover:text-yellow">
            ← All events
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-yellow">Race #10 · Season finale</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Nandi Epic
            </h1>
            <p className="mt-3 font-script text-3xl leading-none text-yellow sm:text-4xl">
              the big one
            </p>

            <div className="mt-6 flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-8">
              <span>📅 Friday, 20 November 2026</span>
              <span>📍 Nandi Hills, Bengaluru</span>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-yellow/40 bg-yellow/10 px-4 py-2 text-sm font-semibold text-yellow">
              <span className="h-2 w-2 shrink-0 rounded-full bg-yellow" />
              Registrations open
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={REGISTER_URL} external variant="yellow">
                Register now →
              </ButtonLink>
              <ButtonLink href="#distances" variant="outlineLight">
                Distances &amp; categories
              </ButtonLink>
            </div>
          </div>
        </Container>
        <div className="stripe-warm absolute bottom-0 left-0 right-0 h-2" />
      </section>

      {/* DISTANCES */}
      <section id="distances" className="scroll-mt-20 bg-paper py-14 sm:py-16">
        <Container>
          <p className="eyebrow text-ember">Three ways to ride it</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
            Distances &amp; categories
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-greige">
            Pick the distance that matches the season you have had. All three
            start and finish at Nandi Hills.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {distances.map((d) => (
              <div
                key={d.km}
                className={`flex flex-col rounded-xl border p-6 ${
                  d.featured
                    ? "border-crimson/30 bg-crimson/5"
                    : "border-line bg-surface"
                }`}
              >
                <p
                  className={`font-display text-3xl font-extrabold tracking-tight ${
                    d.featured ? "text-crimson" : "text-ink"
                  }`}
                >
                  {d.km}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-greige">
                  {d.who}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-greige">
                  {d.blurb}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="register" className="scroll-mt-20 bg-ink py-14 text-white sm:py-16">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            The season ends at Nandi.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Ten races, one finale. Whether it is the full 102, the 50, or the
            7.3 km climb — this is the one to put a number on.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={REGISTER_URL} external variant="yellow">
              Register for the Nandi Epic →
            </ButtonLink>
            <ButtonLink href="/events" variant="outlineLight">
              All races
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
