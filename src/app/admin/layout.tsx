import Link from "next/link";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin | CompuBlue",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pages", label: "Pages & SEO" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/posts", label: "Blog Posts" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/media", label: "Images" },
  { href: "/admin/seo-audit", label: "SEO Audit" },
  { href: "/admin/settings", label: "Settings & Integrations" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    // Login page renders without chrome
    return <div className="min-h-screen bg-night-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-night-950 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-white/[0.07] bg-night-900 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-6 py-5">
          <Logo />
          <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
            Admin
          </span>
        </div>
        <nav aria-label="Admin navigation" className="px-3 pb-4">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {NAV.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link
                  href={n.href}
                  className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/[0.05] hover:text-ink"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-white/[0.07] px-3 pt-4">
            <p className="text-xs text-muted">{session.email}</p>
            <div className="mt-2 flex gap-3">
              <Link href="/" className="text-xs text-brand-300 hover:underline">
                View site ↗
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="text-xs text-muted hover:text-red-300">
                  Log out
                </button>
              </form>
            </div>
          </div>
        </nav>
      </aside>
      <main className="min-w-0 p-5 sm:p-8">{children}</main>
    </div>
  );
}
