import { SITE_URL, SITE_NAME, jsonLd } from "@/lib/seo";

/**
 * Site-wide Organization + WebSite schema.
 *
 * The WebSite node carries a SearchAction, which is what makes Google offer a
 * sitelinks search box and helps it understand the site's real structure
 * instead of guessing from whatever pages it happens to crawl.
 */
export function SiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "BBCh",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/BBCh25_WebsiteLogo.png`,
        description:
          "India's longest-running competitive cycling championship. Road races, MTB and time trials in Bengaluru since 2009.",
        foundingDate: "2009",
        email: "council@bbch.in",
        sport: "Cycling",
        areaServed: { "@type": "City", name: "Bengaluru" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        sameAs: [
          "https://www.facebook.com/BangaloreBicycleChampionships/",
          "https://www.instagram.com/bangalorebicyclechampionships/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: "BBCh",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/results?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}

/** Breadcrumb trail — gives Google an explicit page hierarchy. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}

/** SportsEvent schema for a race — makes races eligible for event rich results. */
export function RaceStructuredData({
  name,
  slug,
  startDate,
  endDate,
  location,
  description,
  image,
  registrationUrl,
  status = "scheduled",
}: {
  name: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  image?: string;
  registrationUrl?: string;
  status?: "scheduled" | "completed";
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name,
    url: `${SITE_URL}/events/${slug}`,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description,
    sport: "Cycling",
    ...(image ? { image: [`${SITE_URL}${image}`] } : {}),
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    organizer: { "@id": `${SITE_URL}/#organization` },
    ...(registrationUrl && status === "scheduled"
      ? {
          offers: {
            "@type": "Offer",
            url: registrationUrl,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            validFrom: startDate,
          },
        }
      : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}
