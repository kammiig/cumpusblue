import Image from "next/image";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ExperienceList } from "@/components/ExperienceList";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings, labelsOn } from "@/lib/settings";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["about"];
  return pageMetadata("about", { title: d.seoTitle, description: d.seoDesc, path: "/about" });
}

const PERSPECTIVES = [
  {
    t: "A Systems-Oriented Perspective",
    paras: [
      "We view organizations as interconnected systems rather than collections of isolated functions, departments, projects, or initiatives. Strategic objectives, operational processes, technology investments, governance structures, and execution activities are often highly interdependent. Challenges in one area frequently create impacts elsewhere, making sustainable improvement difficult to achieve through isolated solutions.",
      "Our approach focuses on understanding these relationships and helping organizations create greater alignment, visibility, accountability, and coordination across the enterprise. By addressing the broader operating environment rather than individual symptoms, organizations can improve execution effectiveness while building stronger foundations for future growth and transformation.",
    ],
  },
  {
    t: "Bridging Strategy, Operations, and Technology",
    paras: [
      "Many organizations possess strong leadership, capable teams, and sound business objectives. Yet translating strategic priorities into coordinated execution often requires navigating complex operational, organizational, and technical realities.",
      "Our experience has demonstrated that meaningful results are achieved when strategy, operations, governance, and technology are treated as interconnected components of a larger execution framework. By helping organizations bridge these domains, we enable leadership teams to improve visibility, strengthen execution, and make more informed decisions while maintaining alignment with long-term business objectives.",
      "This ability to bridge executive strategy, operational execution, and enabling technology continues to shape the way we approach transformation, portfolio management, project delivery, operational improvement, and organizational readiness initiatives.",
    ],
  },
  {
    t: "Experience That Shapes Our Approach",
    paras: [
      "The perspective that guides our work has been developed through leadership roles involving enterprise transformation initiatives, operational restructuring, organizational readiness programs, PMO development, portfolio and program management, technology modernization efforts, post-acquisition integration activities, and large-scale project delivery.",
      "These experiences have occurred across diverse industries and organizational environments, including highly regulated, technology-intensive, operationally complex, and mission-critical settings.",
      "While every organization is unique, the challenges associated with growth, transformation, execution, governance, operational alignment, and organizational change are often remarkably similar. The lessons learned through these experiences continue to inform the frameworks, methodologies, and management practices we bring to our clients.",
    ],
  },
  {
    t: "Building Capability, Not Dependency",
    paras: [
      "Our objective is not simply to help organizations complete individual initiatives or address short-term challenges. We focus on strengthening the organization's long-term ability to execute effectively, manage complexity, and adapt to changing business conditions.",
      "Whether supporting enterprise transformation, operational readiness, PMO development, portfolio management, project delivery, or M&A initiatives, our goal is to leave organizations stronger, more scalable, and better positioned for future success than when we first engaged.",
      "Success is measured not only by completed projects or achieved milestones, but by the organization's increased capability to consistently translate strategic objectives into measurable business outcomes.",
    ],
  },
];

