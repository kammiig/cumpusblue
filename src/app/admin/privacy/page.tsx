import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import { PageTitle } from "../ui";
import {
  privacyDeleteInquiryAction,
  privacyDeleteAllAction,
  privacyDeidentifyAction,
} from "../actions";

export const dynamic = "force-dynamic";

function subjectOf(l: { service: string; message: string }) {
  if (l.service) return l.service;
  const m = (l.message || "").trim();
  return m ? m.slice(0, 60) + (m.length > 60 ? "…" : "") : "—";
}

export default async function AdminPrivacy({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const q = String(searchParams?.q ?? "").trim();
  const done = String(searchParams?.done ?? "");
  const error = String(searchParams?.error ?? "");

  let leads: Awaited<ReturnType<typeof db.lead.findMany>> = [];
  if (q) {
    const digits = q.replace(/[^\d]/g, "");
    const or: Prisma.LeadWhereInput[] = [
      { id: q },
      { email: { equals: q, mode: "insensitive" } },
    ];
    if (digits.length >= 7) or.push({ phone: { contains: digits } });
    leads = await db.lead.findMany({ where: { OR: or }, orderBy: { createdAt: "desc" } });
  }

  const auditLog = await db.privacyRequest.findMany({ orderBy: { createdAt: "desc" }, take: 15 });

  return (
    <>
      <PageTitle
        title="Privacy Requests"
        sub="Search a person's inquiries by email, phone, or reference, then delete or de-identify them. Deletions and de-identifications are transactional and audited."
      />

      {done && (
        <div className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Request completed: {done.replace("-", " ")}.
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error.replace(/-/g, " ")}
        </div>
      )}

      {/* Search */}
      <form method="get" className="card p-6">
        <label htmlFor="pq" className="label">Verified identifier</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="pq"
            name="q"
            defaultValue={q}
            placeholder="email address, phone number, or inquiry reference"
            className="field"
          />
          <button type="submit" className="btn-primary !min-h-0 shrink-0 !px-6 !py-3 text-sm">Search</button>
        </div>
        <p className="mt-2 text-xs text-muted">
          Verify the requester through their original email, phone, or an inquiry reference before actioning a
          request. Government ID is not required.
        </p>
      </form>

      {/* Results / preview */}
      {q && (
        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="h-display text-lg">
              {leads.length} matching {leads.length === 1 ? "inquiry" : "inquiries"} for &ldquo;{q}&rdquo;
            </h2>
            {leads.length > 1 && (
              <form action={privacyDeleteAllAction} className="flex items-center gap-2">
                <input type="hidden" name="identifier" value={q} />
                <label className="flex items-center gap-2 text-xs text-muted">
                  <input type="checkbox" name="confirm" required className="h-4 w-4 rounded border-white/20 bg-white/[0.05]" />
                  I verified this request
                </label>
                <button type="submit" className="rounded-lg border border-red-400/40 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-400/10">
                  Delete all {leads.length}
                </button>
              </form>
            )}
          </div>

          {leads.length === 0 && (
            <div className="card mt-4 p-8 text-center text-muted">No inquiries match that identifier.</div>
          )}

          <div className="mt-4 space-y-4">
            {leads.map((l) => (
              <div key={l.id} className="card p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-ink">{l.name || "—"}</span>
                  <span className="text-sm text-muted">{l.email}</span>
                  {l.redacted && (
                    <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      De-identified
                    </span>
                  )}
                  <span className="ml-auto text-xs text-muted">
                    {l.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>
                <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">Reference</dt>
                    <dd className="mt-0.5 break-all font-mono text-xs text-ink">{l.id}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">Subject</dt>
                    <dd className="mt-0.5 text-ink">{subjectOf(l)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">Phone</dt>
                    <dd className="mt-0.5 text-ink">{l.phone || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">Status</dt>
                    <dd className="mt-0.5 text-ink">{l.status}</dd>
                  </div>
                </dl>

                {!l.redacted && (
                  <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-4 lg:flex-row lg:items-end lg:justify-between">
                    {/* De-identify (retain with reason) */}
                    <form action={privacyDeidentifyAction} className="flex flex-1 flex-wrap items-end gap-2">
                      <input type="hidden" name="id" value={l.id} />
                      <input type="hidden" name="identifier" value={q} />
                      <div className="flex-1">
                        <label className="text-xs text-muted">Lawful reason to retain (de-identify instead of delete)</label>
                        <input name="reason" placeholder="e.g. active dispute; legal retention" className="field !py-2 text-sm" />
                      </div>
                      <button type="submit" className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-white/[0.06]">
                        De-identify
                      </button>
                    </form>
                    {/* Delete this inquiry */}
                    <form action={privacyDeleteInquiryAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={l.id} />
                      <input type="hidden" name="identifier" value={q} />
                      <label className="flex items-center gap-2 text-xs text-muted">
                        <input type="checkbox" name="confirm" required className="h-4 w-4 rounded border-white/20 bg-white/[0.05]" />
                        Confirm
                      </label>
                      <button type="submit" className="rounded-lg border border-red-400/40 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-400/10">
                        Delete this inquiry
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted">
            Deleting an inquiry removes that record from the database. It does not remove copies that may exist in
            email inboxes, the email provider, server logs, or database backups — those are handled through the
            documented email-cleanup and backup-expiration procedures.
          </p>
        </section>
      )}

      {/* Audit log */}
      <section className="mt-10">
        <h2 className="h-display text-lg">Recent privacy actions</h2>
        <p className="mt-1 text-sm text-muted">Audit trail — stores who, when, scope and outcome, never the deleted content.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/15 text-xs uppercase tracking-wider text-muted">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Action</th>
                <th className="py-2 pr-4">Scope</th>
                <th className="py-2 pr-4">Count</th>
                <th className="py-2 pr-4">Identifier</th>
                <th className="py-2 pr-4">Admin</th>
                <th className="py-2">Retained reason</th>
              </tr>
            </thead>
            <tbody className="align-top text-muted [&>tr]:border-b [&>tr]:border-white/[0.06]">
              {auditLog.length === 0 && (
                <tr><td colSpan={7} className="py-4 text-center">No privacy actions recorded yet.</td></tr>
              )}
              {auditLog.map((a) => (
                <tr key={a.id}>
                  <td className="py-2 pr-4 whitespace-nowrap text-ink">
                    {a.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="py-2 pr-4">{a.action}</td>
                  <td className="py-2 pr-4">{a.scope}</td>
                  <td className="py-2 pr-4">{a.affectedCount}</td>
                  <td className="py-2 pr-4 break-all">{a.identifier}</td>
                  <td className="py-2 pr-4 break-all">{a.adminEmail}</td>
                  <td className="py-2">{a.retainedReason || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
