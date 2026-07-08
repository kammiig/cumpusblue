/** Lightweight inline icon set (stroke style, Nexora-like). Decorative by default. */

const paths: Record<string, React.ReactNode> = {
  spark: (
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2zM19 15l.9 3.1L23 19l-3.1.9L19 23l-.9-3.1L15 19l3.1-.9L19 15z" />
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 8V4m0 0h3M9 13v2m6-2v2M8 17h8" />
    </>
  ),
  layers: (
    <path d="M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5m-18 4l9 5 9-5" />
  ),
  chart: (
    <path d="M4 20V10m5.5 10V4M15 20v-7m5 7V8M2 20h20" />
  ),
  chat: (
    <path d="M21 12a8 8 0 01-8 8H4l2.3-2.9A8 8 0 1121 12zM9 11h.01M13 11h.01M17 11h.01" />
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <circle cx="18" cy="6" r="3" />
      <path d="M9 6h6M6 9v6a3 3 0 003 3h6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  cloud: (
    <path d="M7 18a5 5 0 01-.9-9.9A7 7 0 0119.8 10 4.5 4.5 0 0118.5 18H7z" />
  ),
  megaphone: (
    <path d="M3 11v3a1 1 0 001 1h2l3 5h2v-5m-8-4l14-6v16l-14-6m8-4v8" />
  ),
  magnet: (
    <path d="M6 3v8a6 6 0 0012 0V3m-4 0v8a2 2 0 01-4 0V3M6 3h4m4 0h4" />
  ),
  shield: (
    <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4zm-3 10l2.2 2.2L16 9.5" />
  ),
  gauge: (
    <path d="M12 21a9 9 0 119-9m-9 9a9 9 0 01-9-9m9 9v0m0-9l5-5M12 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  ),
  arrow: <path d="M5 12h14m-6-6l6 6-6 6" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  ),
  pin: (
    <path d="M12 21s-7-5.75-7-11a7 7 0 1114 0c0 5.25-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
  ),
};

export function Icon({
  name,
  className = "h-6 w-6",
  label,
}: {
  name: string;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}
