/* eslint-disable @next/next/no-img-element */
import { db } from "@/lib/db";
import { addMediaAction, deleteMediaAction } from "../actions";
import { PageTitle, SavedBanner, Field } from "../ui";
import { PexelsSearch } from "./pexels-search";

export const dynamic = "force-dynamic";

export default async function AdminMedia({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const images = await db.mediaImage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageTitle
        title="Images"
        sub="Search Pexels for licensed photos, or save any image URL. Copy URLs into pages, services and posts."
      />
      <SavedBanner searchParams={searchParams} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="pexels-title" className="card p-6">
          <h2 id="pexels-title" className="h-display text-lg">Search Pexels</h2>
          <p className="mt-1 text-sm text-muted">
            Free licensed photography. Uses the Pexels API key from Settings.
          </p>
          <div className="mt-4">
            <PexelsSearch />
          </div>
        </section>

        <section aria-labelledby="add-url-title" className="card p-6">
          <h2 id="add-url-title" className="h-display text-lg">Add image by URL</h2>
          <form action={addMediaAction} className="mt-4 space-y-4">
            <Field label="Image URL" name="url" />
            <Field label="Alt text" name="alt" hint="Describe the image — required for accessibility." />
            <Field label="Credit (optional)" name="credit" />
            <button type="submit" className="btn-primary">Save image</button>
          </form>
        </section>
      </div>

      <section aria-labelledby="library-title" className="mt-8">
        <h2 id="library-title" className="h-display text-lg">Saved library</h2>
        {images.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nothing saved yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((img) => (
              <li key={img.id} className="card overflow-hidden">
                <img src={img.url} alt={img.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-3">
                  <p className="line-clamp-1 text-xs text-muted" title={img.alt}>{img.alt || "No alt text"}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <input
                      readOnly
                      defaultValue={img.url}
                      aria-label="Image URL"
                      className="field !py-1 text-[10px]"
                    />
                  </div>
                  <form action={deleteMediaAction} className="mt-2">
                    <input type="hidden" name="id" value={img.id} />
                    <button type="submit" className="text-xs text-red-300 hover:underline">Remove</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
