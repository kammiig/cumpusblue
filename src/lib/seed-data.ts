import { IMAGES } from "./images";

/**
 * Default site content. Seeded into the database by prisma/seed.ts and used
 * as a runtime fallback so the site renders even before seeding.
 */

export const SEED_SERVICES = [
  {
    slug: "ai-automation-solutions",
    title: "AI Automation Solutions",
    icon: "workflow",
    image: IMAGES.tradingDesk.src,
    imageAlt: IMAGES.tradingDesk.alt,
    excerpt:
      "Turn repetitive, error-prone workflows into reliable automated systems powered by AI — from document processing to end-to-end operations.",
    body: `Most teams lose hundreds of hours a month to work a machine should be doing: copying data between systems, triaging inboxes, processing documents, chasing approvals. We identify those workflows, measure what they cost you, and replace them with AI-driven automation that runs around the clock.

Our approach is deliberately pragmatic. We start with a paid-back-in-months automation — not a moonshot — and expand from there. Every system we ship includes monitoring, human-in-the-loop review where judgment matters, and a dashboard that shows exactly how many hours and dollars the automation is returning.

Because we are engineers first, the automations we build are production-grade: version-controlled, tested, secured and documented — not brittle no-code experiments that break the first time an input changes.`,
    bullets: [
      "Workflow audit that identifies and prices your top automation opportunities",
      "Document intelligence: extract, classify and route invoices, forms and contracts",
      "Email and ticket triage with AI classification and smart routing",
      "Human-in-the-loop approval steps where judgment is required",
      "Integration with the tools you already use (CRM, ERP, spreadsheets, email)",
      "ROI dashboard showing hours saved and error rates in real time",
    ],
    faqs: [
      {
        q: "How do we know what to automate first?",
        a: "We run a short workflow audit: we map your recurring processes, measure volume and time spent, and rank opportunities by payback period. You get the full list even if you only automate one.",
      },
      {
        q: "What happens when the AI is unsure?",
        a: "Uncertain cases are routed to a human review queue with full context. The system learns from those decisions, so the share of work needing review keeps shrinking.",
      },
      {
        q: "Do we need our data to be perfectly organized first?",
        a: "No. Messy inputs are normal — handling them well is part of the engineering. We build validation and exception handling into every automation.",
      },
    ],
  },
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    icon: "layers",
    image: IMAGES.devTeam.src,
    imageAlt: IMAGES.devTeam.alt,
    excerpt:
      "Design, build and launch subscription software — from validated MVP to multi-tenant platform with billing, analytics and enterprise-grade security.",
    body: `A SaaS product is a business, not just an app. We have built subscription software for decades — long before it was called SaaS — and we bring the full playbook: product strategy, architecture, design system, development, launch and iteration.

For new products we focus on speed to validation: a sharply-scoped MVP in weeks, instrumented from day one so you learn what users actually do. For established products we modernize legacy platforms into scalable multi-tenant architectures without disrupting existing customers.

Everything ships with the fundamentals investors and enterprise buyers expect: role-based access control, audit logs, SSO-readiness, usage analytics, subscription billing and a deployment pipeline your future team will thank you for.`,
    bullets: [
      "Product discovery, scoping and technical architecture",
      "Multi-tenant SaaS architecture with role-based access control",
      "Subscription billing integration (Stripe and others)",
      "Design system and polished, responsive UI",
      "Usage analytics and product instrumentation from day one",
      "CI/CD pipeline, automated testing and documentation",
    ],
    faqs: [
      {
        q: "How long does an MVP take?",
        a: "A focused MVP typically takes 8–14 weeks depending on scope. We deliberately cut scope to the smallest product that can validate your core assumption.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Yes. We start with a technical audit, stabilize the highest-risk areas, and then modernize incrementally — no risky big-bang rewrites unless the audit genuinely justifies one.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Full source code, infrastructure and documentation are yours, in your own repositories and cloud accounts.",
      },
    ],
  },
  {
    slug: "custom-business-dashboards",
    title: "Custom Business Dashboards",
    icon: "chart",
    image: IMAGES.analyticsChart.src,
    imageAlt: IMAGES.analyticsChart.alt,
    excerpt:
      "One screen with the numbers that run your business — pulled automatically from every system you use, updated in real time.",
    body: `If your monthly numbers live in six systems and one overworked spreadsheet, decisions get made late and on gut feel. We build dashboards that pull from your CRM, accounting platform, ad accounts, databases and spreadsheets automatically — so the truth is one URL away.

We start with the decisions you need to make, not the charts that look good. Each dashboard is designed around a handful of questions — Is revenue on track? Where is the pipeline leaking? Which customers are at risk? — and every widget earns its place.

Dashboards are built on your data infrastructure, not locked in a third-party tool: you own the pipelines, the models and the presentation layer, and they can grow into full analytics products.`,
    bullets: [
      "KPI definition workshops — measure what actually drives the business",
      "Automated data pipelines from CRM, ERP, ads, finance and databases",
      "Real-time and scheduled refresh with data-quality alerts",
      "Role-based views for executives, managers and teams",
      "Drill-down from headline number to underlying records",
      "Runs on your infrastructure — no per-seat tool lock-in",
    ],
    faqs: [
      {
        q: "Can you combine data from systems that don't talk to each other?",
        a: "That is the core of the job. We build connectors and a small data warehouse layer so every source lands in one consistent model.",
      },
      {
        q: "How is this different from Power BI or Looker?",
        a: "Those are excellent presentation tools, and we can build on them. The hard part is the data plumbing and metric definitions underneath — that is what we engineer, whichever front end you prefer.",
      },
      {
        q: "What does maintenance look like?",
        a: "Pipelines are monitored with automatic alerts. Most clients choose a light monthly retainer; others take full handover with documentation and training.",
      },
    ],
  },
  {
    slug: "ai-chatbots-virtual-assistants",
    title: "AI Chatbots & Virtual Assistants",
    icon: "chat",
    image: IMAGES.womanLaptop.src,
    imageAlt: IMAGES.womanLaptop.alt,
    excerpt:
      "Assistants trained on your business that answer customers, qualify leads and support staff — accurately, on-brand and around the clock.",
    body: `A good AI assistant deflects the tickets your team dreads, answers at 2 a.m., and hands hot leads to sales while competitors sleep. A bad one hallucinates refund policies. The difference is engineering.

We build assistants grounded in your actual content — help docs, policies, product data, past conversations — with retrieval that cites its sources and guardrails that keep answers inside what the assistant truly knows. When a conversation needs a human, it hands off gracefully with full context.

Assistants can live on your website, inside WhatsApp or Messenger, in your support desk or behind the scenes helping your own staff find answers faster. Every deployment includes an analytics view: deflection rate, resolution quality, captured leads and the questions your customers actually ask.`,
    bullets: [
      "Trained on your docs, policies and product catalogue — with source citations",
      "Website, WhatsApp, Messenger and helpdesk deployments",
      "Lead capture and qualification built into conversations",
      "Graceful human handoff with full conversation context",
      "Guardrails against hallucination and off-brand answers",
      "Analytics: deflection rate, satisfaction, top questions, captured leads",
    ],
    faqs: [
      {
        q: "Will it make things up?",
        a: "We ground every answer in your approved content and constrain the assistant to it. When it doesn't know, it says so and offers a human handoff — that behavior is tested before launch.",
      },
      {
        q: "How long until it's live?",
        a: "A website assistant grounded in existing help content typically launches in 3–5 weeks, including testing and tuning.",
      },
      {
        q: "Can it qualify leads, not just answer questions?",
        a: "Yes — the assistant can ask qualifying questions naturally in conversation and push qualified leads into your CRM with a summary.",
      },
    ],
  },
  {
    slug: "crm-erp-automation",
    title: "CRM / ERP Automation",
    icon: "database",
    image: IMAGES.fourPeople.src,
    imageAlt: IMAGES.fourPeople.alt,
    excerpt:
      "Make your CRM and ERP work for people instead of the other way around — clean data, automated updates, and systems that finally talk to each other.",
    body: `CRMs and ERPs promise a single source of truth and usually deliver a data-entry burden. We automate the busywork: records that update themselves from email and calendar activity, quotes that generate from templates, orders that flow to fulfillment without re-keying, and alerts that fire when a deal or delivery goes quiet.

We work across the major platforms — Salesforce, HubSpot, Zoho, Dynamics, NetSuite, Odoo and others — and specialize in the unglamorous, high-value work of integration: connecting your CRM to your ERP, your ERP to your e-commerce, and everything to your reporting.

The result is measured in adoption. When the system does the typing, your team actually uses it — and the data becomes reliable enough to automate against.`,
    bullets: [
      "Automated data entry from email, calendar, calls and forms",
      "CRM ↔ ERP ↔ e-commerce integration without re-keying",
      "Quote, invoice and order workflow automation",
      "Data cleaning and deduplication with ongoing hygiene rules",
      "Smart alerts: stalled deals, at-risk accounts, delayed orders",
      "Works with Salesforce, HubSpot, Zoho, Dynamics, NetSuite, Odoo and more",
    ],
    faqs: [
      {
        q: "Our CRM data is a mess. Is that a blocker?",
        a: "It's the usual starting point. We begin with a cleanup pass — deduplication, normalization, enrichment — and add rules that keep it clean automatically.",
      },
      {
        q: "Do we have to switch platforms?",
        a: "Almost never. We make the platform you own work properly before recommending anything new. If a migration truly is justified, we handle it end to end.",
      },
      {
        q: "Can AI help here too?",
        a: "Yes — AI drafts follow-ups, summarizes account history, scores leads and flags churn risk directly inside your CRM.",
      },
    ],
  },
  {
    slug: "website-web-app-development",
    title: "Website & Web App Development",
    icon: "globe",
    image: IMAGES.codeReview.src,
    imageAlt: IMAGES.codeReview.alt,
    excerpt:
      "Fast, accessible, SEO-ready websites and web applications built on modern frameworks — engineered to convert and easy to manage.",
    body: `Your website is your hardest-working salesperson — or your most expensive brochure. We build sites and web applications that load fast, rank well, meet accessibility standards, and are engineered around one job: turning visitors into enquiries.

We work with modern frameworks (Next.js, React) and build with performance and search as first-class requirements: server-side rendering, image optimization, structured data, semantic markup and Core Web Vitals budgets that survive launch.

Beyond marketing sites, we build full web applications — customer portals, booking systems, internal tools — with the same engineering standards we apply to SaaS products: authentication, role-based access, testing and clean deployment pipelines.`,
    bullets: [
      "Modern stack: Next.js / React with server-side rendering",
      "Core Web Vitals performance budgets and image optimization",
      "WCAG accessibility and semantic, SEO-friendly markup",
      "Content management so your team can edit without a developer",
      "Customer portals, booking systems and internal tools",
      "Analytics, conversion tracking and A/B-test readiness",
    ],
    faqs: [
      {
        q: "Can you redesign without losing our search rankings?",
        a: "Yes — we map every existing URL, preserve or redirect it correctly, and usually improve rankings because the new site is faster and better structured.",
      },
      {
        q: "Will we be able to edit content ourselves?",
        a: "Yes. Every site ships with a content dashboard for pages, posts, images and SEO fields — no developer needed for day-to-day changes.",
      },
      {
        q: "Do you also handle hosting?",
        a: "We set up fast, modern hosting with SSL, CDN and automatic deployments, and either manage it for you or hand it over fully documented.",
      },
    ],
  },
  {
    slug: "data-analytics-reporting",
    title: "Data Analytics & Reporting",
    icon: "gauge",
    image: IMAGES.tabletAnalytics.src,
    imageAlt: IMAGES.tabletAnalytics.alt,
    excerpt:
      "From scattered spreadsheets to a trusted analytics layer: pipelines, metrics and reports your whole team can rely on — plus AI that explains the 'why'.",
    body: `Companies rarely lack data; they lack numbers everyone trusts. We build the analytics layer that fixes that: automated pipelines that collect data from every system, a metrics layer where each KPI has one agreed definition, and reporting that reaches people where they work — dashboards, scheduled emails, Slack digests.

Once the foundation is trustworthy, we add intelligence: anomaly detection that flags unusual movement before month-end, forecasting for revenue and demand, and AI-generated narratives that explain what changed and why in plain language.

Engagements scale to fit: from a two-week reporting cleanup for a small team to a full data-warehouse build. In every case, you own the stack.`,
    bullets: [
      "Automated pipelines replacing manual exports and copy-paste",
      "Single-definition metrics layer — one truth per KPI",
      "Dashboards, scheduled reports and Slack/email digests",
      "Anomaly detection and forecasting on your core metrics",
      "AI-written plain-language summaries of what changed and why",
      "Built on open, portable tools you own",
    ],
    faqs: [
      {
        q: "We mostly run on spreadsheets. Too early for this?",
        a: "Not at all — spreadsheets are a fine starting point. We automate the feeds into them first, then graduate to dashboards when you're ready.",
      },
      {
        q: "How do you handle data privacy?",
        a: "Data stays in your accounts and infrastructure. We work under NDA, apply least-privilege access, and document every pipeline we build.",
      },
      {
        q: "What is the typical first deliverable?",
        a: "Usually a working revenue or operations dashboard on automated data within 3–4 weeks — something your team uses every week from day one.",
      },
    ],
  },
  {
    slug: "cloud-integration-api-development",
    title: "Cloud Integration & API Development",
    icon: "cloud",
    image: IMAGES.dataCenter.src,
    imageAlt: IMAGES.dataCenter.alt,
    excerpt:
      "Connect your systems with robust APIs and cloud infrastructure — secure, documented, monitored, and built to survive growth.",
    body: `Every modern business runs on connections: website to CRM, store to warehouse, app to payment provider, everything to reporting. When those connections are ad-hoc scripts and manual exports, growth turns them into fire hazards. We replace them with engineered integrations and clean APIs.

We design and build REST and GraphQL APIs with proper authentication, versioning, rate limiting and documentation — the kind your partners and future developers can build on. On the infrastructure side, we set up cloud environments (AWS, Azure, Google Cloud) with infrastructure-as-code, monitoring, backups and sensible costs.

Legacy systems are a specialty inherited from our consulting roots: we routinely wrap decades-old software in modern APIs, extending its life while you modernize at your own pace.`,
    bullets: [
      "REST / GraphQL API design, build and documentation",
      "Third-party integrations: payments, shipping, marketing, accounting",
      "Cloud architecture on AWS, Azure or Google Cloud",
      "Infrastructure-as-code, CI/CD and environment automation",
      "Monitoring, alerting, backups and cost optimization",
      "Legacy system wrapping — modern APIs over existing software",
    ],
    faqs: [
      {
        q: "Our core system is 15 years old. Can you integrate it?",
        a: "Almost certainly. Between database-level access, file exports and screen-level automation, we have yet to meet a system that couldn't be wrapped in a safe modern API.",
      },
      {
        q: "Which cloud should we use?",
        a: "The one that fits your workload, team and budget — we're certified across AWS, Azure and GCP and have no reseller incentives.",
      },
      {
        q: "How do you keep integrations from silently breaking?",
        a: "Every integration ships with monitoring, retry logic and alerting. You hear about problems from the system, not from a customer.",
      },
    ],
  },
  {
    slug: "digital-marketing-automation",
    title: "Digital Marketing Automation",
    icon: "megaphone",
    image: IMAGES.marketing.src,
    imageAlt: IMAGES.marketing.alt,
    excerpt:
      "Email journeys, lead nurture, ad syncing and attribution — a marketing engine that runs itself and reports its own ROI.",
    body: `Marketing teams drown in repetitive work: exporting audiences, syncing leads to ad platforms, sending the same follow-up sequence, assembling the monthly report. We automate the machinery so your team spends its time on strategy and creative.

We build nurture journeys triggered by real behavior — pages visited, emails opened, trials started — and connect your website, CRM, email platform and ad accounts so every audience and conversion syncs automatically. Pixels and server-side tracking are configured correctly, which alone often pays for the project in improved ad optimization.

Attribution comes standard: a reporting view that ties spend to pipeline so you can see which channels create customers, not just clicks.`,
    bullets: [
      "Behavior-triggered email and SMS nurture journeys",
      "Lead scoring and automatic routing to sales",
      "Meta, TikTok and Google pixel + server-side tracking done right",
      "Audience syncing between CRM and ad platforms",
      "Automated campaign and funnel reporting",
      "Spend-to-pipeline attribution dashboards",
    ],
    faqs: [
      {
        q: "Which platforms do you work with?",
        a: "HubSpot, Mailchimp, Klaviyo, ActiveCampaign, Customer.io and most major ad platforms — plus custom integrations when a connector doesn't exist.",
      },
      {
        q: "Can you fix our conversion tracking?",
        a: "Yes — broken or double-counted tracking is one of the most common and highest-ROI fixes we make. We audit, repair and document your full measurement setup.",
      },
      {
        q: "Do you also run the ads?",
        a: "We focus on the engineering: tracking, automation and reporting. We partner well with your media buyer or agency and make their work measurable.",
      },
    ],
  },
  {
    slug: "ai-powered-lead-generation",
    title: "AI-Powered Lead Generation",
    icon: "magnet",
    image: IMAGES.meeting.src,
    imageAlt: IMAGES.meeting.alt,
    excerpt:
      "Fill the pipeline with qualified prospects: AI-driven research, enrichment, scoring and personalized outreach that books meetings.",
    body: `Great salespeople shouldn't spend their day researching prospects and writing first-touch emails. We build AI-powered systems that do the heavy lifting: identifying companies that match your ideal customer profile, enriching contacts with verified data, scoring intent, and drafting genuinely personalized outreach for humans to review and send.

On the inbound side, we make sure nothing leaks: instant AI qualification of every form fill and chat conversation, automatic routing to the right rep, and follow-up sequences that keep prospects warm without spamming them.

Everything reports into one pipeline view, so you can see cost per qualified lead by source and double down on what works. Guardrails matter here: outreach is compliant, rate-limited and always human-approved.`,
    bullets: [
      "Ideal-customer-profile targeting and AI prospect research",
      "Contact enrichment and verification",
      "Intent scoring and lead prioritization",
      "AI-drafted, human-approved personalized outreach",
      "Instant qualification and routing of inbound leads",
      "Cost-per-qualified-lead reporting by channel",
    ],
    faqs: [
      {
        q: "Is AI outreach compliant with spam laws?",
        a: "Our systems are built for compliance: proper consent handling, opt-outs, sending limits and human review before anything goes out.",
      },
      {
        q: "How quickly does this show results?",
        a: "Inbound qualification improves response times immediately. Outbound pipelines typically produce booked meetings within the first 4–6 weeks.",
      },
      {
        q: "Does this replace our sales team?",
        a: "No — it feeds them. The AI removes research and admin work so your closers spend their time in conversations.",
      },
    ],
  },
];

