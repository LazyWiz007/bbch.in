import type { ResultRow } from "@/lib/data";

/**
 * Finishing-position line chart. Rank 1 sits at the top.
 * `rows` should be chronological (oldest first) and only include ranked finishes.
 */
export function RankChart({ rows }: { rows: ResultRow[] }) {
  const w = 720;
  const h = 220;
  const padX = 36;
  const padY = 28;
  const axisY = h - 22;
  const ranks = rows.map((r) => r.rank ?? 1);
  const maxRank = Math.max(3, ...ranks);

  const x = (i: number) =>
    rows.length === 1 ? w / 2 : padX + (i * (w - padX * 2)) / (rows.length - 1);
  const y = (rank: number) => padY + ((rank - 1) * (axisY - 10 - padY) / (maxRank - 1));

  const linePath = rows
    .map((r, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(r.rank ?? 1)}`)
    .join(" ");

  const gridRanks = [1, Math.ceil(maxRank / 2), maxRank].filter(
    (v, idx, arr) => arr.indexOf(v) === idx
  );

  // One label per contiguous run of the same year, centered on that run,
  // then thin out any labels that would still collide.
  const yearRuns: { year: number; xs: number[] }[] = [];
  rows.forEach((r, i) => {
    const year = r.event.year;
    const last = yearRuns[yearRuns.length - 1];
    if (last && last.year === year) {
      last.xs.push(x(i));
    } else {
      yearRuns.push({ year, xs: [x(i)] });
    }
  });

  const minLabelGap = 30;
  const labels: { year: number; x: number }[] = [];
  for (const run of yearRuns) {
    const xMid = (Math.min(...run.xs) + Math.max(...run.xs)) / 2;
    const prev = labels[labels.length - 1];
    if (!prev || xMid - prev.x >= minLabelGap) {
      labels.push({ year: run.year, x: xMid });
    }
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Finishing position over time">
      {gridRanks.map((rank) => (
        <g key={rank}>
          <line x1={padX} x2={w - padX} y1={y(rank)} y2={y(rank)} stroke="#e6e9f5" strokeWidth="1" />
          <text x={padX - 8} y={y(rank) + 4} textAnchor="end" fill="#6b7280" style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>
            P{rank}
          </text>
        </g>
      ))}

      <path d={linePath} fill="none" stroke="#1d3fcc" strokeWidth="2.5" strokeLinejoin="round" />

      {rows.map((r, i) => (
        <circle
          key={`${r.eventId}-${r.category}`}
          cx={x(i)} cy={y(r.rank ?? 1)} r={r.rank === 1 ? 6 : 4.5}
          fill={r.rank === 1 ? "#f0c000" : "#0d1436"} stroke="#ffffff" strokeWidth="2"
        />
      ))}

      {labels.map((l) => (
        <text
          key={l.year}
          x={Math.min(Math.max(l.x, padX + 14), w - padX - 14)}
          y={h - 6}
          textAnchor="middle"
          fill="#6b7280"
          style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }}
        >
          {l.year}
        </text>
      ))}
    </svg>
  );
}
