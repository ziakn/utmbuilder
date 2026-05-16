import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";
import { glossaryTerms, tools } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "UTM Tracking Basics for Marketers",
  description:
    "Learn how UTM parameters help marketers track campaign performance across ads, email, social, affiliate, and offline channels.",
  alternates: { canonical: absoluteUrl("/blog/utm-tracking-basics") },
};

export default function BlogPostPage() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <article className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Marketing analytics</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950">UTM Tracking Basics for Marketers</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            UTM parameters are short tracking values added to a URL so analytics tools can identify where a visit came from and which campaign generated it.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-950">The five common UTM parameters</h2>
          <div className="mt-5 space-y-4">
            {glossaryTerms.map((term) => (
              <Link key={term.slug} href={`/glossary/${term.slug}`} className="block rounded-lg border border-slate-200 p-4">
                <span className="font-semibold text-slate-950">{term.term}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{term.definition}</span>
              </Link>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold text-slate-950">Practical naming rules</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Use lowercase values, avoid spaces, keep channel names consistent, and document a simple source and medium taxonomy before campaign launch.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-950">Before publishing</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Generate the URL, validate the required fields, click the link once, confirm redirects preserve parameters, and check that your analytics reports group the visit correctly.
          </p>
        </article>
        <aside>
          <div className="sticky top-24 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-bold text-slate-950">Related tools</h2>
            <div className="mt-4 space-y-2">
              {tools.slice(0, 4).map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block text-sm font-medium text-slate-700 hover:text-slate-950">
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

