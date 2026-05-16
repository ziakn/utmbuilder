import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { getAllPosts, getCategories, getTags } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing Tracking Blog",
  description:
    "Practical UTM, GA4, campaign tracking, QR tracking, attribution, and analytics guides for marketers.",
  alternates: { canonical: absoluteUrl("/blog") },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 3);
  const latest = posts.slice(3);
  const categories = getCategories(posts);
  const tags = getTags(posts).slice(0, 12);

  return (
    <>
      <Section className="border-b border-slate-200 bg-white">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Marketing education</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Marketing tracking blog
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Practical articles for UTM naming, GA4 reporting, campaign setup, QR tracking, social attribution, email measurement, and analytics cleanup.
          </p>
          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={18} className="text-slate-400" aria-hidden="true" />
            <span className="text-sm text-slate-500">Search interface placeholder: filter by UTM, GA4, email, QR, attribution, or platform guides.</span>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Featured articles" title="Start with the highest-impact campaign tracking guides" />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeader eyebrow="Latest posts" title="Fresh guides and troubleshooting workflows" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <SidebarBlock title="Categories">
              {categories.map((category) => (
                <span key={category} className="block rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                  {category}
                </span>
              ))}
            </SidebarBlock>
            <SidebarBlock title="Trending topics">
              {tags.map((tag) => (
                <span key={tag} className="mr-2 mt-2 inline-flex rounded-md bg-white px-3 py-2 text-sm text-slate-700">
                  {tag}
                </span>
              ))}
            </SidebarBlock>
            <SidebarBlock title="Popular guides">
              {posts.slice(0, 5).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block text-sm font-medium leading-6 text-slate-700 hover:text-slate-950">
                  {post.title}
                </Link>
              ))}
            </SidebarBlock>
          </aside>
        </Container>
      </Section>
    </>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-slate-950">{title}</h2>
    </div>
  );
}

function PostCard({
  post,
  featured = false,
}: {
  post: ReturnType<typeof getAllPosts>[number];
  featured?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-[16/9] rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#ecfdf5,#f8fafc_45%,#dbeafe)]" aria-hidden="true" />
      <p className="mt-5 text-sm font-semibold text-emerald-700">{post.category}</p>
      <h3 className={`${featured ? "text-2xl" : "text-xl"} mt-2 font-bold leading-tight text-slate-950`}>{post.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{post.description}</p>
      <p className="mt-4 text-xs font-medium text-slate-500">
        {post.date} · {post.readingTime}
      </p>
    </Link>
  );
}

function SidebarBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-bold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}
