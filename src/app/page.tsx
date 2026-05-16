import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { UtmToolbox } from "@/components/tools/utm-toolbox";
import { countries, glossaryTerms, guides, platforms, tools } from "@/data/site-data";

const benefits = [
  "Static pages for fast indexing",
  "Clean UTM naming guidance",
  "No signup, cookies, or stored campaign data",
  "Tool pages built around long-tail search intent",
];

export default function Home() {
  return (
    <>
      <Section className="border-b border-slate-200 bg-white pb-10">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
              <Sparkles size={16} aria-hidden="true" />
              Free campaign tracking tools
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              UTM builder and marketing tracking tools for cleaner analytics.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Generate UTM links, validate campaign URLs, decode parameters, clean tracking links, and learn practical analytics workflows from a fast static website.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800" href="/utm-builder">
                Open UTM Builder
                <ArrowRight className="ml-2" size={17} aria-hidden="true" />
              </Link>
              <Link className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-semibold text-slate-950 hover:bg-slate-50" href="/campaign-tracking-guide">
                Read tracking guides
              </Link>
            </div>
            <ul className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={17} aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <UtmToolbox mode="utm-builder" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Marketing utilities</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Tools for every campaign link workflow</h2>
            </div>
            <Search className="hidden text-slate-300 sm:block" size={44} aria-hidden="true" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-950">{tool.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container className="grid gap-10 lg:grid-cols-3">
          <IndexBlock title="Guides" items={guides.map((item) => ({ href: `/${item.slug}`, label: item.title }))} />
          <IndexBlock title="Glossary" items={glossaryTerms.map((item) => ({ href: `/${item.slug}`, label: item.term }))} />
          <IndexBlock title="Programmatic pages" items={[...platforms.slice(0, 3).map((item) => ({ href: `/utm-builder-for-${item.slug.replace("facebook-ads", "facebook")}`, label: `${item.name} UTM guide` })), ...countries.slice(0, 2).map((item) => ({ href: item.slug === "united-states" ? "/utm-builder-usa" : "/utm-builder-uk", label: `${item.name} tracking guide` }))]} />
        </Container>
      </Section>
    </>
  );
}

function IndexBlock({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <Link key={`${item.href}-${item.label}`} className="block rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-950" href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
