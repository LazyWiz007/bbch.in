/** Tiny className joiner (no dependency). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** seconds -> "1:02:34" or "42:07" */
export function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** Time cell for a result row: formatted time, or the DNF/DNS status, or "—". */
export function formatResultTime(
  timeSeconds: number | null,
  status: string | null
): string {
  if (timeSeconds != null) return formatTime(timeSeconds);
  if (status) return status;
  return "—";
}

/** Position cell: rank number or status shorthand. */
export function formatRank(rank: number | null, status: string | null): string {
  if (rank != null) return String(rank);
  return status ?? "—";
}
