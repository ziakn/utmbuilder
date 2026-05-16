import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { glossaryTerms } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryTerms.find((item) => item.slug === slug);
  if (!term) return {};
  return {
    title: `${term.term} Meaning and Examples`,
    description: term.definition,
    alternates: { canonical: absoluteUrl(`/glossary/${term.slug}`) },
  };
}

export default async function GlossaryPage({ params }: Props) {
  const { slug } = await params;
  const term = glossaryTerms.find((item) => item.slug === slug);
  if (!term) notFound();

  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">SEO glossary</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">{term.term}</h1>
        <p className="mt-5 text-base md:text-lg leading-8 text-neutral-500">{term.definition}</p>
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <h2 className="text-xl font-bold text-neutral-900">How marketers use it</h2>
          <p className="mt-3 leading-7 text-neutral-500">
            Add this value consistently across campaigns so analytics reports group traffic correctly. Lowercase values and shared naming conventions reduce reporting cleanup later.
          </p>
        </div>
        <Link href="/tools/utm-builder" className="mt-8 inline-block text-sm font-semibold text-blue-700">
          Generate a campaign URL
        </Link>
      </Container>
    </Section>
  );
}

