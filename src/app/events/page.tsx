import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { EventsBrowser } from "@/components/events-browser";
import { PageHeader } from "@/components/page-header";
import { getEvents, getSeasons } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Every BBCh race, season by season — road, MTB, time trials and more.",
};

export default function EventsPage() {
  const events = getEvents();
  const seasons = getSeasons();

  return (
    <>
      <PageHeader
        eyebrow="Race archive"
        title="Events"
        subtitle="Every BBCh race, season by season — road races, MTB, time trials, criteriums and more. Pick a year to see its races."
      />

      <Container className="py-14">
        <EventsBrowser events={events} seasons={seasons} />
      </Container>
    </>
  );
}
