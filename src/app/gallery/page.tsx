import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gallery",
  description: "BBCh race photography — restricted access.",
  robots: { index: false },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="On the road"
        title="Race gallery"
        subtitle="Behind-the-lens moments from every BBCh event."
      />
      <Container className="py-24">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          {/* Lock icon */}
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-paper border border-line">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9 text-greige"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Gallery is restricted
            </h2>
            <p className="mt-3 leading-relaxed text-greige">
              All BBCh race photography is the exclusive property of Bangalore
              Bicycle Championships. Images may not be reproduced, downloaded,
              or distributed without prior written permission.
            </p>
            <p className="mt-3 text-sm text-greige">
              If you are a rider or media partner looking for photos from a specific
              event, please get in touch with us directly.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="dark">
              Request access
            </ButtonLink>
            <ButtonLink href="/" variant="outline">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
