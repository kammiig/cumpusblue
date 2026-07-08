"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession, destroySession, getSession } from "@/lib/auth";
import { setSetting } from "@/lib/settings";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

/* ---------- Auth ---------- */

export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }
  await createSession(user.id, user.email);
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  destroySession();
  redirect("/admin/login");
}

export async function changePasswordAction(formData: FormData) {
  const session = await requireAdmin();
  const password = String(formData.get("password") || "");
  if (password.length < 10) {
    redirect("/admin/settings?error=password-too-short");
  }
  await db.user.update({
    where: { email: session.email },
    data: { passwordHash: await bcrypt.hash(password, 12) },
  });
  redirect("/admin/settings?saved=1");
}

/* ---------- Pages ---------- */

export async function savePageAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  const contentKeys = String(formData.get("contentKeys") || "")
    .split(",")
    .filter(Boolean);
  const content: Record<string, string> = {};
  for (const key of contentKeys) {
    content[key] = String(formData.get(`content_${key}`) ?? "");
  }

  await db.page.update({
    where: { slug },
    data: {
      content: JSON.stringify(content),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDesc: String(formData.get("seoDesc") ?? ""),
      ogImage: String(formData.get("ogImage") ?? ""),
      canonical: String(formData.get("canonical") ?? ""),
      schemaJson: String(formData.get("schemaJson") ?? ""),
      noindex: formData.get("noindex") === "on",
    },
  });
  revalidateSite();
  redirect(`/admin/pages/${slug || "home"}?saved=1`);
}

/* ---------- Services ---------- */

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug"));
  await db.service.update({
    where: { slug },
    data: {
      title: String(formData.get("title") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      body: String(formData.get("body") ?? ""),
      bullets: linesToJson(formData.get("bullets")),
      image: String(formData.get("image") ?? ""),
      imageAlt: String(formData.get("imageAlt") ?? ""),
      faqs: String(formData.get("faqs") ?? "[]"),
      published: formData.get("published") === "on",
      order: Number(formData.get("order") || 0),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDesc: String(formData.get("seoDesc") ?? ""),
      ogImage: String(formData.get("ogImage") ?? ""),
      canonical: String(formData.get("canonical") ?? ""),
    },
  });
  revalidateSite();
  redirect(`/admin/services/${slug}?saved=1`);
}

/* ---------- Case studies ---------- */

export async function saveCaseStudyAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug"));
  await db.caseStudy.update({
    where: { slug },
    data: {
      title: String(formData.get("title") ?? ""),
      client: String(formData.get("client") ?? ""),
      industry: String(formData.get("industry") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      challenge: String(formData.get("challenge") ?? ""),
      solution: String(formData.get("solution") ?? ""),
      results: linesToJson(formData.get("results")),
      image: String(formData.get("image") ?? ""),
      imageAlt: String(formData.get("imageAlt") ?? ""),
      tags: linesToJson(formData.get("tags")),
      published: formData.get("published") === "on",
      order: Number(formData.get("order") || 0),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDesc: String(formData.get("seoDesc") ?? ""),
    },
  });
  revalidateSite();
  redirect(`/admin/case-studies/${slug}?saved=1`);
}

/* ---------- Posts ---------- */

export async function savePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const data = {
    slug: slugify(String(formData.get("postSlug") || formData.get("title") || "")),
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    body: String(formData.get("body") ?? ""),
    image: String(formData.get("image") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    author: String(formData.get("author") || "CompuBlue Team"),
    tags: linesToJson(formData.get("tags")),
    published: formData.get("published") === "on",
    seoTitle: String(formData.get("seoTitle") ?? ""),
    seoDesc: String(formData.get("seoDesc") ?? ""),
    ogImage: String(formData.get("ogImage") ?? ""),
    canonical: String(formData.get("canonical") ?? ""),
  };

  let postId = id;
  if (id) {
    await db.post.update({ where: { id }, data });
  } else {
    const created = await db.post.create({ data });
    postId = created.id;
  }
  revalidateSite();
  redirect(`/admin/posts/${postId}?saved=1`);
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  await db.post.delete({ where: { id: String(formData.get("id")) } });
  revalidateSite();
  redirect("/admin/posts?deleted=1");
}

/* ---------- Leads ---------- */

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();
  await db.lead.update({
    where: { id: String(formData.get("id")) },
    data: { status: String(formData.get("status") || "new") },
  });
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  await db.lead.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/leads");
}

/* ---------- Media ---------- */

export async function addMediaAction(formData: FormData) {
  await requireAdmin();
  const url = String(formData.get("url") || "").trim();
  if (!/^https?:\/\//.test(url)) redirect("/admin/media?error=invalid-url");
  await db.mediaImage.create({
    data: {
      url,
      alt: String(formData.get("alt") ?? ""),
      credit: String(formData.get("credit") ?? ""),
    },
  });
  redirect("/admin/media?saved=1");
}

export async function deleteMediaAction(formData: FormData) {
  await requireAdmin();
  await db.mediaImage.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/media");
}

/* ---------- Settings ---------- */

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const keys = String(formData.get("settingKeys") || "")
    .split(",")
    .filter(Boolean);
  for (const key of keys) {
    await setSetting(key, String(formData.get(key) ?? ""));
  }
  revalidateSite();
  redirect("/admin/settings?saved=1");
}

/* ---------- Helpers ---------- */

function linesToJson(v: FormDataEntryValue | null): string {
  const lines = String(v ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return JSON.stringify(lines);
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 80);
}
