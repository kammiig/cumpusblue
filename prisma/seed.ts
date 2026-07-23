import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SEED_SERVICES, SEED_CASE_STUDIES, SEED_POSTS } from "../src/lib/seed-data";
import { PAGE_DEFAULTS } from "../src/lib/content";

const db = new PrismaClient();

/**
 * Bump this whenever the seeded page/service content in code changes and you
 * want deployed databases to pick it up. When the stored version differs, the
 * seed refreshes page content + services from code (authoritative). When it
 * matches, existing rows are left untouched so admin edits are preserved.
 */
const SEED_VERSION = "2026-07-24-compublue-consulting-2";

async function main() {
  const stored = await db.setting.findUnique({ where: { key: "seedVersion" } }).catch(() => null);
  const refresh = stored?.value !== SEED_VERSION;
  console.log(refresh ? `↻ Refreshing content to ${SEED_VERSION}` : "• Content up to date — creating missing rows only");

  // Admin user (created once; never overwritten)
  const email = process.env.ADMIN_EMAIL || "admin@compublue.com";
  const password = process.env.ADMIN_PASSWORD || "compublue-admin-2026";
  await db.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: await bcrypt.hash(password, 12), name: "Admin" },
  });
  console.log(`✔ Admin user: ${email}`);

  // Pages with default content + SEO
  for (const [slug, def] of Object.entries(PAGE_DEFAULTS)) {
    const content = JSON.stringify(
      Object.fromEntries(Object.entries(def.fields).map(([k, v]) => [k, v.value]))
    );
    await db.page.upsert({
      where: { slug },
      // On a version bump, refresh copy + SEO from code; otherwise leave edits alone.
      update: refresh ? { name: def.name, content, seoTitle: def.seoTitle, seoDesc: def.seoDesc } : {},
      create: { slug, name: def.name, content, seoTitle: def.seoTitle, seoDesc: def.seoDesc },
    });
  }
  console.log(`✔ ${Object.keys(PAGE_DEFAULTS).length} pages`);

  // Services — on refresh, remove stale services and update the seeded set.
  const seedSlugs = SEED_SERVICES.map((s) => s.slug);
  if (refresh) {
    const removed = await db.service.deleteMany({ where: { slug: { notIn: seedSlugs } } });
    if (removed.count) console.log(`  – removed ${removed.count} stale service(s)`);
  }
  let order = 0;
  for (const s of SEED_SERVICES) {
    const data = {
      slug: s.slug,
      title: s.title,
      excerpt: s.excerpt,
      body: s.body,
      bullets: JSON.stringify(s.bullets),
      icon: s.icon,
      image: s.image,
      imageAlt: s.imageAlt,
      faqs: JSON.stringify(s.faqs),
      order: order++,
      published: true,
      seoTitle: `${s.title} | Compublue`,
      seoDesc: s.excerpt.slice(0, 158),
    };
    await db.service.upsert({
      where: { slug: s.slug },
      update: refresh ? data : {},
      create: data,
    });
  }
  console.log(`✔ ${SEED_SERVICES.length} services`);

  // Case studies (created once; kept as-is)
  order = 0;
  for (const c of SEED_CASE_STUDIES) {
    await db.caseStudy.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        title: c.title,
        client: c.client,
        industry: c.industry,
        summary: c.summary,
        challenge: c.challenge,
        solution: c.solution,
        results: JSON.stringify(c.results),
        image: c.image,
        imageAlt: c.imageAlt,
        tags: JSON.stringify(c.tags),
        order: order++,
        seoTitle: `${c.title} | CompuBlue Case Study`,
        seoDesc: c.summary.slice(0, 158),
      },
    });
  }
  console.log(`✔ ${SEED_CASE_STUDIES.length} case studies`);

  // Blog posts (created once; kept as-is)
  const base = new Date("2026-06-01T09:00:00Z");
  let i = 0;
  for (const p of SEED_POSTS) {
    await db.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        body: p.body,
        image: p.image,
        imageAlt: p.imageAlt,
        tags: JSON.stringify(p.tags),
        publishedAt: new Date(base.getTime() - i * 7 * 24 * 3600 * 1000),
        seoTitle: `${p.title} | CompuBlue`,
        seoDesc: p.excerpt.slice(0, 158),
      },
    });
    i++;
  }
  console.log(`✔ ${SEED_POSTS.length} blog posts`);

  // Settings (created once; not overwritten so admin changes stick)
  const settings: Record<string, string> = {
    siteName: "Compublue",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://compublue.com",
    contactEmail: "contact@compublue.com",
    contactPhone: "+1 (818) 662-8800",
    leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL || "contact@compublue.com",
    pexelsApiKey: process.env.PEXELS_API_KEY || "",
  };
  for (const [key, value] of Object.entries(settings)) {
    await db.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
  console.log("✔ Settings");

  // Record the applied content version
  await db.setting.upsert({
    where: { key: "seedVersion" },
    update: { value: SEED_VERSION },
    create: { key: "seedVersion", value: SEED_VERSION },
  });

  console.log("\nSeed complete. Admin login:", email, "/", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
