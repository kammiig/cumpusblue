"use client";

import { useEffect, useRef, useState } from "react";

/** Interest options, grouped into three categories (see content brief). */
const INTEREST_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Executive Advisory & Management Consulting",
    options: [
      "Executive Advisory",
      "Enterprise Transformation",
      "Portfolio & Program Management",
      "PMO & Governance",
      "M&A & Operational Readiness",
      "Strategic Initiative Assessment",
    ],
  },
  {
    label: "Technology Solution Delivery",
    options: [
      "Solution Architecture",
      "Software Solution Delivery",
      "Systems Integration",
      "Database Modernization",
      "Application Modernization",
      "Cloud & Infrastructure",
      "Technical Leadership",
    ],
  },
  {
    label: "Other",
    options: ["General Inquiry", "Other"],
  },
];

const PREFERRED_CONTACT = ["Email", "Phone", "Either"];

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

// Minimal typing for the reCAPTCHA v3 global.
type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};
declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export function ContactForm({ defaultInterest = "" }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  // Interest(s) multi-select (custom themed dropdown of checkboxes)
  const [interests, setInterests] = useState<string[]>(defaultInterest ? [defaultInterest] : []);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const interestsRef = useRef<HTMLDivElement>(null);

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  // Close the interests dropdown on outside click / Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (interestsRef.current && !interestsRef.current.contains(e.target as Node)) {
        setInterestsOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setInterestsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Load the reCAPTCHA v3 script once, only when a site key is configured.
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    if (document.querySelector('script[data-recaptcha="v3"]')) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.dataset.recaptcha = "v3";
    document.head.appendChild(s);
  }, []);

  async function getRecaptchaToken(): Promise<string> {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return "";
    try {
      return await new Promise<string>((resolve) => {
        window.grecaptcha!.ready(() => {
          window
            .grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "contact" })
            .then(resolve)
            .catch(() => resolve(""));
        });
      });
    } catch {
      return "";
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      preferredContact: String(fd.get("preferredContact") || ""),
      interests,
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""), // honeypot
      elapsedMs: Date.now() - startedAt.current,
      page: window.location.pathname,
      recaptchaToken: await getRecaptchaToken(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("ok");
      form.reset();
      setInterests([]);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="card p-8 text-center" role="status">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="h-display mt-4 text-xl">Thank you for contacting Compublue.</h3>
        <p className="mt-2 text-sm text-muted">We look forward to speaking with you.</p>
      </div>
    );
  }

  const interestsLabel =
    interests.length === 0
      ? "Select all that apply…"
      : interests.length <= 2
        ? interests.join(", ")
        : `${interests.length} selected`;

  return (
    <form onSubmit={onSubmit} aria-describedby={error ? "form-error" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-first" className="label">
            First name <span aria-hidden="true" className="text-brand-300">*</span>
          </label>
          <input id="cf-first" name="firstName" required autoComplete="given-name" className="field" placeholder="Jane" />
        </div>
        <div>
          <label htmlFor="cf-last" className="label">
            Last name <span aria-hidden="true" className="text-brand-300">*</span>
          </label>
          <input id="cf-last" name="lastName" required autoComplete="family-name" className="field" placeholder="Smith" />
        </div>
        <div>
          <label htmlFor="cf-email" className="label">
            Email <span aria-hidden="true" className="text-brand-300">*</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className="field" placeholder="jane@company.com" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="label">Phone number</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className="field" placeholder="+1 (555) 000-0000" />
        </div>
        <div>
          <label htmlFor="cf-preferred" className="label">Preferred contact method</label>
          <select id="cf-preferred" name="preferredContact" className="field" defaultValue="">
            <option value="">Select a method…</option>
            {PREFERRED_CONTACT.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Interest(s) — themed multi-select dropdown */}
        <div>
          <span className="label" id="cf-interests-label">Interest(s)</span>
          <div className="relative" ref={interestsRef}>
            <button
              type="button"
              className="field flex w-full items-center justify-between gap-2 text-left"
              aria-haspopup="listbox"
              aria-expanded={interestsOpen}
              aria-labelledby="cf-interests-label"
              onClick={() => setInterestsOpen((v) => !v)}
            >
              <span className={interests.length ? "text-ink" : "text-muted"}>{interestsLabel}</span>
              <svg
                viewBox="0 0 20 20"
                className={`h-4 w-4 shrink-0 text-muted transition-transform ${interestsOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {interestsOpen && (
              <div
                role="listbox"
                aria-multiselectable="true"
                className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-white/10 bg-night-850 p-2 shadow-card"
              >
                {INTEREST_GROUPS.map((g) => (
                  <div key={g.label} className="mb-1 last:mb-0">
                    <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-300">
                      {g.label}
                    </p>
                    {g.options.map((o) => {
                      const checked = interests.includes(o);
                      return (
                        <label
                          key={o}
                          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-ink transition hover:bg-white/[0.05]"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleInterest(o)}
                            className="h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.05] accent-brand-500"
                          />
                          {o}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {interests.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {interests.map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/25 bg-brand-500/10 px-2.5 py-1 text-xs text-brand-200"
                >
                  {i}
                  <button
                    type="button"
                    aria-label={`Remove ${i}`}
                    onClick={() => toggleInterest(i)}
                    className="text-brand-300 hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="mt-1.5 text-xs text-muted">Select all that apply.</p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="label">
            Message <span aria-hidden="true" className="text-brand-300">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            className="field resize-y"
            placeholder="Tell us about your organization, your objectives, and how we may be able to assist."
          />
        </div>
      </div>

      {/* Honeypot — hidden from real users, tempting for bots */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p id="form-error" role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Your details are never shared — see our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-brand-300">privacy policy</a>.
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-brand-300"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-brand-300"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
}
