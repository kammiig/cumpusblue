"use client";

import { useState } from "react";

export type Experience = { q: string; a: string };

/**
 * Representative-experience showcase: a compact two-column grid of expandable
 * cards. Shows a handful by default with a "show all" toggle so the section
 * stays short and scannable rather than an endless accordion.
 */
export function ExperienceList({ items, initial = 8 }: { items: Experience[]; initial?: number }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, initial);
  const hiddenCount = items.length - initial;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((it, i) => (
          <details key={it.q} className="card group h-max px-6 py-1">
            <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
              <span className="font-display text-xs font-bold tracking-widest text-brand-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-medium leading-snug text-ink">{it.q}</span>
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/15 text-muted transition group-open:rotate-180 group-open:text-brand-300"
              >
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <p className="border-t border-white/[0.06] py-4 text-sm leading-relaxed text-muted">{it.a}</p>
          </details>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setShowAll((v) => !v)} className="btn-ghost">
            {showAll ? "Show fewer" : `Show all ${items.length} engagements`}
          </button>
        </div>
      )}
    </div>
  );
}
