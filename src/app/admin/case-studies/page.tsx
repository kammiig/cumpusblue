import Link from "next/link";
import { db } from "@/lib/db";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesList() {
  const items = await db.caseStudy.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageTitle title="Case Studies" sub="Manage your portfolio of client results." />
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Case studies</caption>
          <thead>
            <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-muted">
              <th scope="col" className="px-5 py-3.5">Title</th>
              <th scope="col" className="px-5 py-3.5">Industry</th>
              <th scope="col" className="px-5 py-3.5">Status</th>
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {items.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-ink">{c.title}</p>
                  <p className="text-xs text-muted">/case-studies/{c.slug}</p>
                </td>
                <td className="px-5 py-3.5 text-muted">{c.industry}</td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    c.published ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.06] text-muted"
                  }`}>
                    {c.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link href={`/admin/case-studies/${c.slug}`} className="text-brand-300 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