const REPRESENTATIVE: { q: string; a: string }[] = [
  {
    q: "Building a Technology, Operations, and Compliance Foundation for a FinTech Lender",
    a: "For a federally regulated fintech lending operation, led the end-to-end creation of the business by architecting and implementing its technology platform, operational infrastructure, and regulatory framework. This included the design and deployment of Loan Origination Software (LOS), pricing engines, credit integration, and end-to-end lending processes, while establishing full compliance with CFPB, NMLS, ECOA, and RESPA requirements.",
  },
  {
    q: "Leading Global Biometric Program Delivery and PMO Transformation",
    a: "For the biometrics division of a globally recognized technology company, established and led a Global Project Management Office (PMO) responsible for overseeing more than thirty concurrent biometric technology initiatives through a team of ten portfolio and program managers. Introduced enterprise governance, Earned Value Management (EVM), executive reporting, and portfolio management disciplines that restored executive visibility, strengthened delivery performance, and helped convert previously underperforming programs into successful client engagements generating approximately $150 million in initial revenue, with ongoing recurring support services.",
  },
  {
    q: "Preparing a Global Biometric Business for Strategic Acquisition",
    a: "For the biometrics division of a globally recognized technology company, played a key role in preparing the organization for strategic divestiture by helping establish the operational discipline, governance, and program execution capabilities required to support a successful acquisition. Following the transaction, continued supporting the business through its transition to the acquiring organization and again through its subsequent acquisition, providing continuity across two successive M&A activities involving the same business.",
  },
  {
    q: "Integrating Enterprise Operations and PMO Following Strategic Acquisitions",
    a: "For the biometrics division of a globally recognized technology company, directed cross-organizational integration activities supporting the continuity of enterprise operations and PMO governance as the business transitioned through two successive acquisitions under new corporate ownership. Responsibilities included coordinating ERP integration, standardizing PMO processes and procedures, and establishing a consistent operational framework that enabled effective program execution throughout the post-acquisition transitions.",
  },
  {
    q: "Leading Cross-Functional Delivery for Consumer Financial Services Products",
    a: "For a nationally recognized financial technology company, directed a team of six program managers responsible for delivering regulated consumer banking and financial technology products within a complex enterprise environment. Led cross-functional execution across engineering, product management, and compliance organizations while aligning Agile delivery practices with organizational governance and execution objectives, improving delivery consistency across multiple initiatives.",
  },
  {
    q: "Building an Acquisition-Ready Technology Organization",
    a: "For a Northern California-based Internet security company specializing in distributed denial-of-service (DDoS) mitigation, served as Chief Operating Officer (COO) and Vice President of Software Development as part of a consulting engagement to lead a comprehensive operational transformation and prepare the business for strategic acquisition. Established the organization's core operating capabilities, including the Project Management Office (PMO), engineering, and security operations, while strengthening execution through governance, operational discipline, and organizational alignment. Developed acquisition positioning materials, implemented a seven-patent intellectual property strategy to strengthen enterprise value, supported due diligence and acquisition negotiations, and designed transition plans that contributed to the successful acquisition of the company by a Fortune 500 technology company within twelve months.",
  },
  {
    q: "Designing a Secure Platform for Regulated Investor Qualification",
    a: "For a Beverly Hills law firm and its entrepreneurial clients, transformed a regulated business concept into a secure operational platform supporting investor qualification under SEC Regulation D Rule 506(c). Working closely with the firm's legal and financial professionals, translated regulatory requirements into business workflows, designed the end-to-end operational model, and developed the supporting business process documentation, software requirements, quality assurance plans, and traceability needed to ensure a disciplined implementation.\n\nDesigned and implemented a highly secure, auditable web-based platform hosted on Amazon Web Services (AWS) that guided prospective investors through qualification and document collection workflows while providing flexible submission options, automated communications, and administrative tools supporting the firm's internal review and approval process.",
  },
  {
    q: "Designing Fraud Investigation Workflows for a Major Public-Sector Organization",
    a: "For the Office of Inspector General (OIG) of one of the nation's largest public school systems, analyzed and redesigned the end-to-end workflow used to report and investigate allegations of fraud, waste, and abuse. Working closely with investigative personnel, documented existing operational procedures, identified opportunities to strengthen information collection and case management, and developed an enhanced operational model supporting more effective investigation workflows.\n\nTranslated the approved business processes into comprehensive software requirements documentation, providing the organization's internal development team with a structured implementation blueprint. All workflow documentation and software requirements deliverables were accepted on their initial submission, supporting the successful completion of the engagement.",
  },
  {
    q: "Modernizing an Enterprise Entertainment Ticketing Platform",
    a: "For a Southern California-based entertainment ticketing company serving nationally and internationally recognized performers and entertainment venues, led the modernization of the organization's core business platform by analyzing existing operations, redesigning business workflows, and developing a fully integrated technology solution. The undertaking included business process analysis, software requirements, system design, database redesign and data migration, resulting in a modernized platform supporting online ticket sales, reporting, accounting integration, and day-of-event ticket verification.\n\nDeveloped the solution using Microsoft technologies, transforming the organization's primary revenue-generating platform into a more scalable and maintainable business system while preserving operational continuity through the migration of existing business data.",
  },
  {
    q: "Designing an Intellectual Property and Content Evaluation Platform",
    a: "For a Southern California entertainment organization supporting a major national media enterprise, transformed a high-level business concept into an operational platform for managing intellectual property submissions and evaluating potential entertainment opportunities. Working closely with the client's technology organization, developed the business process documentation, operational workflows, software requirements, and system design needed to standardize the intake, evaluation, and management of submitted concepts, scripts, and related intellectual property.\n\nDesigned and implemented a secure web-based platform that centralized submission management, intellectual property tracking, workflow status, collaboration notes, and executive search capabilities, enabling business users to efficiently evaluate opportunities by genre, subject matter, and other key business attributes while supporting integration with downstream enterprise systems.",
  },
  {
    q: "Designing a CRM for a Cultural Institution",
    a: "For a California cultural institution, transformed donor engagement objectives into an integrated Customer Relationship Management (CRM) platform supporting fundraising, donor communications, and long-term relationship management. Working closely with museum leadership, translated business objectives into operational workflows, software requirements, system design, and a fully implemented solution aligned with the organization's outreach and development goals.\n\nDesigned and implemented a centralized platform for managing current, prospective, and historical donor relationships, enabling targeted communications, fundraising campaign support, event notifications, and exhibition announcements while providing a structured foundation for ongoing donor engagement and organizational growth.",
  },
  {
    q: "Developing a Three-Year Information Technology Strategic Plan for a Major Municipality",
    a: "For the Information Technology department of one of California's largest municipalities, conducted a comprehensive assessment of technology operations across sixteen City departments to refine and strengthen the City's three-year Information Technology Strategic Plan. Working closely with executive leadership and departmental stakeholders, evaluated existing technology capabilities, operational requirements, infrastructure, enterprise applications, disaster recovery practices, and future business needs to identify strategic gaps and investment priorities.\n\nDeveloped department-level gap analyses and consolidated the findings into a city-wide technology roadmap that aligned operational needs with long-term strategic objectives. Established a structured prioritization methodology to evaluate competing initiatives across departments, providing executive leadership with a data-driven framework for technology planning and investment decisions. The completed Strategic Plan was approved by the Chief Information Officer (CIO), formally adopted by the City Council with complimentary comments, and became the City's Information Technology roadmap for the ensuing three-year planning period.",
  },
  {
    q: "Developing an Enterprise Data Protection and Backup Strategy for a Major Municipality",
    a: "For the Information Technology department of one of California's largest municipalities, conducted a comprehensive assessment of enterprise data management and backup requirements across sixteen City departments to develop a unified strategy for protecting critical business information. Working with departmental and central Information Technology personnel, analyzed business applications, data repositories, infrastructure, network capabilities, storage requirements, and disaster recovery considerations to establish a complete understanding of the City's information landscape.\n\nDeveloped a comprehensive enterprise blueprint that consolidated departmental requirements into a coordinated city-wide data protection strategy, including architectural alternatives, infrastructure recommendations, capacity planning, and implementation roadmaps supporting future technology investment decisions. The completed strategy provided executive leadership with multiple implementation options and a structured framework for establishing consistent enterprise-wide backup and recovery capabilities.",
  },
  {
    q: "Establishing an e-Business Consulting Practice",
    a: "For one of the world's largest technology consulting organizations, helped establish a new e-Business consulting practice focused on helping organizations capitalize on emerging digital business opportunities. Working with a select team of senior consulting principals, identified market demand, defined a portfolio of consulting service offerings, and developed the methodologies, engagement processes, delivery artifacts, and presentation materials required to launch and support the new practice.\n\nFollowing the establishment of the practice, integrated the new service offerings into the regional consulting organization, leading business development efforts, shaping client solutions, and directing delivery engagements that helped organizations capitalize on digital business opportunities.",
  },
  {
    q: "Executive Leadership of a Multi-State Consulting Practice",
    a: "For one of the world's largest technology consulting organizations, was entrusted with executive responsibility for developing and growing consulting business across the travel, transportation, hospitality, gaming, and food industries throughout the Nine Western States, including Hawaii and Guam. Managed regional profit-and-loss (P&L) performance while leading executive client relationships, business development, solution strategy, and engagement delivery for a portfolio of nationally and internationally recognized organizations.\n\nDirected multidisciplinary consulting teams of up to 300 professionals, drawing upon expertise spanning technology research, software engineering, project and program management, human resources, and enterprise consulting to assemble the capabilities required for each engagement. Worked closely with executive leadership teams to shape complex business and technology initiatives, secure new consulting engagements, oversee successful delivery, and maintain the financial and operational performance of the regional consulting practice.",
  },
  {
    q: "Leading the Business and Product Transformation of a Global Maritime ERP Company",
    a: "For a global provider of enterprise resource planning (ERP) solutions serving the maritime transportation industry, was recruited to restore customer confidence and lead the transformation of a commercially struggling software business. Before formally joining the organization, was engaged to work directly with one of its largest international clients to develop a strategic recovery plan that addressed critical product and delivery concerns, helping preserve a key customer relationship and establishing the foundation for the broader transformation effort. Following the successful engagement, joined the company as Vice President of Product Development and was promoted to Chief Executive Officer (CEO) within three months to lead the organization's long-term transformation.\n\nDirected a comprehensive business and product reengineering initiative that transformed a rigid, single-customer software architecture into a flexible enterprise platform capable of supporting diverse global maritime operations. Established long-term product roadmaps, prioritized development investments in collaboration with customers, implemented a Project Management Office (PMO), introduced structured release planning, Earned Value Management (EVM), quality assurance, configuration management, and executive reporting disciplines, and strengthened customer engagement through ongoing executive collaboration and international client relationships.\n\nUnder this leadership, the organization stabilized operations, restored customer confidence, strengthened sales execution, and achieved sustained business growth, ultimately becoming the world's third-largest provider of maritime ERP software and commanding a favorable valuation during its acquisition as part of a larger corporate transaction.",
  },
  {
    q: "Engineering Mission-Critical Navigation Software for Air Force One",
    a: "For a globally recognized aerospace company, was selected to lead the implementation of mission-critical navigation software for the United States Presidential aircraft (Air Force One) after successfully demonstrating a software architecture that satisfied Boeing's stringent engineering requirements and aligned both organizations around a common technical approach. Working directly with Boeing's engineering organization, established the foundation for successful program execution while helping bridge differing software engineering methodologies between the two organizations.\n\nRedesigned the software at the code level into a flexible, state-driven, and modular architecture that improved maintainability, simplified testing, enhanced fault isolation, and supported the rigorous verification standards required for mission-critical aerospace systems. Led both the software engineering and Project Management Office (PMO) functions for the effort, coordinating development, module and system-level quality assurance, project planning, Earned Value Management (EVM), progress reporting, and executive presentations while maintaining close technical collaboration with Boeing throughout the implementation.\n\nThe software was successfully validated by both organizations and deployed as part of the operational navigation system onboard Air Force One, where it continues to support mission-critical flight operations. This engagement established a strong technical foundation that has continued to shape an executive approach centered on disciplined engineering, structured execution, and solving complex business and technology challenges.",
  },
  {
    q: "Helping Establish the FAA Standard for Mission-Critical Aviation Software",
    a: "For a globally recognized aerospace company, was selected to represent the organization as one of the industry contributors to the international development of the Federal Aviation Administration's (FAA) software development lifecycle (SDLC) standard for mission-critical aviation software. Contributed to the development and peer review of software lifecycle, engineering, and software assurance practices while collaborating with leading aerospace organizations to establish a common framework for the design, development, verification, and certification of safety-critical airborne software.\n\nWorked closely with technical leaders from across the international aerospace community to evaluate differing engineering approaches, resolve technical issues through collaborative review, and build consensus around engineering practices that were incorporated into the published standard. The resulting guidance established a common framework for the development and certification of mission-critical airborne software throughout the global commercial aerospace industry.\n\nThis experience reinforced an approach centered on disciplined engineering, structured software lifecycle management, objective verification, and the ability to bring diverse technical perspectives together to achieve practical, high-confidence solutions.",
  },
  {
    q: "Creating a Student Loan Processing Service Bureau",
    a: "For an emerging consumer financial services company, worked directly with the founder and executive leadership to establish a technology-enabled student loan processing service bureau designed to connect major financial institutions with universities through a centralized loan origination platform. Led the initiative from business concept through operational deployment by defining the business processes, developing the software requirements, selecting the technology architecture, and establishing the product development organization required to deliver the new operating capability.\n\nServed as Chief Architect and Director of Product Development, defining the enterprise technology stack, recruiting and leading a multidisciplinary development team, and establishing the Software Development Life Cycle (SDLC), project governance, risk management, and Earned Value Management (EVM) practices used throughout the implementation. Worked closely with executive leadership and investors, providing regular progress reporting while guiding the technical and organizational direction of the initiative.\n\nThe platform was successfully deployed into production, establishing a fully operational student loan processing service bureau through disciplined planning, technical leadership, and structured execution.",
  },
];

