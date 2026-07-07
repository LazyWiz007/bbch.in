import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { AttendeeListTabs } from "@/components/attendee-list-tabs";

export const metadata: Metadata = {
  title: "Attendee List",
  description: "Browse registered participants for the upcoming BBCh race and season ticket buyers.",
};

export default function AttendeeListPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who's racing"
        title="Attendee List"
        subtitle="Check the list of registered participants for upcoming events and season ticket buyers."
      />
      <Container className="py-14">
        <AttendeeListTabs />
      </Container>
    </>
  );
}
