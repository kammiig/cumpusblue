import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { CookiePreferencesButton } from "./CookieConsent";

type ServiceLink = { title: string; slug: string };

export function Footer({
  services,
  contact,
}: {
  services: ServiceLink[];
  contact: { email: string; phone: string; address: string };
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-night-900">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <ul className="mt-6 space-y-3 text-base">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2.5 text-muted transition hover:text-brand-300"
              >
                <Icon name="mail" className="h-5 w-5 shrink-0 text-brand-400" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2.5 text-muted transition hover:text-brand-300"
              >
                <Icon name="phone" className="h-5 w-5 shrink-0 text-brand-400" />
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-muted">
              <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <address className="not-italic leading-relaxed">{contact.address}</address>
            </li>
          </ul>
        </div>

        <nav aria-label="Services">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-base text-muted transition hover:text-brand-300"
                >
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="text-base font-semibold text-brand-300 hover:text-brand-400">
                All services →
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              ["Our Approach", "/our-approach"],
              ["About Us", "/about"],
              ["Services", "/services"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-base text-muted transition hover:text-brand-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
            Start the conversation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Tell us about your organization and objectives. We welcome the
            opportunity to discuss how we can help.
          </p>
          <Link href="/contact" className="btn-primary mt-5">
            Contact us
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>© {year} Compublue, Inc. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
                <CookiePreferencesButton className="transition hover:text-brand-300" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
