import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { guides, tools } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing Tracking Guides",
  description: "Practical UTM, campaign tracking, and analytics guides for marketers.",
  alternates: { canonical: absoluteUrl("/guides") },
};

export default function GuidesPage() {
  return (
    <>
      <Section className="border-b border-neutral-200 bg-neutral-50">
        <Container>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">Marketing tracking guides</h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-8 text-neutral-500">
            Educational pages designed for long-tail search intent: naming conventions, launch checks, attribution basics, and analytics cleanup.
          </p>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900">{guide.title}</h2>
              <p className="mt-4 text-sm leading-6 text-neutral-500">{guide.description}</p>
              <Link href="/blog/utm-tracking-basics" className="mt-5 inline-block text-sm font-semibold text-blue-700">
                Read related article
              </Link>
            </article>
          ))}
        </Container>
      </Section>
      <Section className="bg-neutral-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">Recommended tools</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 3).map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-xl border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-600 hover:text-neutral-900">
                {tool.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

