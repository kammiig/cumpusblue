import { IMAGES } from "./images";

/**
 * Default site content. Seeded into the database by prisma/seed.ts and used
 * as a runtime fallback so the site renders even before seeding.
 */

export const SEED_SERVICES = [
  {
    slug: "enterprise-transformation-operational-readiness",
    title: "Enterprise Transformation & Operational Readiness",
    icon: "workflow",
    image: IMAGES.heroOffice.src,
    imageAlt: "Leadership team aligning on an enterprise transformation initiative",
    excerpt:
      "A structured effort to strengthen operational effectiveness, execution capability, and strategic alignment across the enterprise — preparing organizations to execute against evolving business objectives.",
    body: `## Our Approach

We approach organizational transformation as a structured effort to strengthen operational effectiveness, execution capability, and strategic alignment across the enterprise. Organizations often face growth constraints, execution inefficiencies, fragmented operations, or structural limitations that reduce scalability and impair long-term performance. Our focus is on helping organizations become operationally stronger, strategically aligned, and better prepared to execute against evolving business objectives.

We recognize that operational readiness is not limited to a single event or transaction. Whether supporting growth initiatives, organizational restructuring, modernization efforts, leadership transitions, or acquisition readiness, we help organizations establish the structures, processes, governance, and execution disciplines required to operate more effectively and respond more efficiently to changing business demands.

## What We Do

We help organizations assess, structure, and improve operational and execution environments to support sustainable growth, organizational scalability, and strategic execution. This includes evaluating operational effectiveness, identifying structural and execution gaps, aligning initiatives and responsibilities, improving coordination across functions, and establishing management and reporting frameworks that support informed decision-making and measurable operational performance.

We also support organizations in preparing for significant business transitions and transformation initiatives, including growth expansion, restructuring efforts, operational modernization, acquisition readiness, and enterprise-wide execution improvement.

## How We Deliver

We apply a disciplined and methodical approach to organizational assessment, operational alignment, and execution improvement. This includes evaluating current operating environments, identifying organizational and operational constraints, defining transformation priorities, and establishing structured implementation and governance frameworks that enable coordinated execution across the enterprise.

We work across operational, technical, organizational, and business functions to improve visibility, accountability, coordination, and performance management throughout the organization. Our approach focuses on creating operational environments that are scalable, measurable, execution-oriented, and aligned with long-term strategic objectives — enabling organizations to improve operational performance while increasing readiness for future growth, transformation, or transaction opportunities.`,
    bullets: [
      "Operational effectiveness and execution-gap assessment",
      "Alignment of initiatives, responsibilities, and cross-functional coordination",
      "Management and reporting frameworks for informed decision-making",
      "Readiness for growth, restructuring, and operational modernization",
      "Acquisition readiness and enterprise-wide execution improvement",
    ],
    faqs: [],
  },
  {
    slug: "portfolio-program-management",
    title: "Strategic Portfolio & Program Management",
    icon: "layers",
    image: IMAGES.presentation.src,
    imageAlt: "Portfolio and program leaders reviewing initiative dependencies",
    excerpt:
      "Structured program and portfolio frameworks that align execution with strategic priorities — enabling integrated governance, clearer prioritization, and full visibility into interdependencies.",
    body: `## Our Approach

While we approach management with the rigor and discipline of a science, we recognize that enterprise initiatives rarely conform to rigid structures. Programs and projects often function as shared capabilities that support multiple strategic objectives simultaneously. Rather than forcing artificial hierarchies, we design program and portfolio models that reflect these cross-cutting realities — enabling integrated governance, clearer prioritization, and full visibility into interdependencies.

## What We Do

We assess enterprise initiative landscapes and design structured program and portfolio frameworks that align execution with strategic priorities. By organizing interdependent initiatives into coherent programs and aligning investments within portfolios, we enable improved prioritization, optimized resource utilization, and measurable value realization across the organization.

## How We Deliver

We apply a disciplined and methodical approach to evaluating initiatives, dependencies, and strategic alignment across the enterprise. This includes assessing active and planned efforts, mapping interdependencies, and structuring initiatives into programs and portfolios that reflect both execution realities and business objectives.

We establish governance models, prioritization frameworks, and performance management disciplines that enable coordinated decision-making and transparent execution. This ensures that resources are allocated effectively, dependencies are actively managed, and leadership has clear visibility into progress, risks, and outcomes across the initiative landscape.`,
    bullets: [
      "Structured program and portfolio frameworks aligned to strategy",
      "Interdependency mapping across enterprise initiatives",
      "Governance models and prioritization frameworks",
      "Optimized resource utilization and value realization",
      "Executive visibility into progress, risks, and outcomes",
    ],
    faqs: [],
  },
  {
    slug: "strategic-initiative-assessment-structuring",
    title: "Strategic Initiative Assessment & Structuring",
    icon: "spark",
    image: IMAGES.meeting.src,
    imageAlt: "Advisors assessing and structuring a portfolio of initiatives",
    excerpt:
      "Bringing clarity and structure to initiative landscapes before execution begins — assessing alignment, dependencies, and the right structures for coordinated delivery.",
    body: `## Our Approach

We approach initiative assessment as a critical first step in effective execution. Organizations often initiate projects without fully understanding their alignment, dependencies, or impact. We focus on bringing clarity and structure to initiative landscapes before execution begins.

## What We Do

We assess existing and proposed initiatives to determine alignment with strategic objectives, identify dependencies, and define appropriate structures for execution. This includes grouping initiatives into logical constructs such as projects, programs, and portfolios.

## How We Deliver

We perform structured assessments, analyze relationships between initiatives, and define execution models that enable coordinated delivery. This ensures that organizations move forward with clarity, alignment, and a well-defined path to execution.`,
    bullets: [
      "Alignment assessment against strategic objectives",
      "Dependency and impact analysis",
      "Grouping into projects, programs, and portfolios",
      "Execution models for coordinated delivery",
      "A clear, well-defined path to execution",
    ],
    faqs: [],
  },
  {
    slug: "pmo-design-transformation",
    title: "PMO Design & Transformation",
    icon: "gauge",
    image: IMAGES.fourPeople.src,
    imageAlt: "Team designing a project management office operating model",
    excerpt:
      "PMOs designed as execution systems — not just reporting functions — that align strategy with delivery, enforce discipline, and provide the visibility leaders need to decide.",
    body: `## Our Approach

We view the PMO as an execution system — not just a reporting function. A well-designed PMO aligns strategy with delivery, enforces discipline, and provides the visibility required for effective decision-making. Our focus is on building PMOs that are practical, scalable, and tailored to the organization's specific needs.

## What We Do

We design and transform Project Management Offices to provide structured governance, standardized processes, and enterprise-level visibility into initiatives. This includes defining roles, processes, and reporting frameworks that enable coordinated execution across projects and programs.

## How We Deliver

We assess existing capabilities, identify gaps, and implement PMO structures that support consistent planning, prioritization, and reporting. We establish governance models, define operating procedures, and ensure that the PMO functions as a central coordination point for execution across the organization.`,
    bullets: [
      "PMO structure, roles, and operating procedures",
      "Standardized processes and reporting frameworks",
      "Governance models and enterprise-level visibility",
      "Consistent planning, prioritization, and reporting",
      "A central coordination point for execution",
    ],
    faqs: [],
  },
  {
    slug: "project-governance-delivery-management",
    title: "Project Governance & Delivery Management",
    icon: "shield",
    image: IMAGES.codeReview.src,
    imageAlt: "Sponsors and delivery leaders coordinating project governance",
    excerpt:
      "Disciplined governance, clear accountability, and consistent executive visibility that guide projects through complexity and keep delivery aligned with business objectives.",
    body: `## Our Approach

Successful project delivery requires more than detailed plans and schedules. It requires disciplined governance, clear accountability, effective communication, and consistent executive visibility throughout the project lifecycle. We approach project delivery as a structured management process that aligns stakeholders, supports informed decision-making, and ensures that execution activities remain focused on achieving business objectives.

Our focus is on establishing the leadership, governance, and oversight mechanisms necessary to guide projects through complexity, manage competing priorities, and maintain alignment between delivery activities and organizational goals.

## What We Do

We provide project governance and delivery management services that help organizations maintain control, visibility, and accountability throughout project execution. This includes establishing governance structures, defining decision-making processes, coordinating stakeholder engagement, managing issue escalation paths, and ensuring that project teams remain aligned with business objectives and delivery commitments.

We help leadership teams gain meaningful visibility into project status, risks, dependencies, and key decisions while ensuring that execution activities remain coordinated, disciplined, and outcome-focused.

## How We Deliver

We establish governance frameworks that define roles, responsibilities, communication structures, reporting expectations, and decision-making authorities across the project environment. Working closely with sponsors, stakeholders, project teams, and organizational leadership, we facilitate alignment, accountability, and proactive management of issues that may impact delivery outcomes.

Our approach emphasizes executive visibility, stakeholder coordination, disciplined oversight, and effective communication, enabling organizations to make timely decisions, maintain project momentum, and successfully navigate complex delivery environments.`,
    bullets: [
      "Governance structures and decision-making processes",
      "Stakeholder engagement and issue escalation paths",
      "Executive visibility into status, risks, and dependencies",
      "Alignment of delivery with business objectives",
      "Disciplined oversight and effective communication",
    ],
    faqs: [],
  },
  {
    slug: "project-controls-performance-management",
    title: "Project Controls & Performance Management",
    icon: "chart",
    image: IMAGES.analyticsChart.src,
    imageAlt: "Analyst reviewing project performance baselines and variances",
    excerpt:
      "Objective visibility into project performance — the planning, measurement, reporting, and control mechanisms that reveal project health and emerging risks before they become business problems.",
    body: `## Our Approach

Effective project execution requires objective visibility into project performance. We approach project controls as a disciplined management capability that transforms project plans into measurable performance information, enabling organizations to understand project health, identify emerging risks, and make informed decisions before issues become business problems.

Our focus is on establishing the planning, measurement, reporting, and control mechanisms required to maintain transparency, predictability, and accountability throughout the project lifecycle.

## What We Do

We help organizations establish and operate the project controls and performance management capabilities required to monitor, measure, forecast, and control project execution. This includes development of work breakdown structures, integrated schedules, delivery baselines, dependency management processes, performance measurement frameworks, status reporting structures, and integrated change control procedures.

We provide the visibility and analytical capabilities necessary to evaluate project health, identify variances, assess trends, and support proactive decision-making throughout execution.

## How We Deliver

We apply structured project controls methodologies to establish measurable performance baselines and objective reporting mechanisms across project activities. Beginning with scope definition and execution planning, we help organizations develop integrated schedules, define performance metrics, establish reporting frameworks, and implement controls that provide visibility into progress, risks, dependencies, and delivery outcomes.

Our approach incorporates schedule management, variance analysis, forecasting, performance measurement, status reporting, and integrated change control processes that support disciplined execution and informed decision-making throughout the delivery lifecycle.`,
    bullets: [
      "Work breakdown structures and integrated schedules",
      "Performance baselines and measurement frameworks",
      "Status reporting and integrated change control",
      "Variance analysis and forecasting",
      "Dependency management across project activities",
    ],
    faqs: [],
  },
  {
    slug: "operational-execution-performance-management",
    title: "Operational Execution & Performance Management",
    icon: "globe",
    image: IMAGES.devTeam.src,
    imageAlt: "Operations team coordinating execution across functions",
    excerpt:
      "Structured execution environments where operational activities are aligned, measured, and continuously improved — turning fragmented effort into coordinated performance.",
    body: `## Our Approach

We recognize that operational performance is driven by the effectiveness of execution systems. Organizations often struggle not because of strategy, but because execution is fragmented and lacks coordination. We focus on creating structured environments where activities are aligned, measured, and continuously improved.

## What We Do

We design and implement execution frameworks that align operational activities with business objectives. This includes defining performance measures, structuring workflows, and ensuring that execution is coordinated across functions.

## How We Deliver

We establish performance management systems, reporting structures, and operational controls that provide visibility into outcomes and enable informed decision-making. This ensures that execution is not only efficient but also aligned with strategic priorities.`,
    bullets: [
      "Execution frameworks aligned to business objectives",
      "Performance measures and structured workflows",
      "Performance management systems and operational controls",
      "Coordination of execution across functions",
      "Visibility into outcomes for informed decision-making",
    ],
    faqs: [],
  },
  {
    slug: "ma-integration-transformation",
    title: "M&A Integration & Transformation",
    icon: "magnet",
    image: IMAGES.aboutTeam.src,
    imageAlt: "Integration team coordinating cross-functional M&A activities",
    excerpt:
      "M&A managed as integrated business transformation — early assessment, structured planning, disciplined execution, and continuous visibility across the full integration lifecycle.",
    body: `## Our Approach

We approach mergers and acquisitions as integrated business transformation initiatives that begin well before a transaction is finalized and continue through operational stabilization and long-term value realization. Successful M&A execution requires more than post-close coordination — it requires early assessment, structured planning, disciplined execution, and continuous visibility into cross-functional dependencies.

Our focus is on enabling organizations to navigate the full integration lifecycle with clarity, coordination, and operational control, ensuring that strategic objectives are effectively translated into executable integration plans and measurable business outcomes.

## What We Do

We support organizations across the M&A lifecycle by helping assess, structure, coordinate, and execute integration and transformation activities associated with acquisitions, mergers, divestitures, and organizational realignments.

This includes:

- Pre-acquisition assessment and operational readiness evaluation
- Dependency and impact analysis
- Transition and integration planning
- Cross-functional coordination
- Integration execution oversight
- Operational stabilization
- Transformation alignment and performance visibility

We help organizations establish the structure, governance, and execution disciplines required to manage complex integration efforts with reduced disruption and improved strategic alignment.

## How We Deliver

We apply a structured and methodical approach to integration planning and execution, establishing governance frameworks, integration roadmaps, reporting structures, and execution controls that provide visibility into priorities, dependencies, risks, and progress across the organization.

We coordinate activities across operational, technical, organizational, and business functions to ensure that integration efforts remain aligned, measurable, and execution-focused throughout the transition lifecycle. This enables leadership teams to make informed decisions, proactively manage risks, and maintain operational continuity while advancing long-term transformation objectives.`,
    bullets: [
      "Pre-acquisition assessment and operational readiness evaluation",
      "Dependency and impact analysis",
      "Transition and integration planning",
      "Cross-functional coordination and execution oversight",
      "Operational stabilization and transformation alignment",
    ],
    faqs: [],
  },
];

/**
 * Service groupings for the three engagement layers used across the site
 * (home "Our Services" section and the Services index). Slugs map to
 * SEED_SERVICES / the Service table.
 */
export const SERVICE_LAYERS = [
  {
    name: "Strategic Layer",
    blurb:
      "Aligning strategic objectives with the structures and portfolios required to execute them.",
    slugs: [
      "enterprise-transformation-operational-readiness",
      "portfolio-program-management",
      "strategic-initiative-assessment-structuring",
    ],
  },
  {
    name: "Governance and Execution Layer",
    blurb:
      "Creating, operating, and measuring the systems that turn strategy into disciplined delivery.",
    slugs: [
      "pmo-design-transformation",
      "project-governance-delivery-management",
      "project-controls-performance-management",
      "operational-execution-performance-management",
    ],
  },
  {
    name: "Enterprise Transition Layer",
    blurb:
      "Guiding organizations through mergers, acquisitions, and large-scale transitions.",
    slugs: ["ma-integration-transformation"],
  },
] as const;

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
