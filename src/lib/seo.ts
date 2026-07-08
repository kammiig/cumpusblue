import type { Metadata } from "next";
import { getSettings, siteUrl, SettingsMap } from "./settings";
import { db } from "./db";

type SeoInput = {
  title: string;
  description: string;
  path: string; // "/about"
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  type?: "website" | "article";
};

export async function buildMetadata(input: SeoInput): Promise<Metadata> {
  const settings = await getSettings();
  const base = siteUrl(settings);
  const canonical = input.canonical || `${base}${input.path === "/" ? "" : input.path}`;
  const ogImage = input.ogImage || settings.defaultOgImage || `${base}/og-default.png`;

  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(base),
    alternates: { canonical },
    robots: input.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: settings.siteName || "CompuBlue",
      type: input.type || "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
    other: settings.gscVerification
      ? { "google-site-verification": settings.gscVerification }
      : undefined,
  };
}

/** Pull SEO fields for a Page row (by slug) and merge with fallbacks. */
export async function pageMetadata(
  slug: string,
  fallback: { title: string; description: string; path: string; ogImage?: string }
): Promise<Metadata> {
  const page = await db.page.findUnique({ where: { slug } }).catch(() => null);
  return buildMetadata({
    title: page?.seoTitle || fallback.title,
    description: page?.seoDesc || fallback.description,
    path: fallback.path,
    ogImage: page?.ogImage || fallback.ogImage,
    canonical: page?.canonical || undefined,
    noindex: page?.noindex || false,
  });
}

/* ---------- JSON-LD builders ---------- */

export function organizationSchema(s: SettingsMap) {
  const base = siteUrl(s);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: s.siteName || "CompuBlue, Inc.",
    url: base,
    logo: `${base}/logo-white.svg`,
    email: s.contactEmail || "contact@compublue.com",
    telephone: s.contactPhone || "+1-818-662-8800",
    sameAs: [s.socialLinkedin, s.socialFacebook, s.socialX, s.socialInstagram].filter(Boolean),
  };
}

export function websiteSchema(s: SettingsMap) {
  const base = siteUrl(s);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: s.siteName || "CompuBlue",
    publisher: { "@id": `${base}/#organization` },
  };
}

export function serviceSchema(
  s: SettingsMap,
  svc: { title: string; excerpt: string; slug: string }
) {
  const base = siteUrl(s);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.excerpt,
    url: `${base}/services/${svc.slug}`,
    provider: { "@id": `${base}/#organization` },
    areaServed: "Worldwide",
  };
}

export function blogPostSchema(
  s: SettingsMap,
  post: {
    title: string;
    excerpt: string;
    slug: string;
    author: string;
    publishedAt: Date;
    updatedAt: Date;
    image?: string;
  }
) {
  const base = siteUrl(s);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${base}/blog/${post.slug}`,
    image: post.image || undefined,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${base}/#organization` },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: `${base}/blog/${post.slug}`,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(s: SettingsMap, items: { name: string; path: string }[]) {
  const base = siteUrl(s);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  };
}
