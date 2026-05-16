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
  const title = `UTM Builder for ${platform.name} - Free Campaign URL Generator`;
  const description = `Create campaign tracking URLs for ${platform.name} using our free UTM Builder. Generate GA4-compatible tracking links with source ${platform.recommendedSource} and medium ${platform.recommendedMedium}.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/utm-builder-for/${platform.slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/utm-builder-for/${platform.slug}`) },
  };
}

export default async function PlatformProgrammaticPage({ params }: Props) {
  const { platform: slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  return (
    <ProgrammaticPage
      kind="platform"
      slug={platform.slug}
      title={`UTM Builder for ${platform.name}`}
      description={`Create GA4-compatible campaign tracking URLs for ${platform.name} using practical source, medium, campaign, and content values.`}
      name={platform.name}
      source={platform.recommendedSource}
      medium={platform.recommendedMedium}
      campaign={platform.exampleCampaign}
      content={platform.contentExample}
      uniqueAngle={`${platform.description} ${platform.name} traffic can be difficult to compare when campaign names, ad placements, or organic links use inconsistent labels. A dedicated UTM structure helps teams understand how this traffic performs in GA4 and how it compares with other channels.`}
      mistake={platform.mistake}
      bestPractice={platform.bestPractice}
      canonicalPath={`/utm-builder-for/${platform.slug}`}
    />
  );
}

