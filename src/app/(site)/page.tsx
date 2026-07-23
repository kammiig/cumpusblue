import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { DashboardMock } from "@/components/DashboardMock";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getServices } from "@/lib/data";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { SERVICE_LAYERS } from "@/lib/seed-data";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS[""];
  return pageMetadata("", { title: d.seoTitle, description: d.seoDesc, path: "/" });
}

const ACHIEVEMENTS = [
  "Improve operational readiness and execution capability",
  "Strengthen organizational alignment and accountability",
  "Establish effective governance and decision-making frameworks",
  "Improve visibility into initiatives, programs, projects, and operational performance",
  "Align technology investments with business and operational objectives",
  "Increase organizational scalability and transformation readiness",
  "Improve execution effectiveness across the enterprise",
  "Build sustainable management systems that support long-term success",
];

export default async function HomePage() {
  const [c, services, settings] = await Promise.all([
    getPageContent(""),
    getServices(),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);

  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const layers = SERVICE_LAYERS.map((layer) => ({
    ...layer,
    items: layer.slugs.map((slug) => bySlug.get(slug)).filter(Boolean) as typeof services,
  }));

  const approachParas = (c.approachBody || "").split(/\n\s*\n/).filter(Boolean);
  const whyParas = (c.whyBody || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <JsonLd data={[organizationSchema(settings), websiteSchema(settings)]} />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[140px]"
        />
        <div className="wrap relative pb-16 pt-20 text-center sm:pt-28">
          <p className="pill animate-fadeUp">
            <span className="pill-dot" aria-hidden="true" />
            {c.heroBadge}
          </p>
          <h1
            id="hero-title"
            className="h-display mx-auto mt-6 max-w-4xl text-balance text-4xl leading-[1.08] animate-fadeUp sm:text-5xl lg:text-6xl"
          >
            {c.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            {c.heroSub}
          </p>
          {c.heroTagline && (
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-semibold sm:text-lg">
              <span className="bg-gradient-to-r from-brand-400 via-cyanish to-accent-400 bg-clip-text text-transparent">
                {c.heroTagline}
              </span>
            </p>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/services" className="btn-primary">
              {c.heroCtaPrimary} <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              {c.heroCtaSecondary}
            </Link>
          </div>

          <div className="relative mx-auto mt-14 max-w-4xl sm:mt-16">
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* ===== What We Help Organizations Achieve ===== */}
      <section
        className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28"
        aria-labelledby="achieve-title"
      >
        <div className="wrap">
          <SectionHead id="achieve-title" pill="What we do" title={c.achieveTitle} sub={c.achieveBody} />
          <ul className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a) => (
              <li key={a} className="card flex items-start gap-3.5 p-5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-500/25 bg-brand-500/10 text-brand-300">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-ink">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Our Services ===== */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="services-title">
        <SectionHead id="services-title" pill="Our services" title={c.servicesTitle} sub={c.servicesBody} />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {layers.map((layer) => (
            <article key={layer.name} className="card flex flex-col p-7">
              <h3 className="h-display text-lg">{layer.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{layer.blurb}</p>
              <ul className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5">
                {layer.items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-start gap-2.5 text-sm text-muted transition hover:text-ink"
                    >
                      <Icon name={s.icon} className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                      <span>{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-ghost">
            View Our Services <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ===== Our Approach ===== */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="approach-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div className="card overflow-hidden">
            <Image
              src={IMAGES.heroOffice.src}
              alt={IMAGES.heroOffice.alt}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div>
            <SectionHead id="approach-title" pill="Our approach" title={c.approachTitle} center={false} />
            <div className="mt-6 space-y-4">
              {approachParas.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/our-approach" className="btn-primary">
                Learn More About Our Approach <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why Clients Engage Us ===== */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="why-title">
        <SectionHead id="why-title" pill="Why clients engage us" title={c.whyTitle} />
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center">
          {whyParas.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <p className="leading-relaxed text-muted">
            Our objective is not simply to complete initiatives. We focus on strengthening organizational
            capability, improving execution effectiveness, and helping organizations become better positioned
            for future growth, transformation, and success.
          </p>
        </div>
        <div className="mt-10 text-center">
          <Link href="/about" className="btn-ghost">
            Learn More About Us <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ===== Start the Conversation ===== */}
      <CtaBand title={c.startTitle} sub={c.startBody} cta="Contact us to start the conversation" />
    </>
  );
}
