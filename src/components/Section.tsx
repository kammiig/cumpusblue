import Link from "next/link";
import { Icon } from "./Icons";

export function SectionHead({
  pill,
  title,
  sub,
  center = true,
  as: Tag = "h2",
  id,
}: {
  pill?: string;
  title: string;
  sub?: string;
  center?: boolean;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {pill && (
        <p className="pill mb-5">
          <span className="pill-dot" aria-hidden="true" />
          {pill}
        </p>
      )}
      <Tag
        id={id}
        className={`h-display text-balance ${
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </Tag>
      {sub && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{sub}</p>}
    </div>
  );
}

export function CtaBand({
  title = "Ready to strengthen how your organization executes?",
  sub = "Compublue welcomes the opportunity to discuss your objectives and explore how we can help.",
  cta = "Contact us to start the conversation",
}: {
  title?: string;
  sub?: string;
  cta?: string;
}) {
  return (
    <section aria-labelledby="cta-band-title" className="wrap py-20 sm:py-24">
      <div className="card relative overflow-hidden px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(27,157,228,0.22),transparent_70%)]"
        />
        <div className="relative">
          <h2 id="cta-band-title" className="h-display mx-auto max-w-2xl text-balance text-3xl sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              {cta} <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-ghost">
              Explore our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
