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
    const interests = fd.getAll("interests").map(String).filter(Boolean);

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
        <div>
          <label htmlFor="cf-interests" className="label">Interest(s)</label>
          <select
            id="cf-interests"
            name="interests"
            multiple
            size={8}
            defaultValue={defaultInterest ? [defaultInterest] : []}
            className="field resize-y !h-auto"
          >
            {INTEREST_GROUPS.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted">
            Hold Ctrl (Windows) or Cmd (Mac) to select more than one item.
          </p>
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
      <p className="mt-3 text-xs text-muted">
        Protected by reCAPTCHA. Your details are never shared — see our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-brand-300">privacy policy</a>.
      </p>
    </form>
  );
}
