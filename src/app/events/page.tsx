import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { EventsBrowser } from "@/components/events-browser";
import { PageHeader } from "@/components/page-header";
import { TypeBadge } from "@/components/ui/badge";
import { getEvents, getSeasons } from "@/lib/data";
import { getUpcomingEvents, dateParts, formatDate } from "@/lib/upcoming";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Every BBCh race, season by season — road, MTB, time trials and more. Plus upcoming races open for registration.",
};

export default function EventsPage() {
  const events = getEvents();
  const seasons = getSeasons();
  const upcoming = getUpcomingEvents();

  return (
    <>
      <PageHeader
        eyebrow="Race archive"
        title="Events"
        subtitle="Every BBCh race, season by season — road races, MTB, time trials, criteriums and more. Pick a year to see its races."
      />

      {/* UPCOMING — registration open */}
      {upcoming.length > 0 && (
        <section className="border-b border-line bg-cream py-14">
          <Container>
            <p className="eyebrow text-ember">Next up</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
              Upcoming races
            </h2>
            <p className="mt-3 max-w-xl text-sm text-greige">
              Entries are open — secure your slot before registration closes.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => {
                const d = dateParts(e.date);
                const href = e.detailsUrl || e.registrationUrl || "/events";
                return (
                  <div
                    key={e.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-16px_rgba(36,26,99,0.25)]"
                  >
                    <Link href={href} className="relative block aspect-[16/9] overflow-hidden bg-ink">
                      <Image
                        src={e.cover}
                        alt={e.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                      <div className="absolute left-4 top-4 flex flex-col items-center rounded-lg bg-ember px-3 py-2 text-white">
                        <span className="font-display text-2xl font-extrabold leading-none">
                          {d.day}
                        </span>
                        <span className="font-mono text-[0.6rem] tracking-widest">{d.month}</span>
                      </div>
                      <div className="absolute right-4 top-4">
                        <TypeBadge type={e.discipline} className="bg-paper/90 backdrop-blur" />
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col p-5">
                      <Link href={href}>
                        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-ember">
                          {e.name}
                        </h3>
                      </Link>
                      <p className="mt-1.5 text-sm text-greige">
                        {formatDate(e.date)} · {e.location}
                      </p>
                      <div className="mt-5 flex flex-1 items-end gap-3">
                        {e.detailsUrl && (
                          <ButtonLink href={e.detailsUrl} variant="outline" size="sm">
                            View details
                          </ButtonLink>
                        )}
                        {e.registrationUrl && (
                          <ButtonLink
                            href={e.detailsUrl ? `${e.detailsUrl}#register` : e.registrationUrl}
                            external={!e.detailsUrl}
                            variant="yellow"
                            size="sm"
                          >
                            Register →
                          </ButtonLink>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <Container className="py-14">
        <EventsBrowser events={events} seasons={seasons} />
      </Container>
    </>
  );
}
