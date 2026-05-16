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
      <Section className="border-b border-slate-200 bg-slate-50">
        <Container>
          <h1 className="text-4xl font-bold text-slate-950">Marketing tracking guides</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Educational pages designed for long-tail search intent: naming conventions, launch checks, attribution basics, and analytics cleanup.
          </p>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">{guide.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">{guide.description}</p>
              <Link href="/blog/utm-tracking-basics" className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                Read related article
              </Link>
            </article>
          ))}
        </Container>
      </Section>
      <Section className="bg-slate-50">
        <Container>
          <h2 className="text-2xl font-bold text-slate-950">Recommended tools</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 3).map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 hover:text-slate-950">
                {tool.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

