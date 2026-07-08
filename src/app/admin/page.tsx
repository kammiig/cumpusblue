import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { PageTitle } from "./ui";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [leadCount, newLeads, postCount, serviceCount, recentLeads, settings] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { status: "new" } }),
    db.post.count(),
    db.service.count(),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    getSettings(),
  ]);

  const setup = [
    { label: "SMTP email notifications", ok: Boolean(settings.smtpHost && settings.smtpUser), href: "/admin/settings" },
    { label: "Google Analytics (GA4)", ok: Boolean(settings.ga4Id), href: "/admin/settings" },
    { label: "Meta Pixel", ok: Boolean(settings.metaPixelId), href: "/admin/settings" },
    { label: "TikTok Pixel", ok: Boolean(settings.tiktokPixelId), href: "/admin/settings" },
    { label: "Search Console verification", ok: Boolean(settings.gscVerification), href: "/admin/settings" },
    { label: "Default social sharing image", ok: Boolean(settings.defaultOgImage), href: "/admin/settings" },
  ];

  return (
    <>
      <PageTitle title="Dashboard" sub="Overview of your website and leads." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total leads", value: leadCount, href: "/admin/leads" },
          { label: "New leads", value: newLeads, href: "/admin/leads" },
          { label: "Services", value: serviceCount, href: "/admin/services" },
          { label: "Blog posts", value: postCount, href: "/admin/posts" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="card card-hover block p-6">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="recent-leads" className="card p-6">
          <h2 id="recent-leads" className="h-display text-lg">Recent leads</h2>
          {recentLeads.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No leads yet. They will appear here when someone submits the contact form.</p>
          ) : (
            <ul className="mt-4 divide-y divide-white/[0.06]">
              {recentLeads.map((l) => (
                <li key={l.id} className="py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink">{l.name}</p>
                      <p className="text-xs text-muted">{l.email} · {l.service || "No service selected"}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      l.status === "new" ? "bg-brand-500/15 text-brand-300" : "bg-white/[0.06] text-muted"
                    }`}>
                      {l.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/leads" className="mt-4 inline-block text-sm text-brand-300 hover:underline">
            View all leads →
          </Link>
        </section>

        <section aria-labelledby="setup-status" className="card p-6">
          <h2 id="setup-status" className="h-display text-lg">Setup checklist</h2>
          <ul className="mt-4 space-y-2.5">
            {setup.map((s) => (
              <li key={s.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${s.ok ? "bg-emerald-400" : "bg-amber-400"}`}
                  />
                  <span className={s.ok ? "text-ink" : "text-muted"}>{s.label}</span>
                  <span className="sr-only">{s.ok ? "configured" : "not configured"}</span>
                </span>
                {!s.ok && (
                  <Link href={s.href} className="text-xs text-brand-300 hover:underline">
                    Configure
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
