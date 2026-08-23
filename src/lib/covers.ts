/**
 * Maps a race discipline to its AI-generated cover thumbnail (in /public/covers).
 * Used as a fallback when no official race poster is available for an event.
 */
const DISCIPLINE_COVERS: Record<string, string> = {
  "MTB (XC)": "/covers/mtb-xc.jpg",
  "Road Race": "/covers/road-race.jpg",
  ITT: "/covers/itt.jpg",
  TTT: "/covers/ttt.jpg",
  Downhill: "/covers/downhill.jpg",
  Cyclocross: "/covers/cyclocross.jpg",
  Criterium: "/covers/criterium.jpg",
  "TTT/ITT": "/covers/itt.jpg",
  "Downhill/XC": "/covers/downhill.jpg",
};

export function disciplineCover(discipline: string): string | null {
  return DISCIPLINE_COVERS[discipline] ?? null;
}

/* -----------------------------------------------------------------------
 * Official race poster map.
 * Keyed by event ID (matches BbchEvent.id from events.json).
 * Values are URL-encoded paths under /public — served statically by Next.js.
 * "Website" variant is preferred; "FB/Banner" used when Website isn't available.
 * ----------------------------------------------------------------------- */

const BASE = "/covers/Race%20Posters";

const RACE_POSTER_MAP: Record<string, string> = {
  // ── 2026 ──────────────────────────────────────────────────────────────
  "2026-race-01-xc":
    `${BASE}/2026/Race%20%2301%20-%20XC/BBCh2026_Race01_XC_Website.jpg`,
  "2026-race-02-namma-itt":
    `${BASE}/2026/Race%20%2302%20-%20ITT/BBCh26Race02_Website.jpg`,
  "2026-race-03-xc":
    `${BASE}/2026/Race%20%2303%20-%20XC/BBCh26Race03-Website.jpg`,
  "2026-race-04-velocity-express":
    `${BASE}/2026/Race%20%2304%20-%20Velocity%20Express/BBCh26Race04_Website.jpg`,
  "2026-race-05-xc":
    `${BASE}/2026/Race%20%2305%20-%20XC/BBCh26Race05_Website.jpg`,
  "2026-race-06-bangalore-classic-road-race":
    `${BASE}/2026/Race%20%2306%20-%20BLR%20Classic%20Road%20Race/BBCh26Race06_Website.jpg`,
  // Race #07 poster exists; entry ready for when results are imported
  "2026-race-07-xc":
    `${BASE}/2026/Race%20%2307%20-%20XC/BBCh26Race07_Website.jpg`,
  // Race #08 Apex ITT — using FB Event poster (no Website variant yet)
  "2026-race-08-apex-itt": "/covers/BBCh26Race08_FBEvent.jpg",

  // ── 2025 ──────────────────────────────────────────────────────────────
  "2025-race-01-xc":
    `${BASE}/2025/Race%20%2301%20-%20XC/BBCh25_Race01_XC_Website.jpg`,
  "2025-race-02-namma-itt":
    `${BASE}/2025/Race%20%2302%20-%20ITT/BBCh25_Race02_Website.jpg`,
  "2025-race-03-xc":
    `${BASE}/2025/Race%20%2303%20-%20XC/BBCh25Race3_XC_Website_2.jpg`,
  // Race #04 Velocity Express — only FB poster available
  "2025-race-04-velocity-express":
    `${BASE}/2025/Race%20%2304%20-%20Velocity%20Express/BBCh25Race04_FB.jpg`,
  "2025-race-05-xc":
    `${BASE}/2025/Race%20%2305%20-%20XC/BBCh25Race05-XC_Website.jpg`,
  "2025-race-06-blr-classic":
    `${BASE}/2025/Race%20%2306%20-%20BLR%20Classic/BBCh25Race06_BlrClassic_Website.jpg`,
  // Race #07 — no Website variant; use FB profile size
  "2025-race-07-xc":
    `${BASE}/2025/Race%20%2307%20-%20XC/BBChRace07-fb-profile.jpg`,
  "2025-race-08-ttt-itt":
    `${BASE}/2025/Race%20%2308%20-%20TTT%20%26%20ITT/BBCh25Race08_Website.jpg`,
  "2025-race-09-xc-trail-run":
    `${BASE}/2025/Race%20%2309%20-%20XC%20-%20Trail%20Run/BBCh25Race09_Website.jpg`,
  "2025-race-10-nandi-epic":
    `${BASE}/2025/Race%20%2310%20-%20Nandi%20Epic/BBCh25_Race10_NandiEpic_Website.jpg`,

  // ── 2024 ──────────────────────────────────────────────────────────────
  // Race #01 XCE poster exists; entry ready for when results are imported
  "2024-race-01-xce":
    `${BASE}/2024/Race%20%2301%20-%20XCE/BBCh24Race01_XC_Website.jpg`,
  "2024-race-02-velocity-express":
    `${BASE}/2024/Race%20%2302%20-%20Velocity%20Express/BBCh24Race02-Website.jpg`,
  // Race #03 XC poster exists; entry ready for import
  "2024-race-03-xc":
    `${BASE}/2024/Race%20%2303%20-%20XC/BBCh24Race03_XCO_Website.jpg`,
  "2024-race-05-xc":
    `${BASE}/2024/Race%20%2305%20-%20XC/BBCh24Race04-XCO_Website.jpg`,
  "2024-race-06-namma-itt":
    `${BASE}/2024/Race%20%2306%20-%20ITT/BBCh24Race06-ITT-Website.png`,
  // Race #07 XCE poster exists; entry ready for import
  "2024-race-07-xce":
    `${BASE}/2024/Race%20%2307%20-%20XCE/BBCh24Race07-Website.jpg`,
  // Race #08 TTT — no Website variant; use FB
  "2024-race-08-ttt-itt":
    `${BASE}/2024/Race%20%2308%20-%20TTT/BBCh24Race08_TTT_Fb.jpg`,
  // Race #09 — no Website variant; use FB
  "2024-race-09-xc-trail-run":
    `${BASE}/2024/Race%20%2309%20-%20XC%20%26%20Trail%20Run/BBCh24Race09_FB.jpg`,
  // Race #10 — no Website variant; use FB
  "2024-race-10-nandi-epic":
    `${BASE}/2024/Race%20%2310%20-%20Nandi%20Epic/BBCh24Race10_NandiEpic_Fb.jpg`,

  // ── 2023 ──────────────────────────────────────────────────────────────
  // Race #01, #02, #03 — plain named file (no Website suffix) is the banner/website version
  "2023-race-01-xc":
    `${BASE}/2023/Race%20%2301%20-%20XC/BBCh23Race01.jpg`,
  "2023-race-02-itt":
    `${BASE}/2023/Race%20%2302%20-%20ITT/BBCh23Race02.jpg`,
  "2023-race-03-xc":
    `${BASE}/2023/Race%20%2303%20-%20XC/BBCh23Race03.jpg`,
  "2023-race-04-hassan-express":
    `${BASE}/2023/Race%20%2304%20-%20Hassan%20Express/BBCh23Race04_Banner.jpg`,
  "2023-race-05-xc-trail-run":
    `${BASE}/2023/Race%20%2305%20-%20XC%20%26%20Trail%20Run/BBCh23Race05_XC-TrailRun_Web.jpg`,
  "2023-race-06-blr-classic":
    `${BASE}/2023/Race%20%2306%20-%20BLR%20Classic/Website.jpg`,
  "2023-race-07-xc":
    `${BASE}/2023/Race%20%2307%20-%20XC/BBCh23Race07_XC_Website.jpg`,
  "2023-race-08-ttt-itt":
    `${BASE}/2023/Race%20%2308%20-%20TTT%20%26%20ITT/BBCh23Race07_TTT_ITT_Website.jpg`,
  "2023-race-09-xc":
    `${BASE}/2023/Race%20%2309%20-%20XC/BBCh23Race09_XC_Website.jpg`,
  "2023-race-10-nandi-epic":
    `${BASE}/2023/Race%20%2310%20-%20Nandi%20Epic/BBCh23Race10_Website.jpg`,

  // ── 2022 ──────────────────────────────────────────────────────────────
  // Flat root-level banner files used for all 2022 events
  "2022-race-01-xc":
    `${BASE}/2022/BBCh22Race01.jpg`,
  "2022-race-02-itt":
    `${BASE}/2022/BBCh22Race02.jpg`,
  "2022-race-03-xc":
    `${BASE}/2022/BBCh22Race03.jpg`,
  "2022-race-04-kolar-express":
    `${BASE}/2022/BBCh22Race04_Banner.jpg`,
  "2022-race-05-dh-xc":
    `${BASE}/2022/BBCh22Race05_Banner.jpg`,
  "2022-race-06-blr-classic":
    `${BASE}/2022/BBCh22Race06Banner.jpg`,
  "2022-race-07-xc":
    `${BASE}/2022/BBCh22Race07Banner.jpg`,
  "2022-race-08-ttt":
    `${BASE}/2022/BBCh22Race08Banner.jpg`,
  "2022-race-09-xc":
    `${BASE}/2022/BBCh22Race09Banner.jpg`,

  // ── 2021 ──────────────────────────────────────────────────────────────
  "2021-jan-itt":
    `${BASE}/2021/BBCh21JanITTBanner.jpg`,
  "2021-jan-xc":
    `${BASE}/2021/BBCh21JanMTBBanner.jpg`,
  "2021-race-01-xc":
    `${BASE}/2021/BBCh21Race01.jpg`,
  "2021-race-02-itt":
    `${BASE}/2021/BBCh21Race02.jpg`,
  "2021-race-03-xc":
    `${BASE}/2021/BBCh21Race03.jpg`,
  "2021-race-06-bangalore-classic":
    `${BASE}/2021/BBCh21Race06Banner.jpg`,

  // ── 2020 ──────────────────────────────────────────────────────────────
  "2020-race-01-xc":
    `${BASE}/2020/BBCh20Race01Banner.jpg`,
  "2020-race-02-itt-oct":
    `${BASE}/2020/BBCh20Race02.jpg`,
  "2020-dec-mtb-race":
    `${BASE}/2020/BBCh20DecMTBBanner.jpg`,
  "2020-dec-nandi-itt":
    `${BASE}/2020/BBCh20NandiITT.jpg`,
  "2020-aug-mtb-itt":
    `${BASE}/2020/BBCh20NandiClimbChallenge.jpg`,

  // ── 2019 ──────────────────────────────────────────────────────────────
  "2019-race-06-classic":
    `${BASE}/2019/BBCh19Race06Banner.jpg`,

  // ── 2018 ──────────────────────────────────────────────────────────────
  "2018-race-01-xc":
    `${BASE}/2018/BBCh18Race01Banner.jpg`,
  "2018-race-02-itt":
    `${BASE}/2018/BBCh18Race02.jpg`,
  "2018-race-03-xc":
    `${BASE}/2018/BBCh18Race03_Banner.jpg`,
  "2018-race-04-crit":
    `${BASE}/2018/BBCh18Race04_Banner.jpg`,
  "2018-race-05-dh":
    `${BASE}/2018/BBCh18Race05_Banner.jpg`,
  "2018-race-06-classic":
    `${BASE}/2018/BBCh18Race06Banner.jpg`,
  "2018-race-07-xc":
    `${BASE}/2018/BBCh18Banner_Race07.jpg`,
  "2018-race-08-ttt":
    `${BASE}/2018/BBCh18Race08Banner.jpg`,
  "2018-race-09-xc":
    `${BASE}/2018/BBCh18Race09Banner.jpg`,
  "2018-race-10-nandi":
    `${BASE}/2018/BBCh18Race10Banner.jpg`,

  // ── 2017 ──────────────────────────────────────────────────────────────
  "2017-race-01-xco":
    `${BASE}/2017/BBCh17Banner_Race01.jpg`,
  "2017-race-02-itt":
    `${BASE}/2017/BBCh17Banner_Race02.jpg`,
  "2017-race-03-xco":
    `${BASE}/2017/BBCh17Race03_Banner.jpg`,
  "2017-race-04-crit":
    `${BASE}/2017/BBCh17Race04_Banner.jpg`,
  "2017-race-05-dh":
    `${BASE}/2017/BBCh17Race05_Banner.jpg`,
  "2017-race-06-classic-road-race":
    `${BASE}/2017/BBCh17Race06Banner.jpg`,
  "2017-race-07-xco":
    `${BASE}/2017/BBCh17Race07Banner.jpg`,
  "2017-race-08-ttt":
    `${BASE}/2017/BBCh17Race08Banner.jpg`,
  "2017-race-09-xco":
    `${BASE}/2017/BBCh17Race09Banner.jpg`,
  "2017-race-10-nandi-epic":
    `${BASE}/2017/BBCh17Race10Banner.jpg`,

  // ── 2016 ──────────────────────────────────────────────────────────────
  // (No 2016 events in results database yet — entries ready for future import)
  "2016-race-01":
    `${BASE}/2016/BBCh16BannerRace01.jpg`,
  "2016-race-02":
    `${BASE}/2016/BBCh16Race02Banner.jpg`,
  "2016-race-03":
    `${BASE}/2016/BBCh16Race03Banner.jpg`,
  "2016-race-04":
    `${BASE}/2016/BBCh16Race04Banner.jpg`,
  "2016-race-05":
    `${BASE}/2016/BBCh16Race05_Banner.jpg`,
  "2016-race-06":
    `${BASE}/2016/BBCh16Race06_Banner.jpg`,
  "2016-race-07":
    `${BASE}/2016/BBCh16Race07Banner.jpg`,
  "2016-race-08":
    `${BASE}/2016/BBCh16Race08Banner.jpg`,
  "2016-race-09":
    `${BASE}/2016/BBCh16Race09Banner.jpg`,
  "2016-race-10":
    `${BASE}/2016/BBCh16Race10Banner.jpg`,

  // ── 2015 ──────────────────────────────────────────────────────────────
  "2015-race-01-itt":
    `${BASE}/2015/BBCh15Race01Banner.jpg`,
  "2015-race-02-ttt":
    `${BASE}/2015/BBCh15TTTBanner.jpg`,
  "2015-race-03-100k":
    `${BASE}/2015/BBCh15Race03Banner_2.jpg`,
  "2015-race-06-nandi-epic":
    `${BASE}/2015/BBCh15Race06Banner.jpg`,
  "2015-race-07-mtb-dirt-race":
    `${BASE}/2015/BBCh15Race07Banner.jpg`,
  "2015-race-08-dh":
    `${BASE}/2015/BBCh15Race08Banner.jpg`,
  "2015-race-09-cx":
    `${BASE}/2015/BBCh15Race09Banner.jpg`,
  "2015-bbch-09-cyclocross-cx":
    `${BASE}/2015/BBCh15Race09Banner.jpg`,

  // ── 2014 ──────────────────────────────────────────────────────────────
  // (No 2014 events in results database yet — entries ready for future import)
  "2014-race-01":
    `${BASE}/2014/BBCh14-01Banner.jpg`,
  "2014-race-02":
    `${BASE}/2014/BBCh14Race02Banner.jpg`,
  "2014-race-03":
    `${BASE}/2014/BBCh14Race03Banner.jpg`,
  "2014-race-04":
    `${BASE}/2014/BBCh14Race04Banner.jpg`,
  "2014-race-05":
    `${BASE}/2014/BBCh14Race05Banner.jpg`,
  "2014-race-06":
    `${BASE}/2014/BBCh14Race06Banner.jpg`,
  "2014-race-07":
    `${BASE}/2014/BBCh14Race07Banner.jpg`,
};

/**
 * Returns the official race poster URL for an event, or null if none exists.
 * The poster path is URL-encoded and served directly from /public by Next.js.
 * Falls back gracefully — callers should use disciplineCover() as a second fallback.
 */
export function racePosterCover(eventId: string): string | null {
  return RACE_POSTER_MAP[eventId] ?? null;
}
