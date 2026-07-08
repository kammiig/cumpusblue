import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icons";

type ServiceLink = { title: string; slug: string };

export function Footer({
  services,
  contact,
}: {
  services: ServiceLink[];
  contact: { email: string; phone: string };
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-night-900">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            AI automation, SaaS product development and data platforms —
            engineered around your bottom line.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2.5 text-muted transition hover:text-brand-300"
              >
                <Icon name="mail" className="h-5 w-5 text-brand-400" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2.5 text-muted transition hover:text-brand-300"
              >
                <Icon name="phone" className="h-5 w-5 text-brand-400" />
                {contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Services">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-muted transition hover:text-brand-300"
                >
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="text-sm font-semibold text-brand-300 hover:text-brand-400">
                All services →
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              ["About", "/about"],
              ["SaaS Solutions", "/saas-solutions"],
              ["AI Solutions", "/ai-solutions"],
              ["Case Studies", "/case-studies"],
              ["Insights", "/blog"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-sm text-muted transition hover:text-brand-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
            Start a project
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Tell us what you want to automate or build. We reply within one
            business day.
          </p>
          <Link href="/contact" className="btn-primary mt-5">
            Book a free consultation
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>© {year} CompuBlue, Inc. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex gap-6">
              <li>
                <Link href="/privacy-policy" className="transition hover:text-brand-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="transition hover:text-brand-300">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="transition hover:text-brand-300">
                  Sitemap
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
