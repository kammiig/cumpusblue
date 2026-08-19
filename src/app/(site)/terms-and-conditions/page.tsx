import type { Metadata } from "next";
import Link from "next/link";
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
    <article className="wrap max-w-3xl py-12 sm:py-16">
      <h1 className="h-display text-4xl">Compublue Terms and Conditions</h1>
      <p className="mt-3 text-sm text-muted">Version 0001</p>

      <div className="prose-dark mt-10">
        <h2>1. Introduction</h2>
        <p>
          These Terms and Conditions describe the terms governing the use of the Compublue, Inc.
          website.
        </p>
        <p>
          This website is provided to introduce Compublue, describe our capabilities and experience,
          and provide visitors with a way to contact us.
        </p>

        <h2>2. Website Content</h2>
        <p>The information provided on this website is for general informational purposes.</p>
        <p>
          Compublue makes reasonable efforts to provide useful and accurate information. However,
          website content may change over time and may not always be complete, current, or applicable
          to a particular organization, project, transaction, or circumstance.
        </p>
        <p>
          Nothing on this website should be considered a guarantee of any particular business,
          operational, financial, technical, project, or other outcome.
        </p>

        <h2>3. No Professional or Contractual Relationship</h2>
        <p>
          Visiting this website, reviewing its content, or submitting an inquiry through the{" "}
          <Link href="/contact">Contact page</Link> does not by itself establish a consulting,
          advisory, fiduciary, contractual, or other professional relationship with Compublue.
        </p>
        <p>
          Any professional engagement with Compublue will be established separately through an
          appropriate agreement or other affirmative arrangement between Compublue and the client.
        </p>
        <p>
          The terms of any such engagement will be governed by the applicable agreement and not by
          these website Terms and Conditions, except where that agreement expressly provides
          otherwise.
        </p>

        <h2>4. Use of Website Content</h2>
        <p>
          Unless otherwise indicated, Compublue&apos;s original website content, including its text,
          branding, frameworks, methodologies, organization, and presentation, is owned by Compublue
          and is protected by applicable intellectual property laws.
        </p>
        <p>
          Visitors may view and use the website for legitimate personal or business informational
          purposes.
        </p>
        <p>
          Website content may not be copied, reproduced, republished, distributed, modified,
          commercially exploited, or represented as the work of another person or organization
          without appropriate authorization, except as permitted by applicable law.
        </p>
        <p>
          Compublue&rsquo;s names, logos, trademarks, and other identifying marks may not be used in a
          manner that suggests an affiliation, endorsement, or relationship that does not exist.
        </p>

        <h2>5. Acceptable Use</h2>
        <p>
          Visitors may not use this website in a manner that interferes with its operation,
          compromises its security, violates applicable law, or interferes with the use of the website
          by others.
        </p>
        <p>This includes attempts to:</p>
        <ul>
          <li>gain unauthorized access to the website, its systems, or related infrastructure;</li>
          <li>bypass or interfere with security features;</li>
          <li>introduce malicious software or other harmful material;</li>
          <li>
            use automated means to access, extract, or exploit website content in a manner that
            disrupts the website or violates applicable law;
          </li>
          <li>
            misuse the <Link href="/contact">Contact page</Link> or other website functionality; or
          </li>
          <li>falsely represent an affiliation or relationship with Compublue.</li>
        </ul>

        <h2>6. Third-Party Websites and Resources</h2>
        <p>
          This website may contain links to websites, services, or resources operated by third
          parties.
        </p>
        <p>
          These links may be provided for convenience or informational purposes. Compublue does not
          control third-party websites and is not responsible for their content, availability,
          security, privacy practices, or other policies.
        </p>
        <p>
          The inclusion of a third-party link does not necessarily constitute an endorsement of the
          third party, its website, products, services, or opinions.
        </p>
        <p>
          Visitors who leave the Compublue website are responsible for reviewing the terms and
          policies applicable to the third-party website or service they choose to use.
        </p>
        <p>
          Compublue is not responsible for statements, representations, content, or other information
          presented by third parties that link to this website. A third party&apos;s link to the
          Compublue website does not establish or imply an affiliation, partnership, endorsement,
          authorization, or other relationship with Compublue.
        </p>

        <h2>7. Website Availability and Accuracy</h2>
        <p>
          Compublue may update, modify, remove, or reorganize website content from time to time.
        </p>
        <p>
          While reasonable efforts may be made to maintain the website and its content, Compublue does
          not guarantee that the website will always be available, uninterrupted, error-free, or free
          from technical problems.
        </p>
        <p>
          Compublue also does not warrant that all information appearing on the website will at all
          times be complete, current, or free from errors or omissions.
        </p>

        <h2>8. Disclaimer and Limitation of Liability</h2>
        <p>
          The website and its content are provided for general informational purposes and are made
          available without guarantees regarding their suitability for a visitor&rsquo;s particular
          circumstances.
        </p>
        <p>
          To the extent permitted by applicable law, Compublue is not responsible for losses or
          damages resulting from reliance on website content, inability to access or use the website,
          technical problems associated with the website, or use of third-party websites or resources
          linked from this website.
        </p>
        <p>
          Nothing in these Terms and Conditions is intended to exclude or limit liability that cannot
          legally be excluded or limited under applicable law.
        </p>

        <h2>9. Privacy and Cookies</h2>
        <p>
          Information concerning the collection and use of information through this website, including
          the use of Essential and optional Analytics Cookies, is addressed in the Compublue{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
        <p>
          Visitors may also manage applicable cookie choices through the Cookie Preferences
          functionality provided on the website.
        </p>
        <p>
          The <Link href="/privacy-policy">Privacy Policy</Link> is the primary source of information
          regarding Compublue&rsquo;s website privacy practices.
        </p>

        <h2>10. Changes to These Terms and Conditions</h2>
        <p>
          Compublue may update these Terms and Conditions from time to time to reflect changes to the
          website, our practices, or applicable requirements.
        </p>
        <p>The current version will be posted on this website.</p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms and Conditions and matters relating to the use of this website are governed by
          the laws of the State of California, without regard to conflict-of-law principles.
        </p>
        <p>
          Nothing in this section is intended to prevent matters from being resolved informally when
          appropriate.
        </p>

        <h2>12. Contact Information and Questions</h2>
        <p>
          Questions regarding these Terms and Conditions, the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, or the Compublue website may be
          submitted through the <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </article>
  );
}
