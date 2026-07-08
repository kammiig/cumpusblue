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
  const d = PAGE_DEFAULTS["ai-solutions"];
  return pageMetadata("ai-solutions", {
    title: d.seoTitle,
    description: d.seoDesc,
    path: "/ai-solutions",
  });
}

const SOLUTIONS = [
  {
    icon: "workflow",
    t: "Workflow automation",
    d: "Documents processed, inboxes triaged, data moved between systems — automatically, with human review only where judgment matters.",
    href: "/services/ai-automation-solutions",
  },
  {
    icon: "chat",
    t: "Chatbots & assistants",
    d: "Customer-facing and internal assistants grounded in your real content, with guardrails, citations and graceful human handoff.",
    href: "/services/ai-chatbots-virtual-assistants",
  },
  {
    icon: "magnet",
    t: "AI lead generation",
    d: "Prospect research, enrichment, scoring and personalized outreach — a pipeline machine your sales team will actually thank you for.",
    href: "/services/ai-powered-lead-generation",
  },
  {
    icon: "gauge",
    t: "Predictive analytics",
    d: "Forecasting, anomaly detection and AI-written summaries that explain what changed and why — before month-end does.",
    href: "/services/data-analytics-reporting",
  },
  {
    icon: "database",
    t: "AI inside your CRM/ERP",
    d: "Drafted follow-ups, summarized account histories, churn-risk flags — intelligence embedded in the tools you already use.",
    href: "/services/crm-erp-automation",
  },
  {
    icon: "megaphone",
    t: "Marketing intelligence",
    d: "Behavior-triggered journeys, correct pixel tracking and spend-to-pipeline attribution that shows which channels create customers.",
    href: "/services/digital-marketing-automation",
  },
];

const PRINCIPLES = [
  {
    t: "ROI before novelty",
    d: "We rank AI opportunities by payback period and start where the returns are provable — usually within a quarter.",
  },
  {
    t: "Guardrails as standard",
    d: "Grounded answers, constrained scope, red-team testing and human review queues. AI that represents your brand behaves like it.",
  },
  {
    t: "Your data stays yours",
    d: "Solutions run in your accounts with least-privilege access. We design for privacy and auditability from the first diagram.",
  },
  {
    t: "Humans in the loop",
    d: "The goal is leverage, not replacement: AI handles volume, people handle judgment — and the system knows the difference.",
  },
];

export default async function AiSolutionsPage() {
  const [c, settings] = await Promise.all([
    getPageContent("ai-solutions"),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings, [
          { name: "Home", path: "/" },
          { name: "AI Solutions", path: "/ai-solutions" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-0 h-[420px] w-[600px] rounded-full bg-brand-500/15 blur-[130px]"
        />
        <div className="wrap relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <SectionHead as="h1" pill="AI Solutions" title={c.heroTitle} sub={c.heroSub} center={false} />
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Map my AI opportunities <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/case-studies" className="btn-ghost">
                See AI results
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {[
                ["70%", "avg. workflow time saved"],
                ["<30s", "lead response time"],
                ["24/7", "always-on operation"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="font-display text-2xl font-bold text-ink sm:text-3xl">
                      <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">{v}</span>
                    </span>
                    <span className="mt-1 block text-xs text-muted">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card overflow-hidden">
            <Image
              src={IMAGES.aiRobot.src}
              alt={IMAGES.aiRobot.alt}
              width={1200}
              height={800}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="wrap py-20 sm:py-28" aria-labelledby="ai-solutions-title">
        <SectionHead
          id="ai-solutions-title"
          pill="Solution areas"
          title="Where AI earns its keep"
          sub="Six proven applications, each tied to a number your CFO cares about."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <article key={s.t} className="card card-hover group relative p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="h-display mt-4 text-lg">
                <Link href={s.href} className="after:absolute after:inset-0">
                  {s.t}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition group-hover:gap-2.5">
                Learn more <Icon name="arrow" className="h-4 w-4" />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="ai-principles-title">
        <div className="wrap">
          <SectionHead
            id="ai-principles-title"
            pill="Our approach"
            title="AI you can put your name on"
            sub="The difference between an AI success story and a cautionary tale is engineering discipline."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="card card-hover p-7">
                <Icon name="shield" className="h-6 w-6 text-brand-300" />
                <h3 className="h-display mt-4 text-lg">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Wondering what AI could return in your business?"
        sub="Book a free consultation. We'll identify your three highest-ROI AI opportunities — and tell you honestly if there aren't any yet."
        cta="Book a free AI consultation"
      />
    </>
  );
}
