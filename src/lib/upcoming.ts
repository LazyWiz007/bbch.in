import { disciplineCover } from "./covers";

export interface UpcomingEvent {
  id: string;
  name: string;
  /** ISO date */
  date: string;
  location: string;
  discipline: string;
  registrationUrl?: string;
  cover: string;
  /** Internal details page, if one exists on this site. */
  detailsUrl?: string;
}

/*
  Manually-curated upcoming events. In Phase 2 this comes from the admin panel /
  database instead. Keep only events that have actually been announced.
*/
const UPCOMING: UpcomingEvent[] = [
  // Races #06-#08 have concluded; their pages now show results.
  {
    id: "bbch26-race09",
    name: "Race #09 — MTB XC Race & Trail Run",
    date: "2026-10-18",
    location: "Avathi, Nandi Hill Road, Bengaluru",
    discipline: "MTB (XC)",
    registrationUrl: "https://www.explara.com/e/bbch26-race09",
    cover: "/covers/BBCh26Race09_FB.jpg",
    detailsUrl: "/events/bbch26-race09",
  },
];

export function getUpcomingEvents(now = new Date()): UpcomingEvent[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return UPCOMING.filter((e) => new Date(e.date + "T00:00:00") >= today).sort(
    (a, b) => (a.date < b.date ? -1 : 1)
  );
}

/** "2026-07-19" -> "19 Jul 2026" */
export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** "2026-07-19" -> { day: "19", month: "JUL" } */
export function dateParts(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
  };
}
