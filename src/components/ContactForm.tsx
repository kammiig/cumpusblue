"use client";

import { useState, useRef } from "react";

const SERVICES = [
  "AI Automation Solutions",
  "SaaS Product Development",
  "Custom Business Dashboards",
  "AI Chatbots & Virtual Assistants",
  "CRM / ERP Automation",
  "Website & Web App Development",
  "Data Analytics & Reporting",
  "Cloud Integration & API Development",
  "Digital Marketing Automation",
  "AI-Powered Lead Generation",
  "Not sure yet",
];

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not decided",
];

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          elapsedMs: Date.now() - startedAt.current,
          page: window.location.pathname,
        }),
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
        <h3 className="h-display mt-4 text-xl">Thank you — we received your enquiry</h3>
        <p className="mt-2 text-sm text-muted">
          A member of our team will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} aria-describedby={error ? "form-error" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label">
            Full name <span aria-hidden="true" className="text-brand-300">*</span>
          </label>
          <input id="cf-name" name="name" required autoComplete="name" className="field" placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="cf-email" className="label">
            Work email <span aria-hidden="true" className="text-brand-300">*</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className="field" placeholder="jane@company.com" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="label">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className="field" placeholder="+1 (555) 000-0000" />
        </div>
        <div>
          <label htmlFor="cf-company" className="label">Company</label>
          <input id="cf-company" name="company" autoComplete="organization" className="field" placeholder="Company, Inc." />
        </div>
        <div>
          <label htmlFor="cf-service" className="label">Service required</label>
          <select id="cf-service" name="service" className="field" defaultValue={defaultService}>
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className="label">Estimated budget</label>
          <select id="cf-budget" name="budget" className="field" defaultValue="">
            <option value="">Select a range…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="label">
            Project details <span aria-hidden="true" className="text-brand-300">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            className="field resize-y"
            placeholder="What are you trying to build or automate? What does success look like?"
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
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mt-3 text-xs text-muted">
        We reply within one business day. Your details are never shared — see our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-brand-300">privacy policy</a>.
      </p>
    </form>
  );
}
