import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { savePostAction, deletePostAction } from "../../actions";
import { PageTitle, SavedBanner, Field, SeoFields, BackLink } from "../../ui";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const isNew = params.id === "new";
  const post = isNew ? null : await db.post.findUnique({ where: { id: params.id } });
  if (!isNew && !post) notFound();

  const tags = post ? safeArr(post.tags).join("\n") : "";

  return (
    <>
      <BackLink href="/admin/posts" label="All posts" />
      <PageTitle
        title={isNew ? "New post" : `Edit: ${post!.title}`}
        sub={isNew ? "Draft a new article." : `Live at /blog/${post!.slug}`}
      />
      <SavedBanner searchParams={searchParams} />

      <form action={savePostAction} className="max-w-3xl">
        {post && <input type="hidden" name="id" value={post.id} />}

        <fieldset className="card p-6">
          <legend className="h-display px-2 text-base">Content</legend>
          <div className="space-y-5">
            <Field label="Title" name="title" defaultValue={post?.title} />
            <Field
              label="URL slug"
              name="postSlug"
              defaultValue={post?.slug}
              hint="Leave empty to generate from the title."
            />
            <Field label="Excerpt" name="excerpt" defaultValue={post?.excerpt} rows={3} />
            <Field
              label="Body"
              name="body"
              defaultValue={post?.body}
              rows={16}
              hint="Paragraphs separated by a blank line. '## ' for headings, '- ' for bullets."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Cover image URL" name="image" defaultValue={post?.image} />
              <Field label="Image alt text" name="imageAlt" defaultValue={post?.imageAlt} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Author" name="author" defaultValue={post?.author ?? "CompuBlue Team"} />
              <Field label="Tags" name="tags" defaultValue={tags} rows={2} hint="One per line." />
            </div>
            <label className="flex items-center gap-3 text-sm text-ink">
              <input
                type="checkbox"
                name="published"
                defaultChecked={post?.published ?? true}
                className="h-4 w-4 rounded border-white/20 bg-white/[0.05]"
              />
              Published
            </label>
          </div>
        </fieldset>

        <SeoFields
          seoTitle={post?.seoTitle}
          seoDesc={post?.seoDesc}
          ogImage={post?.ogImage}
          canonical={post?.canonical}
        />

        <div className="mt-8 flex items-center gap-4">
          <button type="submit" className="btn-primary">
            {isNew ? "Create post" : "Save changes"}
          </button>
        </div>
      </form>

      {post && (
        <form action={deletePostAction} className="mt-6">
          <input type="hidden" name="id" value={post.id} />
          <button
            type="submit"
            className="text-sm text-red-300 underline underline-offset-4 hover:text-red-200"
          >
            Delete this post
          </button>
        </form>
      )}
    </>
  );
}

function safeArr(s: string): string[] {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
