import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { getService, getServices } from "@/lib/data";
import { buildMetadata, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const svc = await getService(params.slug);
  if (!svc) return {};
  return buildMetadata({
    title: svc.seoTitle || `${svc.title} | CompuBlue`,
    description: svc.seoDesc || svc.excerpt,
    path: `/services/${svc.slug}`,
    ogImage: svc.ogImage || svc.image,
    canonical: svc.canonical || undefined,
  });
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [svc, all, settings] = await Promise.all([
    getService(params.slug),
    getServices(),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);
  if (!svc) notFound();

  const related = all.filter((s) => s.slug !== svc.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(settings, svc),
          breadcrumbSchema(settings, [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: svc.title, path: `/services/${svc.slug}` },
          ]),
          ...(svc.faqs.length ? [faqSchema(svc.faqs)] : []),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className="hover:text-brand-300">Services</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">{svc.title}</li>
              </ol>
            </nav>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
              <Icon name={svc.icon} className="h-7 w-7" />
            </span>
            <h1 className="h-display mt-6 text-balance text-4xl sm:text-5xl">{svc.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{svc.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#enquire" className="btn-primary">
                Discuss this service <Icon name="arrow" className="h-4 w-4" />
              </a>
              <Link href="/our-approach" className="btn-ghost">
                Our approach
              </Link>
            </div>
          </div>
          <div className="card overflow-hidden">
            <Image
              src={svc.image}
              alt={svc.imageAlt}
              width={1200}
              height={800}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Body + bullets */}
      <section className="wrap grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_380px]">
        <div>
          <RichText text={svc.body} />
        </div>
        <aside aria-labelledby="deliverables-title">
          <div className="card sticky top-24 p-7">
            <h2 id="deliverables-title" className="h-display text-lg">
              What you get
            </h2>
            <ul className="mt-5 space-y-3.5">
              {svc.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* FAQs */}
      {svc.faqs.length > 0 && (
        <section className="border-t border-white/[0.06] bg-night-900/60 py-16 sm:py-24" aria-labelledby="svc-faq-title">
          <div className="wrap">
            <h2 id="svc-faq-title" className="h-display text-center text-3xl">
              Frequently asked
            </h2>
            <div className="mt-10">
              <FaqAccordion faqs={svc.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Enquiry */}
      <section id="enquire" className="wrap py-16 sm:py-24" aria-labelledby="enquire-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="enquire-title" className="h-display text-center text-3xl">
            Start the conversation
          </h2>
          <p className="mt-3 text-center text-muted">
            Tell us about your organization and objectives, and how we may be able to assist.
          </p>
          <div className="card mt-10 p-7 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-white/[0.06] py-16 sm:py-20" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title" className="h-display text-2xl">
            Related services
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((s) => (
              <article key={s.slug} className="card card-hover group relative p-6">
                <Icon name={s.icon} className="h-6 w-6 text-brand-300" />
                <h3 className="h-display mt-3 text-base">
                  <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{s.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
