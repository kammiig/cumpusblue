# Deploying Compublue (Vercel + Neon Postgres)

The site runs as a Next.js app on Vercel, with its database on Neon.

> **Note on hosting:** Bluehost shared hosting cannot run this app. It has no
> Node.js support — no `selectorctl`, no Passenger, no Application Manager —
> and a Next.js app with an admin CMS needs a persistent server process that
> shared hosting will not provide. Vercel replaces it. The existing
> compublue.com site on Bluehost is unaffected by anything here.

---

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**, for all
three environments (Production, Preview, Development). `.env.production.example`
in this repo lists them with notes.

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Neon **pooled** string — the host containing `-pooler` |
| `AUTH_SECRET` | `openssl rand -hex 32`; changing it logs out all admins |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded on first migrate; change after first login |
| `NEXT_PUBLIC_SITE_URL` | No trailing slash; drives canonical tags and cookie `secure` |
| `NEXT_PUBLIC_NOINDEX` | `1` while on a preview URL, remove when canonical |

**Use the pooled connection string.** Serverless functions open connections
aggressively and the direct (unpooled) Neon string will exhaust the connection
limit under real traffic.

**Redeploy after changing any of these.** The `NEXT_PUBLIC_*` values and
`AUTH_SECRET` are compiled into the build — `AUTH_SECRET` is inlined into the
edge middleware. Editing them without a rebuild gives you an app whose
middleware signs sessions with one secret while the server verifies with
another, which looks like an admin login that loops back to the form.

---

## First-time database setup

Run once from your Mac, against the Neon database. Nothing here runs on Vercel.

```bash
# Use the DIRECT (non-pooler) Neon string for migrations
export DATABASE_URL="postgresql://...neon.tech/DBNAME?sslmode=require"
export ADMIN_EMAIL="admin@compublue.com"
export ADMIN_PASSWORD="your-strong-password"

npm run migrate      # prisma generate + db push + seed
```

This creates the 9 tables and fills them with the site's starter content —
pages, services, case studies, posts, settings, and the admin user. There is no
`.sql` dump to import; the content lives in `src/lib/seed-data.ts`.

The seed **upserts**, so it is safe to re-run: content edited in the admin
survives. Re-run it only when `prisma/schema.prisma` changes.

---

## Deploying

Vercel builds on every push to `main`. The build command is `npm run build`,
which is `prisma generate && next build` — the `prisma generate` matters,
because Vercel caches `node_modules` and would otherwise reuse a stale client.

```bash
git push origin main
```

To verify a deploy, check a route that touches the database and one that does
not — the difference isolates database problems from build problems:

```bash
curl -sI https://your-app.vercel.app/            | head -1   # 200 (queries DB)
curl -sI https://your-app.vercel.app/admin/login | head -1   # 200 (no DB)
```

If `/` returns 500 while `/admin/login` returns 200, the app is running and the
database connection is the problem — not the build. If `/robots.txt` also
returns 200, Prisma's client generated correctly, because that route imports
Prisma and only survives a failure through its own `.catch()`.

---

## Pointing compublue.com at the site

Currently the old site serves compublue.com from Bluehost. To move:

1. **Stage it first** on a subdomain: add `new.compublue.com` in Vercel →
   Domains, then add the CNAME it gives you in Bluehost → DNS. The old site
   keeps serving the apex untouched.
2. Set `NEXT_PUBLIC_SITE_URL="https://new.compublue.com"` and keep
   `NEXT_PUBLIC_NOINDEX="1"` so the staged copy cannot compete with the live
   site in search. Redeploy.
3. When ready, add `compublue.com` in Vercel → Domains and repoint the apex
   A/ALIAS record. Set `NEXT_PUBLIC_SITE_URL="https://compublue.com"` and
   remove `NEXT_PUBLIC_NOINDEX`. Redeploy.
4. Back up the Bluehost site before removing it — cPanel → File Manager →
   compress `public_html` and download it.

`NEXT_PUBLIC_NOINDEX` is opt-in on purpose: forgetting it leaves a staging copy
indexable, which is visible and reversible, whereas an opt-out flag would
silently de-index the real site the day it goes live.

---

## Sub-path deployments

`NEXT_PUBLIC_BASE_PATH` mounts the whole app under a sub-path (e.g. `/new`).
Leave it empty for a normal root deployment. It is read at build time and baked
into both the server output and the client bundle, so it cannot be changed
without rebuilding.

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| Every DB page 500s, `/admin/login` fine | `DATABASE_URL` unset, wrong, or provider mismatched with the schema |
| `the URL must start with the protocol postgresql://` | `prisma/schema.prisma` provider does not match the connection string |
| Admin login loops back to the form | Env changed without a redeploy, so middleware and server disagree on `AUTH_SECRET` |
| `too many connections` | Using the direct Neon string instead of the pooled one |
| Stale Prisma client after a schema change | Ensure the build runs `prisma generate` (it does, via `npm run build`) |
