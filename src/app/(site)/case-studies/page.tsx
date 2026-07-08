import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { getCaseStudies } from "@/lib/data";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["case-studies"];
  return pageMetadata("case-studies", {
    title: d.seoTitle,
    description: d.seoDesc,
    path: "/case-studies",
  });
}

export default async function CaseStudiesPage() {
  const [c, studies, settings] = await Promise.all([
    getPageContent("case-studies"),
    getCaseStudies(),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings, [
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-20 sm:py-28">
          <SectionHead as="h1" pill="Case Studies" title={c.introTitle} sub={c.introBody} />
        </div>
      </section>

      <section className="wrap py-16 sm:py-24" aria-label="Case studies">
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((cs) => (
            <article key={cs.slug} className="card card-hover group relative overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={cs.image}
                  alt={cs.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 560px, 100vw"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night-950/80 to-transparent" />
                <p className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-wider text-brand-300">
                  {cs.industry}
                </p>
              </div>
              <div className="p-7">
                <h2 className="h-display text-xl leading-snug">
                  <Link href={`/case-studies/${cs.slug}`} className="after:absolute after:inset-0">
                    {cs.title}
                  </Link>
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{cs.summary}</p>
                {cs.results[0] && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                    {cs.results[0]}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want results like these?"
        sub="Every one of these projects started with a conversation about a bottleneck."
      />
    </>
  );
}
