"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icon } from "./Icons";

type ServiceLink = { title: string; slug: string };

const NAV = [
  { href: "/about", label: "About" },
  { href: "/saas-solutions", label: "SaaS Solutions" },
  { href: "/ai-solutions", label: "AI Solutions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Insights" },
];

export function Header({ services }: { services: ServiceLink[] }) {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const pathname = usePathname();
  const svcRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  // Close services dropdown on outside click / Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSvcOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkCls = (href: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      pathname === href ? "text-brand-300" : "text-muted hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-night-950/80 backdrop-blur-xl">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          <div className="relative" ref={svcRef}>
            <button
              type="button"
              className={`${linkCls("/services")} inline-flex items-center gap-1.5`}
              aria-expanded={svcOpen}
              aria-haspopup="true"
              onClick={() => setSvcOpen((v) => !v)}
            >
              Services
              <svg
                viewBox="0 0 20 20"
                className={`h-3.5 w-3.5 transition-transform ${svcOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {svcOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[540px] -translate-x-1/2 rounded-2xl border border-white/10 bg-night-850 p-3 shadow-card">
                <ul className="grid grid-cols-2 gap-1">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="block rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-white/[0.05] hover:text-ink"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 border-t border-white/[0.07] pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-300 hover:text-brand-400"
                  >
                    View all services <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={linkCls(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-primary !min-h-[44px] !px-6 !py-2.5">
            Get started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-white/[0.06] bg-night-950 lg:hidden"
        >
          <div className="wrap flex flex-col gap-1 py-4">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-white/[0.04]">
                Services
                <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <ul className="mb-2 ml-2 border-l border-white/10 pl-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:text-ink"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-300">
                    View all services
                  </Link>
                </li>
              </ul>
            </details>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-white/[0.04]"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-3">
              Get started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
