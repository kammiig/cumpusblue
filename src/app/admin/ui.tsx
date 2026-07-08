import Link from "next/link";

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="mb-8">
      <h1 className="h-display text-2xl">{title}</h1>
      {sub && <p className="mt-1.5 text-sm text-muted">{sub}</p>}
    </header>
  );
}

export function SavedBanner({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  if (searchParams?.saved) {
    return (
      <p role="status" className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
        Changes saved. The live site updates immediately.
      </p>
    );
  }
  if (searchParams?.error) {
    return (
      <p role="alert" className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
        {String(searchParams.error).replace(/-/g, " ")}
      </p>
    );
  }
  if (searchParams?.deleted) {
    return (
      <p role="status" className="mb-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
        Deleted.
      </p>
    );
  }
  return null;
}

export function Field({
  label,
  name,
  defaultValue,
  hint,
  type = "text",
  rows,
  maxLength,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  type?: string;
  rows?: number;
  maxLength?: number;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
      </label>
      {rows ? (
        <textarea id={id} name={name} defaultValue={defaultValue} rows={rows} maxLength={maxLength} className="field resize-y" />
      ) : (
        <input id={id} name={name} type={type} defaultValue={defaultValue} maxLength={maxLength} className="field" />
      )}
    </div>
  );
}

export function SeoFields({
  seoTitle,
  seoDesc,
  ogImage,
  canonical,
}: {
  seoTitle?: string;
  seoDesc?: string;
  ogImage?: string;
  canonical?: string;
}) {
  return (
    <fieldset className="card mt-8 p-6">
      <legend className="h-display px-2 text-base">SEO</legend>
      <div className="space-y-5">
        <div>
          <Field
            label="Meta title"
            name="seoTitle"
            defaultValue={seoTitle}
            hint={`${(seoTitle || "").length}/60 characters recommended`}
            maxLength={70}
          />
        </div>
        <Field
          label="Meta description"
          name="seoDesc"
          defaultValue={seoDesc}
          hint={`${(seoDesc || "").length}/160 characters recommended`}
          rows={3}
          maxLength={170}
        />
        <Field
          label="Open Graph / social sharing image URL"
          name="ogImage"
          defaultValue={ogImage}
          hint="1200×630px recommended. Shown when shared on social media."
        />
        <Field
          label="Canonical URL"
          name="canonical"
          defaultValue={canonical}
          hint="Leave empty to auto-generate (recommended)."
        />
      </div>
    </fieldset>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="mb-6 inline-block text-sm text-brand-300 hover:underline">
      ← {label}
    </Link>
  );
}
