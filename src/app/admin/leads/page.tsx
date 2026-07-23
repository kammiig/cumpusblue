import { db } from "@/lib/db";
import { updateLeadStatusAction, deleteLeadAction } from "../actions";
import { PageTitle } from "../ui";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageTitle
        title="Leads"
        sub={`${leads.length} enquiries. Email notifications go to the address configured in Settings.`}
      />

      <div className="space-y-4">
        {leads.length === 0 && (
          <div className="card p-8 text-center text-muted">
            No leads yet. Submissions from the contact and service enquiry forms will appear here.
          </div>
        )}
        {leads.map((l) => (
          <details key={l.id} className="card group">
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 px-6 py-4 [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  l.status === "new" ? "bg-brand-400" : l.status === "contacted" ? "bg-amber-400" : "bg-emerald-400"
                }`}
              />
              <span className="font-semibold text-ink">{l.name}</span>
              <span className="text-sm text-muted">{l.email}</span>
              {l.service && (
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-muted">{l.service}</span>
              )}
              <span className="ml-auto text-xs text-muted">
                {l.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}{" "}
                {l.createdAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </summary>
            <div className="border-t border-white/[0.06] px-6 py-5">
              <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Phone</dt>
                  <dd className="mt-0.5 text-ink">{l.phone || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Company</dt>
                  <dd className="mt-0.5 text-ink">{l.company || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Preferred contact</dt>
                  <dd className="mt-0.5 text-ink">{l.budget || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Submitted from</dt>
                  <dd className="mt-0.5 text-ink">{l.page || "—"}</dd>
                </div>
              </dl>
              <div className="mt-4">
                <h3 className="text-xs uppercase tracking-wider text-muted">Message</h3>
                <p className="mt-1 whitespace-pre-wrap rounded-xl bg-white/[0.03] p-4 text-sm leading-relaxed text-ink">
                  {l.message}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <form action={updateLeadStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={l.id} />
                  <label htmlFor={`status-${l.id}`} className="text-xs text-muted">Status</label>
                  <select id={`status-${l.id}`} name="status" defaultValue={l.status} className="field !w-auto !py-1.5 text-xs">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button type="submit" className="btn-ghost !min-h-0 !px-4 !py-1.5 text-xs">Update</button>
                </form>
                <a href={`mailto:${l.email}`} className="btn-primary !min-h-0 !px-4 !py-1.5 text-xs">
                  Reply by email
                </a>
                <form action={deleteLeadAction}>
                  <input type="hidden" name="id" value={l.id} />
                  <button type="submit" className="text-xs text-red-300 underline underline-offset-4 hover:text-red-200">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