const CERTIFICATIONS = [
  {
    t: "Project Management Professional (PMP)",
    d: "Globally recognized project and program management certification issued by the Project Management Institute (PMI), reflecting expertise in structured project delivery, governance, risk management, and organizational execution.",
  },
  {
    t: "Certified ScrumMaster (CSM)",
    d: "Industry-recognized Agile certification supporting collaborative product development, iterative delivery, and Agile team leadership.",
  },
  {
    t: "Global Logistics Specialist (GLS)",
    d: "Specialized certification in global logistics, supply chain operations, and international transportation, complementing experience across logistics, transportation, and enterprise operations.",
  },
  {
    t: "IBM Method Blue",
    d: "IBM's enterprise consulting and service delivery methodology, supporting structured client engagements, business analysis, solution delivery, and executive consulting practices.",
  },
  {
    t: "Federally Endorsed Mortgage Loan Originator (NMLS)",
    d: "Federal authorization supporting regulated mortgage lending activities and demonstrating familiarity with consumer lending regulations, compliance, and financial services operations.",
  },
  {
    t: "Real Estate License",
    d: "Complements mortgage lending and real estate finance experience by providing a broader understanding of real estate transactions, lending processes, and the operational environment supporting residential property finance.",
  },
];

const RECOGNITIONS = [
  { t: "Governor of California", d: "Certificate of Recognition for professional contributions and service." },
  { t: "United States Senator", d: "Certificate of Recognition for professional and community contributions." },
  { t: "United States Congressman", d: "Certificate of Recognition for professional and community service." },
  {
    t: "Los Angeles County Supervisor",
    d: "Certificate of Recognition for contributions supporting public sector initiatives and the community.",
  },
  {
    t: "Mayor, City of Glendale, California",
    d: "Certificate of Recognition for professional contributions supporting strategic technology initiatives for the City.",
  },
];

