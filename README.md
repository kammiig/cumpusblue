# CompuBlue — SaaS & AI Services Website

A complete rebuild of compublue.com: modern dark AI/SaaS design (Nexora-style), full
content management dashboard, lead capture, SEO tooling and WCAG-minded accessibility.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma (SQLite/Postgres) · Nodemailer**.

---

## Quick start (local)

```bash
cd compublue
cp .env.example .env        # then edit values (see below)
npm install
npm run setup               # creates the database + seeds all content + admin user
npm run dev                 # http://localhost:3000
```

Admin dashboard: **http://localhost:3000/admin**
Default login: the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`
(fallback if unset: `admin@compublue.com` / `compublue-admin-2026` — change it
immediately in Settings).

## Environment variables (`.env`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | `file:./dev.db` for local SQLite. For production use Postgres (see Deploying). |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://compublue.com`. Used for canonicals, sitemap, OG. |
| `AUTH_SECRET` | Long random string signing admin sessions. `openssl rand -hex 32` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Initial admin user created by `npm run setup`. |
| `SMTP_*`, `LEAD_NOTIFY_EMAIL` | Email notifications for new leads (also editable in admin Settings). |
| `PEXELS_API_KEY` | Powers the admin image search and `scripts/fetch-images.mjs`. |

## What's inside

**Public site** — Home, About, Services (+10 individual service pages), SaaS
Solutions, AI Solutions, Case Studies (+detail pages), Blog (+articles), Contact,
Privacy Policy, Terms & Conditions, custom 404.

**Admin dashboard** (`/admin`) —
- Pages & SEO: edit page copy, meta title/description, OG image, canonical URL, extra JSON-LD, noindex toggle
- Services / Case Studies / Blog Posts: full content editing (posts: create & delete too)
- Leads: every form submission with status workflow (new → contacted → closed)
- Images: Pexels search (copy URL with one click) + save any image URL with alt text
- SEO Audit: per-page checks (title/description length, social image, alt text) + site-wide checks
- Settings & Integrations: GA4, Meta Pixel, TikTok Pixel, Search Console verification, SMTP, contact info, social links, Pexels key, admin password

**SEO** — semantic H1/H2/H3 hierarchy, per-page metadata from the database, canonical
URLs, `sitemap.xml` and `robots.txt` generated automatically, JSON-LD for
Organization, WebSite, Service, BlogPosting, FAQPage and BreadcrumbList, clean URLs,
`next/image` optimization (AVIF/WebP, lazy loading) with alt text everywhere.

**Accessibility** — skip-to-content link, keyboard-operable navigation (Escape closes
menus), visible focus rings, labelled forms with proper error announcements
(`role="alert"`), ARIA where needed, `prefers-reduced-motion` support, contrast-safe
palette on dark backgrounds, screen-reader text for icon-only elements, logo rendered
as real text.

**Lead forms** — name, email, phone, company, service, budget, message. Stored in the
database, email notification via SMTP, honeypot field + minimum-fill-time check +
per-IP rate limiting for spam protection. Failure to send email never loses a lead.

## Images

Photography is hotlinked from the Pexels CDN (free license) with descriptive alt
text. To self-host the images instead (recommended for production):

```bash
node scripts/fetch-images.mjs   # downloads to public/images/ using your API key
```

Then update URLs in `src/lib/images.ts` (or per-item in the admin) to `/images/<name>.jpg`.

## Deploying to production (Vercel — recommended)

1. Push this folder to a GitHub repository.
2. Create a Postgres database (free tiers: [Neon](https://neon.tech), Vercel Postgres, Supabase).
3. In `prisma/schema.prisma` change `provider = "sqlite"` → `provider = "postgresql"`.
4. Import the repo in [vercel.com](https://vercel.com) and set the env vars from `.env.example`
   (use the Postgres connection string as `DATABASE_URL`).
5. After the first deploy, seed once from your machine:
   ```bash
   DATABASE_URL="<postgres-url>" npx prisma db push
   DATABASE_URL="<postgres-url>" ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run db:seed
   ```
6. Point the `compublue.com` DNS at Vercel (they show the exact records).

SMTP: any provider works (Google Workspace, Zoho, Resend SMTP, SendGrid…). Enter the
credentials in `/admin/settings` — a test lead from the contact form confirms delivery.

## Handy commands

```bash
npm run dev        # develop
npm run build      # production build (includes prisma generate)
npm run start      # run production build
npm run setup      # prisma generate + db push + seed (first run)
npm run db:seed    # re-seed only (never overwrites your edits — uses upsert)
```

## Content model notes

- Page copy is stored as JSON per page; the admin renders a form for each field.
  Seeded defaults live in `src/lib/content.ts` and `src/lib/seed-data.ts`.
- Service/post bodies support light formatting: blank line = new paragraph,
  `## ` = heading, `- ` = bullet list. No raw HTML is injected (XSS-safe).
- The site renders even before seeding (falls back to seed content), but the
  admin requires the database (`npm run setup`).
