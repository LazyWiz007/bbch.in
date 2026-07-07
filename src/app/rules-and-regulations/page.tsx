import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Rules & Regulations",
  description:
    "BBCh Release and Waiver of Liability — the assumption of risk, indemnity and media consent agreement every rider agrees to when registering for a Bangalore Bicycle Championships event.",
};

export default function RulesAndRegulationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Before you race"
        title="Rules & Regulations"
        subtitle="The Release and Waiver of Liability that every rider agrees to when registering for a BBCh event."
      />

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
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
