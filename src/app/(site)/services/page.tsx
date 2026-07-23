import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getServices } from "@/lib/data";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { SERVICE_LAYERS } from "@/lib/seed-data";

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

  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const layers = SERVICE_LAYERS.map((layer) => ({
    ...layer,
    items: layer.slugs.map((slug) => bySlug.get(slug)).filter(Boolean) as typeof services,
  }));
  // Any services not assigned to a layer still render in their own group.
  const groupedSlugs = new Set<string>(SERVICE_LAYERS.flatMap((l) => [...l.slugs]));
  const ungrouped = services.filter((s) => !groupedSlugs.has(s.slug));

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

      <section className="wrap space-y-16 py-16 sm:space-y-20 sm:py-24" aria-label="All services">
        {layers.map((layer, li) => (
          <div key={layer.name}>
            <div className="flex flex-col gap-2 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
                  Layer {String(li + 1).padStart(2, "0")}
                </p>
                <h2 className="h-display mt-2 text-2xl sm:text-3xl">{layer.name}</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">{layer.blurb}</p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {layer.items.map((s) => (
                <article key={s.slug} className="card card-hover group relative flex flex-col p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="h-display mt-5 text-lg">
                    <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{s.excerpt}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition group-hover:gap-2.5">
                    Explore service <Icon name="arrow" className="h-4 w-4" />
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}

        {ungrouped.length > 0 && (
          <div>
            <div className="border-b border-white/[0.06] pb-6">
              <h2 className="h-display text-2xl sm:text-3xl">More services</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ungrouped.map((s) => (
                <article key={s.slug} className="card card-hover group relative flex flex-col p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="h-display mt-5 text-lg">
                    <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{s.excerpt}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition group-hover:gap-2.5">
                    Explore service <Icon name="arrow" className="h-4 w-4" />
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <CtaBand
        title="Not sure which service fits?"
        sub="Tell us the problem — we'll tell you the smallest project that solves it."
      />
    </>
  );
}
