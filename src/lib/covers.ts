/**
 * Maps a race discipline to its AI-generated cover thumbnail (in /public/covers).
 * Combined-day disciplines reuse the base image.
 */
const COVERS: Record<string, string> = {
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
  return COVERS[discipline] ?? null;
}
