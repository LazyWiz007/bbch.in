import { athletes, results, getEventById } from "./data";

/**
 * Real team championship — computed entirely from recorded results
 * (2015–2026). No fabricated or placeholder data.
 *
 * Points scale mirrors standard cycling team classifications: descending
 * points awarded to the top 15 finishers in every category of every race.
 * Riders with no team on record ("Independent"/blank) don't score for a team.
 */
const POINTS_BY_RANK = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const athleteTeam = new Map(athletes.map((a) => [a.id, a.team]));

export interface TeamStanding {
  team: string;
  points: number;
  wins: number;
  podiums: number;
  results: number;
  riders: number;
  years: number;
}

export function getTeamStandings(): TeamStanding[] {
  const byTeam = new Map<
    string,
    {
      points: number;
      wins: number;
      podiums: number;
      results: number;
      riders: Set<string>;
      years: Set<number>;
    }
  >();

  for (const r of results) {
    if (r.rank == null) continue;
    const team = athleteTeam.get(r.athleteId);
    if (!team) continue; // no team on record — doesn't count toward team champs

    const pts = r.rank <= POINTS_BY_RANK.length ? POINTS_BY_RANK[r.rank - 1] : 0;
    let entry = byTeam.get(team);
    if (!entry) {
      entry = { points: 0, wins: 0, podiums: 0, results: 0, riders: new Set(), years: new Set() };
      byTeam.set(team, entry);
    }
    entry.points += pts;
    entry.results += 1;
    if (r.rank === 1) entry.wins += 1;
    if (r.rank <= 3) entry.podiums += 1;
    entry.riders.add(r.athleteId);
    const event = getEventById(r.eventId);
    if (event) entry.years.add(event.year);
  }

  return [...byTeam.entries()]
    .map(([team, v]) => ({
      team,
      points: v.points,
      wins: v.wins,
      podiums: v.podiums,
      results: v.results,
      riders: v.riders.size,
      years: v.years.size,
    }))
    .sort((a, b) => b.points - a.points);
}
