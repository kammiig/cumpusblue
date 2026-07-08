import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SEED_SERVICES, SEED_CASE_STUDIES, SEED_POSTS } from "../src/lib/seed-data";
import { PAGE_DEFAULTS } from "../src/lib/content";

const db = new PrismaClient();

async function main() {
  // Admin user
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
    await db.page.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: def.name,
        content: JSON.stringify(
          Object.fromEntries(Object.entries(def.fields).map(([k, v]) => [k, v.value]))
        ),
        seoTitle: def.seoTitle,
        seoDesc: def.seoDesc,
      },
    });
  }
  console.log(`✔ ${Object.keys(PAGE_DEFAULTS).length} pages`);

  // Services
  let order = 0;
  for (const s of SEED_SERVICES) {
    await db.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
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
        seoTitle: `${s.title} | CompuBlue`,
        seoDesc: s.excerpt.slice(0, 158),
      },
    });
  }
  console.log(`✔ ${SEED_SERVICES.length} services`);

  // Case studies
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

  // Blog posts
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

  // Settings
  const settings: Record<string, string> = {
    siteName: "CompuBlue",
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
  console.log("\nSeed complete. Admin login:", email, "/", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
