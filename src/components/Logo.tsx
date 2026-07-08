import Link from "next/link";

/**
 * CompuBlue wordmark recreated as text (crisp at every size, screen-reader friendly).
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
      className={`font-display text-2xl font-bold lowercase tracking-tight ${className}`}
    >
      <span className="text-ink">compu</span>
      <span className="text-brand-500">blue</span>
      <span className="align-super text-[0.5em] font-semibold text-muted">™</span>
    </span>
  );
  if (!asLink) return mark;
  return (
    <Link
      href="/"
      aria-label="CompuBlue — home"
      className="inline-flex items-center rounded-md"
    >
      {mark}
    </Link>
  );
}
