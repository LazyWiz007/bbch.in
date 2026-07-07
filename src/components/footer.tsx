import Link from "next/link";
import { Container } from "./ui/container";
import { Logo } from "./logo";

const cols = [
  {
    title: "Race",
    links: [
      { href: "/events", label: "Events" },
      { href: "/results", label: "Results" },
      { href: "/athletes", label: "Athletes" },
    ],
  },
  {
    title: "Club",
    links: [
      { href: "/about", label: "About BBCh" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onDark full />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-greige-400">
              The Bangalore Bicycle Championships — road, MTB and time-trial
              racing across the season. Every event, every rider, every result.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-greige-400">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper/80 transition-colors hover:text-ember"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-greige-400">Follow</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/bangalorebicyclechampionships/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-paper/80 transition-colors hover:text-ember"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-paper/80 transition-colors hover:text-ember"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-paper/80 transition-colors hover:text-ember"
                >
                  Strava
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line-dark pt-6 text-xs text-greige-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Bangalore Bicycle Championships. All rights reserved.</p>
          <p>
            Developed &amp; managed by{" "}
            <a
              href="https://webrook.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 transition-colors hover:text-paper"
            >
              webrook.in
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
