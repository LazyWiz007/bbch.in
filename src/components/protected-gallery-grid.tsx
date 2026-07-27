"use client";

import Image from "next/image";
import { gallery } from "@/lib/gallery";

export function ProtectedGalleryGrid() {
  return (
    <div
      className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
      onContextMenu={(e) => e.preventDefault()}
    >
      {gallery.slice(0, 8).map((photo, i) => (
        <div
          key={photo.src}
          className="group relative aspect-square overflow-hidden bg-onyx-800 select-none"
        >
          <Image
            src={photo.src}
            alt={`BBCh race photo ${i + 1}`}
            fill
            unoptimized
            draggable={false}
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          />
          {/* Watermark overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="rotate-[-30deg] select-none whitespace-nowrap font-display text-xs font-extrabold tracking-widest text-white/25 sm:text-sm"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              © BBCh · bbch.in
            </span>
          </div>
          {/* Bottom stripe */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 stripe-warm opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}
