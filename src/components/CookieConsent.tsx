"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cookie consent for Compublue Version 1. Two categories only: Essential
 * (always on) and Analytics (optional, off until the visitor consents). Nothing
 * non-essential runs before consent. The decision is stored in localStorage
 * (not a cookie). Analytics.tsx reads the same state and only loads Google
 * Analytics when analytics consent is granted.
 */

export type Consent = { analytics: boolean };

const STORAGE_KEY = "cc_consent_v1";
export const CONSENT_EVENT = "cc:change";
export const OPEN_EVENT = "cc:open";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    return { analytics: !!v.analytics };
  } catch {
    return null;
  }
}

function writeConsent(c: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: c.analytics, ts: Date.now() }));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  if (!c.analytics) clearAnalyticsCookies();
}

/** Best-effort removal of known analytics cookies when analytics is declined. */
function clearAnalyticsCookies() {
  const names = ["_ga", "_gid", "_gat"];
  const host = window.location.hostname;
  const domains = ["", host, "." + host, "." + host.split(".").slice(-2).join(".")];
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0]?.trim();
    if (!name) continue;
    if (names.some((n) => name === n || name.startsWith(n))) {
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
      Cookie Preferences
    </button>
  );
}

export function CookieConsent() {
  const [decided, setDecided] = useState(true); // assume decided until the mount check runs
  const [showPrefs, setShowPrefs] = useState(false);
  // Working copy for the dialog — committed only on "Save Preferences".
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const finish = useCallback((c: Consent) => {
    writeConsent(c);
    setDecided(true);
    setShowPrefs(false);
  }, []);

  const openDialog = useCallback(() => {
    openerRef.current = (document.activeElement as HTMLElement) ?? null;
    setDraftAnalytics(readConsent()?.analytics ?? false); // fresh working copy from stored prefs
    setShowPrefs(true);
  }, []);

  // Cancel = discard working copy, keep stored preferences, close. Never saves.
  const cancelDialog = useCallback(() => {
    setShowPrefs(false);
    openerRef.current?.focus();
  }, []);

  const saveDialog = useCallback(() => {
    finish({ analytics: draftAnalytics });
    openerRef.current?.focus();
  }, [draftAnalytics, finish]);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setDecided(true);
    } else if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) {
      // Honor Global Privacy Control as a request to decline non-essential cookies.
      finish({ analytics: false });
    } else {
      setDecided(false);
    }
    function onOpen() {
      openDialog();
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [finish, openDialog]);

  // Dialog: Escape cancels; Tab is trapped inside the dialog; focus the dialog on open.
  useEffect(() => {
    if (!showPrefs) return;
    const node = dialogRef.current;
    node?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        cancelDialog();
        return;
      }
      if (e.key === "Tab" && node) {
        const focusable = node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showPrefs, cancelDialog]);

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
          <div className="wrap py-5">
            <div className="mx-auto max-w-3xl space-y-2 text-sm leading-relaxed text-slate-200">
              <p>
                Compublue uses Essential Cookies required for the secure operation of this website and
                optional Analytics Cookies that help us understand how visitors use our website in aggregate
                so that we can continue improving it.
              </p>
              <p>
                Analytics Cookies are used only with your consent and are never associated with information
                submitted through the Contact page.
              </p>
              <p>
                For more information about how we use cookies and protect your privacy, please see our{" "}
                <a href="/privacy-policy" className="text-brand-300 underline underline-offset-2 hover:text-brand-400">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="mx-auto mt-5 flex max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={openDialog}
                className="btn-ghost w-full !min-h-[44px] !px-5 !py-2.5 sm:w-auto"
              >
                Cookie Preferences
              </button>
              <button
                type="button"
                onClick={() => finish({ analytics: false })}
                className="btn-ghost w-full !min-h-[44px] !px-5 !py-2.5 sm:w-auto"
              >
                Accept Only Essential Cookies
              </button>
              <button
                type="button"
                onClick={() => finish({ analytics: true })}
                className="btn-primary w-full !min-h-[44px] !px-5 !py-2.5 sm:w-auto"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences dialog */}
      {showPrefs && (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-center bg-black/70 p-4 sm:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelDialog(); // backdrop click = cancel
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cc-title"
            aria-describedby="cc-desc"
            tabIndex={-1}
            className="w-full max-w-lg rounded-2xl border border-white/15 bg-night-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] outline-none sm:p-8"
          >
            <h2 id="cc-title" className="h-display text-xl">Cookie Preferences</h2>
            <p id="cc-desc" className="mt-2 text-sm leading-relaxed text-muted">
              Analytics Cookies are optional and off until you enable them. Your choice is saved only when you
              select Save Preferences.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                <input type="checkbox" checked disabled aria-label="Essential Cookies (always enabled)" className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10" />
                <div>
                  <p className="text-sm font-semibold text-ink">Essential Cookies</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    Required for website security and core functionality.
                  </p>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                <input
                  type="checkbox"
                  checked={draftAnalytics}
                  onChange={(e) => setDraftAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/[0.05] accent-brand-500"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">Analytics Cookies (Optional)</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    Helps Compublue understand aggregate website usage so the website can be improved over time.
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-7 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={cancelDialog}
                className="btn-ghost !min-h-[44px] !px-5 !py-2.5 text-base"
              >
                Cancel Changes
              </button>
              <button
                type="button"
                onClick={saveDialog}
                className="btn-primary !min-h-[44px] !px-5 !py-2.5 text-base"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
