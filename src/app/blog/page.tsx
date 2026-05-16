import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { blogPosts } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing Tracking Blog",
  description: "UTM, GA4, campaign tracking, and analytics education for marketers.",
  alternates: { canonical: absoluteUrl("/blog") },
};

export default function BlogIndexPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-bold text-slate-950">Marketing tracking blog</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Practical articles for UTM naming, campaign tracking, GA4 reporting, and analytics cleanup.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
              <p className="text-sm font-medium text-emerald-700">{post.date}</p>
              <h2 className="mt-3 text-xl font-bold text-slate-950">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{post.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
