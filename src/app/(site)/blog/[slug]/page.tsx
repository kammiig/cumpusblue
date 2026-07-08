import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";
import { CtaBand } from "@/components/Section";
import { getPost, getPosts } from "@/lib/data";
import { buildMetadata, breadcrumbSchema, blogPostSchema } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle || `${post.title} | CompuBlue`,
    description: post.seoDesc || post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.ogImage || post.image,
    canonical: post.canonical || undefined,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, all, settings] = await Promise.all([
    getPost(params.slug),
    getPosts(),
    getSettings().catch(() => ({} as Record<string, string>)),
  ]);
  if (!post) notFound();

  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          blogPostSchema(settings, post),
          breadcrumbSchema(settings, [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="relative overflow-hidden border-b border-white/[0.06]">
          <div aria-hidden="true" className="bg-grid absolute inset-0" />
          <div className="wrap relative max-w-4xl py-16 sm:py-24">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blog" className="hover:text-brand-300">Blog</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="line-clamp-1 text-ink">{post.title}</li>
              </ol>
            </nav>
            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Topics">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <h1 className="h-display mt-5 text-balance text-3xl leading-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-sm text-muted">
              <time dateTime={post.publishedAt.toISOString()}>
                {post.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>{" "}
              · {post.author}
            </p>
          </div>
        </header>

        <div className="wrap max-w-4xl py-14">
          <div className="card overflow-hidden">
            <Image
              src={post.image}
              alt={post.imageAlt}
              width={1400}
              height={800}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <p className="text-lg leading-relaxed text-ink">{post.excerpt}</p>
            <div className="mt-8">
              <RichText text={post.body} />
            </div>
          </div>
        </div>

        {more.length > 0 && (
          <section className="border-t border-white/[0.06] py-16" aria-labelledby="more-posts-title">
            <div className="wrap">
              <h2 id="more-posts-title" className="h-display text-2xl">Keep reading</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {more.map((p) => (
                  <article key={p.slug} className="card card-hover group relative p-6">
                    <time dateTime={p.publishedAt.toISOString()} className="text-xs text-muted">
                      {p.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    <h3 className="h-display mt-2 text-base leading-snug">
                      <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                        {p.title}
                      </Link>
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CtaBand />
    </>
  );
}
