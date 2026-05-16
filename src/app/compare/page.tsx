import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { tools } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "UTM Builder Comparisons",
  description: "Compare campaign tracking tools and choose the right UTM workflow for your marketing team.",
  alternates: { canonical: absoluteUrl("/compare") },
};

export default function ComparePage() {
  return (
    <Section>
      <Container>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">UTM tool comparisons</h1>
        <p className="mt-5 max-w-3xl text-base md:text-lg leading-8 text-neutral-500">
          Compare lightweight UTM workflows for single links, bulk campaign launches, QA checks, decoded URLs, and clean shareable links.
        </p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="grid gap-2 border-b border-neutral-200 p-5 last:border-b-0 md:grid-cols-[220px_1fr]">
              <span className="font-semibold text-neutral-900">{tool.name}</span>
              <span className="text-sm leading-6 text-neutral-500">{tool.description}</span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

