import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { gallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from BBCh races across the seasons.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="On the road"
        title="Gallery"
        subtitle="Moments from the start line, the climbs and the finish — race photography from across the BBCh seasons."
      />
      <Container className="py-14">
        <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-3">
          {gallery.map((photo, i) => (
            <div
              key={photo.src}
              className="group relative mb-4 overflow-hidden rounded-lg border border-line break-inside-avoid bg-ink"
            >
              <Image
                src={photo.src}
                alt={`BBCh race photo ${i + 1}`}
                width={photo.w}
                height={photo.h}
                unoptimized
                sizes="(max-width: 640px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 stripe-yellow opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
