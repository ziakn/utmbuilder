import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { blogPosts, glossaryTerms, tools } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <article className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{post.date}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{post.description}</p>
          <h2 className="mt-10 text-2xl font-bold text-slate-950">Recommended tracking approach</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Start with the campaign objective, choose a destination URL, define source and medium values, then add campaign and content values that make reporting easy to scan.
          </p>
          <h2 className="mt-10 text-2xl font-bold text-slate-950">Key UTM fields</h2>
          <div className="mt-5 space-y-4">
            {glossaryTerms.map((term) => (
              <Link key={term.slug} href={`/${term.slug}`} className="block rounded-lg border border-slate-200 p-4">
                <span className="font-semibold text-slate-950">{term.term}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{term.definition}</span>
              </Link>
            ))}
          </div>
        </article>
        <aside>
          <div className="sticky top-24 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-bold text-slate-950">Related tools</h2>
            <div className="mt-4 space-y-2">
              {tools.slice(0, 4).map((tool) => (
                <Link key={tool.slug} href={`/${tool.slug}`} className="block text-sm font-medium text-slate-700 hover:text-slate-950">
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </Container>
    </Section>
  );
}

