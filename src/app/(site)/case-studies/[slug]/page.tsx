import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/Section";
import { getCaseStudy, getCaseStudies } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cs = await getCaseStudy(params.slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.seoTitle || `${cs.title} | CompuBlue Case Study`,
    description: cs.seoDesc || cs.summary,
    path: `/case-studies/${cs.slug}`,
    ogImage: cs.image,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const [cs, all, settings] = await Promise.all([
    getCaseStudy(params.slug),
    getCaseStudies(),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);
  if (!cs) notFound();

  const others = all.filter((c) => c.slug !== cs.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings, [
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: cs.title, path: `/case-studies/${cs.slug}` },
        ])}
      />

      <article>
        <header className="relative overflow-hidden border-b border-white/[0.06]">
          <div aria-hidden="true" className="bg-grid absolute inset-0" />
          <div className="wrap relative py-16 sm:py-24">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/case-studies" className="hover:text-brand-300">Case Studies</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">{cs.client || cs.industry}</li>
              </ol>
            </nav>
            <p className="pill">
              <span className="pill-dot" aria-hidden="true" />
              {cs.industry}
            </p>
            <h1 className="h-display mt-5 max-w-3xl text-balance text-3xl sm:text-5xl">{cs.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{cs.summary}</p>
            {cs.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Project tags">
                {cs.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <div className="wrap grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="card overflow-hidden">
              <Image
                src={cs.image}
                alt={cs.imageAlt}
                width={1400}
                height={900}
                priority
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 720px, 100vw"
              />
            </div>

            <section aria-labelledby="challenge-title" className="mt-12">
              <h2 id="challenge-title" className="h-display text-2xl">The challenge</h2>
              <p className="mt-4 leading-relaxed text-muted">{cs.challenge}</p>
            </section>

            <section aria-labelledby="solution-title" className="mt-12">
              <h2 id="solution-title" className="h-display text-2xl">The solution</h2>
              <p className="mt-4 leading-relaxed text-muted">{cs.solution}</p>
            </section>
          </div>

          <aside aria-labelledby="results-title">
            <div className="card sticky top-24 p-7">
              <h2 id="results-title" className="h-display text-lg">The results</h2>
              <ul className="mt-5 space-y-4">
                {cs.results.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                      <Icon name="check" className="h-3.5 w-3.5 text-emerald-300" />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-ink">{r}</span>
                  </li>
                ))}
              </ul>
              {cs.client && (
                <dl className="mt-6 border-t border-white/[0.07] pt-5 text-sm">
                  <dt className="text-muted">Client</dt>
                  <dd className="mt-1 font-medium text-ink">{cs.client}</dd>
                </dl>
              )}
              <Link href="/contact" className="btn-primary mt-6 w-full">
                Start your project
              </Link>
            </div>
          </aside>
        </div>

        {others.length > 0 && (
          <section className="border-t border-white/[0.06] py-16" aria-labelledby="more-cases-title">
            <div className="wrap">
              <h2 id="more-cases-title" className="h-display text-2xl">More case studies</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {others.map((o) => (
                  <article key={o.slug} className="card card-hover group relative p-7">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">{o.industry}</p>
                    <h3 className="h-display mt-2 text-lg leading-snug">
                      <Link href={`/case-studies/${o.slug}`} className="after:absolute after:inset-0">
                        {o.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted">{o.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CtaBand />
    </>
  );
}
