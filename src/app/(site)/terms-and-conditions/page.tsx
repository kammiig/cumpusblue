import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PAGE_DEFAULTS } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["terms-and-conditions"];
  return pageMetadata("terms-and-conditions", {
    title: d.seoTitle,
    description: d.seoDesc,
    path: "/terms-and-conditions",
  });
}

export default function TermsPage() {
  return (
    <article className="wrap max-w-3xl py-16 sm:py-24">
      <h1 className="h-display text-4xl">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-muted">Last updated: July 2026</p>

      <div className="prose-dark mt-10">
        <h2>1. About these terms</h2>
        <p>
          These terms govern your use of the compublue.com website, operated by CompuBlue, Inc.
          (“CompuBlue”, “we”, “us”). By using this website you agree to these terms. Services we
          provide to clients are governed by separate written agreements.
        </p>

        <h2>2. Use of the website</h2>
        <p>
          You may use this website for lawful purposes only. You agree not to attempt to gain
          unauthorized access to any part of the site, interfere with its operation, or use it
          to transmit harmful or unlawful content.
        </p>

        <h2>3. Content and intellectual property</h2>
        <p>
          All content on this website — text, graphics, logos and software — is the property of
          CompuBlue or its licensors and is protected by copyright and trademark law. You may
          not reproduce or redistribute it without our written permission. Photography is used
          under license from its respective owners.
        </p>

        <h2>4. Information, not advice</h2>
        <p>
          Content on this website is provided for general information. It does not constitute
          professional advice, and project outcomes described in case studies do not guarantee
          similar results for other engagements.
        </p>

        <h2>5. Enquiries</h2>
        <p>
          Submitting an enquiry through this website does not create a client relationship or
          any obligation on either party. Client engagements begin only when both parties sign a
          written agreement.
        </p>

        <h2>6. Third-party links and tools</h2>
        <p>
          This website may link to third-party websites and uses third-party analytics tools
          described in our <a href="/privacy-policy">Privacy Policy</a>. We are not responsible
          for the content or practices of third parties.
        </p>

        <h2>7. Disclaimer and limitation of liability</h2>
        <p>
          This website is provided “as is” without warranties of any kind. To the maximum extent
          permitted by law, CompuBlue will not be liable for any indirect, incidental or
          consequential damages arising from your use of this website.
        </p>

        <h2>8. Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the website after
          changes are posted constitutes acceptance of the updated terms.
        </p>

        <h2>9. Governing law</h2>
        <p>
          These terms are governed by the laws of the State of California, without regard to
          conflict-of-law principles.
        </p>

        <h2>10. Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:contact@compublue.com">contact@compublue.com</a>.
        </p>
      </div>
    </article>
  );
}
