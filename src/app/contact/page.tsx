import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the BBCh team.",
};

export default function ContactPage() {
  const inputCls =
    "h-11 w-full rounded-md border border-line bg-cream px-3 text-sm text-ink outline-none transition-colors placeholder:text-greige focus:border-ink";

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Contact"
        subtitle="Questions about an event, results or partnering with BBCh? Reach out — we'd love to hear from you."
      />
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Form (static for now) */}
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-ink">Name</label>
                <input className={inputCls} placeholder="Your name" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-ink">Email</label>
                <input type="email" className={inputCls} placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink">Subject</label>
              <input className={inputCls} placeholder="What's this about?" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink">Message</label>
              <textarea
                rows={5}
                className="w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-greige focus:border-ink"
                placeholder="Tell us more…"
              />
            </div>
            <Button type="button">Send message</Button>
            <p className="text-xs text-greige">
              This form is a placeholder — it will be wired up to send email in a
              later phase.
            </p>
          </form>

          {/* Details */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-cream p-6">
              <h3 className="eyebrow text-greige">Reach us</h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-greige">Email</dt>
                  <dd className="mt-0.5 font-medium text-ink">hello@bbch.in</dd>
                </div>
                <div>
                  <dt className="text-greige">Based in</dt>
                  <dd className="mt-0.5 font-medium text-ink">Bengaluru, Karnataka, India</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-line bg-cream p-6">
              <h3 className="eyebrow text-greige">Follow along</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-medium text-ink hover:text-ember">
                  Instagram →
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-medium text-ink hover:text-ember">
                  Facebook →
                </a>
                <a href="https://strava.com" target="_blank" rel="noopener noreferrer" className="font-medium text-ink hover:text-ember">
                  Strava →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
