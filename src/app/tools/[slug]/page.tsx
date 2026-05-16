import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/marketing/section";
import { UtmToolbox } from "@/components/tools/utm-toolbox";
import { tools } from "@/data/site-data";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: absoluteUrl(`/tools/${tool.slug}`) },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();

  return (
    <>
      <Section className="border-b border-neutral-200 bg-neutral-50">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Free tool</p>
          <h1 className="mt-3 max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-neutral-900">{tool.title}</h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-8 text-neutral-500">{tool.description}</p>
        </Container>
      </Section>
      <Section>
        <Container>
          <UtmToolbox mode={tool.slug} />
        </Container>
      </Section>
      <Section className="bg-neutral-50">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">Common use cases</h2>
            <p className="mt-4 leading-7 text-neutral-500">
              Use this page before publishing ads, emails, social posts, affiliate links, or QR campaigns. Keeping links consistent protects analytics reports from fragmented source and medium values.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {tool.useCases.map((useCase) => (
              <div key={useCase} className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm font-medium text-neutral-600">
                {useCase}
              </div>
            ))}
          </div>
          <Link className="text-sm font-semibold text-blue-700 hover:text-blue-900" href="/guides">
            Learn UTM best practices
          </Link>
        </Container>
      </Section>
    </>
  );
}

