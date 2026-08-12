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
    title: svc.seoTitle || `${svc.title} | Compublue`,
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

  // Render "What you get" only when enabled for this service AND there is content.
  const showWhatYouGet = svc.showWhatYouGet && svc.bullets.length > 0;
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

      {/* Header — centered breadcrumb + title only */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-12 text-center sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted">
              <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-brand-300">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">{svc.title}</li>
            </ol>
          </nav>
          <h1 className="h-display mx-auto max-w-3xl text-balance text-4xl sm:text-5xl">{svc.title}</h1>
        </div>
      </section>

      {/* Content — description left, image(s) right (natural proportions, not stretched) */}
      <section className="wrap grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_420px] lg:gap-14">
        <div>
          <RichText text={svc.body} />
          {showWhatYouGet && (
            <div className="card mt-8 p-7" aria-labelledby="deliverables-title">
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
          )}
        </div>
        <aside className="lg:sticky lg:top-24">
          <div className="card photo-overlay relative aspect-[4/3] overflow-hidden">
            <Image
              src={svc.image}
              alt={svc.imageAlt}
              fill
              priority
              className="object-cover"
              style={{ objectPosition: svc.imageFocal || "center" }}
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
          {svc.image2 && (
            <div className="card photo-overlay relative mt-6 aspect-[4/3] overflow-hidden">
              <Image
                src={svc.image2}
                alt={svc.image2Alt || svc.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 420px, 100vw"
              />
            </div>
          )}
        </aside>
      </section>

      {/* FAQs */}
      {svc.faqs.length > 0 && (
        <section className="border-t border-white/[0.06] bg-night-900/60 py-12 sm:py-16" aria-labelledby="svc-faq-title">
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
      <section id="enquire" className="wrap py-12 sm:py-16" aria-labelledby="enquire-title">
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
      <section className="border-t border-white/[0.06] py-12 sm:py-16" aria-labelledby="related-title">
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
