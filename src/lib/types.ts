export type Discipline =
  | "Road Race"
  | "MTB (XC)"
  | "ITT"
  | "TTT"
  | "Criterium"
  | "Downhill"
  | "Cyclocross"
  | "Downhill/XC"
  | "TTT/ITT";

export interface BbchEvent {
  id: string;
  slug: string;
  /** Prettified display name, e.g. "Bangalore Classic Road Race (2024)" */
  name: string;
  /** Original folder name, e.g. "Race #04 - BLR Classic" */
  rawName: string;
  year: number;
  raceNo: number;
  discipline: string;
  series: string | null;
  categories: string[];
  resultCount: number;
  resultsPublished: boolean;
}

export type Gender = "M" | "F";

export interface Athlete {
  /** Same value as `uid` for real riders; placeholders use an "x-" id. */
  id: string;
  /**
   * Permanent rider number (bbchNNNNN). Assigned once and never changed or
   * reused, so the same person stays recognisable across seasons and can be
   * quoted when registering for the next race. Null for placeholder rows.
   */
  uid?: string | null;
  slug: string;
  name: string;
  gender: Gender;
  team?: string | null;
  /** Other spellings of this rider's name that have appeared in results. */
  aliases?: string[];
  /** UIDs merged into this rider; kept so old references still resolve. */
  retiredUids?: string[];
  /** True for start-list padding rows that are not real people. */
  placeholder?: boolean;
  imageUrl?: string;
}

export interface Result {
  eventId: string;
  athleteId: string;
  category: string;
  discipline: string;
  /** null when the rider did not finish / did not start */
  rank: number | null;
  /** "DNF" | "DNS" | "DSQ" | null (null means finished) */
  status: string | null;
  /** finish time in seconds, null when not recorded */
  timeSeconds: number | null;
  rawTime: string;
  bib: number | null;
}
