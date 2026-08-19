# Deploying Compublue to compublue.com/new

A complete walkthrough for cPanel + Passenger + MySQL. The existing site at
`compublue.com/` keeps running untouched throughout.

Everywhere below, replace `cpuser` with your real cPanel username.

---

## First, three things worth knowing

**1. There is no database file to import.** This is the part that usually
confuses people coming from WordPress. There is no `.sql` dump, because the
site's content does not live in a database export — it lives in the code, in
`src/lib/seed-data.ts`. One command (`npm run migrate`) creates all 9 tables
*and* fills them with your pages, services, case studies, posts and admin
login. You will not touch phpMyAdmin except to look at the result.

*(A fallback `prisma/mysql-schema.sql` exists if you ever need to create the
tables by hand — see Appendix B. You will almost certainly not need it.)*

**2. Do not upload `node_modules` or `.next`.** They are 380 MB and 209 MB.
The server builds its own copies. Uploading them is slow and actively harmful —
Prisma and Next.js compile binaries specific to the machine that built them.

**3. The build must happen on the server.** Same reason: Prisma downloads a
database engine matching the server's Linux/OpenSSL version. A build made on
your Mac will fail at boot with a "missing query engine" error.

---

## Step 1 — Push your code to GitHub (on your Mac)

The deployment changes are in your working tree but not yet committed. The
server pulls from GitHub, so this has to happen first.

```bash
cd "/Volumes/working/claude projects/compublue originaal"
git add -A
git commit -m "Configure deployment for compublue.com/new"
git push origin main
```

Your `.env` is in `.gitignore`, so no secrets go to GitHub. Confirm with
`git status` — if `.env` appears in the list, stop and tell me.

---

## Step 2 — Create the MySQL database (cPanel, in the browser)

cPanel → **MySQL® Databases**.

1. **Create New Database** — name it `compublue`.
   cPanel prefixes it, giving `cpuser_compublue`. Write down the full name.

2. **MySQL Users → Add New User** — username `cbuser`, and use the password
   generator. Save the password somewhere safe. It becomes `cpuser_cbuser`.

3. **Add User To Database** — select `cpuser_cbuser` and `cpuser_compublue`,
   click Add, then tick **ALL PRIVILEGES** and Make Changes.

You now have three values for Step 5:

```
database: cpuser_compublue
username: cpuser_cbuser
password: (the one you generated)
```

Leave the database empty. Step 6 creates the tables.

---

## Step 3 — Get the code onto the server (SSH)

SSH in and clone the repo. Cloning *before* creating the Node.js app avoids a
clash with the placeholder files cPanel would otherwise put there.

```bash
ssh cpuser@compublue.com
cd ~
git clone https://github.com/kammiig/cumpusblue.git compublue-app
cd compublue-app && ls
```

You should see `server.js`, `package.json`, `src/`, `prisma/`.

**The folder is `~/compublue-app`, deliberately outside `public_html`.** That
means your source code, `.env` secrets and `node_modules` can never be
downloaded by a visitor. Only the `/new` URL is public, and Passenger serves
that.

> **If the repo is private,** the clone will ask for a password — GitHub no
> longer accepts your account password. Create a token at
> github.com → Settings → Developer settings → Personal access tokens →
> Fine-grained, with read access to this repo, and use:
> ```bash
> git clone https://YOUR_TOKEN@github.com/kammiig/cumpusblue.git compublue-app
> ```

> **No SSH or git on the host?** Appendix A covers uploading by rsync or File
> Manager instead.

---

## Step 4 — Create the Node.js application (cPanel, in the browser)

cPanel → **Setup Node.js App** → **Create Application**.

| Field | Value |
|---|---|
| Node.js version | **20.x** (18.17+ minimum — Next.js 14 requires it) |
| Application mode | **Production** |
| Application root | `compublue-app` |
| Application URL | pick `compublue.com`, then type `new` in the box beside it |
| Application startup file | `server.js` |

Click **Create**.

cPanel creates `public_html/new/` containing an `.htaccess` that hands the
sub-path to Passenger. **Do not edit or delete that file.**

> If `public_html/new` already exists with old content, rename it first
> (`mv public_html/new public_html/new-old`) or cPanel will overwrite it.

Then, at the top of the app's page, cPanel shows a command like:

```
source /home/cpuser/nodevenv/compublue-app/20/bin/activate && cd /home/cpuser/compublue-app
```

**Copy it.** You need it for every command from here on.

---

## Step 5 — Create the `.env` file (SSH)

