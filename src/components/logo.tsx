import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * BBCh.in logo. Uses the real brand wordmark.
 * - default: compact wordmark ("BBCh.in") for the navbar
 * - full: wordmark + "live to race" tagline for the footer / large placements
 * - onDark: white version for dark backgrounds
 */
export function Logo({
  onDark = false,
  full = false,
  className,
  height,
}: {
  onDark?: boolean;
  full?: boolean;
  className?: string;
  height?: number;
}) {
  const src = full
    ? onDark
      ? "/brand/logo-white.png"
      : "/brand/logo-black.png"
    : onDark
    ? "/brand/logo-white-mark.png"
    : "/brand/logo-black-mark.png";

  const ratio = full ? 2000 / 866 : 1979 / 460;
  const h = height ?? (full ? 54 : 24);
  const w = Math.round(h * ratio);

  return (
    <Image
      src={src}
      alt="BBCh.in — live to race"
      width={w}
      height={h}
      priority={!full}
      unoptimized
      className={cn("h-auto w-auto", className)}
      style={{ height: h }}
    />
  );
}
