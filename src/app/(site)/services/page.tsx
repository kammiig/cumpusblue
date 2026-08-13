import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getServices } from "@/lib/data";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { getSettings, labelsOn } from "@/lib/settings";
import { SERVICE_LAYERS } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

/**
 * Minimal service card: the whole card is the link. Title + "Explore service"
 * only, with the action pinned to the bottom so it aligns across a row even
 * when titles wrap to different line counts. `wide` renders a full-width
 * horizontal card for single-service layers.
 */
function ServiceCard({ service, wide = false }: { service: { slug: string; title: string }; wide?: boolean }) {
  const action = (
    <span className="inline-flex shrink-0 items-center gap-2 text-base font-semibold text-brand-300 transition group-hover:gap-2.5 group-hover:text-brand-400">
      Explore service <Icon name="arrow" className="h-4 w-4" />
    </span>
  );
  if (wide) {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="card card-hover group flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-7"
      >
        <h3 className="h-display text-lg text-balance">{service.title}</h3>
        {action}
      </Link>
    );
  }
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card card-hover group flex min-h-[164px] flex-col p-6"
    >
      <h3 className="h-display text-lg leading-snug text-balance">{service.title}</h3>
      <span className="mt-auto pt-6">{action}</span>
    </Link>
  );
}

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
  const showLabels = labelsOn(settings, "labelsServices");

  return (
    <div data-labels={showLabels ? "on" : "off"}>
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
        <div className="wrap relative py-12 sm:py-16">
          <SectionHead as="h1" pill="Services" title={c.introTitle} sub={c.introBody} />
        </div>
      </section>

      <section className="wrap space-y-12 py-12 sm:space-y-16 sm:py-16" aria-label="All services">
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

            {layer.items.length === 1 ? (
              // Single service → intentional full-width horizontal card
              <div className="mt-8">
                <ServiceCard service={layer.items[0]} wide />
              </div>
            ) : (
              <div
                className={`mt-8 grid gap-5 sm:grid-cols-2 ${
                  layer.items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                }`}
              >
                {layer.items.map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            )}
          </div>
        ))}

        {ungrouped.length > 0 && (
          <div>
            <div className="border-b border-white/[0.06] pb-6">
              <h2 className="h-display text-2xl sm:text-3xl">More services</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ungrouped.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        )}
      </section>

      <CtaBand
        title="Not sure which service fits?"
        sub="Tell us the problem — we'll tell you the smallest project that solves it."
      />
    </div>
  );
}
