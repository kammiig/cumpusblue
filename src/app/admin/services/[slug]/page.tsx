import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { saveServiceAction } from "../../actions";
import { PageTitle, SavedBanner, Field, SeoFields, BackLink } from "../../ui";

export const dynamic = "force-dynamic";

export default async function EditService({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const svc = await db.service.findUnique({ where: { slug: params.slug } });
  if (!svc) notFound();

  const bullets = safeArr(svc.bullets).join("\n");

  return (
    <>
      <BackLink href="/admin/services" label="All services" />
      <PageTitle title={`Edit: ${svc.title}`} sub={`Live at /services/${svc.slug}`} />
      <SavedBanner searchParams={searchParams} />

      <form action={saveServiceAction} className="max-w-3xl">
        <input type="hidden" name="slug" value={svc.slug} />

        <fieldset className="card p-6">
          <legend className="h-display px-2 text-base">Content</legend>
          <div className="space-y-5">
            <Field label="Title" name="title" defaultValue={svc.title} />
            <Field label="Excerpt (card + intro text)" name="excerpt" defaultValue={svc.excerpt} rows={3} />
            <Field
              label="Body"
              name="body"
              defaultValue={svc.body}
              rows={12}
              hint="Paragraphs separated by a blank line. Use '## ' for subheadings."
            />
            <Field
              label="'What you get' bullets"
              name="bullets"
              defaultValue={bullets}
              rows={6}
              hint="One bullet per line."
            />
            <Field
              label="FAQs (JSON)"
              name="faqs"
              defaultValue={svc.faqs}
              rows={6}
              hint='Format: [{"q":"Question?","a":"Answer."}]'
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Image URL" name="image" defaultValue={svc.image} />
              <Field label="Image alt text" name="imageAlt" defaultValue={svc.imageAlt} hint="Describe the image for screen readers." />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Display order" name="order" type="number" defaultValue={String(svc.order)} />
              <label className="mt-7 flex items-center gap-3 text-sm text-ink">
                <input type="checkbox" name="published" defaultChecked={svc.published} className="h-4 w-4 rounded border-white/20 bg-white/[0.05]" />
                Published
              </label>
            </div>
          </div>
        </fieldset>

        <SeoFields seoTitle={svc.seoTitle} seoDesc={svc.seoDesc} ogImage={svc.ogImage} canonical={svc.canonical} />

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
