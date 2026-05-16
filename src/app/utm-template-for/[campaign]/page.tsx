import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticPage } from "@/components/programmatic/programmatic-page";
import { campaigns, getCampaign } from "@/lib/programmatic";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ campaign: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ campaign: campaign.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { campaign: slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return {};
  const title = `UTM Template for ${campaign.name} - Free Campaign URL Structure`;
  const description = `Use this ${campaign.name} UTM template to create consistent GA4 campaign links for ${campaign.useCase}.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/utm-template-for/${campaign.slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/utm-template-for/${campaign.slug}`) },
  };
}

export default async function CampaignTemplatePage({ params }: Props) {
  const { campaign: slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  return (
    <ProgrammaticPage
      kind="campaign"
      slug={campaign.slug}
      title={`UTM Template for ${campaign.name}`}
      description={`Create a reusable UTM structure for ${campaign.name} campaigns across GA4, marketing reports, and team launch checklists.`}
      name={campaign.name}
      source={campaign.source}
      medium={campaign.medium}
      campaign={campaign.campaign}
      content="primary_cta"
      uniqueAngle={`${campaign.name} campaigns often involve ${campaign.useCase}. A template helps teams reuse the same source, medium, campaign, and content conventions instead of recreating links from memory every time.`}
      mistake={`A common ${campaign.name} mistake is changing source or medium values between placements, which splits GA4 reporting and makes campaign comparisons harder.`}
      bestPractice={`Document this ${campaign.name} template before launch and reuse it across every placement that belongs to the same campaign.`}
      canonicalPath={`/utm-template-for/${campaign.slug}`}
    />
  );
}

