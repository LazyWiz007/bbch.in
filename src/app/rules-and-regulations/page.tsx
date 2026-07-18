import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PDFViewer } from "@/components/pdf-viewer";

export const metadata: Metadata = {
  title: "Rules & Regulations",
  description:
    "The full BBCh rulebook — rider categories, points, penalties and discipline-specific rules — plus the Release and Waiver of Liability every rider agrees to when registering for a Bangalore Bicycle Championships event.",
};

export default function RulesAndRegulationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Before you race"
        title="Rules & Regulations"
        subtitle="The official BBCh rulebook, and the Release and Waiver of Liability that every rider agrees to when registering for a BBCh event."
      />

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Full rulebook download */}
          <div className="gloss-card mb-10 rounded-xl border border-line p-4 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow text-ember">Official rulebook</p>
                <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                  BBCh Rules and Regulations
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-greige">
                  Rider categories, points classification, teams, entry rules,
                  bicycles &amp; uniform, conduct, and the discipline-specific
                  rules for Road Race, Criterium, ITT and TTT — plus the full
                  table of penalties.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full sm:w-auto sm:shrink-0">
                <ButtonLink
                  href="/documents/BBCh-Rules-and-Regulations.pdf"
                  external
                  variant="primary"
                  className="w-full justify-center text-center sm:w-auto"
                >
                  Download PDF
                </ButtonLink>
                <ButtonLink
                  href="/documents/BBCh-Rules-and-Regulations.docx"
                  external
                  variant="outline"
                  className="w-full justify-center text-center sm:w-auto"
                >
                  Download Word (.docx)
                </ButtonLink>
              </div>
            </div>

            {/* Inline Scrollable PDF Viewer */}
            <div className="mt-8 border-t border-line pt-8 -mx-4 sm:mx-0">
              <h3 className="font-display text-lg font-extrabold tracking-tight text-ink mb-4 px-4 sm:px-0">
                Online Rulebook Preview
              </h3>
              <PDFViewer url="/documents/BBCh-Rules-and-Regulations.pdf" />
            </div>
          </div>

          {/* Points & Ranking System */}
          <div className="gloss-card mb-10 rounded-xl border border-line p-6 sm:p-10">
            <p className="eyebrow text-ember">Athlete & Team Standings</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Points &amp; Ranking System
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/80">
              The BBCh ranking system recognizes the most dominant riders and teams based on cumulative points across races. The system applies to both the <strong>Top Athletes</strong> and <strong>Team Championship</strong> standings on our homepage.
            </p>
            <ul className="mt-4 list-disc pl-5 text-sm leading-relaxed text-ink/80 space-y-2">
              <li>Points are awarded to the <strong>top 15 finishers</strong> in every category of every race.</li>
              <li>The points scale is strictly descending: <strong>25 points for a win (1st place)</strong>, 20 for 2nd, 16 for 3rd, 13 for 4th, 11 for 5th, 10 for 6th, and so on, down to 1 point for 15th place.</li>
              <li>For athletes, we calculate both <strong>This season</strong> rankings (points accumulated in the current year) and <strong>All-time</strong> rankings (cumulative points across every season on record from 2015 to present).</li>
              <li>For teams, cumulative team points are calculated across every season on record. Riders with no team on record ("Independent") do not score for any team.</li>
            </ul>
          </div>

          {/* Bib Attachment Guidance */}
          <div className="gloss-card mb-10 rounded-xl border border-line p-6 sm:p-10">
            <p className="eyebrow text-ember">Race Day Rules</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              How to attach your bib
            </h2>
            <p className="mt-4 mb-8 text-sm leading-relaxed text-ink/80">
              Proper bib placement is crucial for our race timing systems and photographers to accurately identify you during the race. Please ensure your bib is securely attached flat across the front of your handlebars using zip ties, fully visible from the front as shown below. <strong>Do not</strong> wrap the bib around tubes or place it sideways.
            </p>
            <div className="relative aspect-square sm:aspect-video w-full overflow-hidden rounded-lg border border-line bg-onyx-50">
              <Image 
                src="/brand/bib-attachment.jpeg" 
                alt="Examples of correctly attached race bibs on handlebars" 
                fill 
                className="object-cover" 
                unoptimized
              />
            </div>
          </div>

          <div className="gloss-card rounded-xl border border-line p-6 sm:p-10">
            <p className="eyebrow text-ember">Legal agreement</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Release and Waiver of Liability
            </h2>
            <p className="mt-1 text-sm text-greige">
              Assumption of Risk, and Indemnity and Parental Consent Agreement (&ldquo;Agreement&rdquo;)
            </p>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
              <p>
                In consideration of being permitted to participate in any way
                in the Bangalore Bicycle Championship — organized by the BBCh
                Team / Bangalore Bikers Club Bicycling Activities
                (&ldquo;Activity&rdquo;) — I, for myself, my personal
                representatives, assigns, heirs, and next of kin, agree to
                the following:
              </p>

              <ClauseBlock n="1">
                Acknowledge, agree, and represent that I understand the
                nature of bicycling activities and that I am qualified, in
                good health, and in proper physical condition to participate
                in such Activity. I further acknowledge that the Activity
                will be conducted over public roads and facilities open to
                the public during the Activity and upon which the hazards of
                travelling are to be expected. I further agree and warrant
                that if at any time I believe the conditions to be unsafe, I
                will immediately discontinue further participation in the
                activity.
              </ClauseBlock>

              <ClauseBlock n="2">
                Fully understand that: (a) bicycling activities involve risks
                and dangers of serious bodily injury, including permanent
                disability, paralysis, and death (&ldquo;Risks&rdquo;); (b)
                these Risks and dangers may be caused by my own actions or
                inactions, the actions or inactions of others participating
                in the Activity, the condition in which the Activity takes
                place, or the negligence of the &ldquo;Releasees&rdquo;
                named below; (c) there may be other risks and social and
                economic losses either not known to me or not readily
                foreseeable at this time — and I fully accept and assume all
                such risks and all responsibility for losses, costs, and
                damages I incur as a result of my participation in the
                Activity.
              </ClauseBlock>

              <ClauseBlock n="3">
                Hereby release, discharge, and covenant not to sue the
                organizing team or part thereof, BBCh Team / Bangalore
                Bikers Club, their respective administrators, directors,
                agents, officers, volunteers, and employees, other
                participants, any sponsors, advertisers, and, if applicable,
                owners and lessors of premises on which the Activity takes
                place (each considered one of the &ldquo;Releasees&rdquo;
                herein), from all liability, claims, demands, losses, or
                damages on my account caused or alleged to be caused in
                whole or in part by the negligence of the
                &ldquo;Releasees&rdquo; or otherwise, including negligent
                rescue operations. I further agree that if, despite this
                release and waiver of liability, assumption of risk, and
                indemnity agreement, I — or anyone on my behalf — makes a
                claim against any of the Releasees, I will indemnify, save,
                and hold harmless each of the Releasees from any litigation
                expenses, attorney fees, loss, liability, damage, or cost
                which any may incur as a result of such claim.
              </ClauseBlock>

              <p>
                I have read this agreement, fully understand its terms,
                understand that I have given up substantial rights by
                signing it, and have signed it freely and without any
                inducement or assurance of any nature — and intend it to be
                a complete and unconditional release of all liability to the
                greatest extent allowed by law. I agree that if any portion
                of this agreement is held to be invalid, the balance shall,
                notwithstanding, continue in full force and effect.
              </p>

              <div className="border-t border-line pt-6">
                <h3 className="font-display text-base font-bold text-ink">
                  Photography &amp; media consent
                </h3>
                <p className="mt-2">
                  I am aware that I may be photographed or videographed
                  during this event and the resulting content is solely
                  owned by Bangalore Bicycle Championships. Any reproduction
                  of these images without prior consent from the owners is
                  illegal, and I grant permission for all images of mine to
                  be used for commercial or promotional purposes and allow
                  the organizers to do so at their discretion. Additionally,
                  all images or videos that the organizers share in public
                  spaces like Facebook shall be used only as-is and without
                  any alterations or modifications.
                </p>
              </div>
            </div>

            <p className="mt-10 border-t border-line pt-6 text-center text-xs text-greige">
              © 2009–{new Date().getFullYear()} Bangalore Bicycle Championships. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

function ClauseBlock({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="font-display text-base font-extrabold text-ember shrink-0">{n}.</span>
      <p>{children}</p>
    </div>
  );
}
