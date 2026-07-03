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
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  team?: string | null;
  aliases?: string[];
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
