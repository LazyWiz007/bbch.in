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

  // True aspect ratio of BBCh25_WebsiteLogo.png (2000 × 593).
  const ratio = 2000 / 593;
  // Navbar is h-16 (64px), so 40px leaves comfortable breathing room.
  const h = height ?? (full ? 56 : 40);
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
