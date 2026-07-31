import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PAGE_DEFAULTS } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["privacy-policy"];
  return pageMetadata("privacy-policy", {
    title: d.seoTitle,
    description: d.seoDesc,
    path: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <article className="wrap max-w-3xl py-16 sm:py-24">
      <h1 className="h-display text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: August 2026</p>

      <div className="prose-dark mt-10">
        <p>
          Compublue, Inc. (“Compublue”, “we”, “us”) respects your privacy. This policy explains
          what information we collect through compublue.com, how we use it, and the choices you
          have.
        </p>

        <h2>Information we collect</h2>
        <p>
          We collect information you choose to provide through our Contact page or any other
          submission method available on this website. We may also collect limited technical
          information, such as your IP address and the pages you visit, through server logs and
          the analytics tools described below. Non-essential analytics operate only as permitted
          by your cookie choices.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use the information we collect to respond to your requests and inquiries, manage our
          business relationship with you, operate and secure the website, comply with applicable
          legal obligations, and establish or defend legal claims. Subject to your cookie choices,
          we use analytics data to understand how the site is used and improve it. We do not sell
          your personal information. We disclose personal information only as described in the
          Sharing section, when legally required to do so, or with your written permission.
        </p>

        <h2>Analytics and Cookies</h2>
        <p>
          We may use analytics tools to understand how visitors use this website. Where consent is
          required, non-essential analytics or advertising technologies will not load unless you
          choose to accept them. You can accept, reject, or manage non-essential cookies through
          our cookie banner and change your choices at any time using the Cookie Preferences link
          in the footer. The specific tools and cookies currently in use, including their
          providers, purposes, and retention periods, are identified below.
        </p>
        <p>
          As of the last update, optional analytics and advertising technologies are not enabled by
          default; they load only if we configure them and you accept the corresponding category.
          Honoring a recognized browser privacy signal (such as Global Privacy Control) is treated
          as a choice to decline non-essential cookies.
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/15 text-muted">
                <th className="py-2 pr-4 font-semibold">Provider / item</th>
                <th className="py-2 pr-4 font-semibold">Category</th>
                <th className="py-2 pr-4 font-semibold">Purpose</th>
                <th className="py-2 pr-4 font-semibold">Storage</th>
                <th className="py-2 font-semibold">Retention</th>
              </tr>
            </thead>
            <tbody className="align-top text-muted [&>tr]:border-b [&>tr]:border-white/[0.06]">
              <tr>
                <td className="py-2 pr-4 text-ink">Cookie preference</td>
                <td className="py-2 pr-4">Essential</td>
                <td className="py-2 pr-4">Stores your cookie choice so the banner does not reappear</td>
                <td className="py-2 pr-4">Browser localStorage (cc_consent_v1)</td>
                <td className="py-2">Until you clear it</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-ink">Admin session (staff only)</td>
                <td className="py-2 pr-4">Essential</td>
                <td className="py-2 pr-4">Authenticates administrator logins to the dashboard</td>
                <td className="py-2 pr-4">Cookie (cb_admin_session, httpOnly)</td>
                <td className="py-2">~7 days</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-ink">Google reCAPTCHA (if enabled)</td>
                <td className="py-2 pr-4">Security</td>
                <td className="py-2 pr-4">Spam and bot protection on the Contact form</td>
                <td className="py-2 pr-4">Google cookies</td>
                <td className="py-2">Per Google’s policy</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-ink">Google Analytics 4 (if enabled)</td>
                <td className="py-2 pr-4">Analytics</td>
                <td className="py-2 pr-4">Measures how the website is used</td>
                <td className="py-2 pr-4">Cookies (_ga, _gid)</td>
                <td className="py-2">Up to ~24 months</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-ink">Meta Pixel / TikTok Pixel (if enabled)</td>
                <td className="py-2 pr-4">Marketing</td>
                <td className="py-2 pr-4">Campaign measurement</td>
                <td className="py-2 pr-4">Cookies (_fbp, _ttp)</td>
                <td className="py-2">Up to ~13 months</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-ink">Hosting, database, email &amp; image delivery</td>
                <td className="py-2 pr-4">Essential (service providers)</td>
                <td className="py-2 pr-4">
                  Deliver the site and process submissions (Vercel hosting, our database and SMTP
                  email provider, and the Pexels image CDN). These process technical data such as
                  IP address but do not set advertising cookies.
                </td>
                <td className="py-2 pr-4">Server logs / provider systems</td>
                <td className="py-2">Per provider</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How long we keep information</h2>
        <p>
          We retain personal information only for as long as reasonably necessary to address
          inquiries, manage an actual or potential business relationship, comply with legal
          obligations, resolve disputes, and enforce agreements. Retention periods may vary
          according to the nature and purpose of the information. When information is no longer
          required, we delete or de-identify it in accordance with our retention procedures.
        </p>

        <h2>Sharing</h2>
        <p>
          We share personal information only with service providers that help us operate this
          website (such as hosting and email delivery), and only to the extent needed to provide
          those services. We may disclose information if legally required to do so.
        </p>

        <h2>Security</h2>
        <p>
          We use appropriate technical and organizational measures to protect your information,
          including encrypted transmission (HTTPS) and access controls on stored data.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to ask whether we hold personal
          information about you and to request a copy, correction, or deletion of that information,
          or to object to or restrict certain uses. To protect your information, we may take
          reasonable steps to verify your identity before responding. These rights are subject to
          applicable law and exceptions. To submit a request, please contact us using the contact
          details provided in this policy.
        </p>

        <h2>Children</h2>
        <p>
          This website is intended for business and professional audiences and is not directed to
          children under 16. We do not knowingly collect personal information from children under
          16. If you believe that a child has provided personal information to us, please contact
          us so that we can address the matter and delete the information where appropriate.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be reflected by the
          “Last updated” date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:contact@compublue.com">contact@compublue.com</a> or call{" "}
          <a href="tel:+18186628800">+1 (818) 662-8800</a>.
        </p>
      </div>
    </article>
  );
}
