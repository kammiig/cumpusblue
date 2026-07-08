import type { Metadata } from "next";
import { SectionHead } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["contact"];
  return pageMetadata("contact", { title: d.seoTitle, description: d.seoDesc, path: "/contact" });
}

export default async function ContactPage() {
  const [c, settings] = await Promise.all([
    getPageContent("contact"),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);
  const email = settings.contactEmail || "contact@compublue.com";
  const phone = settings.contactPhone || "+1 (818) 662-8800";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings, [
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-20 sm:py-24">
          <SectionHead as="h1" pill="Contact" title={c.introTitle} sub={c.introBody} />
        </div>
      </section>

      <section className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-[380px_1fr]">
        <aside aria-label="Contact details" className="space-y-5">
          <div className="card p-7">
            <h2 className="h-display text-lg">Talk to a human</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={`mailto:${email}`} className="group flex items-center gap-3.5 text-muted hover:text-ink">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">Email us</span>
                    {email}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="group flex items-center gap-3.5 text-muted hover:text-ink">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">Call us</span>
                    {phone}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-muted">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                  <Icon name="pin" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">Based in</span>
                  Los Angeles, California — working worldwide
                </span>
              </li>
            </ul>
          </div>
          <div className="card p-7">
            <h2 className="h-display text-lg">What happens next</h2>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <span className="font-display font-bold text-brand-400">1.</span>
                We reply within one business day.
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-brand-400">2.</span>
                A 30-minute call to understand your goals — no sales script.
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-brand-400">3.</span>
                A written recommendation with scope, timeline and price.
              </li>
            </ol>
          </div>
        </aside>

        <div className="card p-7 sm:p-10">
          <h2 className="h-display text-xl">Tell us about your project</h2>
          <div className="mt-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