Back in SSH, paste the activation command you just copied, then confirm you got
the right Node:

```bash
source /home/cpuser/nodevenv/compublue-app/20/bin/activate && cd /home/cpuser/compublue-app
node -v      # must print v20.x (or v18.17+)
```

> **Do this every time you open a new SSH session.** Running `npm` without it
> uses the system Node, which is usually too old and will fail confusingly.

Generate a session secret and keep the output visible:

```bash
openssl rand -hex 32
```

Create the file:

```bash
cp .env.production.example .env
nano .env
```

Fill in at minimum:

```ini
DATABASE_URL="mysql://cpuser_cbuser:YOUR_PASSWORD@localhost:3306/cpuser_compublue"
NEXT_PUBLIC_BASE_PATH="/new"
NEXT_PUBLIC_SITE_URL="https://compublue.com/new"
NEXT_PUBLIC_NOINDEX="1"
AUTH_SECRET="paste-the-openssl-output-here"
ADMIN_EMAIL="admin@compublue.com"
ADMIN_PASSWORD="a-strong-password-you-choose"
```

Save with `Ctrl+O`, `Enter`, then exit with `Ctrl+X`.

**Two things that will bite you if you get them wrong:**

- **Special characters in the DB password must be URL-encoded.**
  `@` → `%40`, `#` → `%23`, `/` → `%2F`, `:` → `%3A`. An unencoded `@` makes
  Prisma read the rest as a hostname and the connection fails. If your
  generated password has symbols, the simplest fix is to regenerate an
  alphanumeric-only one in cPanel.
- **Use `https://` in `NEXT_PUBLIC_SITE_URL` only if SSL is actually active**
  (Step 9). If the site is still plain `http://`, write `http://` — the app
  reads this to decide whether the admin session cookie is marked `secure`, and
  a `secure` cookie over HTTP is silently discarded by the browser, which shows
  up as a login screen that just reloads forever.

---

## Step 6 — Install, create the tables, build

Still in the activated environment, in `~/compublue-app`. **The `.env` must be
complete before you build** — `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`
and `AUTH_SECRET` are compiled into the output, so building first and editing
after leaves you with a half-configured app.

```bash
npm ci                # full install -- the build needs devDependencies too
npm run migrate       # creates the 9 tables AND seeds all content
npm run build         # compiles the site (2-5 minutes)
```

`npm run migrate` is the step you were thinking of as "importing the database."
When it finishes it prints your admin login.

**Check it worked:** open phpMyAdmin, select `cpuser_compublue`, and confirm 9
tables — `User`, `Page`, `Service`, `CaseStudy`, `Post`, `Lead`,
`PrivacyRequest`, `Setting`, `MediaImage` — with rows in `Page` and `Service`.

> **If `npm run build` is killed** partway (shared hosting memory limits), retry
> with:
> ```bash
> NODE_OPTIONS=--max-old-space-size=1024 npm run build
> ```

---

## Step 7 — Start it

cPanel → Setup Node.js App → **Restart**. Or from SSH:

```bash
mkdir -p tmp && touch tmp/restart.txt
```

Passenger restarts whenever `tmp/restart.txt` changes.

---

## Step 8 — Verify, and protect the old site

```bash
curl -sI https://compublue.com/new/ | head -1              # expect 200
curl -sI https://compublue.com/new/admin/login | head -1   # expect 200
curl -sI https://compublue.com/ | head -1                  # expect 200, old site fine
```

Then in a browser open `https://compublue.com/new/`, click through a few pages,
log in at `/new/admin/login`, and **change the admin password immediately**.
Submit the contact form once and confirm the lead lands in the admin.

**If `/new` shows the old site or a 404**, the old site's rewrite rules are
capturing the path. Back up and edit its `.htaccess`:

```bash
cp ~/public_html/.htaccess ~/htaccess.bak
nano ~/public_html/.htaccess
```

Add these two lines as the **very first** rules in the file:

```apache
RewriteEngine On
RewriteRule ^new(/.*)?$ - [L]
```

This tells Apache to leave `/new` alone. Most WordPress-style rules already
skip it (they only rewrite paths that are not real directories, and `/new` is
one), so you may not need this at all.

---

## Step 9 — Turn on HTTPS

cPanel → **SSL/TLS Status** → tick the domain → **Run AutoSSL**.

Do this before you log in to the admin for real: over plain `http://` your
admin password crosses the network in clear text. Once the certificate is
active, set `NEXT_PUBLIC_SITE_URL="https://compublue.com/new"` in `.env`, then
`npm run build && touch tmp/restart.txt`.

