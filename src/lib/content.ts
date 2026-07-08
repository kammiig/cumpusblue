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
    seoTitle: "CompuBlue | AI Automation & SaaS Development Company",
    seoDesc:
      "CompuBlue builds AI automation, SaaS products, custom dashboards and intelligent chatbots that help businesses scale. Three decades of engineering expertise, now AI-first.",
    fields: {
      heroBadge: { label: "Hero badge", type: "text", value: "AI-first software & automation studio" },
      heroTitle: {
        label: "Hero title",
        type: "text",
        value: "Intelligent software that moves your business forward",
      },
      heroSub: {
        label: "Hero subtitle",
        type: "textarea",
        value:
          "CompuBlue designs and builds AI automation, SaaS products, and data platforms that cut operating costs, unlock insight, and turn manual workflows into competitive advantage.",
      },
      heroCtaPrimary: { label: "Hero primary button", type: "text", value: "Book a free consultation" },
      heroCtaSecondary: { label: "Hero secondary button", type: "text", value: "Explore services" },
      statClients: { label: "Stat 1 (value|label)", type: "text", value: "150+|Projects delivered" },
      statYears: { label: "Stat 2 (value|label)", type: "text", value: "25+|Years in software" },
      statAutomation: { label: "Stat 3 (value|label)", type: "text", value: "70%|Avg. workflow time saved" },
      statSatisfaction: { label: "Stat 4 (value|label)", type: "text", value: "98%|Client satisfaction" },
    },
  },
  about: {
    name: "About",
    path: "/about",
    seoTitle: "About CompuBlue | From IT Consulting to AI-First Engineering",
    seoDesc:
      "CompuBlue has delivered mission-critical software and IT strategy for decades. Today we bring that same rigor to AI automation, SaaS development and cloud engineering.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Decades of engineering discipline. A new AI-first mission." },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "CompuBlue began as a premier technology consulting firm, trusted by cities, museums, and enterprises to deliver mission-critical systems on time and on budget. That discipline never changed — the technology did. Today we apply the same top-down, business-first thinking to artificial intelligence, SaaS products, and cloud platforms, helping organizations automate the work that slows them down and build the software that sets them apart.",
      },
      missionTitle: { label: "Mission title", type: "text", value: "Bridging the gap between business and technology" },
      missionBody: {
        label: "Mission body",
        type: "textarea",
        value:
          "Most technology projects fail for the same reason: a gap between what the business needs and what gets built. Closing that gap is our founding principle. We start with your bottom line, map the workflows that matter, and only then choose the technology — whether that is a fine-tuned AI model, a custom SaaS platform, or a pragmatic integration between the systems you already own.",
      },
    },
  },
  services: {
    name: "Services (index)",
    path: "/services",
    seoTitle: "AI & SaaS Services | Automation, Dashboards, Chatbots | CompuBlue",
    seoDesc:
      "Explore CompuBlue's services: AI automation, SaaS product development, custom dashboards, chatbots, CRM/ERP automation, analytics, cloud integration and more.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Services built to compound" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "Every engagement starts with your workflows and your numbers — not a technology pitch. Pick a single service or combine them into a roadmap; each one is designed to pay for itself.",
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
    seoTitle: "Contact CompuBlue | Book a Free Consultation",
    seoDesc:
      "Tell us about your project. CompuBlue responds within one business day with a clear next step — no obligation, no sales pressure.",
    fields: {
      introTitle: { label: "Intro title", type: "text", value: "Let's talk about your project" },
      introBody: {
        label: "Intro body",
        type: "textarea",
        value:
          "Tell us what you are trying to achieve and we will come back within one business day with a clear recommendation and next steps.",
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
