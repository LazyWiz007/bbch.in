import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ResultsTable } from "@/components/results-table";
import { RankChart } from "@/components/rank-chart";
import {
  athletes,
  getAthleteBySlug,
  getResultsForAthlete,
  getPersonalBest,
} from "@/lib/data";

export function generateStaticParams() {
  return athletes.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const athlete = getAthleteBySlug(slug);
  if (!athlete) return { title: "Rider not found" };
  return {
    title: athlete.name,
    description: `${athlete.name} — BBCh race history, results and progress.`,
  };
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default async function AthleteProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const athlete = getAthleteBySlug(slug);
  if (!athlete) notFound();

  const rows = getResultsForAthlete(athlete.id);
  const best = getPersonalBest(athlete.id);
  const wins = rows.filter((r) => r.rank === 1).length;
  const podiums = rows.filter((r) => r.rank != null && r.rank <= 3).length;
  const chartRows = [...rows].filter((r) => r.rank != null).reverse();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line-dark bg-ink text-paper">
        <Container className="relative py-14 sm:py-16">
          <Link href="/athletes" className="text-sm text-greige-400 transition-colors hover:text-ember">
            ← All athletes
          </Link>
          <div className="mt-6 flex items-center gap-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-onyx-700 font-display text-2xl font-medium text-paper">
              {initials(athlete.name)}
            </span>
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                {athlete.name}
              </h1>
              <p className="mt-1 text-greige-400">
                {athlete.team ?? "Independent"}
                {" · "}
                {athlete.gender === "F" ? "Women" : "Men"}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard value={String(rows.length)} label="Races" />
          <StatCard value={String(wins)} label="Wins" accent={wins > 0} />
          <StatCard value={String(podiums)} label="Podiums" />
          <StatCard value={best ? `P${best.rank}` : "—"} label="Best finish" />
        </div>

        {/* Progress chart */}
        {chartRows.length > 1 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-medium tracking-tight">Form over time</h2>
            <p className="mt-1 text-sm text-greige">
              Finishing position by event — higher on the chart is a better result.
            </p>
            <div className="mt-6 rounded-xl border border-line bg-cream p-5 sm:p-6">
              <RankChart rows={chartRows} />
            </div>
          </div>
        )}

        {/* Race history */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-medium tracking-tight">Race history</h2>
          <div className="mt-6">
            <ResultsTable
              rows={rows}
              showEvent
              emptyLabel="No race history on record yet."
            />
          </div>
        </div>
      </Container>
    </>
  );
}

function StatCard({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-cream p-5">
      <p
        className={`font-display text-3xl font-medium tracking-tight ${
          accent ? "text-ember" : "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-wider text-greige">
        {label}
      </p>
    </div>
  );
}