export const SEED_CASE_STUDIES = [
  {
    slug: "ai-lead-qualification-professional-services",
    title: "AI lead qualification cuts response time from hours to seconds",
    client: "Professional services firm",
    industry: "Professional Services",
    summary:
      "An AI assistant now qualifies every inbound enquiry instantly, routes hot leads to partners, and books meetings automatically.",
    challenge:
      "Enquiries arrived through five channels and waited an average of nine hours for a first response. Partners wasted hours on unqualified calls while genuinely promising leads went cold.",
    solution:
      "CompuBlue deployed an AI assistant across the firm's website and inbox that qualifies every enquiry against partner-defined criteria, answers common questions from approved content, routes qualified prospects with a full summary, and books meetings directly into calendars.",
    results: [
      "First response time: 9 hours → under 30 seconds",
      "62% of routine questions resolved without partner involvement",
      "2.4× increase in qualified consultations booked per month",
    ],
    image: IMAGES.meeting.src,
    imageAlt: IMAGES.meeting.alt,
    tags: ["AI Chatbots", "Lead Generation"],
  },
  {
    slug: "operations-dashboard-logistics",
    title: "One dashboard replaces six systems for a logistics operator",
    client: "Regional logistics company",
    industry: "Logistics",
    summary:
      "Automated pipelines now pull orders, fleet, finance and customer data into a single real-time operations dashboard.",
    challenge:
      "Management assembled the weekly numbers by hand from six systems, taking a full day and surfacing problems only after they had become expensive.",
    solution:
      "We built automated data pipelines from the company's TMS, accounting platform, telematics and CRM into a governed metrics layer, with a real-time dashboard for executives and per-depot views for managers, including anomaly alerts.",
    results: [
      "Weekly reporting effort: 8 hours → zero (fully automated)",
      "Late-delivery rate down 23% after real-time exception alerts",
      "Month-end close shortened by 3 days",
    ],
    image: IMAGES.analyticsChart.src,
    imageAlt: IMAGES.analyticsChart.alt,
    tags: ["Dashboards", "Data Analytics"],
  },
  {
    slug: "membership-platform-modernization",
    title: "Museum membership platform, modernized end to end",
    client: "California cultural institution",
    industry: "Culture & Non-profit",
    summary:
      "A legacy membership solution rebuilt as a modern web platform with self-service renewals, automated communications and clean reporting.",
    challenge:
      "A membership system CompuBlue originally delivered years earlier needed to meet modern expectations: online self-service, automated renewals, and integration with email marketing and finance.",
    solution:
      "We rebuilt the platform as a modern web application: member self-service portal, automated renewal and lapse-prevention journeys, payment integration, and a live membership dashboard for the development team.",
    results: [
      "Online self-service renewals rose to 71% of all renewals",
      "Lapsed-member win-back emails recover memberships automatically",
      "Staff data entry reduced by roughly 15 hours per week",
    ],
    image: IMAGES.aboutTeam.src,
    imageAlt: IMAGES.aboutTeam.alt,
    tags: ["Web Apps", "Automation"],
  },
  {
    slug: "municipal-it-strategy",
    title: "Executive IT strategy for a California city",
    client: "City of Glendale",
    industry: "Public Sector",
    summary:
      "Executive-level consulting that shaped the city's technology budget and delivery roadmap around measurable outcomes.",
    challenge:
      "The city needed an objective, vendor-neutral assessment of its technology spending and a strategy that elected officials could evaluate and fund with confidence.",
    solution:
      "CompuBlue provided executive consulting to determine the technology budget and roadmap: auditing existing systems and contracts, benchmarking costs, and delivering a prioritized, defensible investment plan.",
    results: [
      "Clear, council-ready technology budget and multi-year roadmap",
      "Vendor-neutral recommendations adopted across departments",
      "Foundation for subsequent modernization projects",
    ],
    image: IMAGES.presentation.src,
    imageAlt: IMAGES.presentation.alt,
    tags: ["IT Strategy", "Consulting"],
  },
  {
    slug: "crm-erp-integration-distribution",
    title: "CRM and ERP finally in sync for a distribution business",
    client: "Wholesale distributor",
    industry: "Distribution",
    summary:
      "Orders, inventory and customer data now flow automatically between CRM, ERP and the online store — no re-keying, no version conflicts.",
    challenge:
      "Sales lived in the CRM, operations lived in the ERP, and the two disagreed daily. Staff re-keyed every order, and pricing errors were slipping through to customers.",
    solution:
      "We built a bidirectional integration layer between CRM, ERP and the e-commerce store with a single source of truth per data type, validation rules, conflict alerts, and automated quote-to-order flow.",
    results: [
      "Order re-keying eliminated (about 20 staff-hours per week)",
      "Pricing errors on orders down 96%",
      "Inventory visible to sales in real time for accurate promise dates",
    ],
    image: IMAGES.fourPeople.src,
    imageAlt: IMAGES.fourPeople.alt,
    tags: ["CRM/ERP", "Integration"],
  },
  {
    slug: "resource-tracking-system",
    title: "Web-based resource tracking for a distributed workforce",
    client: "Enterprise services organization",
    industry: "Enterprise",
    summary:
      "A custom web application giving managers live visibility of people, equipment and utilization across sites.",
    challenge:
      "Resource allocation was managed in spreadsheets that were outdated the moment they were saved, causing double-bookings and idle capacity.",
    solution:
      "CompuBlue designed and developed a web-based resource tracking system with live availability, booking workflows, conflict detection and utilization reporting — later extended with automated alerts.",
    results: [
      "Double-bookings effectively eliminated",
      "Equipment utilization up double digits through visibility alone",
      "Planning meetings shortened from hours to minutes",
    ],
    image: IMAGES.teamCode.src,
    imageAlt: IMAGES.teamCode.alt,
    tags: ["Web Apps", "Dashboards"],
  },
];

