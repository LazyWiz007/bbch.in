import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { AthletesExplorer } from "@/components/athletes-explorer";
import { getAthleteSummaries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Riders — Race History & Standings",
  description:
    "Every rider who has raced a Bangalore Bicycle Championships event. Browse race counts, wins, best finishes and full season-by-season history.",
  alternates: { canonical: "/athletes" },
};

export default function AthletesPage() {
  const summaries = getAthleteSummaries();

  return (
    <>
      <PageHeader
        eyebrow="The riders"
        title="Athletes"
        subtitle="Every rider who has lined up at a BBCh event since 2009 Search by name or team, then open a profile for their full race history."
      />
      <Container className="py-14">
        <AthletesExplorer athletes={summaries} />
      </Container>
    </>
  );
}
