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
      <p className="mt-3 text-sm text-muted">Last updated: July 2026</p>

      <div className="prose-dark mt-10">
        <p>
          CompuBlue, Inc. (“CompuBlue”, “we”, “us”) respects your privacy. This policy explains
          what information we collect through compublue.com, how we use it, and the choices you
          have.
        </p>

        <h2>Information we collect</h2>
        <p>
          When you submit an enquiry form we collect the details you provide: name, email
          address, phone number, company, service interest, budget range and your message. We
          also collect limited technical information automatically, such as your IP address and
          pages visited, through analytics tools described below.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use enquiry details solely to respond to your request and manage our business
          relationship with you. We use analytics data to understand how the site is used and to
          improve it. We do not sell your personal information.
        </p>

        <h2>Analytics and advertising tools</h2>
        <p>
          This site may use Google Analytics 4, Meta Pixel and TikTok Pixel to measure site
          usage and the effectiveness of our marketing. These tools may set cookies and receive
          your IP address and page interactions. You can limit tracking through your browser
          settings, ad-platform preferences, or browser extensions that block trackers.
        </p>

        <h2>How long we keep information</h2>
        <p>
          Enquiry records are retained for as long as needed to handle your request and for
          reasonable business record-keeping. You may request deletion at any time.
        </p>

        <h2>Sharing</h2>
        <p>
          We share personal information only with service providers that help us operate this
          website (such as hosting and email delivery), and only to the extent needed to provide
          those services. We may disclose information if required by law.
        </p>

        <h2>Security</h2>
        <p>
          We use appropriate technical and organizational measures to protect your information,
          including encrypted transmission (HTTPS) and access controls on stored data.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct or delete the
          personal information we hold about you, including rights under the California Consumer
          Privacy Act (CCPA). To exercise these rights, contact us at{" "}
          <a href="mailto:contact@compublue.com">contact@compublue.com</a>.
        </p>

        <h2>Children</h2>
        <p>
          This website is intended for business audiences and is not directed at children under
          13. We do not knowingly collect information from children.
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
