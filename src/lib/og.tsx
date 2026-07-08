import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared 1200×630 social-share (Open Graph / Twitter) card for BBCh.
 * A real race photo with a branded blue overlay + headline — so links shared
 * on WhatsApp, Facebook, X, LinkedIn, etc. show a rich, on-brand preview
 * instead of the bare site icon.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT =
  "Bangalore Bicycle Championships — India's longest-running cycling event";

export async function renderOgImage() {
  const [hero, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/images/hero-home.jpg")),
    readFile(join(process.cwd(), "public/brand/logo-white.png")),
  ]);
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#0d1436",
        }}
      >
        {/* Race photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
          }}
        />
        {/* Blue gradient for legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(13,20,54,0.96) 0%, rgba(13,20,54,0.80) 42%, rgba(13,20,54,0.18) 100%)",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 72px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            height={52}
            style={{ height: 52, width: "auto", objectFit: "contain" }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "#ffd21a",
                fontSize: 25,
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              Bangalore Bicycle Championships
            </div>
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 74,
                fontWeight: 800,
                lineHeight: 1.04,
                marginTop: 20,
                maxWidth: 880,
              }}
            >
              India&apos;s longest-running cycling event.
            </div>
            <div
              style={{
                display: "flex",
                color: "#ffd21a",
                fontSize: 38,
                marginTop: 16,
              }}
            >
              live to race
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.82)",
                fontSize: 25,
              }}
            >
              Road · MTB · Time Trials · Since 2009
            </div>
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              bbch.in
            </div>
          </div>
        </div>
        {/* Jersey-yellow stripe */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            display: "flex",
            background: "linear-gradient(90deg,#ffe15a,#f0c000)",
          }}
        />
      </div>
    ),
    { ...OG_SIZE }
  );
}
