import { Icon } from "./Icons";

/**
 * Hero visual (pure SVG/CSS — loads instantly, no image request). A clean,
 * dark "management dashboard" framing the five core areas Compublue aligns.
 * No invented metrics or performance claims.
 */
const CAPABILITIES: { label: string; icon: string }[] = [
  { label: "Strategy", icon: "spark" },
  { label: "Operations", icon: "workflow" },
  { label: "Governance", icon: "shield" },
  { label: "Technology", icon: "cloud" },
  { label: "Execution", icon: "gauge" },
];

const LIFECYCLE: { s: string; w: string; c: string }[] = [
  { s: "Assess", w: "w-[88%]", c: "bg-brand-500" },
  { s: "Transform", w: "w-[72%]", c: "bg-accent-500" },
  { s: "Organize", w: "w-[64%]", c: "bg-cyanish" },
  { s: "Execute", w: "w-[80%]", c: "bg-brand-400" },
  { s: "Transition", w: "w-[56%]", c: "bg-emerald-400" },
];

export function DashboardMock() {
  return (
    <div
      className="card relative overflow-hidden p-3 sm:p-4"
      role="img"
      aria-label="A management dashboard aligning strategy, operations, governance, technology and execution"
    >
      <div className="rounded-xl border border-white/[0.07] bg-night-900/90">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500/70" />
          <span className="ml-3 hidden rounded-md bg-white/[0.05] px-3 py-1 text-[11px] text-muted sm:block">
            app.compublue.com/dashboard
          </span>
        </div>

        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4" aria-hidden="true">
          {/* Five core areas */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CAPABILITIES.map((k) => (
              <div
                key={k.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/25 bg-brand-500/10 text-brand-300">
                  <Icon name={k.icon} className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">{k.label}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {/* Alignment trend (abstract, no figures) */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-ink">Execution alignment</p>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted">Trend</span>
              </div>
              <svg viewBox="0 0 320 120" className="mt-3 w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dmfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B9DE4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#1B9DE4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="dmline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1B9DE4" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>
                </defs>
                {[20, 50, 80].map((y) => (
                  <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                ))}
                <path
                  d="M0 95 L27 88 L53 90 L80 74 L107 78 L133 62 L160 66 L187 48 L213 54 L240 36 L267 40 L293 22 L320 18 L320 120 L0 120 Z"
                  fill="url(#dmfill)"
                />
                <path
                  d="M0 95 L27 88 L53 90 L80 74 L107 78 L133 62 L160 66 L187 48 L213 54 L240 36 L267 40 L293 22 L320 18"
                  fill="none"
                  stroke="url(#dmline)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="293" cy="22" r="4" fill="#0A101F" stroke="#3FB0EA" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Execution lifecycle (labels only) */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
              <p className="text-xs font-medium text-ink">Execution lifecycle</p>
              <ul className="mt-3 space-y-2.5">
                {LIFECYCLE.map((r) => (
                  <li key={r.s}>
                    <div className="flex justify-between text-[10px] text-muted">
                      <span>{r.s}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
                      <div className={`h-1.5 rounded-full ${r.c} ${r.w}`} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-20 -bottom-24 h-48 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(27,157,228,0.28),transparent_70%)]"
      />
    </div>
  );
}
