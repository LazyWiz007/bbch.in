"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/button";
import { Logo } from "./logo";

const links = [
  { href: "/events", label: "Events" },
  { href: "/results", label: "Results" },
  { href: "/athletes", label: "Athletes" },
  { href: "/attendee-list", label: "Attendees" },
];

const aboutMenu = {
  label: "About",
  href: "/about",
  children: [
    { href: "/about", label: "About BBCh" },
    { href: "/rules-and-regulations", label: "Rules & Regulations" },
  ],
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const aboutActive =
    aboutMenu.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAboutOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="BBCh home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm transition-colors hover:text-ink",
                  active ? "text-ink" : "text-greige"
                )}
              >
                {l.label}
              </Link>
            );
          })}

          {/* About dropdown */}
          <div className="relative" ref={aboutRef}>
            <button
              onClick={() => setAboutOpen((o) => !o)}
              aria-expanded={aboutOpen}
              className={cn(
                "flex items-center gap-1 text-sm transition-colors hover:text-ink",
                aboutActive ? "text-ink" : "text-greige"
              )}
            >
              {aboutMenu.label}
              <svg
                className={cn("h-3.5 w-3.5 transition-transform", aboutOpen && "rotate-180")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {aboutOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-md border border-line bg-surface shadow-lg">
                {aboutMenu.children.map((c) => {
                  const active = pathname === c.href;
                  return (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setAboutOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-sm transition-colors hover:bg-ember-50 hover:text-ember",
                        active ? "text-ember" : "text-ink"
                      )}
                    >
                      {c.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <ButtonLink href="/results" size="sm">
            Find results
          </ButtonLink>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-5 bg-ink transition-all",
                open ? "top-1.5 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-5 bg-ink transition-all",
                open ? "top-1.5 -rotate-45" : "top-3"
              )}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-ink"
              >
                {l.label}
              </Link>
            ))}

            {/* About — expandable */}
            <button
              onClick={() => setMobileAboutOpen((o) => !o)}
              aria-expanded={mobileAboutOpen}
              className="flex items-center justify-between py-3 text-base text-ink"
            >
              {aboutMenu.label}
              <svg
                className={cn("h-4 w-4 transition-transform", mobileAboutOpen && "rotate-180")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {mobileAboutOpen && (
              <div className="flex flex-col border-l border-line pl-4">
                {aboutMenu.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 text-sm text-greige hover:text-ink"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}

            <ButtonLink href="/results" className="mt-2" onClick={() => setOpen(false)}>
              Find results
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
