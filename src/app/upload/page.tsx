import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { UploadForm, type RiderOption } from "@/components/upload-form";
import { athletes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Upload your rider photo",
  description:
    "BBCh riders — add your profile photo to your rider page. Pick your name, your team, and upload a headshot.",
  // Utility page — keep it out of Google's index.
  robots: { index: false, follow: false },
};

/** Drop obvious non-rider artifacts from the results import (e.g. "* - Dnf",
 *  "*Use of a TT helmet…", blanks) so they never appear in the picker. */
function isRealRiderName(name: string): boolean {
  const n = name.trim();
  if (n.length < 2) return false;
  if (n.startsWith("*")) return false;
  if (/^(dnf|dns|dsq|na)$/i.test(n)) return false;
  return /[a-z]/i.test(n); // must contain at least one letter
}

export default function UploadPage() {
  const riders: RiderOption[] = athletes
    .filter((a) => isRealRiderName(a.name))
    .map((a) => ({
      value: a.slug,
      label: a.name,
      team: a.team ?? "",
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const teams = [
    ...new Set(
      athletes
        .map((a) => a.team)
        .filter((t): t is string => !!t && t.toUpperCase() !== "NA")
    ),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <PageHeader
        eyebrow="Riders"
        title="Add your profile photo"
        subtitle="Find your name, pick your team, and upload a headshot — it'll appear on your BBCh rider profile once approved."
      />
      <Container className="py-14">
        <div className="mx-auto max-w-xl">
          <UploadForm riders={riders} teams={teams} />
        </div>
      </Container>
    </>
  );
}
