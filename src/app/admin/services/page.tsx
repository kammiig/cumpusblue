import Link from "next/link";
import { db } from "@/lib/db";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function AdminServicesList() {
  const services = await db.service.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageTitle title="Services" sub="Edit service content, images, FAQs and SEO." />
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Services</caption>
          <thead>
            <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-muted">
              <th scope="col" className="px-5 py-3.5">Order</th>
              <th scope="col" className="px-5 py-3.5">Service</th>
              <th scope="col" className="px-5 py-3.5">Status</th>
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {services.map((s) => (
              <tr key={s.id}>
                <td className="px-5 py-3.5 text-muted">{s.order + 1}</td>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-ink">{s.title}</p>
                  <p className="text-xs text-muted">/services/{s.slug}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    s.published ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.06] text-muted"
                  }`}>
                    {s.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link href={`/admin/services/${s.slug}`} className="text-brand-300 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
