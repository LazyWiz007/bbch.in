import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IntroLoader } from "@/components/intro-loader";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://bbch.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Bangalore Bicycle Championships | India's Longest-Running Cycling Event",
    template: "%s · Bangalore Bicycle Championships",
  },
  description:
    "Bangalore Bicycle Championships (BBCh) — India's longest-running competitive cycling event since 2009. Road races, MTB and time trials in Bengaluru, with a full archive of events, results and rider profiles.",
  applicationName: "Bangalore Bicycle Championships",
  keywords: [
    "Bangalore Bicycle Championships",
    "BBCh",
    "cycling India",
    "Bangalore cycling",
    "Bengaluru cycling races",
    "road race Bangalore",
    "MTB India",
    "mountain biking Bengaluru",
    "time trial cycling",
    "cycling events India",
    "cycling results",
    "Nandi Hills time trial",
    "competitive cycling India",
    "bike race Bangalore",
    "cycling club Bengaluru",
  ],
  authors: [{ name: "Bangalore Bicycle Championships", url: SITE_URL }],
  creator: "Bangalore Bicycle Championships",
  publisher: "Bangalore Bicycle Championships",
  category: "Sports",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Bangalore Bicycle Championships",
    title:
      "Bangalore Bicycle Championships | India's Longest-Running Cycling Event",
    description:
      "India's longest-running competitive cycling event since 2009 — road races, MTB and time trials in Bengaluru. Explore events, results and rider profiles.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Bangalore Bicycle Championships | India's Longest-Running Cycling Event",
    description:
      "India's longest-running competitive cycling event since 2009 — road races, MTB and time trials in Bengaluru.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (Grammarly, password
          managers) inject attributes like data-gr-ext-installed onto <body>
          before React hydrates, which would otherwise log a hydration
          mismatch. This only ignores attribute diffs on <body> itself. */}
      <body
        className="min-h-full flex flex-col bg-paper text-ink"
        suppressHydrationWarning
      >
        <IntroLoader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Facebook SDK — required for the Page Plugin feed. Loaded after the
            page is interactive so it can't mutate #fb-root before React
            finishes hydrating (that race caused a hydration-mismatch error). */}
        <Script
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v20.0"
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
