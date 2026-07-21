/** Tiny className joiner (no dependency). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * seconds -> "1:02:34.56" or "42:07.10"
 *
 * Race times are shown to hundredths — in a bunch sprint or a time trial the
 * fractions are what separate first from third, so we never round them away.
 * Works in whole hundredths internally to avoid floating-point drift
 * (e.g. 3829.1 % 60 = 49.099999999999795).
 */
export function formatTime(totalSeconds: number): string {
  const totalCs = Math.round(totalSeconds * 100); // centiseconds
  const h = Math.floor(totalCs / 360000);
  const m = Math.floor((totalCs % 360000) / 6000);
  const s = Math.floor((totalCs % 6000) / 100);
  const cs = totalCs % 100;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0
    ? `${h}:${pad(m)}:${pad(s)}.${pad(cs)}`
    : `${m}:${pad(s)}.${pad(cs)}`;
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
