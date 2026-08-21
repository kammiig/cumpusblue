"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  COUNTRIES,
  digitsOnly,
  E164_MAX_DIGITS,
  flagEmoji,
  formatNational,
  getCountry,
  nationalPlaceholder,
} from "@/lib/countries";

/**
 * International phone input: a searchable country selector (flag + dialling
 * code) joined to a national-number field. The two are rendered as one control
 * so it reads as a single form field on the dark theme, matching `.field`.
 *
 * The parent owns both halves of the value — the ISO country code and the raw
 * national digits — so it can react to the country (see the contact form's
 * preferred-contact rules) and build the E.164 number on submit.
 */
export function PhoneField({
  id,
  country,
  onCountryChange,
  value,
  onValueChange,
  invalid = false,
  describedBy,
}: {
  id: string;
  country: string;
  onCountryChange: (iso2: string) => void;
  /** National significant number, digits only. */
  value: string;
  onValueChange: (digits: string) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = getCountry(country) ?? getCountry("US")!;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase() === q ||
        c.dial.startsWith(q)
    );
  }, [query]);

  // Close on outside click.
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // On open, focus the search box and point the cursor at the current country.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    const i = COUNTRIES.findIndex((c) => c.iso2 === selected.iso2);
    setActiveIndex(i < 0 ? 0 : i);
    searchRef.current?.focus();
  }, [open, selected.iso2]);

  // Keep the active option in view while arrowing through the list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function commit(index: number) {
    const c = results[index];
    if (c) onCountryChange(c.iso2);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onSearchKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(results.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(results.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        commit(activeIndex);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  /**
   * Typing or pasting a number that starts with "+" switches the country to
   * the longest matching dialling code and keeps only the national remainder,
   * so a full international number pasted in one go lands correctly.
   */
  function onNumberChange(raw: string) {
    if (raw.trim().startsWith("+")) {
      const digits = digitsOnly(raw);
      const match = COUNTRIES.filter((c) => digits.startsWith(c.dial)).sort(
        (a, b) => b.dial.length - a.dial.length
      )[0];
      if (match) {
        // Prefer the currently selected country when it shares the code (+1).
        const keep = selected.dial === match.dial;
        const iso2 = keep ? selected.iso2 : match.iso2;
        if (!keep) onCountryChange(match.iso2);
        setDigits(iso2, digits.slice(match.dial.length));
        return;
      }
    }
    setDigits(selected.iso2, digitsOnly(raw));
  }

  /** Store digits, capped at what the country's numbering plan can hold. */
  function setDigits(iso2: string, digits: string) {
    const c = getCountry(iso2) ?? selected;
    const max = c.maxLen ?? E164_MAX_DIGITS - c.dial.length;
    onValueChange(digits.slice(0, max));
  }

  return (
    <div className="relative" ref={wrapRef}>
      <div
        className={`flex w-full items-stretch overflow-visible rounded-xl border bg-white/[0.04] transition focus-within:ring-2 ${
          invalid
            ? "border-red-400/60 focus-within:border-red-400 focus-within:ring-red-400/40"
            : "border-white/10 focus-within:border-brand-400 focus-within:ring-brand-400/40"
        }`}
      >
        <button
          ref={buttonRef}
          type="button"
          className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-l-xl border-r border-white/10 pl-3 pr-2.5 text-base text-ink transition hover:bg-white/[0.04] sm:gap-2 sm:pl-4 sm:pr-3"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country calling code: ${selected.name}, +${selected.dial}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {flagEmoji(selected.iso2)}
          </span>
          <span className="tabular-nums">+{selected.dial}</span>
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className="min-w-0 flex-1 rounded-r-xl bg-transparent px-3 py-3 text-base text-ink placeholder:text-muted/70 focus:outline-none sm:px-4"
          placeholder={nationalPlaceholder(selected.iso2)}
          value={formatNational(selected.iso2, value)}
          onChange={(e) => onNumberChange(e.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
        />
      </div>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-[15rem] rounded-xl border border-white/10 bg-night-850 p-2 shadow-card">
          <input
            ref={searchRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={`${baseId}-list`}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? `${baseId}-opt-${activeIndex}` : undefined}
            aria-label="Search countries"
            className="mb-1.5 block w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-ink placeholder:text-muted/70 focus:border-brand-400 focus:outline-none"
            placeholder="Search country or code…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onSearchKeyDown}
          />
          <ul
            id={`${baseId}-list`}
            ref={listRef}
            role="listbox"
            aria-label="Country"
            className="max-h-60 overflow-y-auto"
          >
            {results.map((c, i) => {
              const isSelected = c.iso2 === selected.iso2;
              const isActive = i === activeIndex;
              return (
                <li
                  key={c.iso2}
                  id={`${baseId}-opt-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => commit(i)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm ${
                    isActive ? "bg-white/[0.08] text-ink" : "text-muted"
                  }`}
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    {flagEmoji(c.iso2)}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{c.name}</span>
                  <span className="shrink-0 tabular-nums text-muted">+{c.dial}</span>
                  {isSelected && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-brand-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              );
            })}
            {results.length === 0 && (
              <li className="px-2.5 py-3 text-sm text-muted">No countries match that search.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
