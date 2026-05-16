import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { ProgrammaticPage } from "@/components/programmatic/programmatic-page";
import { UtmToolbox } from "@/components/tools/utm-toolbox";
import { seoPages, tools } from "@/data/site-data";
import { countries, getCountryFromRootSlug, getIndustryFromRootSlug, industries } from "@/lib/programmatic";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [
    ...seoPages.map((page) => ({ slug: page.slug })),
    ...countries.map((country) => ({ slug: `utm-builder-${country.slug}` })),
    ...industries.map((industry) => ({ slug: `utm-builder-for-${industry.slug}` })),
  ];
  return Array.from(new Map(params.map((param) => [param.slug, param])).values());
}

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryFromRootSlug(slug);
  if (country) {
    return constructMetadata({
      title: `UTM Builder ${country.name} - Free Campaign URL Generator`,
      description: `Create UTM campaign tracking URLs for ${country.name} marketing campaigns with GA4-ready source, medium, campaign, and content values.`,
      path: `/${slug}`,
    });
  }
  const industry = getIndustryFromRootSlug(slug);
  if (industry) {
    return constructMetadata({
      title: `UTM Builder for ${industry.name} - Free Campaign URL Generator`,
      description: `Create GA4-compatible UTM tracking URLs for ${industry.name} campaigns, examples, and marketing attribution workflows.`,
      path: `/${slug}`,
    });
  }
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) return {};

  return constructMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
  });
}

import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/json-ld";

export default async function SeoPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountryFromRootSlug(slug);
  if (country) {
    return (
      <ProgrammaticPage
        kind="country"
        slug={country.slug}
        title={`UTM Builder ${country.name}`}
        description={`Create GA4-compatible campaign tracking URLs for ${country.name} marketing campaigns across paid ads, email, social, affiliate, and QR placements.`}
        name={country.name}
        source={country.exampleSource}
        medium="paid_social"
        campaign={`${country.market.toLowerCase()}_campaign`}
        content="market_cta"
        uniqueAngle={`${country.name} campaign tracking should separate local market performance from global or regional reporting. ${country.regionalTip} Use UTM values to identify the source, channel, campaign, and market-specific placement.`}
        mistake={`A common ${country.name} tracking mistake is mixing local campaigns with global campaign names, which makes ${country.market} performance harder to isolate in GA4.`}
        bestPractice={`Include market-specific campaign names or content values when ${country.name} campaigns differ from global messaging.`}
        canonicalPath={`/${slug}`}
      />
    );
  }
  const industry = getIndustryFromRootSlug(slug);
  if (industry) {
    return (
      <ProgrammaticPage
        kind="industry"
        slug={industry.slug}
        title={`UTM Builder for ${industry.name}`}
        description={`Create campaign tracking URLs for ${industry.name} marketing workflows with practical UTM examples and GA4 attribution guidance.`}
        name={industry.name}
        source={industry.source}
        medium={industry.medium}
        campaign={industry.campaign}
        content="primary_cta"
        uniqueAngle={`${industry.example} ${industry.name} campaigns often combine online and offline touchpoints, so clean UTM naming helps teams compare channels, landing pages, and conversion paths.`}
        mistake={`A common ${industry.name} mistake is using one generic campaign URL for every placement instead of separating high-value channels and assets.`}
        bestPractice={`Use source and content values to distinguish the ${industry.name} placements that matter most for reporting.`}
        canonicalPath={`/${slug}`}
      />
    );
  }
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) notFound();

  const isTool = page.category === "tool" || page.toolMode;
  const isArticle = page.category === "education" || page.category === "platform" || page.category === "example" || page.category === "comparison" || page.category === "glossary";
  const related = seoPages.filter((item) => item.category === page.category && item.slug !== page.slug).slice(0, 6);
  const pageUrl = absoluteUrl(`/${page.slug}`);

  return (
    <>
      {isArticle && (
        <ArticleSchema
          title={page.title}
          description={page.description}
          url={pageUrl}
        />
      )}
      <BreadcrumbSchema
        items={[
          { name: "Home", item: absoluteUrl("/") },
          { name: page.title, item: pageUrl },
        ]}
      />
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