export const SEED_POSTS = [
  {
    slug: "where-to-start-with-ai-automation",
    title: "Where to start with AI automation (hint: not with the flashiest demo)",
    excerpt:
      "The highest-ROI automation in your company is probably boring. Here is a practical framework for finding it, pricing it, and shipping it in weeks.",
    image: IMAGES.tradingDesk.src,
    imageAlt: IMAGES.tradingDesk.alt,
    tags: ["AI Automation", "Strategy"],
    body: `Every week we talk to companies that want "to do something with AI." The instinct is usually to start with the most impressive demo — a talking assistant, a content generator, something board-ready. The better starting point is almost always duller: the workflow your team complains about most.

## Start with cost, not capability

Make a list of tasks your team repeats every week. For each one, estimate three numbers: how many times it happens per month, how long it takes, and what an error costs when it happens. Multiply. Sort. The top of that list is your AI roadmap — and it rarely matches the demo you saw on LinkedIn.

Document processing, inbox triage, data entry between systems, and first-draft responses are the usual winners. None of them are glamorous. All of them pay back in months.

## The 70% rule

A useful automation does not need to handle every case — it needs to handle the common cases perfectly and route the rest to a human with full context. We aim for systems that fully automate around 70% of volume at launch. The review queue for the remaining 30% does two jobs: it protects quality, and it generates training data that shrinks the queue every month.

Teams that insist on 100% automation on day one usually ship nothing. Teams that accept a human-in-the-loop ship in weeks and improve from there.

## Measure from day one

Before the automation goes live, capture the baseline: hours spent, error rate, turnaround time. Then instrument the automated system to report the same numbers. This is not bureaucracy — it is how you know whether to expand the program, and it is how the project survives its first budget review.

## What a good first project looks like

Small enough to ship in four to eight weeks. Painful enough that the team cheers when it works. Measurable enough that finance believes the result. If you have a candidate workflow in mind and want a second opinion on whether it qualifies, we are happy to take a look — the workflow audit is the same first step we take with every client.`,
  },
  {
    slug: "saas-mvp-scope",
    title: "The MVP scope conversation every founder should have before writing code",
    excerpt:
      "Most MVPs fail by being too big. A practical guide to cutting scope until your product can be built in weeks — and still prove what matters.",
    image: IMAGES.devTeam.src,
    imageAlt: IMAGES.devTeam.alt,
    tags: ["SaaS", "Product"],
    body: `The most expensive sentence in software is "while we're at it." MVPs rarely fail because the code was bad; they fail because eighteen months of runway went into features nobody had validated.

## One assumption, one product

A real MVP tests one assumption: that a specific kind of customer will pay for a specific outcome. Write that sentence down. Every feature that does not directly test it goes on the someday list. Billing tiers, admin consoles, integrations, native apps — almost all of it can wait.

## The concierge test

Before building a feature, ask: could we deliver this manually behind the scenes for the first twenty customers? If yes, do that instead. Manual delivery teaches you what the automation should actually do — and sometimes reveals nobody wanted the feature at all.

## What should never be cut

Scope-cutting has limits. Three things belong in every MVP no matter how small: instrumentation (you cannot learn from users you cannot see), authentication done properly (retrofitting security is misery), and a deployment pipeline (shipping should be boring from day one). These cost little upfront and are brutally expensive to add later.

## Weeks, not quarters

Our rule of thumb: if the build plan exceeds fourteen weeks, the scope is wrong. Cut until it fits. You can afford to be wrong about a fourteen-week bet; a fourteen-month one can kill the company. The founders who win are rarely the ones who guessed right the first time — they are the ones who could afford the most guesses.`,
  },
  {
    slug: "dashboard-questions-not-charts",
    title: "Your dashboard has too many charts and not enough answers",
    excerpt:
      "Good dashboards are built backwards from decisions, not forwards from data. Five questions that separate a useful dashboard from wallpaper.",
    image: IMAGES.analyticsChart.src,
    imageAlt: IMAGES.analyticsChart.alt,
    tags: ["Data Analytics", "Dashboards"],
    body: `Most dashboards are built the same way: connect every data source, chart everything, arrange it attractively. Six weeks later nobody opens it. The problem is direction — dashboards should be built backwards from decisions, not forwards from available data.

## Start with the Monday question

What do you need to decide every Monday morning? Where to focus sales effort? Whether to escalate a delivery problem? Which customers need attention? Each decision defines the numbers that belong on screen — and everything else is decoration.

## One number, one definition

The fastest way to kill trust in reporting is two charts that disagree. Before building anything visual, define each metric once: what counts as revenue, when a customer counts as churned, which timestamp means "delivered." Write the definitions down. Encode them in one place that every report reads from. This single practice fixes more "dashboard problems" than any visualization choice.

## Alerts beat glancing

Nobody should have to stare at a dashboard waiting for something to go wrong. The dashboard is for understanding; alerts are for noticing. Wire thresholds and anomaly detection to the channels people already watch — email, Slack — and let the dashboard be the place they go next, not first.

## The five-second test

Show your dashboard to someone for five seconds, then take it away and ask what the business should do differently this week. If they cannot answer, the dashboard is wallpaper. Rebuild it around decisions and try again — with the plumbing already in place, the second iteration takes days, not months.`,
  },
  {
    slug: "chatbot-that-doesnt-embarrass-you",
    title: "How to ship a customer-facing AI chatbot that won't embarrass you",
    excerpt:
      "The gap between a delightful AI assistant and a viral screenshot of a hallucinated refund policy is engineering. Here's what that engineering looks like.",
    image: IMAGES.womanLaptop.src,
    imageAlt: IMAGES.womanLaptop.alt,
    tags: ["AI Chatbots", "Customer Experience"],
    body: `Everyone has seen the screenshots: an airline's chatbot inventing a bereavement policy, a dealership's bot agreeing to sell a car for a dollar. These are not arguments against AI assistants — they are arguments against shipping one without guardrails.

## Ground everything

The core discipline is retrieval-grounding: the assistant answers only from an approved content base — your help docs, policies, product data — and cites where each answer came from. If the content base does not contain the answer, the correct behavior is "I don't know, let me connect you with the team," not creative writing.

## Constrain the job

An assistant that does everything guarantees surprises. Scope it: answer product and policy questions, capture and qualify leads, book meetings, hand off to humans. Refuse everything else politely. Narrow assistants feel smarter because they are consistently good within their lane.

## Test like an adversary

Before launch, we run red-team scripts against every assistant: prompt injection attempts, requests for discounts and refunds, legal questions, provocations. The transcript review with the client is often the most valuable meeting of the project — it converts vague anxiety about AI into a concrete, fixable checklist.

## Watch it in production

Launch is the midpoint. Review conversations weekly at first: where did the assistant decline when it knew the answer? Where was it confidently wrong? Feed both back into the content base and guardrails. Deflection rates typically climb for months after launch — but only for teams that keep looking.

Done this way, an assistant becomes what it should be: your fastest, most patient team member — one that never invents a refund policy at 2 a.m.`,
  },
];

