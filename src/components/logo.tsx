import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * BBCh.in logo — 2025 rebrand.
 * Uses BBCh25_WebsiteLogo.png for every placement.
 * onDark prop kept for call-site compatibility.
 */
export function Logo({
  onDark: _onDark,
  full = false,
  className,
  height,
}: {
  onDark?: boolean;
  full?: boolean;
  className?: string;
  height?: number;
}) {
  const src = "/brand/BBCh25_WebsiteLogo.png";

  // Approximate aspect ratio — adjust if image dimensions differ
  const ratio = 4;
  const h = height ?? (full ? 56 : 28);
  const w = Math.round(h * ratio);

  return (
    <Image
      src={src}
      alt="BBCh.in — Bangalore Bicycle Championships"
      width={w}
      height={h}
      priority={!full}
      unoptimized
      className={cn("h-auto w-auto", className)}
      style={{ height: h }}
    />
  );
}
