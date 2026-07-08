import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { PAGE_DEFAULTS } from "@/lib/content";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

type Check = { label: string; ok: boolean; detail?: string };

function auditEntry(opts: {
  seoTitle: string;
  seoDesc: string;
  ogImage: string;
  hasDefaultOg: boolean;
  noindex?: boolean;
  imageAlt?: string | null;
}): Check[] {
  const t = opts.seoTitle.length;
  const d = opts.seoDesc.length;
  return [
    {
      label: "Meta title",
      ok: t >= 20 && t <= 65,
      detail: t === 0 ? "Missing" : `${t} chars${t > 65 ? " (too long)" : t < 20 ? " (too short)" : ""}`,
    },
    {
      label: "Meta description",
      ok: d >= 70 && d <= 165,
      detail: d === 0 ? "Missing" : `${d} chars${d > 165 ? " (too long)" : d < 70 ? " (too short)" : ""}`,
    },
    {
      label: "Social image",
      ok: Boolean(opts.ogImage) || opts.hasDefaultOg,
      detail: opts.ogImage ? "Set" : opts.hasDefaultOg ? "Using site default" : "Missing (no default either)",
    },
    ...(opts.imageAlt !== undefined
      ? [{ label: "Image alt text", ok: Boolean(opts.imageAlt), detail: opts.imageAlt ? "Set" : "Missing" }]
      : []),
    ...(opts.noindex ? [{ label: "Indexing", ok: false, detail: "Page is set to noindex" }] : []),
  ];
}

function Score({ checks }: { checks: Check[] }) {
  const passed = checks.filter((c) => c.ok).length;
  const pct = Math.round((passed / checks.length) * 100);
  const color = pct === 100 ? "text-emerald-300" : pct >= 60 ? "text-amber-300" : "text-red-300";
  return <span className={`font-display text-sm font-bold ${color}`}>{pct}%</span>;
}

export default async function SeoAudit() {
  const [pages, services, posts, cases, settings] = await Promise.all([
    db.page.findMany({ orderBy: { slug: "asc" } }),
    db.service.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    db.post.findMany({ where: { published: true } }),
    db.caseStudy.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    getSettings(),
  ]);
  const hasDefaultOg = Boolean(settings.defaultOgImage);

  const rows: { name: string; path: string; editHref: string; checks: Check[] }[] = [
    ...pages.map((p) => ({
      name: p.name,
      path: PAGE_DEFAULTS[p.slug]?.path ?? `/${p.slug}`,
      editHref: `/admin/pages/${p.slug || "home"}`,
      checks: auditEntry({ seoTitle: p.seoTitle, seoDesc: p.seoDesc, ogImage: p.ogImage, hasDefaultOg, noindex: p.noindex }),
    })),
    ...services.map((s) => ({
      name: s.title,
      path: `/services/${s.slug}`,
      editHref: `/admin/services/${s.slug}`,
      checks: auditEntry({ seoTitle: s.seoTitle, seoDesc: s.seoDesc, ogImage: s.ogImage || s.image, hasDefaultOg, imageAlt: s.imageAlt }),
    })),
    ...cases.map((c) => ({
      name: c.title,
      path: `/case-studies/${c.slug}`,
      editHref: `/admin/case-studies/${c.slug}`,
      checks: auditEntry({ seoTitle: c.seoTitle, seoDesc: c.seoDesc, ogImage: c.image, hasDefaultOg, imageAlt: c.imageAlt }),
    })),
    ...posts.map((p) => ({
      name: p.title,
      path: `/blog/${p.slug}`,
      editHref: `/admin/posts/${p.id}`,
      checks: auditEntry({ seoTitle: p.seoTitle, seoDesc: p.seoDesc, ogImage: p.ogImage || p.image, hasDefaultOg, imageAlt: p.imageAlt }),
    })),
  ];

  const sitewide: Check[] = [
    { label: "Sitemap.xml", ok: true, detail: "Generated automatically at /sitemap.xml" },
    { label: "Robots.txt", ok: true, detail: "Generated automatically at /robots.txt" },
    { label: "Organization & WebSite schema", ok: true, detail: "Injected on every page" },
    { label: "Google Analytics 4", ok: Boolean(settings.ga4Id), detail: settings.ga4Id ? "Active" : "Not configured" },
    { label: "Meta Pixel", ok: Boolean(settings.metaPixelId), detail: settings.metaPixelId ? "Active" : "Not configured" },
    { label: "TikTok Pixel", ok: Boolean(settings.tiktokPixelId), detail: settings.tiktokPixelId ? "Active" : "Not configured" },
    { label: "Search Console verification", ok: Boolean(settings.gscVerification), detail: settings.gscVerification ? "Set" : "Not set" },
    { label: "Default social image", ok: hasDefaultOg, detail: hasDefaultOg ? "Set" : "Not set" },
  ];

  return (
    <>
      <PageTitle title="SEO Audit" sub="Automatic checks across every page. Fix issues from each page's edit screen." />

      <section aria-labelledby="sitewide-title" className="card mb-8 p-6">
        <h2 id="sitewide-title" className="h-display text-lg">Site-wide</h2>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {sitewide.map((c) => (
            <li key={c.label} className="flex items-center gap-2.5 text-sm">
              <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${c.ok ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span className="text-ink">{c.label}</span>
              <span className="text-xs text-muted">— {c.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-3">
        {rows.map((r) => (
          <details key={r.path} className="card">
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 px-6 py-4 [&::-webkit-details-marker]:hidden">
              <Score checks={r.checks} />
              <span className="font-medium text-ink">{r.name}</span>
              <span className="text-xs text-muted">{r.path}</span>
              <Link href={r.editHref} className="ml-auto text-sm text-brand-300 hover:underline">
                Edit
              </Link>
            </summary>
            <ul className="border-t border-white/[0.06] px-6 py-4">
              {r.checks.map((c) => (
                <li key={c.label} className="flex items-center gap-2.5 py-1 text-sm">
                  <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${c.ok ? "bg-emerald-400" : "bg-amber-400"}`} />
                  <span className="text-ink">{c.label}</span>
                  <span className="text-xs text-muted">— {c.detail}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </>
  );
}
