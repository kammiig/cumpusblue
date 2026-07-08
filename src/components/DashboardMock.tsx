/**
 * Dashboard-style hero visual (pure SVG/CSS — loads instantly, no image request).
 * Mirrors the "product screenshot in a glass frame" pattern from the Nexora template.
 */
export function DashboardMock() {
  return (
    <div
      className="card relative overflow-hidden p-3 sm:p-4"
      role="img"
      aria-label="Preview of a CompuBlue analytics dashboard with revenue chart, automation runs and lead pipeline"
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

        <div className="grid gap-3 p-3 sm:grid-cols-3 sm:gap-4 sm:p-4" aria-hidden="true">
          {/* KPI cards */}
          {[
            { label: "Hours automated", value: "1,284", delta: "+18.2%" },
            { label: "Qualified leads", value: "342", delta: "+31.4%" },
            { label: "Cost saved", value: "$96.4k", delta: "+12.9%" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-wider text-muted">{k.label}</p>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-display text-xl font-semibold text-ink sm:text-2xl">{k.value}</span>
                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  {k.delta}
                </span>
              </div>
            </div>
          ))}

          {/* Chart */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-ink">Automation runs · last 12 weeks</p>
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted">Weekly</span>
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

          {/* Pipeline list */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
            <p className="text-xs font-medium text-ink">Lead pipeline</p>
            <ul className="mt-3 space-y-2.5">
              {[
                { s: "New", w: "w-[92%]", c: "bg-brand-500" },
                { s: "Qualified", w: "w-[68%]", c: "bg-accent-500" },
                { s: "Proposal", w: "w-[44%]", c: "bg-cyanish" },
                { s: "Won", w: "w-[27%]", c: "bg-emerald-400" },
              ].map((r) => (
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
            <div className="mt-4 rounded-lg border border-brand-500/25 bg-brand-500/10 p-2.5">
              <p className="text-[10px] font-semibold text-brand-300">AI Assistant</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted">
                14 leads auto-qualified overnight. 3 need review.
              </p>
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
