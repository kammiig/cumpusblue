"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type Consent } from "./CookieConsent";

/**
 * Consent-gated analytics. Version 1 uses only Google Analytics 4, and it loads
 * exclusively when (a) a GA4 Measurement ID is configured AND (b) the visitor
 * has granted Analytics consent. No marketing/advertising pixels are used.
 */
export function Analytics({ ga4Id }: { ga4Id?: string }) {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    function onChange(e: Event) {
      const detail = (e as CustomEvent<Consent>).detail;
      setConsent(detail ?? readConsent());
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!consent?.analytics || !ga4Id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
