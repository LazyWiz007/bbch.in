import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { ResultsExplorer } from "@/components/results-explorer";
import { getSearchRows, getSeasons, getDisciplines, getTopCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Search BBCh race results by rider name across every season, discipline and category — 2015 to today.",
};

export default function ResultsPage() {
  const rows = getSearchRows();
  const years = getSeasons();
  const disciplines = getDisciplines();
  const categories = getTopCategories();

  return (
    <>
      <PageHeader
        eyebrow="Results archive"
        title="Find your results"
        subtitle="Search by rider name, filter by year, discipline or category, and open any rider's full history. Over a decade of BBCh racing, in one place."
      />
      <Container className="py-14">
        <ResultsExplorer
          rows={rows}
          years={years}
          disciplines={disciplines}
          categories={categories}
        />
      </Container>
    </>
  );
}
