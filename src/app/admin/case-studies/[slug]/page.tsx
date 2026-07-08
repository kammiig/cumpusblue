import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { saveCaseStudyAction } from "../../actions";
import { PageTitle, SavedBanner, Field, BackLink } from "../../ui";

export const dynamic = "force-dynamic";

export default async function EditCaseStudy({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const cs = await db.caseStudy.findUnique({ where: { slug: params.slug } });
  if (!cs) notFound();

  return (
    <>
      <BackLink href="/admin/case-studies" label="All case studies" />
      <PageTitle title={`Edit: ${cs.title}`} sub={`Live at /case-studies/${cs.slug}`} />
      <SavedBanner searchParams={searchParams} />

      <form action={saveCaseStudyAction} className="max-w-3xl">
        <input type="hidden" name="slug" value={cs.slug} />

        <fieldset className="card p-6">
          <legend className="h-display px-2 text-base">Content</legend>
          <div className="space-y-5">
            <Field label="Title" name="title" defaultValue={cs.title} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Client" name="client" defaultValue={cs.client} />
              <Field label="Industry" name="industry" defaultValue={cs.industry} />
            </div>
            <Field label="Summary" name="summary" defaultValue={cs.summary} rows={3} />
            <Field label="The challenge" name="challenge" defaultValue={cs.challenge} rows={4} />
            <Field label="The solution" name="solution" defaultValue={cs.solution} rows={4} />
            <Field
              label="Results"
              name="results"
              defaultValue={safeArr(cs.results).join("\n")}
              rows={4}
              hint="One result per line."
            />
            <Field
              label="Tags"
              name="tags"
              defaultValue={safeArr(cs.tags).join("\n")}
              rows={2}
              hint="One tag per line."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Image URL" name="image" defaultValue={cs.image} />
              <Field label="Image alt text" name="imageAlt" defaultValue={cs.imageAlt} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Display order" name="order" type="number" defaultValue={String(cs.order)} />
              <label className="mt-7 flex items-center gap-3 text-sm text-ink">
                <input type="checkbox" name="published" defaultChecked={cs.published} className="h-4 w-4 rounded border-white/20 bg-white/[0.05]" />
                Published
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="card mt-8 p-6">
          <legend className="h-display px-2 text-base">SEO</legend>
          <div className="space-y-5">
            <Field label="Meta title" name="seoTitle" defaultValue={cs.seoTitle} maxLength={70} />
            <Field label="Meta description" name="seoDesc" defaultValue={cs.seoDesc} rows={3} maxLength={170} />
          </div>
        </fieldset>

        <button type="submit" className="btn-primary mt-8">Save changes</button>
      </form>
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
