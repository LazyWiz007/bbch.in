export const SITE_URL = "https://bbch.in";
export const SITE_NAME = "Bangalore Bicycle Championships";

/**
 * Is this a genuine rider, or an artifact of the results import?
 *
 * The archive contains parsing junk ("* - Dnf", "BIB was not clearly visible…")
 * and test entries ("ZA Dummy 01"). Those must never be indexed — they were
 * showing up in Google as if they were real pages.
 */
export function isRealRiderName(name: string): boolean {
  const n = (name ?? "").trim();
  if (n.length < 2) return false;
  if (n.startsWith("*")) return false;
  if (/dummy/i.test(n)) return false;
  if (/^(dnf|dns|dsq|na|n\/a)$/i.test(n)) return false;
  // Import notes that were parsed as rider names
  if (/^(bib was|moved to|use of a|no name)/i.test(n)) return false;
  if (!/[a-z]/i.test(n)) return false;
  return true;
}

/**
 * A rider page is worth indexing when it's a real person with enough race
 * history to be a useful search result. Thin, one-off entries stay out of the
 * index — they were being picked up as Google sitelinks ("Jw", "Promise")
 * and crowding out the real sections of the site.
 */
export function shouldIndexRider(name: string, races: number): boolean {
  if (!isRealRiderName(name)) return false;
  // Single-word names ("Jw", "Promise", "Kavin") are the ones Google mistakes
  // for navigation labels, so they need a real race history to earn a spot in
  // the index. Full names only need to have raced more than once.
  const singleWord = name.trim().split(/\s+/).length === 1;
  return races >= (singleWord ? 3 : 2);
}

/** JSON-LD <script> payload helper. */
export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data) };
}
