"use client";

import { useEffect, useRef, useState } from "react";

/**
 * First-visit intro: plays the "live to race" handwriting video once, then the
 * overlay fades out. Shows once per browser session.
 *
 * Rendered identically on server and client (always present initially) to avoid
 * hydration mismatches; visibility is only changed after mount in useEffect.
 */
const SESSION_KEY = "bbch-intro-seen";
const FADE_MS = 700; // overlay fade-out
const MAX_MS = 6000; // safety cap in case the video never fires "ended"

export function IntroLoader() {
  // "idle" (SSR/first paint) → "playing" → "fading" → "done"
  const [phase, setPhase] = useState<"idle" | "playing" | "fading" | "done">(
    "idle"
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect reduced-motion and returning visitors — skip straight to the site.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage unavailable — just play it */
    }

    if (reduce || seen) {
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    setPhase("playing");

    // Some browsers need an explicit play() nudge for muted autoplay.
    videoRef.current?.play?.().catch(() => {
      // autoplay blocked (e.g., iOS Low Power Mode) — skip immediately
      setPhase("fading");
    });

    // Safety net: if "ended" never fires, dismiss anyway.
    const t = setTimeout(() => setPhase("fading"), MAX_MS);
    return () => clearTimeout(t);
  }, []);

  // After the fade starts, unmount once the transition completes.
  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => setPhase("done"), FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      <video
        ref={videoRef}
        className="h-auto w-72 max-w-[80vw] mix-blend-screen"
        src="/brand/loadscreen.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setPhase("fading")}
      />
    </div>
  );
}
