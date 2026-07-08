import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PAGE_DEFAULTS } from "@/lib/content";
import { savePageAction } from "../../actions";
import { PageTitle, SavedBanner, Field, SeoFields, BackLink } from "../../ui";

export const dynamic = "force-dynamic";

export default async function EditPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const slug = params.slug === "home" ? "" : params.slug;
  const page = await db.page.findUnique({ where: { slug } });
  const defaults = PAGE_DEFAULTS[slug];
  if (!page || !defaults) notFound();

  const stored = safeParse(page.content);
  const fieldKeys = Object.keys(defaults.fields);

  return (
    <>
      <BackLink href="/admin/pages" label="All pages" />
      <PageTitle title={`Edit: ${page.name}`} sub={`Live at ${defaults.path}`} />
      <SavedBanner searchParams={searchParams} />

      <form action={savePageAction} className="max-w-3xl">
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="contentKeys" value={fieldKeys.join(",")} />

        {fieldKeys.length > 0 && (
          <fieldset className="card p-6">
            <legend className="h-display px-2 text-base">Page content</legend>
            <div className="space-y-5">
              {fieldKeys.map((key) => {
                const def = defaults.fields[key];
                const value = stored[key] ?? def.value;
                return (
                  <Field
                    key={key}
                    label={def.label}
                    name={`content_${key}`}
                    defaultValue={value}
                    rows={def.type === "textarea" ? 4 : undefined}
                  />
                );
              })}
            </div>
          </fieldset>
        )}

        <SeoFields
          seoTitle={page.seoTitle}
          seoDesc={page.seoDesc}
          ogImage={page.ogImage}
          canonical={page.canonical}
        />

        <fieldset className="card mt-8 p-6">
          <legend className="h-display px-2 text-base">Advanced</legend>
          <div className="space-y-5">
            <Field
              label="Extra schema markup (JSON-LD)"
              name="schemaJson"
              defaultValue={page.schemaJson}
              hint="Optional. Valid JSON-LD injected on this page."
              rows={4}
            />
            <label className="flex items-center gap-3 text-sm text-ink">
              <input
                type="checkbox"
                name="noindex"
                defaultChecked={page.noindex}
                className="h-4 w-4 rounded border-white/20 bg-white/[0.05]"
              />
              Hide from search engines (noindex)
            </label>
          </div>
        </fieldset>

        <button type="submit" className="btn-primary mt-8">
          Save changes
        </button>
      </form>
    </>
  );
}

function safeParse(s: string): Record<string, string> {
  try {
    const v = JSON.parse(s);
    return typeof v === "object" && v ? v : {};
  } catch {
    return {};
  }
}
