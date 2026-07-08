import Link from "next/link";
import { db } from "@/lib/db";
import { PageTitle, SavedBanner } from "../ui";

export const dynamic = "force-dynamic";

export default async function AdminPostsList({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const posts = await db.post.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="h-display text-2xl">Blog Posts</h1>
          <p className="mt-1.5 text-sm text-muted">Write, edit and publish insights.</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary !min-h-[44px] !px-6 !py-2.5">
          + New post
        </Link>
      </div>
      <SavedBanner searchParams={searchParams} />

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Blog posts</caption>
          <thead>
            <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-muted">
              <th scope="col" className="px-5 py-3.5">Title</th>
              <th scope="col" className="px-5 py-3.5">Published</th>
              <th scope="col" className="px-5 py-3.5">Status</th>
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-ink">{p.title}</p>
                  <p className="text-xs text-muted">/blog/{p.slug}</p>
                </td>
                <td className="px-5 py-3.5 text-muted">
                  {p.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    p.published ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.06] text-muted"
                  }`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link href={`/admin/posts/${p.id}`} className="text-brand-300 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-muted">
                  No posts yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
