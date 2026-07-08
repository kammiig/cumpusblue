export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className="card group px-6 py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-brand-300 transition group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v12M2 8h12" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
