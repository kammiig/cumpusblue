"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = { value: string; label: string };

/**
 * Accessible dark single-select (listbox pattern). Native <select> option
 * panels render in an OS-controlled popup that stays white on most platforms,
 * so this replaces it with a fully themed control that keeps keyboard support,
 * screen-reader semantics and a plain form value.
 */
export function DarkSelect({
  value,
  onChange,
  options,
  labelId,
  placeholderMuted = true,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  labelId?: string;
  placeholderMuted?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];
  const isPlaceholder = selected?.value === "";

  // Close on outside click.
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // On open, point the active option at the current selection.
  useEffect(() => {
    if (open) {
      const i = options.findIndex((o) => o.value === value);
      setActiveIndex(i < 0 ? 0 : i);
    }
  }, [open, value, options]);

  function commit(i: number) {
    const opt = options[i];
    if (opt) onChange(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
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
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(activeIndex);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="field flex w-full items-center justify-between gap-2 text-left"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
      >
        <span className={placeholderMuted && isPlaceholder ? "text-muted" : "text-ink"}>
          {selected?.label}
        </span>
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

      {open && (
        <ul
          role="listbox"
          aria-labelledby={labelId}
          aria-activedescendant={`${baseId}-opt-${activeIndex}`}
          tabIndex={-1}
          className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-white/10 bg-night-850 p-1.5 shadow-card"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            const isActive = i === activeIndex;
            return (
              <li
                id={`${baseId}-opt-${i}`}
                key={o.value || "placeholder"}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(i)}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-base ${
                  isActive ? "bg-white/[0.08] text-ink" : "text-muted"
                }`}
              >
                <span>{o.label}</span>
                {isSelected && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-300" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