/**
 * Alternating image/text "chessboard" section. The image is always first in the
 * DOM (so it stacks first on mobile); on large screens `imageLeft={false}`
 * reorders it to the right.
 */
function AltSection({
  title,
  paras,
  image,
  alt,
  imageLeft,
}: {
  title: string;
  paras: string[];
  image: string;
  alt: string;
  imageLeft: boolean;
}) {
  return (
    <div className="wrap grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
      <div
        className={`card photo-frame relative aspect-[3/2] overflow-hidden lg:aspect-auto ${
          imageLeft ? "" : "lg:order-2"
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 560px, 100vw"
        />
      </div>
      <div className={imageLeft ? "" : "lg:order-1"}>
        <h2 className="h-display text-2xl sm:text-3xl">{title}</h2>
        <div className="mt-5 space-y-4">
          {paras.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const [c, settings] = await Promise.all([getPageContent("about"), getSettings().catch(() => ({}))]);
  const showLabels = labelsOn(settings as Record<string, string>, "labelsAbout");

  return (
    <div data-labels={showLabels ? "on" : "off"}>
      <JsonLd
        data={breadcrumbSchema(settings as Record<string, string>, [
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-12 sm:py-16">
          <SectionHead as="h1" pill="About Us" title={c.introTitle} sub={c.introBody} />
          <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-muted">
            The sections below provide an overview of the experience, perspectives, methodologies, professional
            qualifications, and representative accomplishments that have shaped our approach to helping
            organizations strengthen execution, navigate complexity, and achieve sustainable business outcomes.
          </p>
        </div>
      </section>

      {/* Alternating image/text sections */}
      <div className="space-y-12 py-12 sm:space-y-16 sm:py-16">
        {/* 1 — Experience-Informed Perspective (image left, image height matches text column) */}
        <section className="wrap grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14" aria-labelledby="perspective-title">
          <div className="card photo-frame relative aspect-[3/2] overflow-hidden lg:aspect-auto">
            <Image
              src={c.imgPerspective || IMAGES.aboutTeam.src}
              alt={IMAGES.aboutTeam.alt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div>
            <h2 id="perspective-title" className="h-display text-2xl sm:text-3xl">{c.missionTitle}</h2>
            <p className="mt-5 leading-relaxed text-muted">{c.missionBody}</p>
            <p className="mt-4 leading-relaxed text-muted">
              Our perspective has been shaped through decades of leadership experience spanning executive
              management, enterprise transformation, operational improvement, technology consulting, program
              management, PMO leadership, and complex delivery environments.
            </p>
            <p className="mt-4 font-semibold leading-relaxed">
              <span className="bg-gradient-to-r from-brand-400 via-cyanish to-accent-400 bg-clip-text text-transparent">
                Successful organizations are built on the ability to align strategy, operations, governance,
                technology, and execution into a coordinated and sustainable management system.
              </span>
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              That belief forms the foundation of how we approach every engagement.
            </p>
          </div>
        </section>

        {/* 2 — A Systems-Oriented Perspective (text left) */}
        <AltSection
          title={PERSPECTIVES[0].t}
          paras={PERSPECTIVES[0].paras}
          image={c.imgSystems || IMAGES.fourPeople.src}
          alt={IMAGES.fourPeople.alt}
          imageLeft={false}
        />
        {/* 3 — Bridging Strategy, Operations, and Technology (image left) */}
        <AltSection
          title={PERSPECTIVES[1].t}
          paras={PERSPECTIVES[1].paras}
          image={c.imgBridging || IMAGES.presentation.src}
          alt={IMAGES.presentation.alt}
          imageLeft={true}
        />
        {/* 4 — Experience That Shapes Our Approach (text left) */}
        <AltSection
          title={PERSPECTIVES[2].t}
          paras={PERSPECTIVES[2].paras}
          image={c.imgExperience || IMAGES.meeting.src}
          alt={IMAGES.meeting.alt}
          imageLeft={false}
        />
        {/* 5 — Building Capability, Not Dependency (image left) */}
        <AltSection
          title={PERSPECTIVES[3].t}
          paras={PERSPECTIVES[3].paras}
          image={c.imgCapability || IMAGES.devTeam.src}
          alt={IMAGES.devTeam.alt}
          imageLeft={true}
        />
      </div>

      {/* Representative experiences (heading removed per brief) */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-12 sm:py-16" aria-label="Representative experiences">
        <div className="wrap">
          <p className="mx-auto max-w-3xl text-center leading-relaxed text-muted">
            A selection of engagements that illustrate how our capabilities have been developed through executive
            leadership, strategic initiatives, and business and technology transformation across financial
            services, aerospace, public sector, logistics, technology, and media. Select any engagement to read
            more.
          </p>
          <div className="mt-12">
            <ExperienceList items={REPRESENTATIVE} />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-y border-white/[0.06] bg-night-900/60 py-12 sm:py-16" aria-labelledby="certs-title">
        <div className="wrap">
          <SectionHead id="certs-title" pill="Credentials" title="Professional Certifications" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((v) => (
              <div key={v.t} className="card card-hover p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                  <Icon name="shield" className="h-5 w-5" />
                </span>
                <h3 className="h-display mt-4 text-base">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognitions */}
      <section className="wrap py-12 sm:py-16" aria-labelledby="recognitions-title">
        <SectionHead id="recognitions-title" pill="Recognition" title="Selected Recognitions" />
        <ul className="mx-auto mt-12 max-w-3xl space-y-4">
          {RECOGNITIONS.map((v) => (
            <li key={v.t} className="card flex items-start gap-4 p-6">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{v.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{v.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Looking Forward */}
      <section className="border-t border-white/[0.06] bg-night-900/60 py-12 sm:py-16" aria-labelledby="forward-title">
        <div className="wrap mx-auto max-w-3xl">
          <SectionHead id="forward-title" pill="Looking forward" title="Looking Forward" center={false} />
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              As organizations continue to evolve, the ability to align strategy, operations, governance,
              technology, and execution will remain a critical differentiator. We are committed to helping our
              clients navigate complexity, strengthen organizational capability, and achieve sustainable results
              through disciplined management, structured execution, and practical business leadership.
            </p>
            <p>
              Our focus remains simple: helping organizations turn strategic objectives into measurable outcomes
              while building the operational foundations necessary for long-term success.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's discuss your objectives"
        sub="Compublue welcomes the opportunity to learn about your organization and explore how we can help."
        cta="Start the conversation"
      />
    </div>
  );
}
