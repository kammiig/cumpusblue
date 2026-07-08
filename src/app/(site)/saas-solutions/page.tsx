import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { DashboardMock } from "@/components/DashboardMock";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["saas-solutions"];
  return pageMetadata("saas-solutions", {
    title: d.seoTitle,
    description: d.seoDesc,
    path: "/saas-solutions",
  });
}

const OFFERINGS = [
  {
    icon: "spark",
    t: "MVP in weeks",
    d: "A sharply-scoped first product that tests your core assumption with real, paying users — typically live in 8–14 weeks.",
  },
  {
    icon: "layers",
    t: "Multi-tenant architecture",
    d: "One codebase serving many customers securely: tenant isolation, role-based access and per-plan feature flags.",
  },
  {
    icon: "database",
    t: "Subscription billing",
    d: "Plans, trials, upgrades, dunning and tax handled properly with Stripe or your preferred billing platform.",
  },
  {
    icon: "gauge",
    t: "Product analytics",
    d: "Instrumented from day one: activation, retention and feature usage — the numbers that steer the roadmap.",
  },
  {
    icon: "shield",
    t: "Enterprise readiness",
    d: "SSO, audit logs, data export and security practices that get you through procurement instead of stuck in it.",
  },
  {
    icon: "workflow",
    t: "AI-native features",
    d: "Assistants, smart search, document intelligence — AI capabilities designed into the product, not bolted on.",
  },
];

const STAGES = [
  { n: "01", t: "Validate", d: "Discovery, prototype and MVP focused on one testable promise to one specific customer." },
  { n: "02", t: "Launch", d: "Billing, onboarding, analytics and the operational basics that turn a product into a business." },
  { n: "03", t: "Scale", d: "Performance, multi-tenancy hardening, enterprise features and the roadmap your usage data justifies." },
];

export default async function SaasSolutionsPage() {
  const [c, settings] = await Promise.all([
    getPageContent("saas-solutions"),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings, [
          { name: "Home", path: "/" },
          { name: "SaaS Solutions", path: "/saas-solutions" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[600px] rounded-full bg-accent-500/15 blur-[130px]"
        />
        <div className="wrap relative py-20 text-center sm:py-28">
          <SectionHead as="h1" pill="SaaS Solutions" title={c.heroTitle} sub={c.heroSub} />
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Scope my product <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/services/saas-product-development" className="btn-ghost">
              SaaS development service
            </Link>
          </div>
          <div className="relative mx-auto mt-14 max-w-4xl">
            <DashboardMock />
          </div>
        </div>
      </section>

      <section className="wrap py-20 sm:py-28" aria-labelledby="saas-offer-title">
        <SectionHead
          id="saas-offer-title"
          pill="What's included"
          title="Everything a SaaS business stands on"
          sub="Not just code — the architecture, billing, analytics and security that subscription products live or die by."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((o) => (
            <div key={o.t} className="card card-hover p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                <Icon name={o.icon} className="h-5 w-5" />
              </span>
              <h3 className="h-display mt-4 text-lg">{o.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="saas-stages-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div className="card order-2 overflow-hidden lg:order-1">
            <Image
              src={IMAGES.devTeam.src}
              alt={IMAGES.devTeam.alt}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHead
              id="saas-stages-title"
              pill="How it unfolds"
              title="Validate. Launch. Scale."
              sub="Each stage has its own goal and its own budget — you commit to the next one only when the previous one earns it."
              center={false}
            />
            <ol className="mt-9 space-y-6">
              {STAGES.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="font-display text-sm font-bold tracking-widest text-brand-400">{s.n}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{s.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a SaaS idea — or a SaaS problem?"
        sub="Bring either. We'll give you a straight answer about scope, cost and the fastest path to validation."
        cta="Scope my product"
      />
    </>
  );
}
