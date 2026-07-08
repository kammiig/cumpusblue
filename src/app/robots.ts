import type { MetadataRoute } from "next";
import { getSettings, siteUrl } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings().catch(() => ({} as Record<string, string>));
  const base = siteUrl(settings);

  // Note: a custom robots.txt body can be set in the admin dashboard
  // (Settings → robotsTxt) and served via /robots.txt route override if needed.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
