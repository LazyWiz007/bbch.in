/**
 * Ghost events — races that definitely happened and have an official poster
 * but whose results data has not yet been imported into the database.
 *
 * These are displayed in the events browser as non-clickable cards so the
 * historical record of every BBCh season is visible.
 */

export interface GhostEvent {
  /** Unique stable key (never collides with a real BbchEvent.id). */
  id: string;
  year: number;
  raceNo: number;
  /** Short display title shown on the card. */
  name: string;
  /** URL-encoded path relative to /public. */
  poster: string;
}

const BASE = "/covers/Race%20Posters";

export const ghostEvents: GhostEvent[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────
  {
    id: "ghost-2026-07",
    year: 2026,
    raceNo: 7,
    name: "Race 7 — Cross-Country (XC) · 2026",
    poster: `${BASE}/2026/Race%20%2307%20-%20XC/BBCh26Race07_Website.jpg`,
  },

  // ── 2025 ──────────────────────────────────────────────────────────────
  {
    id: "ghost-2025-03",
    year: 2025,
    raceNo: 3,
    name: "Race 3 — Cross-Country (XC) · 2025",
    poster: `${BASE}/2025/Race%20%2303%20-%20XC/BBCh25Race3_XC_Website_2.jpg`,
  },
  {
    id: "ghost-2025-07",
    year: 2025,
    raceNo: 7,
    name: "Race 7 — Cross-Country (XC) · 2025",
    poster: `${BASE}/2025/Race%20%2307%20-%20XC/BBChRace07-fb-profile.jpg`,
  },

  // ── 2024 ──────────────────────────────────────────────────────────────
  {
    id: "ghost-2024-01",
    year: 2024,
    raceNo: 1,
    name: "Race 1 — Cross-Country XCE · 2024",
    poster: `${BASE}/2024/Race%20%2301%20-%20XCE/BBCh24Race01_XC_Website.jpg`,
  },
  {
    id: "ghost-2024-03",
    year: 2024,
    raceNo: 3,
    name: "Race 3 — Cross-Country (XC) · 2024",
    poster: `${BASE}/2024/Race%20%2303%20-%20XC/BBCh24Race03_XCO_Website.jpg`,
  },
  {
    id: "ghost-2024-07",
    year: 2024,
    raceNo: 7,
    name: "Race 7 — Cross-Country XCE · 2024",
    poster: `${BASE}/2024/Race%20%2307%20-%20XCE/BBCh24Race07-Website.jpg`,
  },
  {
    id: "ghost-2024-08-crit",
    year: 2024,
    raceNo: 8,
    name: "Race 8 — Criterium · 2024",
    poster: `${BASE}/2024/Race%20%2308%20-%20CRIT/BBCh24_Crit_FB.jpg`,
  },

  // ── 2016 ──────────────────────────────────────────────────────────────
  // Full season — no results data in archive yet
  {
    id: "ghost-2016-01",
    year: 2016,
    raceNo: 1,
    name: "Race 1 · 2016",
    poster: `${BASE}/2016/BBCh16BannerRace01.jpg`,
  },
  {
    id: "ghost-2016-02",
    year: 2016,
    raceNo: 2,
    name: "Race 2 · 2016",
    poster: `${BASE}/2016/BBCh16Race02Banner.jpg`,
  },
  {
    id: "ghost-2016-03",
    year: 2016,
    raceNo: 3,
    name: "Race 3 · 2016",
    poster: `${BASE}/2016/BBCh16Race03Banner.jpg`,
  },
  {
    id: "ghost-2016-04",
    year: 2016,
    raceNo: 4,
    name: "Race 4 · 2016",
    poster: `${BASE}/2016/BBCh16Race04Banner.jpg`,
  },
  {
    id: "ghost-2016-05",
    year: 2016,
    raceNo: 5,
    name: "Race 5 · 2016",
    poster: `${BASE}/2016/BBCh16Race05_Banner.jpg`,
  },
  {
    id: "ghost-2016-06",
    year: 2016,
    raceNo: 6,
    name: "Race 6 · 2016",
    poster: `${BASE}/2016/BBCh16Race06_Banner.jpg`,
  },
  {
    id: "ghost-2016-07",
    year: 2016,
    raceNo: 7,
    name: "Race 7 · 2016",
    poster: `${BASE}/2016/BBCh16Race07Banner.jpg`,
  },
  {
    id: "ghost-2016-08",
    year: 2016,
    raceNo: 8,
    name: "Race 8 · 2016",
    poster: `${BASE}/2016/BBCh16Race08Banner.jpg`,
  },
  {
    id: "ghost-2016-09",
    year: 2016,
    raceNo: 9,
    name: "Race 9 · 2016",
    poster: `${BASE}/2016/BBCh16Race09Banner.jpg`,
  },
  {
    id: "ghost-2016-10",
    year: 2016,
    raceNo: 10,
    name: "Race 10 · 2016",
    poster: `${BASE}/2016/BBCh16Race10Banner.jpg`,
  },

  // ── 2014 ──────────────────────────────────────────────────────────────
  // Full season — no results data in archive yet
  {
    id: "ghost-2014-01",
    year: 2014,
    raceNo: 1,
    name: "Race 1 · 2014",
    poster: `${BASE}/2014/BBCh14-01Banner.jpg`,
  },
  {
    id: "ghost-2014-02",
    year: 2014,
    raceNo: 2,
    name: "Race 2 · 2014",
    poster: `${BASE}/2014/BBCh14Race02Banner.jpg`,
  },
  {
    id: "ghost-2014-03",
    year: 2014,
    raceNo: 3,
    name: "Race 3 · 2014",
    poster: `${BASE}/2014/BBCh14Race03Banner.jpg`,
  },
  {
    id: "ghost-2014-04",
    year: 2014,
    raceNo: 4,
    name: "Race 4 · 2014",
    poster: `${BASE}/2014/BBCh14Race04Banner.jpg`,
  },
  {
    id: "ghost-2014-05",
    year: 2014,
    raceNo: 5,
    name: "Race 5 · 2014",
    poster: `${BASE}/2014/BBCh14Race05Banner.jpg`,
  },
  {
    id: "ghost-2014-06",
    year: 2014,
    raceNo: 6,
    name: "Race 6 · 2014",
    poster: `${BASE}/2014/BBCh14Race06Banner.jpg`,
  },
  {
    id: "ghost-2014-07",
    year: 2014,
    raceNo: 7,
    name: "Race 7 · 2014",
    poster: `${BASE}/2014/BBCh14Race07Banner.jpg`,
  },

  // ── 2019 ──────────────────────────────────────────────────────────────
  {
    id: "ghost-2019-02",
    year: 2019,
    raceNo: 2,
    name: "Race 2 · 2019",
    poster: `${BASE}/2019/BBCh19Race02.jpg`,
  },
  {
    id: "ghost-2019-03",
    year: 2019,
    raceNo: 3,
    name: "Race 3 · 2019",
    poster: `${BASE}/2019/BBCh19Race03_Banner.jpg`,
  },
  {
    id: "ghost-2019-04",
    year: 2019,
    raceNo: 4,
    name: "Race 4 · 2019",
    poster: `${BASE}/2019/BBCh19Race04_Banner.jpg`,
  },
  {
    id: "ghost-2019-05",
    year: 2019,
    raceNo: 5,
    name: "Race 5 · 2019",
    poster: `${BASE}/2019/BBCh19Race05_Banner.jpg`,
  },
  {
    id: "ghost-2019-08",
    year: 2019,
    raceNo: 8,
    name: "Race 8 · 2019",
    poster: `${BASE}/2019/BBCh19Race08Banner.jpg`,
  },
  {
    id: "ghost-2019-09",
    year: 2019,
    raceNo: 9,
    name: "Race 9 · 2019",
    poster: `${BASE}/2019/BBCh19Race09Banner.jpg`,
  },
  {
    id: "ghost-2019-10",
    year: 2019,
    raceNo: 10,
    name: "Race 10 · 2019",
    poster: `${BASE}/2019/BBCh19Race10Banner.jpg`,
  },
];

/** Return ghost events for a given year, sorted by race number. */
export function getGhostEventsForYear(year: number): GhostEvent[] {
  return ghostEvents
    .filter((g) => g.year === year)
    .sort((a, b) => a.raceNo - b.raceNo);
}

/** All years that have at least one ghost event. */
export function getGhostYears(): number[] {
  return [...new Set(ghostEvents.map((g) => g.year))];
}
