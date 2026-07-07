"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/button";
import { Logo } from "./logo";

const links = [
  { href: "/events", label: "Events" },
  { href: "/results", label: "Results" },
  { href: "/athletes", label: "Athletes" },
  { href: "/attendee-list", label: "Attendees" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            <ButtonLink href="/results" className="mt-2" onClick={() => setOpen(false)}>
              Find results
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
