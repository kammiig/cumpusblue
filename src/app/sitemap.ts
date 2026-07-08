import type { MetadataRoute } from "next";
import { getServices, getCaseStudies, getPosts } from "@/lib/data";
import { getSettings, siteUrl } from "@/lib/settings";
import { PAGE_DEFAULTS } from "@/lib/content";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings().catch(() => ({} as Record<string, string>));
  const base = siteUrl(settings);
  const now = new Date();

  // Static pages (excluding noindexed ones)
  let noindexed: string[] = [];
  try {
    const rows = await db.page.findMany({ where: { noindex: true }, select: { slug: true } });
    noindexed = rows.map((r) => r.slug);
  } catch {
    // ignore
  }

  const staticEntries = Object.entries(PAGE_DEFAULTS)
    .filter(([slug]) => !noindexed.includes(slug))
    .map(([, def]) => ({
      url: `${base}${def.path === "/" ? "" : def.path}`,
      lastModified: now,
      changeFrequency: (def.path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: def.path === "/" ? 1 : 0.7,
    }));

  const [services, cases, posts] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getPosts(),
  ]);

  return [
    ...staticEntries,
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...cases.map((c) => ({
      url: `${base}/case-studies/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
