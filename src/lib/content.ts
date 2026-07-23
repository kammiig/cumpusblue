import { db } from "./db";

/**
 * Editable page copy. Each public page has named text fields with seeded
 * defaults below; the admin dashboard edits the values stored on the Page row.
 */
export type FieldDef = { label: string; type: "text" | "textarea"; value: string };
export type PageContent = Record<string, FieldDef>;

export const PAGE_DEFAULTS: Record<
  string,
  { name: string; path: string; seoTitle: string; seoDesc: string; fields: PageContent }
> = {
  "": {
    name: "Home",
    path: "/",
    seoTitle: "Compublue | Aligning Strategy, Operations, Governance & Execution",
    seoDesc:
      "Compublue helps organizations translate strategic objectives into measurable business outcomes by aligning strategy, operations, governance, technology, and execution into coordinated management systems.",
    fields: {
      heroBadge: {
        label: "Hero badge",
        type: "text",
        value: "Strategy · Operations · Governance · Technology · Execution",
      },
      heroTitle: {
        label: "Hero title",
        type: "text",
        value: "Aligning Strategy, Operations, Governance, and Technology to Drive Execution",
      },
      heroSub: {
        label: "Hero subtitle",
        type: "textarea",
        value:
          "We bring strategy, operations, governance, technology, and execution together into coordinated management systems — with the visibility and accountability to execute effectively.",
      },
      heroTagline: {
        label: "Hero tagline",
        type: "text",
        value: "Helping organizations translate strategic objectives into measurable business outcomes.",
      },
      heroCtaPrimary: { label: "Hero primary button", type: "text", value: "View Our Services" },
      heroCtaSecondary: { label: "Hero secondary button", type: "text", value: "Start the conversation" },
      achieveTitle: { label: "Achieve — title", type: "text", value: "What We Help Organizations Achieve" },
      achieveBody: {
        label: "Achieve — intro",
        type: "textarea",
        value:
          "Organizations often face challenges associated with growth, transformation, execution, organizational alignment, operational complexity, and changing business priorities. Our role is to help clients establish the structures, processes, governance models, and execution disciplines necessary to navigate these challenges effectively.",
      },
      servicesTitle: { label: "Services — title", type: "text", value: "Our Services" },
      servicesBody: {
        label: "Services — intro",
        type: "textarea",
        value:
          "Our services span the strategic, governance, execution, and enterprise transition layers required to help organizations translate strategic objectives into measurable business outcomes.",
      },
      approachTitle: { label: "Approach — title", type: "text", value: "Our Approach" },
      approachBody: {
        label: "Approach — intro",
        type: "textarea",
        value:
          "We view organizations as integrated systems rather than collections of isolated functions, departments, projects, or initiatives. Strategic objectives, operational processes, governance structures, technology investments, and execution activities are often highly interdependent. As a result, sustainable improvement requires more than isolated solutions.\n\nOur approach combines executive perspective, operational discipline, structured governance, and practical execution management to help organizations improve performance while strengthening their long-term ability to execute effectively.",
      },
      whyTitle: { label: "Why — title", type: "text", value: "Why Clients Engage Us" },
      whyBody: {
        label: "Why — intro",
        type: "textarea",
        value:
          "Our perspective has been shaped through decades of leadership experience spanning executive management, enterprise transformation, operational improvement, technology consulting, PMO leadership, portfolio and program management, and complex delivery environments.\n\nWe bring a systems-oriented perspective that bridges strategy, operations, governance, technology, and execution — helping organizations navigate complexity, improve coordination, and achieve measurable business outcomes.",
      },
      startTitle: { label: "Start the conversation — title", type: "text", value: "Start the Conversation" },
      startBody: {
        label: "Start the conversation — intro",
        type: "textarea",
        value:
          "Every organization faces unique opportunities and challenges. Whether your focus is enterprise transformation, operational readiness, portfolio management, PMO development, project delivery, organizational performance, or M&A integration, Compublue welcomes the opportunity to discuss your objectives and explore how we can help.",
      },
    },
  },
  about: {
    name: "About",
    path: "/about",
    seoTitle: "About Us | Compublue — Experience, Perspective, and Capability",
    seoDesc:
      "Compublue was founded on the belief that effective management can be approached systematically. Decades of leadership experience across transformation, PMO, program delivery, and M&A shape our approach.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "About Us: Experience, Perspective, and Capability" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "Compublue was founded on the belief that effective management can be approached systematically, regardless of industry. While every organization operates within its own market, the disciplines required to align strategy, operations, governance, technology, and execution remain fundamentally consistent.",
      },
      missionTitle: {
        label: "Perspective title",
        type: "text",
        value: "Experience-Informed Perspective. Execution-Focused Results.",
      },
      missionBody: {
        label: "Perspective body",
        type: "textarea",
        value:
          "Organizations today operate in increasingly complex environments where strategy, operations, technology, governance, and execution must work together to achieve meaningful business outcomes. Successfully navigating that complexity requires more than technical expertise, project management, or strategic planning alone. It requires an integrated understanding of how organizations function, how decisions are made, and how execution is translated into measurable results.",
      },
    },
  },
  services: {
    name: "Services (index)",
    path: "/services",
    seoTitle: "Our Services | Compublue — Strategy, Governance & Execution",
    seoDesc:
      "Compublue's services span the strategic, governance, execution, and enterprise transition layers required to help organizations translate strategic objectives into measurable business outcomes.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Services across the execution lifecycle" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "Our services span the strategic, governance, execution, and enterprise transition layers required to help organizations translate strategic objectives into measurable business outcomes.",
      },
    },
  },
  "our-approach": {
    name: "Our Approach",
    path: "/our-approach",
    seoTitle: "Our Approach | How Compublue Helps Organizations Execute",
    seoDesc:
      "Compublue helps organizations translate strategic objectives into coordinated execution through structured frameworks, disciplined governance, and meaningful performance visibility.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Our Approach: How We Help Organizations Execute" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "Effective execution requires more than project management. Organizations need a delivery framework, disciplined governance, and meaningful performance visibility. At Compublue, we help clients establish execution systems through PMO design and transformation, manage delivery through structured governance and oversight, and maintain visibility through performance measurement, reporting, and project controls.",
      },
    },
  },
  "saas-solutions": {
    name: "SaaS Solutions",
    path: "/saas-solutions",
    seoTitle: "SaaS Product Development & Solutions | CompuBlue",
    seoDesc:
      "From MVP to multi-tenant platform: CompuBlue designs, builds and scales SaaS products with modern architecture, subscription billing, analytics and enterprise-grade security.",
    fields: {
      heroTitle: { label: "Hero title", type: "text", value: "SaaS products, from first sketch to scale" },
      heroSub: {
        label: "Hero subtitle",
        type: "textarea",
        value:
          "Whether you are validating an MVP or modernizing a legacy platform, we bring the architecture, design system and product discipline that SaaS businesses are built on.",
      },
    },
  },
  "ai-solutions": {
    name: "AI Solutions",
    path: "/ai-solutions",
    seoTitle: "AI Solutions & Automation for Business | CompuBlue",
    seoDesc:
      "Practical AI that pays for itself: workflow automation, chatbots and virtual assistants, document intelligence, predictive analytics and AI-powered lead generation.",
    fields: {
      heroTitle: { label: "Hero title", type: "text", value: "AI that does real work" },
      heroSub: {
        label: "Hero subtitle",
        type: "textarea",
        value:
          "We build AI systems around measurable outcomes — hours saved, tickets deflected, leads qualified — not demos. Every solution ships with guardrails, analytics and a clear ROI model.",
      },
    },
  },
  "case-studies": {
    name: "Case Studies",
    path: "/case-studies",
    seoTitle: "Case Studies & Portfolio | CompuBlue",
    seoDesc:
      "Real results from CompuBlue engagements: municipal IT strategy, membership platforms, resource tracking systems, AI automation and analytics projects.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Proof, not promises" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "A selection of engagements across the public sector, culture, and private enterprise — and what they returned.",
      },
    },
  },
  blog: {
    name: "Blog / Insights",
    path: "/blog",
    seoTitle: "Insights on AI, SaaS & Automation | CompuBlue Blog",
    seoDesc:
      "Practical guides and perspectives from the CompuBlue team on AI automation, SaaS architecture, data analytics and digital transformation.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Insights" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value: "Practical thinking on AI, SaaS and automation — written by the people who build it.",
      },
    },
  },
  contact: {
    name: "Contact",
    path: "/contact",
    seoTitle: "Contact Compublue | Start the Conversation",
    seoDesc:
      "We welcome the opportunity to learn about your organization, your objectives, and how we may be able to assist. Contact Compublue to start the conversation.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Start the Conversation" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "We welcome the opportunity to learn about your organization, your objectives, and how we may be able to assist. Whether you have a specific initiative in mind or are simply exploring possibilities, we look forward to hearing from you.",
      },
    },
  },
  "privacy-policy": {
    name: "Privacy Policy",
    path: "/privacy-policy",
    seoTitle: "Privacy Policy | CompuBlue",
    seoDesc: "How CompuBlue collects, uses and protects your personal information.",
    fields: {},
  },
  "terms-and-conditions": {
    name: "Terms & Conditions",
    path: "/terms-and-conditions",
    seoTitle: "Terms & Conditions | CompuBlue",
    seoDesc: "The terms governing use of the CompuBlue website and services.",
    fields: {},
  },
};

/** Merged content for a page: DB values override seeded defaults. */
export async function getPageContent(slug: string): Promise<Record<string, string>> {
  const defaults = PAGE_DEFAULTS[slug]?.fields ?? {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(defaults)) out[k] = v.value;
  try {
    const page = await db.page.findUnique({ where: { slug } });
    if (page?.content) {
      const stored = JSON.parse(page.content) as Record<string, { value?: string } | string>;
      for (const [k, v] of Object.entries(stored)) {
        const val = typeof v === "string" ? v : v?.value;
        if (val) out[k] = val;
      }
    }
  } catch {
    // fall back to defaults
  }
  return out;
}

export function splitStat(s: string): { value: string; label: string } {
  const [value, label] = s.split("|");
  return { value: value || s, label: label || "" };
}
