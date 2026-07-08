import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { DashboardMock } from "@/components/DashboardMock";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getServices, getCaseStudies, getPosts } from "@/lib/data";
import { getPageContent, splitStat, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, faqSchema } from "@/lib/seo";
import { HOME_FAQS, TESTIMONIALS } from "@/lib/seed-data";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS[""];
  return pageMetadata("", { title: d.seoTitle, description: d.seoDesc, path: "/" });
}

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    text: "A free consultation plus a short discovery: we map your workflows, data and goals, and identify where technology returns the most.",
  },
  {
    step: "02",
    title: "Design",
    text: "You get a concrete plan — fixed scope, timeline and price — with the business case for each phase spelled out before we build.",
  },
  {
    step: "03",
    title: "Build",
    text: "Weekly increments you can see and test. Production-grade engineering: tested, secured, documented, and integrated with your systems.",
  },
  {
    step: "04",
    title: "Grow",
    text: "We measure the results against the baseline, tune what's live, and expand the roadmap only where the numbers justify it.",
  },
];

export default async function HomePage() {
  const [c, services, caseStudies, posts] = await Promise.all([
    getPageContent(""),
    getServices(),
    getCaseStudies(),
    getPosts(),
  ]);

  const stats = [c.statClients, c.statYears, c.statAutomation, c.statSatisfaction]
    .filter(Boolean)
    .map(splitStat);

  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />

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
            className="h-display mx-auto mt-6 max-w-4xl text-balance text-4xl leading-[1.08] animate-fadeUp sm:text-6xl lg:text-7xl"
          >
            {c.heroTitle?.includes("Intelligent software") ? (
              <>
                Intelligent software that{" "}
                <span className="bg-gradient-to-r from-brand-400 via-cyanish to-accent-400 bg-clip-text text-transparent">
                  moves your business forward
                </span>
              </>
            ) : (
              c.heroTitle
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            {c.heroSub}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              {c.heroCtaPrimary} <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-ghost">
              {c.heroCtaSecondary}
            </Link>
          </div>

          <div className="relative mx-auto mt-14 max-w-4xl sm:mt-16">
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section aria-label="Company statistics" className="border-y border-white/[0.06] bg-night-900/60">
        <div className="wrap grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-ink sm:text-4xl">
                <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                  {s.value}
                </span>
              </p>
              <p className="mt-1.5 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="services-title">
        <SectionHead
          id="services-title"
          pill="What we do"
          title="Services built to compound"
          sub="Pick a single high-ROI project or combine services into a roadmap. Every engagement is scoped around measurable business outcomes."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <article key={s.slug} className="card card-hover group relative p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="h-display mt-5 text-lg">
                <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.excerpt}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition group-hover:gap-2.5">
                Learn more <Icon name="arrow" className="h-4 w-4" />
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-ghost">
            View all {services.length} services
          </Link>
        </div>
      </section>

      {/* ===== Why CompuBlue ===== */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="why-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead
              id="why-title"
              pill="Why CompuBlue"
              title="Decades of engineering. AI-first thinking."
              sub="We were shipping mission-critical software long before the AI wave — which is exactly why our AI projects make it to production."
              center={false}
            />
            <ul className="mt-9 space-y-5">
              {[
                {
                  icon: "gauge",
                  t: "Business case first",
                  d: "Every project starts with your numbers. If we can't find the ROI, we'll tell you not to build it.",
                },
                {
                  icon: "shield",
                  t: "Production-grade, not prototype-grade",
                  d: "Tested, secured, monitored and documented. Systems your business can rely on at 2 a.m.",
                },
                {
                  icon: "workflow",
                  t: "Works with what you own",
                  d: "We integrate with your existing CRM, ERP and legacy systems instead of forcing replacements.",
                },
                {
                  icon: "check",
                  t: "You own everything",
                  d: "Source code, infrastructure and documentation live in your accounts. No lock-in, ever.",
                },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-500/25 bg-brand-500/10 text-brand-300">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{f.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
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
            <div className="card absolute -bottom-6 -left-4 hidden items-center gap-3 px-5 py-4 backdrop-blur-xl sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10">
                <Icon name="check" className="h-5 w-5 text-emerald-300" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">On time, within budget</p>
                <p className="text-xs text-muted">Our reputation was built on it</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="process-title">
        <SectionHead
          id="process-title"
          pill="How we work"
          title="From first call to measurable results"
          sub="A transparent process designed to de-risk your investment at every step."
        />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <li key={p.step} className="card card-hover relative p-7">
              <span className="font-display text-sm font-bold tracking-widest text-brand-400">
                {p.step}
              </span>
              <h3 className="h-display mt-3 text-lg">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== Case studies ===== */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="work-title">
        <div className="wrap">
          <SectionHead
            id="work-title"
            pill="Proof"
            title="Results our clients can measure"
            sub="From municipal IT strategy to AI-powered pipelines — a track record measured in hours saved and revenue won."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((cs) => (
              <article key={cs.slug} className="card card-hover group relative overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 380px, 100vw"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night-950/70 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                    {cs.industry}
                  </p>
                  <h3 className="h-display mt-2 text-lg leading-snug">
                    <Link href={`/case-studies/${cs.slug}`} className="after:absolute after:inset-0">
                      {cs.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cs.summary}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/case-studies" className="btn-ghost">
              View all case studies
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="testimonials-title">
        <SectionHead id="testimonials-title" pill="Client voices" title="Trusted by teams who measure" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.quote} className="card p-7">
              <div aria-hidden="true" className="flex gap-1 text-brand-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-white/[0.07] pt-4 text-sm">
                <span className="font-semibold text-ink">{t.author}</span>
                <span className="block text-muted">{t.org}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== Insights ===== */}
      <section className="border-t border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="insights-title">
        <div className="wrap">
          <SectionHead
            id="insights-title"
            pill="Insights"
            title="Practical thinking on AI & SaaS"
            sub="No hype — field notes from the projects we build."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <article key={p.slug} className="card card-hover group relative overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 380px, 100vw"
                  />
                </div>
                <div className="p-6">
                  <time dateTime={p.publishedAt.toISOString()} className="text-xs text-muted">
                    {p.publishedAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="h-display mt-2 text-lg leading-snug">
                    <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="faq-title">
        <SectionHead id="faq-title" pill="FAQ" title="Questions, answered" />
        <div className="mt-12">
          <FaqAccordion faqs={HOME_FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