export const HOME_FAQS = [
  {
    q: "What does an engagement with CompuBlue look like?",
    a: "We start with a free consultation and, for most projects, a short paid discovery that produces a concrete plan with fixed scope and pricing. Then we build in weekly increments you can see and test, with a single point of contact throughout.",
  },
  {
    q: "How quickly can we see results?",
    a: "Most automation and dashboard projects deliver their first working version within 3–6 weeks. SaaS MVPs typically launch in 8–14 weeks. We deliberately scope first phases to pay back fast.",
  },
  {
    q: "Do you work with small businesses or only enterprises?",
    a: "Both. Our engagements scale from focused automations for small teams to multi-year platform builds. What matters is that the project has a measurable business case.",
  },
  {
    q: "Who owns the software you build?",
    a: "You do — source code, infrastructure, and documentation, in your own accounts. No lock-in, no proprietary black boxes.",
  },
  {
    q: "Can you work with our existing systems and team?",
    a: "Yes. Integrating with what you already own — CRMs, ERPs, legacy software, internal teams — is our specialty, inherited from decades of consulting work.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They started with our P&L, not a technology pitch. The first automation paid for itself before the second one shipped.",
    author: "Chief Operating Officer",
    org: "Logistics company",
  },
  {
    quote:
      "Our reporting went from a week of spreadsheet work to a link we trust. Board meetings are shorter and sharper.",
    author: "Managing Director",
    org: "Professional services firm",
  },
  {
    quote:
      "CompuBlue rebuilt our platform without a day of downtime for existing members. The self-service numbers speak for themselves.",
    author: "Development Director",
    org: "Cultural institution",
  },
];
