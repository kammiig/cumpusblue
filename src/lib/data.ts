import { db } from "./db";
import { SEED_SERVICES, SEED_CASE_STUDIES, SEED_POSTS } from "./seed-data";

/**
 * Data accessors: read from the database, fall back to seed content when the
 * database is empty or unavailable (e.g. first run before `npm run setup`).
 */

export type ServiceData = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  bullets: string[];
  icon: string;
  image: string;
  imageAlt: string;
  faqs: { q: string; a: string }[];
  seoTitle?: string;
  seoDesc?: string;
  ogImage?: string;
  canonical?: string;
};

function parseJson<T>(s: string | null | undefined, fallback: T): T {
  if (!s) return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

export async function getServices(): Promise<ServiceData[]> {
  try {
    const rows = await db.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        body: r.body,
        bullets: parseJson<string[]>(r.bullets, []),
        icon: r.icon,
        image: r.image,
        imageAlt: r.imageAlt,
        faqs: parseJson<{ q: string; a: string }[]>(r.faqs, []),
        seoTitle: r.seoTitle,
        seoDesc: r.seoDesc,
        ogImage: r.ogImage,
        canonical: r.canonical,
      }));
    }
  } catch {
    // fall through to seeds
  }
  return SEED_SERVICES.map((s) => ({ ...s }));
}

export async function getService(slug: string): Promise<ServiceData | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export type CaseStudyData = (typeof SEED_CASE_STUDIES)[number] & {
  seoTitle?: string;
  seoDesc?: string;
};

export async function getCaseStudies(): Promise<CaseStudyData[]> {
  try {
    const rows = await db.caseStudy.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        client: r.client,
        industry: r.industry,
        summary: r.summary,
        challenge: r.challenge,
        solution: r.solution,
        results: parseJson<string[]>(r.results, []),
        image: r.image,
        imageAlt: r.imageAlt,
        tags: parseJson<string[]>(r.tags, []),
        seoTitle: r.seoTitle,
        seoDesc: r.seoDesc,
      }));
    }
  } catch {
    // fall through
  }
  return SEED_CASE_STUDIES.map((c) => ({ ...c }));
}

export async function getCaseStudy(slug: string) {
  const all = await getCaseStudies();
  return all.find((c) => c.slug === slug) ?? null;
}

export type PostData = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  imageAlt: string;
  author: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  seoTitle?: string;
  seoDesc?: string;
  ogImage?: string;
  canonical?: string;
};

const SEED_DATE = new Date("2026-06-01T09:00:00Z");

export async function getPosts(): Promise<PostData[]> {
  try {
    const rows = await db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        body: r.body,
        image: r.image,
        imageAlt: r.imageAlt,
        author: r.author,
        tags: parseJson<string[]>(r.tags, []),
        publishedAt: r.publishedAt,
        updatedAt: r.updatedAt,
        seoTitle: r.seoTitle,
        seoDesc: r.seoDesc,
        ogImage: r.ogImage,
        canonical: r.canonical,
      }));
    }
  } catch {
    // fall through
  }
  return SEED_POSTS.map((p, i) => ({
    ...p,
    author: "CompuBlue Team",
    publishedAt: new Date(SEED_DATE.getTime() - i * 7 * 24 * 3600 * 1000),
    updatedAt: new Date(SEED_DATE.getTime() - i * 7 * 24 * 3600 * 1000),
  }));
}

export async function getPost(slug: string) {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

/** Minimal service list for nav/footer. */
export async function getServiceLinks() {
  const services = await getServices();
  return services.map((s) => ({ title: s.title, slug: s.slug }));
}
