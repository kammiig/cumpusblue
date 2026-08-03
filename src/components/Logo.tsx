import Link from "next/link";

/**
 * Compublue wordmark recreated as text (crisp at every size, screen-reader friendly).
 * "compu" = white on dark surfaces, "blue" = brand blue, matching the supplied logo.
 */
export function Logo({
  className = "",
  asLink = true,
}: {
  className?: string;
  asLink?: boolean;
}) {
  const mark = (
    <span
      className={`font-display text-4xl font-bold lowercase tracking-tight whitespace-nowrap ${className}`}
    >
      <span className="text-ink">compu</span>
      <span className="text-brand-500">blue</span>
      <span className="align-super text-[0.8em] font-semibold leading-none text-muted">™</span>
    </span>
  );
  if (!asLink) return mark;
  return (
    <Link
      href="/"
      aria-label="Compublue — home"
      className="inline-flex items-center rounded-md"
    >
      {mark}
    </Link>
  );
}
