import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticPage } from "@/components/programmatic/programmatic-page";
import { getPlatform, platforms } from "@/lib/programmatic";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ platform: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return platforms.map((platform) => ({ platform: platform.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};
  const title = `UTM Examples for ${platform.name} - Source, Medium, Campaign URLs`;
  const description = `Review practical UTM examples for ${platform.name}, including source ${platform.recommendedSource}, medium ${platform.recommendedMedium}, campaign naming, and content tracking.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/utm-examples-for/${platform.slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/utm-examples-for/${platform.slug}`) },
  };
}

export default async function PlatformExamplesPage({ params }: Props) {
  const { platform: slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  return (
    <ProgrammaticPage
      kind="example"
      slug={platform.slug}
      title={`UTM Examples for ${platform.name}`}
      description={`Review example UTM URLs for ${platform.name} campaigns and adapt them for GA4 reporting, campaign QA, and launch documentation.`}
      name={platform.name}
      source={platform.recommendedSource}
      medium={platform.recommendedMedium}
      campaign={platform.exampleCampaign}
      content={platform.contentExample}
      uniqueAngle={`Examples make ${platform.name} campaign tracking easier to standardize. Use these structures to brief marketers, agencies, creators, analysts, and paid media teams before links are published.`}
      mistake={platform.mistake}
      bestPractice={platform.bestPractice}
      canonicalPath={`/utm-examples-for/${platform.slug}`}
    />
  );
}

