import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PAGE_DEFAULTS } from "@/lib/content";
import { CookiePreferencesButton } from "@/components/CookieConsent";

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
    <article className="wrap max-w-3xl py-16 sm:py-20">
      <h1 className="h-display text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: August 2026</p>

      <div className="prose-dark mt-10">
        <h2>1. Our Privacy Philosophy</h2>
        <p>
          At Compublue, we believe in being transparent about what information is collected through this
          website, why it is collected, and how it is used.
        </p>
        <p>
          Compublue is committed to maintaining the smallest practical privacy footprint. We collect only the
          information necessary to operate the website, respond to visitor inquiries, protect the website, and
          improve it through optional Analytics Cookies.
        </p>

        <h2>2. Information We Collect</h2>
        <p>The Compublue website collects information in only two ways.</p>
        <h3>Information Submitted by Visitors</h3>
        <p>
          If you contact Compublue through the{" "}
          <Link href="/contact">Contact page</Link>, certain information is requested so that we can understand
          your inquiry and respond appropriately.
        </p>
        <p>Depending on the information requested by the Contact form, this may include:</p>
        <ul>
          <li>Name</li>
          <li>Company</li>
          <li>Email address</li>
          <li>Telephone number (if applicable)</li>
          <li>Subject</li>
          <li>Message</li>
          <li>Any additional information you choose to include in your inquiry</li>
        </ul>
        <h3>Website Usage Information</h3>
        <p>
          If you choose to enable Analytics Cookies, the website may collect aggregate information about how
          visitors use the website, such as page visits, navigation patterns, and general website usage
          statistics.
        </p>
        <p>
          This information helps Compublue improve the website over time. It is not used for advertising,
          marketing, visitor profiling, or associated with information submitted through the Contact page.
        </p>

        <h2>3. How We Use Information</h2>
        <p>Information collected through this website is used only to:</p>
        <ul>
          <li>Operate and maintain the website.</li>
          <li>Protect the website from spam, abuse, and security threats.</li>
          <li>Respond to inquiries submitted through the Contact page.</li>
          <li>Improve the website through aggregate analytics when Analytics Cookies have been enabled.</li>
        </ul>
        <p>Compublue does not sell personal information collected through this website.</p>

        <h2>4. Cookies</h2>
        <p>The Compublue website uses only two categories of cookies.</p>
        <h3>Essential Cookies</h3>
        <p>
          Essential Cookies are required for the secure operation and normal functionality of the website.
          These cookies support functions such as website security, remembering cookie preferences, protecting
          the Contact form, and maintaining administrator sessions.
        </p>
        <p>Essential Cookies are always enabled.</p>
        <h3>Analytics Cookies (Optional)</h3>
        <p>
          Analytics Cookies help Compublue understand aggregate website usage so that the website can be
          improved over time.
        </p>
        <p>Analytics Cookies are:</p>
        <ul>
          <li>Optional.</li>
          <li>Enabled only with your consent.</li>
          <li>Never required for normal website operation.</li>
        </ul>
        <p>
          You may enable or disable Analytics Cookies at any time through the{" "}
          <CookiePreferencesButton className="text-brand-300 underline underline-offset-4 hover:text-brand-400" />{" "}
          link located in the website footer.
        </p>

        <h2>5. Service Providers</h2>
        <p>
          Compublue may use carefully selected third-party service providers to support operation of the
          website, including services such as website hosting, security, email delivery, content delivery
          networks (CDNs), and website analytics.
        </p>
        <p>
          These providers perform services on behalf of Compublue only as necessary to support operation of the
          website.
        </p>

        <h2>6. Information Sharing</h2>
        <p>
          Compublue shares information only when reasonably necessary to respond to your inquiry or to provide
          services you have requested.
        </p>
        <p>
          Where appropriate, information may be shared with trusted business partners or service providers whose
          participation is necessary to support your request. Compublue seeks to limit such sharing to the
          minimum information reasonably necessary for that purpose.
        </p>
        <p>
          Compublue does not sell personal information and does not share personal information for advertising or
          cross-context behavioral advertising purposes.
        </p>

        <h2>7. Your Choices</h2>
        <p>You may choose whether to enable Analytics Cookies.</p>
        <p>
          You may change your{" "}
          <CookiePreferencesButton className="text-brand-300 underline underline-offset-4 hover:text-brand-400" />{" "}
          at any time using the Cookie Preferences link located in the footer of the website.
        </p>

        <h2>8. Data Security</h2>
        <p>
          Compublue uses reasonable administrative, technical, and operational measures designed to protect
          information submitted through this website.
        </p>
        <p>
          Although no method of electronic transmission or storage can guarantee absolute security, Compublue
          strives to safeguard the information entrusted to us.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          This Privacy Policy may be updated periodically to reflect changes in website functionality, privacy
          practices, or applicable legal requirements.
        </p>
        <p>The current version will always be available on this website.</p>

        <h2>10. Contact Information and Privacy Questions</h2>
        <p>
          If you have questions regarding this Privacy Policy or the privacy practices of this website, please
          contact Compublue using the <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </article>
  );
}
