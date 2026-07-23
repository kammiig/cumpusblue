import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["our-approach"];
  return pageMetadata("our-approach", {
    title: d.seoTitle,
    description: d.seoDesc,
    path: "/our-approach",
  });
}

const LIFECYCLE = [
  {
    icon: "spark",
    t: "Assess",
    d: "We evaluate organizational objectives, existing initiatives, operational environments, execution capabilities, dependencies, and constraints to establish a clear understanding of the current state and identify opportunities for improvement.",
  },
  {
    icon: "workflow",
    t: "Transform",
    d: "We help organizations strengthen operational readiness, improve organizational alignment, increase execution capability, and establish the structures necessary to support growth, scalability, modernization, and business transformation.",
  },
  {
    icon: "layers",
    t: "Organize",
    d: "We establish governance frameworks, portfolio structures, program models, PMO capabilities, and management processes that provide the foundation for coordinated execution and informed decision-making.",
  },
  {
    icon: "gauge",
    t: "Execute",
    d: "We support project delivery, operational execution, stakeholder coordination, performance management, and execution oversight to ensure that initiatives remain aligned with business objectives and delivery commitments.",
  },
  {
    icon: "magnet",
    t: "Transition",
    d: "We help organizations navigate periods of significant change, including mergers, acquisitions, integrations, restructuring efforts, organizational realignments, and other transformation initiatives that require disciplined coordination and execution.",
  },
];

const SYSTEM_LAYERS = [
  {
    icon: "gauge",
    t: "Create the System",
    d: "Through PMO Design & Transformation, we help organizations establish governance models, operating procedures, reporting structures, management frameworks, and execution disciplines that provide a foundation for consistent delivery.",
  },
  {
    icon: "shield",
    t: "Operate the System",
    d: "Through Project Governance & Delivery Management, we help organizations coordinate execution, manage stakeholders, maintain accountability, support decision-making, and provide the leadership oversight necessary to guide projects and programs successfully.",
  },
  {
    icon: "chart",
    t: "Measure the System",
    d: "Through Project Controls & Performance Management, we establish the planning, measurement, reporting, forecasting, and control mechanisms that provide visibility into project health, execution performance, risks, dependencies, and delivery outcomes.",
  },
];

