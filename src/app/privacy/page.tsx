import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Bangalore Bicycle Championships (BBCh) collects, uses and protects your personal information across registration, results and this website.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "8 July 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use and protect your information."
      />

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-greige">Last updated: {LAST_UPDATED}</p>

          <div className="prose-bbch mt-8 space-y-10">
            <Section title="Introduction">
              <p>
                This Privacy Policy explains how the Bangalore Bicycle
                Championships (&ldquo;BBCh&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses and
                safeguards your personal information when you visit{" "}
                <span className="font-medium text-ink">bbch.in</span>, register
                for an event, or otherwise interact with us. By using our
                website you agree to the practices described here.
              </p>
            </Section>

            <Section title="Information we collect">
              <ul>
                <li>
                  <strong>Registration details</strong> — name, email address,
                  phone number, gender, age category, team affiliation and
                  emergency contact, provided when you enter an event.
                </li>
                <li>
                  <strong>Race data</strong> — your results, timings, rankings
                  and category, which we publish as part of the public race
                  archive.
                </li>
                <li>
                  <strong>Media</strong> — photographs and video captured at
                  events, which may feature participants and be published in our
                  gallery and on social media.
                </li>
                <li>
                  <strong>Technical data</strong> — basic analytics such as
                  device type, browser, approximate location and pages visited,
                  collected automatically to help us improve the site.
                </li>
              </ul>
            </Section>

            <Section title="How we use your information">
              <ul>
                <li>To register you for events and manage your participation.</li>
                <li>To publish start lists, results and rider profiles.</li>
                <li>
                  To communicate with you about events, schedules, safety
                  information and important updates.
                </li>
                <li>To operate, maintain and improve this website.</li>
                <li>To comply with legal and regulatory obligations.</li>
              </ul>
            </Section>

            <Section title="Publicly visible information">
              <p>
                BBCh is a competitive sporting event, and results are public by
                nature. Your name, team, category, timings and rankings appear
                on public event and rider pages, and may be indexed by search
                engines. Please contact us if you have concerns about a specific
                result being displayed.
              </p>
            </Section>

            <Section title="Cookies & analytics">
              <p>
                We use a small number of cookies and privacy-conscious analytics
                to understand how the site is used and to keep it working
                reliably. You can control or block cookies through your browser
                settings; some features may not function correctly if cookies
                are disabled.
              </p>
            </Section>

            <Section title="Third-party services">
              <p>
                Our site embeds or links to third-party services that have their
                own privacy policies, including social platforms such as
                Facebook, Instagram and Strava, and, where applicable, payment
                providers used for event registration. We are not responsible
                for the privacy practices of these external services.
              </p>
            </Section>

            <Section title="Data sharing">
              <p>
                We do not sell your personal information. We may share it with
                trusted partners who help us run events (for example, timing and
                registration providers), or when required by law. These partners
                are only permitted to use your data to provide their services to
                us.
              </p>
            </Section>

            <Section title="Data retention">
              <p>
                We retain registration data for as long as needed to run events
                and meet legal obligations. Race results form a permanent public
                archive and are retained indefinitely as a historical record of
                the championship.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You may request access to, correction of, or deletion of your
                personal information, and you may object to certain uses. To
                exercise any of these rights, please get in touch using the
                details below. Note that we may need to retain certain
                information to comply with legal obligations or to maintain the
                integrity of the public results archive.
              </p>
            </Section>

            <Section title="Children's privacy">
              <p>
                Where participants are minors, registration and consent must be
                provided by a parent or legal guardian. We handle the data of
                junior riders with additional care and only as necessary to run
                youth categories.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with a revised &ldquo;last
                updated&rdquo; date.
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                If you have any questions about this Privacy Policy or how your
                data is handled, email us at{" "}
                <a
                  href="mailto:hello@bbch.in"
                  className="font-medium text-ember hover:underline"
                >
                  hello@bbch.in
                </a>{" "}
                or visit our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-ember hover:underline"
                >
                  contact page
                </Link>
                .
              </p>
            </Section>
          </div>
        </div>
      </Container>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink/75 [&_a]:break-words [&_li]:ml-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
