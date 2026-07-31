"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * GDPR-style cookie consent. Nothing non-essential (analytics / marketing) runs
 * until the visitor opts in. The decision is stored in localStorage (not a
 * cookie) so no non-essential storage is written before consent. Analytics.tsx
 * reads the same state and only injects trackers when the matching category is
 * allowed.
 */

export type Consent = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "cc_consent_v1";
export const CONSENT_EVENT = "cc:change";
export const OPEN_EVENT = "cc:open";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    return { analytics: !!v.analytics, marketing: !!v.marketing };
  } catch {
    return null;
  }
}

function writeConsent(c: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, ts: Date.now() }));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  if (!c.analytics || !c.marketing) clearNonEssentialCookies(c);
}

/** Best-effort removal of known non-essential cookies when a category is denied. */
function clearNonEssentialCookies(c: Consent) {
  const names: string[] = [];
  if (!c.analytics) names.push("_ga", "_gid", "_gat");
  if (!c.marketing) names.push("_fbp", "_fbc", "_ttp");
  const host = window.location.hostname;
  const domains = ["", host, "." + host, "." + host.split(".").slice(-2).join(".")];
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0]?.trim();
    if (!name) continue;
    if (names.includes(name) || names.some((n) => name.startsWith(n))) {
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  }
}

/** Footer link that reopens the preferences dialog. */
export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie preferences
    </button>
  );
}

export function CookieConsent() {
  const [decided, setDecided] = useState(true); // assume decided until mount check
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setDecided(true);
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    } else {
      setDecided(false);
    }
    function onOpen() {
      const cur = readConsent();
      setAnalytics(cur?.analytics ?? false);
      setMarketing(cur?.marketing ?? false);
      setShowPrefs(true);
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const finish = useCallback((c: Consent) => {
    writeConsent(c);
    setAnalytics(c.analytics);
    setMarketing(c.marketing);
    setDecided(true);
    setShowPrefs(false);
  }, []);

  // Escape closes the preferences dialog
  useEffect(() => {
    if (!showPrefs) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShowPrefs(false);
    }
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [showPrefs]);

  const bannerVisible = !decided && !showPrefs;

  return (
    <>
      {/* Banner */}
      {bannerVisible && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/15 bg-night-950 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]"
        >
          <div className="wrap flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200">
              We use cookies to run this site and, with your consent, to understand traffic and improve
              your experience. Essential cookies are always on. See our{" "}
              <a href="/privacy-policy" className="text-brand-300 underline underline-offset-2 hover:text-brand-400">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="btn-ghost !min-h-0 !px-5 !py-2.5 text-sm"
              >
                Manage preferences
              </button>
              <button
                type="button"
                onClick={() => finish({ analytics: false, marketing: false })}
                className="btn-ghost !min-h-0 !px-5 !py-2.5 text-sm"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => finish({ analytics: true, marketing: true })}
                className="btn-primary !min-h-0 !px-5 !py-2.5 text-sm"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences dialog */}
      {showPrefs && (
        <div className="fixed inset-0 z-[95] flex items-end justify-center bg-black/70 p-4 sm:items-center">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cc-title"
            tabIndex={-1}
            className="w-full max-w-lg rounded-2xl border border-white/15 bg-night-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] outline-none sm:p-8"
          >
            <h2 id="cc-title" className="h-display text-xl">Cookie preferences</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Choose which cookies we may use. You can change this anytime from the footer.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                <input type="checkbox" checked disabled className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10" />
                <div>
                  <p className="text-sm font-semibold text-ink">Essential</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    Required for security and core functionality. Always active.
                  </p>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/[0.05] accent-brand-500"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">Analytics</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    Helps us understand how the site is used so we can improve it.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/[0.05] accent-brand-500"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">Marketing</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    Used to measure campaigns and show more relevant messaging.
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-7 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => finish({ analytics: false, marketing: false })}
                className="btn-ghost !min-h-0 !px-5 !py-2.5 text-sm"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => finish({ analytics, marketing })}
                className="btn-primary !min-h-0 !px-5 !py-2.5 text-sm"
              >
                Save preferences
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              See our{" "}
              <a href="/privacy-policy" className="text-brand-300 underline underline-offset-2 hover:text-brand-400">
                Privacy Policy
              </a>{" "}
              for details.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
