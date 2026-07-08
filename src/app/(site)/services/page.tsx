import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getServices } from "@/lib/data";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["services"];
  return pageMetadata("services", {
    title: d.seoTitle,
    description: d.seoDesc,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const [c, services, settings] = await Promise.all([
    getPageContent("services"),
    getServices(),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(settings, [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...services.map((s) => serviceSchema(settings, s)),
        ]}
      />

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-20 sm:py-28">
          <SectionHead as="h1" pill="Services" title={c.introTitle} sub={c.introBody} />
        </div>
      </section>

      <section className="wrap py-16 sm:py-24" aria-label="All services">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.slug} className="card card-hover group relative flex flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="font-display text-xs font-bold tracking-widest text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="h-display mt-5 text-lg">
                <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                  {s.title}
                </Link>
              </h2>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{s.excerpt}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition group-hover:gap-2.5">
                Explore service <Icon name="arrow" className="h-4 w-4" />
              </p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        sub="Tell us the problem — we'll tell you the smallest project that solves it."
      />
    </>
  );
}
