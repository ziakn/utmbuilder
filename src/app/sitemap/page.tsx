import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { blogPosts, seoPages } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "HTML Sitemap",
  description: "Browse all UTM Builder pages, tools, guides, glossary entries, examples, comparisons, and blog posts.",
  path: "/sitemap",
});

export default function SitemapPage() {
  const groups = ["tool", "education", "platform", "example", "glossary", "comparison", "utility", "country", "legal"];

  return (
    <Section>
      <Container>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">Sitemap</h1>
        <p className="mt-5 max-w-3xl text-base md:text-lg leading-8 text-neutral-500">
          Browse the main static pages available on UTM Builder.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group}>
              <h2 className="font-bold capitalize text-neutral-900">{group}</h2>
              <div className="mt-4 space-y-2">
                {seoPages
                  .filter((page) => page.category === group)
                  .map((page) => (
                    <Link key={page.slug} href={`/${page.slug}`} className="block text-sm text-neutral-500 hover:text-neutral-900">
                      {page.title}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
          <div>
            <h2 className="font-bold text-neutral-900">Blog</h2>
            <div className="mt-4 space-y-2">
              <Link href="/blog" className="block text-sm text-neutral-500 hover:text-neutral-900">
                Blog index
              </Link>
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block text-sm text-neutral-500 hover:text-neutral-900">
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