export default async function OurApproachPage() {
  const [c, settings] = await Promise.all([
    getPageContent("our-approach"),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings, [
          { name: "Home", path: "/" },
          { name: "Our Approach", path: "/our-approach" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-20 sm:py-28">
          <SectionHead as="h1" pill="Our Approach" title={c.introTitle} sub={c.introBody} />
        </div>
      </section>

      {/* Turning Strategy into Execution */}
      <section className="wrap py-20 sm:py-24" aria-labelledby="turning-title">
        <div className="mx-auto max-w-3xl">
          <SectionHead id="turning-title" pill="From strategy to execution" title="Turning Strategy into Execution" center={false} />
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              We view management as a discipline that can be approached systematically and methodically. While
              every organization is unique, the underlying challenges associated with strategy execution,
              operational alignment, governance, accountability, and performance management are often remarkably
              similar.
            </p>
            <p>
              During the execution of strategic initiatives, it is common for strategic objectives, operational
              activities, organizational structures, and delivery efforts to become misaligned over time. As
              organizations grow and complexity increases, maintaining visibility, coordination, and alignment
              across multiple initiatives can become increasingly challenging.
            </p>
            <p>
              Our approach focuses on helping organizations translate strategic objectives into coordinated
              execution through structured frameworks, proven management practices, and disciplined execution
              principles. By establishing clear governance, improving visibility, and aligning execution
              activities with business priorities, organizations can significantly improve their ability to
              achieve desired outcomes while reducing uncertainty and operational friction.
            </p>
          </div>
        </div>
      </section>

      {/* How we see organizations */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="views-title">
        <div className="wrap">
          <SectionHead id="views-title" pill="Perspective" title="Seeing organizations as one system" />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <article className="card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                <Icon name="workflow" className="h-6 w-6" />
              </span>
              <h3 className="h-display mt-5 text-xl">Viewing Organizations as Integrated Systems</h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  We recognize that organizations rarely operate through simple hierarchical structures. Programs,
                  projects, operational functions, business units, and technology platforms frequently support
                  multiple strategic objectives simultaneously. As a result, execution challenges often emerge not
                  within individual initiatives, but at the intersections between them.
                </p>
                <p>
                  Rather than forcing artificial structures, we design management and execution models that reflect
                  these cross-functional realities — creating visibility into dependencies, clarifying
                  decision-making responsibilities, and ensuring that organizational activities operate as part of
                  an integrated system.
                </p>
                <p>
                  This systems-oriented perspective allows organizations to coordinate execution more effectively,
                  maximize synergy across initiatives, and translate strategic intent into measurable business
                  outcomes.
                </p>
              </div>
            </article>
            <article className="card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                <Icon name="globe" className="h-6 w-6" />
              </span>
              <h3 className="h-display mt-5 text-xl">Bridging Strategy, Operations, and Technology</h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Organizations often operate across multiple business, operational, and technology domains that
                  must work together to achieve strategic objectives. While strategic priorities may be established
                  at the leadership level, translating those priorities into coordinated delivery activities can
                  often prove challenging — and technology investments may drift out of alignment with business
                  objectives over time.
                </p>
                <p>
                  We help organizations align business objectives, operational processes, execution activities,
                  governance structures, and technology initiatives into a cohesive execution environment. This
                  enables leadership teams to maintain strategic direction while giving operational teams the
                  structure, visibility, and accountability required to deliver results.
                </p>
                <p>
                  By connecting strategy, operations, and technology, organizations can improve execution
                  effectiveness while increasing their ability to adapt to changing business conditions.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* A Structured Execution Lifecycle */}
      <section className="wrap py-20 sm:py-28" aria-labelledby="lifecycle-title">
        <SectionHead
          id="lifecycle-title"
          pill="Execution lifecycle"
          title="A Structured Execution Lifecycle"
          sub="Successful organizations require a coordinated execution framework that supports decision-making, accountability, performance visibility, and continuous improvement across the enterprise. Our services support a complete execution lifecycle."
        />
        <ol className="mx-auto mt-14 max-w-3xl">
          {LIFECYCLE.map((s, i) => (
            <li key={s.t} className="flex gap-5 sm:gap-6">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                {i < LIFECYCLE.length - 1 && (
                  <span aria-hidden="true" className="my-2 w-px flex-1 bg-gradient-to-b from-brand-500/40 to-white/5" />
                )}
              </div>
              <div className={i < LIFECYCLE.length - 1 ? "pb-10" : ""}>
                <span className="font-display text-xs font-bold tracking-[0.18em] text-brand-300">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-display mt-1.5 text-xl">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-12 max-w-3xl text-center leading-relaxed text-muted">
          Together, these capabilities create a continuous management framework that enables organizations to
          move from strategic intent to measurable results.
        </p>
      </section>

      {/* Creating, Operating, and Measuring Execution Systems */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-20 sm:py-28" aria-labelledby="systems-title">
        <div className="wrap">
          <SectionHead
            id="systems-title"
            pill="Execution systems"
            title="Creating, Operating, and Measuring Execution Systems"
            sub="Effective execution requires more than managing individual projects. It requires creating a management system capable of supporting consistent performance across initiatives. Our approach addresses three critical execution layers."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {SYSTEM_LAYERS.map((s) => (
              <article key={s.t} className="card card-hover p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="h-display mt-5 text-lg">{s.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.d}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-muted">
            Together, these layers create an execution environment that supports transparency, predictability,
            and informed decision-making throughout the project and program lifecycle.
          </p>
        </div>
      </section>

      {/* Delivering Sustainable Results */}
      <section className="wrap py-20 sm:py-24" aria-labelledby="results-title">
        <div className="mx-auto max-w-3xl">
          <SectionHead id="results-title" pill="Sustainable results" title="Delivering Sustainable Results" center={false} />
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              Our objective is not simply to help organizations complete individual projects. Our focus is on
              strengthening the organization&apos;s ability to execute consistently and successfully over time.
            </p>
            <p>
              Whether supporting enterprise transformation initiatives, portfolio and program management, PMO
              development, project delivery, operational performance improvement, or M&amp;A integration efforts,
              Compublue strives to leave organizations stronger, more scalable, and better positioned for future
              success than when we first engaged.
            </p>
            <p>
              Success is measured not only by the completion of initiatives, but by the organization&apos;s
              increased capability to manage complexity, adapt to change, and consistently translate strategic
              objectives into measurable business outcomes.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to strengthen how your organization executes?"
        sub="Compublue welcomes the opportunity to discuss your objectives and explore how we can help."
        cta="Start the conversation"
      />
    </>
  );
}