---

## Later: moving to the main domain

The sub-path is a single environment variable, so the move is small. When the
new site is ready to replace the old one:

1. **Back up the old site first** — cPanel → File Manager → compress
   `public_html` to a `.zip` and download it.
2. Remove or relocate the old site's files from `public_html`.
3. cPanel → Setup Node.js App → edit the app → change **Application URL** from
   `compublue.com/new` to `compublue.com` (clear the sub-directory box).
4. Edit `.env`:
   ```ini
   NEXT_PUBLIC_BASE_PATH=""
   NEXT_PUBLIC_SITE_URL="https://compublue.com"
   NEXT_PUBLIC_NOINDEX="0"
   ```
   Clearing `NEXT_PUBLIC_NOINDEX` is what lets Google index the site. It is
   deliberately opt-in, so forgetting it never silently hides your live site.
5. Rebuild and restart:
   ```bash
   npm run build && touch tmp/restart.txt
   ```

The database carries over untouched — same tables, same content, same admin
login. Nothing needs re-importing.

Afterwards, add 301 redirects from the old site's URLs to the new equivalents
if any paths changed, and submit the sitemap at
`https://compublue.com/sitemap.xml` in Google Search Console.

---

## Routine redeploys

After you push a change to GitHub:

```bash
ssh cpuser@compublue.com
source /home/cpuser/nodevenv/compublue-app/20/bin/activate && cd /home/cpuser/compublue-app
git pull
npm ci
npm run build
touch tmp/restart.txt
```

Only re-run `npm run migrate` when `prisma/schema.prisma` changed. It is safe to
repeat — the seed upserts, so content you edited in the admin is preserved.

---

## Rollback

Stop or delete the application in Setup Node.js App and delete
`public_html/new/`. The old site is unaffected — the two never shared a file,
a database, or a cookie.

---

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Admin login reloads the form forever | `.env` was finished *after* `npm run build`. Rebuild and restart. |
| Same, and the site is on plain HTTP | `NEXT_PUBLIC_SITE_URL` says `https://` but there is no SSL. Match it to reality, or run AutoSSL. |
| CSS and JS 404 under `/new` | Built without `NEXT_PUBLIC_BASE_PATH="/new"`. Check `.env`, rebuild. |
| `PrismaClientInitializationError` | Wrong `DATABASE_URL`, or an un-encoded symbol in the password. |
| `Can't reach database server` | Use `localhost`, not `127.0.0.1`, and confirm the user is attached to the database with ALL PRIVILEGES. |
| Missing query engine at boot | Built on your Mac. Rebuild on the server. |
| 503 from Passenger | Read `stderr.log` in `~/compublue-app`. Usually a wrong startup file or Node version. |
| `npm: command not found` | You skipped the `source .../activate` command. |
| Old site broke after editing `.htaccess` | `cp ~/htaccess.bak ~/public_html/.htaccess` |

---

## Appendix A — Uploading without git

If the server has no git, upload from your Mac with rsync. Run this from the
project directory locally:

```bash
rsync -avz --delete \
  --exclude node_modules --exclude .next --exclude out --exclude .git \
  --exclude .env --exclude '*.log' --exclude tsconfig.tsbuildinfo \
  --exclude '.DS_Store' --exclude 'client recent changes' \
  ./ cpuser@compublue.com:~/compublue-app/
```

The exclusions matter: `out/` is 216 MB of screenshots and `.next/cache` is
204 MB, none of it needed. `--exclude .env` also stops `--delete` from removing
the server's `.env`.

Via cPanel **File Manager** instead: zip the project locally *excluding*
`node_modules`, `.next`, `out` and `.git`, upload the zip to `~/compublue-app`,
and use Extract. Then continue from Step 4.

## Appendix B — Creating tables by hand in phpMyAdmin

Only if `npm run migrate` cannot run. `prisma/mysql-schema.sql` contains the
`CREATE TABLE` statements.

phpMyAdmin → select `cpuser_compublue` → **Import** → choose the file → **Go**.

This creates **empty tables only** — no pages, no services, no admin user, so
you cannot log in yet. Follow it with:

```bash
npm run db:seed
```

The schema is written to work on both MySQL and MariaDB. (Worth knowing why, if
you ever hand-edit it: the long content columns are `TEXT`/`LONGTEXT` and carry
no `DEFAULT`, because MySQL 8 rejects defaults on those column types, while the
short columns stay `VARCHAR` — three tables would otherwise exceed InnoDB's
65,535-byte row limit.)
