import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { UtmToolbox } from "@/components/tools/utm-toolbox";
import { platforms } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const platform = platforms.find((item) => item.slug === slug);
  if (!platform) return {};
  return {
    title: `${platform.name} UTM Builder and Tracking Guide`,
    description: `Create ${platform.name} UTM links with recommended source and medium values for cleaner analytics reporting.`,
    alternates: { canonical: absoluteUrl(`/platforms/${platform.slug}`) },
  };
}

export default async function PlatformPage({ params }: Props) {
  const { slug } = await params;
  const platform = platforms.find((item) => item.slug === slug);
  if (!platform) notFound();

  return (
    <>
      <Section className="border-b border-slate-200 bg-slate-50">
        <Container>
          <h1 className="text-4xl font-bold text-slate-950">{platform.name} UTM builder</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Use source <strong>{platform.source}</strong> and medium <strong>{platform.medium}</strong> as a clean starting point for {platform.name} campaign links.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <UtmToolbox mode="utm-builder" />
        </Container>
      </Section>
    </>
  );
}

