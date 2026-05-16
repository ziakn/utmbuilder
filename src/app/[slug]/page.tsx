import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { UtmToolbox } from "@/components/tools/utm-toolbox";
import { seoPages, tools } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(`/${page.slug}`) },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(`/${page.slug}`),
    },
  };
}

export default async function SeoPage({ params }: Props) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) notFound();

  const isTool = page.category === "tool" || page.toolMode;
  const related = seoPages.filter((item) => item.category === page.category && item.slug !== page.slug).slice(0, 6);

  return (
    <>
      <Section className="border-b border-slate-200 bg-slate-50">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{labelFor(page.category)}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950">{page.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{page.description}</p>
        </Container>
      </Section>

      {isTool ? (
        <Section>
          <Container>
            <UtmToolbox mode={page.toolMode ?? "utm-builder"} />
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-950">{sectionTitle(page.category, page.title)}</h2>
            <p className="mt-4 leading-7 text-slate-600">{page.intent}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contentPoints(page.category).map((point) => (
                <div key={point} className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
                  {point}
                </div>
              ))}
            </div>
            <h2 className="mt-10 text-2xl font-bold text-slate-950">Recommended workflow</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Start with a clear destination URL, choose lowercase campaign values, keep source and medium consistent, validate the final link, and document the naming pattern before publishing.
            </p>
          </article>

          <aside className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-bold text-slate-950">Core tools</h2>
              <div className="mt-4 space-y-2">
                {tools.slice(0, 5).map((tool) => (
                  <Link key={tool.slug} href={`/${tool.slug}`} className="block text-sm font-medium text-slate-700 hover:text-slate-950">
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            {related.length > 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="font-bold text-slate-950">Related pages</h2>
                <div className="mt-4 space-y-2">
                  {related.map((item) => (
                    <Link key={item.slug} href={`/${item.slug}`} className="block text-sm font-medium text-slate-700 hover:text-slate-950">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </Container>
      </Section>
    </>
  );
}

function labelFor(category: string) {
  return {
    tool: "Free tool",
    education: "Marketing guide",
    platform: "Platform guide",
    example: "UTM examples",
    glossary: "Glossary",
    comparison: "Comparison",
    utility: "Utility hub",
    country: "Country guide",
    legal: "Website information",
  }[category];
}

function sectionTitle(category: string, title: string) {
  if (category === "legal") return title;
  if (category === "glossary") return `What ${title} means`;
  if (category === "comparison") return "How to compare the options";
  return `How to use ${title}`;
}

function contentPoints(category: string) {
  if (category === "legal") {
    return [
      "This page is a launch-ready placeholder and should be reviewed before advertising or analytics scripts are added.",
      "Keep legal pages visible in the footer for trust, AdSense review, and user transparency.",
    ];
  }

  if (category === "comparison") {
    return [
      "Compare tools based on tracking accuracy, reporting clarity, ease of use, and campaign workflow fit.",
      "UTM parameters are most useful when the final URL needs to pass campaign context into analytics reports.",
    ];
  }

  return [
    "Use consistent lowercase naming so reports do not split the same campaign into multiple rows.",
    "Validate links before launch to catch missing source, medium, campaign, broken redirects, and encoding issues.",
    "Document examples for your team so agencies, creators, paid media, and email teams follow the same pattern.",
    "Review campaign reports after launch and refine naming conventions before the next promotion.",
  ];
}

