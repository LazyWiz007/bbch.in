import type { MetadataRoute } from "next";
import { getEvents, getAthleteSummaries } from "@/lib/data";

export const SITE_URL = "https://bbch.in";

/**
 * XML sitemap served at /sitemap.xml (Next generates the XML automatically).
 * Submit this URL in Google Search Console so every event and rider page is
 * crawled and indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/events", priority: 0.9, changeFrequency: "weekly" },
    { path: "/results", priority: 0.8, changeFrequency: "weekly" },
    { path: "/athletes", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/attendee-list", priority: 0.4, changeFrequency: "monthly" },
    { path: "/rules-and-regulations", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const eventEntries: MetadataRoute.Sitemap = getEvents().map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const athleteEntries: MetadataRoute.Sitemap = getAthleteSummaries().map((a) => ({
    url: `${SITE_URL}/athletes/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...eventEntries, ...athleteEntries];
}
