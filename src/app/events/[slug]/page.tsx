import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { TypeBadge } from "@/components/ui/badge";
import { EventResults } from "@/components/event-results";
import { events, getEventBySlug, getResultsForEvent } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.name,
    description: `${event.name} — ${event.discipline} results. ${event.resultCount} riders across ${event.categories.length} categories.`,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const results = getResultsForEvent(event.id);
  const categories = event.categories;
  // Only offer categories that actually have rows.
  const categoriesWithResults = categories.filter((c) =>
    results.some((r) => r.category === c)
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line-dark bg-ink text-paper">
        <div className="absolute inset-0 opacity-[0.08]">
          <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
            <g stroke="#f4f1ea" strokeWidth="1" fill="none">
              {Array.from({ length: 40 }).map((_, i) => (
                <line key={i} x1={-100 + i * 50} y1="0" x2={100 + i * 50} y2="400" />
              ))}
            </g>
          </svg>
        </div>
        <Container className="relative py-14 sm:py-20">
          <Link href="/events" className="text-sm text-greige-400 transition-colors hover:text-ember">
            ← All events
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <TypeBadge type={event.discipline} className="bg-onyx-700 text-paper/80" />
            {event.series && <span className="eyebrow text-ember">{event.series} series</span>}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight sm:text-5xl">
            {event.name}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-greige-400">
            <span>{event.year} season</span>
            <span>{event.discipline}</span>
            <span>{event.resultCount} riders</span>
            <span>{categories.length} categories</span>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <h2 className="font-display text-2xl font-medium tracking-tight">Results</h2>
        <EventResults categories={categoriesWithResults} results={results} />
      </Container>
    </>
  );
}
