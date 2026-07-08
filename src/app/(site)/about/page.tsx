import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["about"];
  return pageMetadata("about", { title: d.seoTitle, description: d.seoDesc, path: "/about" });
}

const VALUES = [
  {
    icon: "gauge",
    t: "Bottom-line focused",
    d: "Technology is a means, not an end. Every recommendation we make starts with what it returns to your business.",
  },
  {
    icon: "shield",
    t: "Ethical by default",
    d: "Honest advice — including when the right answer is 'don't build it'. Our ethical approach to business has always set us apart.",
  },
  {
    icon: "workflow",
    t: "Comprehensive thinking",
    d: "We happily solve specific problems, but we always keep the big picture in view: strategy, architecture, and long-term maintainability.",
  },
  {
    icon: "check",
    t: "Reliability, proven",
    d: "A reputation built on on-time, on-budget delivery of mission-critical systems — for decades.",
  },
];

const MILESTONES = [
  {
    era: "The foundation",
    title: "Premier technology consulting",
    text: "CompuBlue is founded as a full-service consulting firm: technology business strategy, architecture, software development and support for clients that demanded reliability — from city governments to cultural institutions.",
  },
  {
    era: "The track record",
    title: "Mission-critical delivery",
    text: "Executive IT strategy for the City of Glendale, membership platforms, resource tracking systems, intranet applications — projects with real users and no room for failure.",
  },
  {
    era: "The shift",
    title: "Cloud, data & SaaS",
    text: "As clients moved to the cloud, so did our practice: modern web platforms, API-first integrations, and data pipelines replacing manual reporting.",
  },
  {
    era: "Today",
    title: "AI-first engineering",
    text: "The same discipline, aimed at the biggest lever available to businesses today: AI automation, intelligent assistants and SaaS products that pay for themselves.",
  },
];

export default async function AboutPage() {
  const [c, settings] = await Promise.all([getPageContent("about"), getSettings().catch(() => ({}))]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings as Record<string, string>, [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-20 sm:py-28">
          <SectionHead
            as="h1"
            pill="About CompuBlue"
            title={c.introTitle}
            sub={c.introBody}
          />
        </div>
      </section>

      {/* Mission */}
      <section className="wrap grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2" aria-labelledby="mission-title">
        <div className="card overflow-hidden">
          <Image
            src={IMAGES.aboutTeam.src}
            alt={IMAGES.aboutTeam.alt}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
        <div>
          <SectionHead id="mission-title" pill="Our mission" title={c.missionTitle} center={false} />
          <p className="mt-6 leading-relaxed text-muted">{c.missionBody}</p>
          <blockquote className="card mt-8 border-l-2 border-l-brand-500 p-6">
            <p className="text-sm italic leading-relaxed text-ink">
              “We not only provide urgent solutions to immediate problems — we examine the
              client's needs in depth and build long-term solutions with strong foundations
              that accommodate today's fast-changing business needs.”
            </p>
            <footer className="mt-3 text-xs text-muted">— CompuBlue founding principle</footer>
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="values-title">
        <div className="wrap">
          <SectionHead
            id="values-title"
            pill="What we stand for"
            title="Experience. Proficiency. Reliability."
            sub="The three words on our original letterhead still describe how we work — the technology just got smarter."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.t} className="card card-hover p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                  <Icon name={v.icon} className="h-5 w-5" />
                </span>
                <h3 className="h-display mt-4 text-lg">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="story-title">
        <SectionHead
          id="story-title"
          pill="Our story"
          title="From consulting firm to AI studio"
        />
        <ol className="relative mx-auto mt-14 max-w-3xl space-y-10 border-l border-white/10 pl-8">
          {MILESTONES.map((m) => (
            <li key={m.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-1 h-3 w-3 rounded-full border-2 border-brand-400 bg-night-950"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
                {m.era}
              </p>
              <h3 className="h-display mt-1.5 text-xl">{m.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 text-center">
          <Link href="/case-studies" className="btn-ghost">
            See the work <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CtaBand
        title="Let us be your partners"
        sub="Working hard to earn our customers' trust — now with the most powerful toolbox we've ever had."
      />
    </>
  );
}
