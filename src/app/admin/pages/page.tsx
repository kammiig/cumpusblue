import Link from "next/link";
import { db } from "@/lib/db";
import { PAGE_DEFAULTS } from "@/lib/content";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function AdminPagesList() {
  const pages = await db.page.findMany({ orderBy: { slug: "asc" } });

  return (
    <>
      <PageTitle title="Pages & SEO" sub="Edit page content, meta titles, descriptions, social images and indexing." />
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Website pages</caption>
          <thead>
            <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-muted">
              <th scope="col" className="px-5 py-3.5">Page</th>
              <th scope="col" className="px-5 py-3.5">URL</th>
              <th scope="col" className="px-5 py-3.5">Meta title</th>
              <th scope="col" className="px-5 py-3.5">Indexing</th>
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {pages.map((p) => {
              const path = PAGE_DEFAULTS[p.slug]?.path ?? `/${p.slug}`;
              return (
                <tr key={p.id}>
                  <td className="px-5 py-3.5 font-medium text-ink">{p.name}</td>
                  <td className="px-5 py-3.5 text-muted">{path}</td>
                  <td className="max-w-[280px] truncate px-5 py-3.5 text-muted">{p.seoTitle || <em>empty</em>}</td>
                  <td className="px-5 py-3.5">
                    {p.noindex ? (
                      <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">noindex</span>
                    ) : (
                      <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">indexed</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link href={`/admin/pages/${p.slug || "home"}`} className="text-brand-300 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
