import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { MdxContent } from "@/components/marketing/mdx-content";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = safeGetPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = safeGetPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchemas(post)) }} />
      <Section className="border-b border-slate-200 bg-white pb-10">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{post.category}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span>Published {post.date}</span>
            <span>Updated {post.updated}</span>
            <span>{post.readingTime}</span>
            <span>By {post.author}</span>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="min-w-0">
            <div className="aspect-[16/9] rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#ecfdf5,#f8fafc_45%,#dbeafe)]" aria-label={post.featuredImage} />
            <div className="mt-10">
              <MdxContent body={post.body} />
            </div>
            <CtaBlocks />
            <AuthorBox post={post} />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h2 className="font-bold text-slate-950">Table of contents</h2>
                <nav className="mt-4 space-y-2">
                  {post.headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm leading-6 text-slate-600 hover:text-slate-950 ${heading.level === 3 ? "pl-4" : ""}`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
              <SidebarLinks />
            </div>
          </aside>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-slate-950">Related articles</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
                <p className="text-sm font-semibold text-emerald-700">{item.category}</p>
                <h3 className="mt-2 font-bold leading-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function safeGetPost(slug: string) {
  try {
    return getPostBySlug(slug);
  } catch {
    return null;
  }
}

function CtaBlocks() {
  const links = [
    ["Build a UTM link", "/utm-builder"],
    ["Validate a campaign URL", "/utm-validator"],
    ["Decode a tracking link", "/utm-decoder"],
    ["Create a tracked QR code", "/qr-code-with-utm"],
  ];
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 font-semibold text-emerald-900 hover:bg-emerald-100">
          {label}
        </Link>
      ))}
    </div>
  );
}

function SidebarLinks() {
  const links = [
    ["UTM Builder", "/utm-builder"],
    ["Bulk UTM Builder", "/bulk-utm-builder"],
    ["UTM Source", "/utm-source"],
    ["Campaign Attribution", "/campaign-attribution"],
  ];
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="font-bold text-slate-950">Useful links</h2>
      <div className="mt-4 space-y-2">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="block text-sm font-medium text-slate-700 hover:text-slate-950">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function AuthorBox({ post }: { post: ReturnType<typeof getPostBySlug> }) {
  return (
    <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h2 className="font-bold text-slate-950">{post.author}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Practical campaign tracking, GA4 reporting, attribution, and UTM governance guidance from the UTM Builder editorial team.
      </p>
    </div>
  );
}

function buildSchemas(post: ReturnType<typeof getPostBySlug>) {
  const faq = [
    {
      question: `What is the main takeaway from ${post.title}?`,
      answer: post.description,
    },
    {
      question: "Which tools should I use after reading this guide?",
      answer: "Use the UTM Builder, UTM Validator, UTM Decoder, and QR Code with UTM tools to apply the campaign tracking workflow.",
    },
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      author: { "@type": "Organization", name: post.author },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
      ],
    },
  ];
}

