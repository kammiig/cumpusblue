import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, CtaBand } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { getPosts } from "@/lib/data";
import { getPageContent, PAGE_DEFAULTS } from "@/lib/content";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const d = PAGE_DEFAULTS["blog"];
  return pageMetadata("blog", { title: d.seoTitle, description: d.seoDesc, path: "/blog" });
}

export default async function BlogPage() {
  const [c, posts, settings] = await Promise.all([
    getPageContent("blog"),
    getPosts(),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);

  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(settings, [
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="wrap relative py-20 sm:py-28">
          <SectionHead as="h1" pill="Blog" title={c.introTitle} sub={c.introBody} />
        </div>
      </section>

      <section className="wrap py-16 sm:py-24" aria-label="Articles">
        {featured && (
          <article className="card card-hover group relative mb-12 grid overflow-hidden lg:grid-cols-2">
            <div className="relative aspect-[16/9] lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Featured</p>
              <h2 className="h-display mt-3 text-2xl leading-snug sm:text-3xl">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{featured.excerpt}</p>
              <p className="mt-5 text-xs text-muted">
                <time dateTime={featured.publishedAt.toISOString()}>
                  {featured.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>{" "}
                · {featured.author}
              </p>
            </div>
          </article>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <article key={p.slug} className="card card-hover group relative overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 640px) 380px, 100vw"
                />
              </div>
              <div className="p-6">
                <time dateTime={p.publishedAt.toISOString()} className="text-xs text-muted">
                  {p.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <h2 className="h-display mt-2 text-lg leading-snug">
                  <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Prefer answers to articles?"
        sub="Skip the reading list — tell us your situation and we'll point you at what matters."
      />
    </>
  );
}
