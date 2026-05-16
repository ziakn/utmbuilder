import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { countries, platforms } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  if (!country) return {};
  return {
    title: `UTM Campaign Tracking for ${country.name}`,
    description: `Build UTM links and campaign naming conventions for marketing teams targeting ${country.name}.`,
    alternates: { canonical: absoluteUrl(`/countries/${country.slug}`) },
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = countries.find((item) => item.slug === slug);
  if (!country) notFound();

  return (
    <Section>
      <Container>
        <h1 className="max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">UTM campaign tracking for {country.name}</h1>
        <p className="mt-5 max-w-3xl text-base md:text-lg leading-8 text-neutral-500">
          Plan regional campaign links for {country.market} audiences with consistent source, medium, campaign, and content values across paid, organic, email, affiliate, and offline channels.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {platforms.slice(0, 3).map((platform) => (
            <Link key={platform.slug} href={`/platforms/${platform.slug}`} className="rounded-2xl border border-neutral-200 p-5 text-sm font-semibold text-neutral-600 hover:text-neutral-900">
              {platform.name} tracking setup
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

