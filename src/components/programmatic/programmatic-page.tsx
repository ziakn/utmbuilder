import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import {
  educationalLinks,
  exampleUrl,
  relatedPlatforms,
  toolLinks,
  type ProgrammaticKind,
} from "@/lib/programmatic";
import { absoluteUrl } from "@/lib/site";

type Props = {
  kind: ProgrammaticKind;
  slug: string;
  title: string;
  description: string;
  name: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  uniqueAngle: string;
  mistake: string;
  bestPractice: string;
  canonicalPath: string;
};

export function ProgrammaticPage(props: Props) {
  const trackedUrl = exampleUrl(props.source, props.medium, props.campaign, props.content);
  const platformLinks = relatedPlatforms(props.slug).map((item) => ({
    href: `/utm-builder-for/${item.slug}`,
    label: `${item.name} UTM guide`,
  }));

  return (
    <>
      <ProgrammaticSchema {...props} />
      <Section className="border-b border-slate-200 bg-white">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{labelFor(props.kind)}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">{props.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{props.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/utm-builder" className="inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
              Generate UTM URL
            </Link>
            <Link href={`/utm-examples-for/${props.slug}`} className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-semibold text-slate-950 hover:bg-slate-50">
              View Examples
            </Link>
            <Link href="/ga4-campaign-tracking" className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-semibold text-slate-950 hover:bg-slate-50">
              Learn GA4 Tracking
            </Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-950">{props.name}-specific tracking guidance</h2>
            <div className="mt-5 space-y-6 leading-8 text-slate-600">
              <p>{props.uniqueAngle}</p>
              <p>
                GA4 sees this traffic through the UTM values attached to the landing URL. For this page, the recommended starting point is source <strong>{props.source}</strong> and medium <strong>{props.medium}</strong>. That pairing keeps reports readable and makes it easier to compare this traffic against email, paid search, social, affiliate, QR, and referral campaigns.
              </p>
              <p>
                The goal is not to create a different naming system for every page. The goal is to document practical defaults, show examples, and connect the page to the wider campaign tracking workflow. Use this page when planning campaign URLs, briefing team members, or auditing whether existing links follow a reliable pattern.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-slate-950">Recommended UTM structure</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <CodeBox label="Source" value={`utm_source=${props.source}`} />
              <CodeBox label="Medium" value={`utm_medium=${props.medium}`} />
              <CodeBox label="Campaign" value={`utm_campaign=${props.campaign}`} />
              <CodeBox label="Content" value={`utm_content=${props.content}`} />
            </div>

            <h2 className="mt-12 text-3xl font-bold text-slate-950">Example URLs</h2>
            <div className="mt-5 space-y-4">
              {[trackedUrl, trackedUrl.replace(props.content, "footer_link"), trackedUrl.replace(props.campaign, "product_launch")].map((url) => (
                <p key={url} className="break-all rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {url}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-3xl font-bold text-slate-950">Best practices</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                props.bestPractice,
                "Keep source and medium lowercase so reports do not split traffic into duplicate rows.",
                "Use campaign values for the initiative, not every tiny placement detail.",
                "Use content values for ad-level tracking, creative variants, placements, or page locations.",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
                  <CheckCircle2 className="mb-3 text-emerald-600" size={18} aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-3xl font-bold text-slate-950">Common mistakes</h2>
            <p className="mt-5 leading-8 text-slate-600">{props.mistake}</p>
            <p className="mt-4 leading-8 text-slate-600">
              Other common mistakes include uppercase values, spaces in campaign names, inconsistent separators, missing campaign names, and using one broad campaign label for every placement. Validate links before launch and keep a shared naming document for future campaigns.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-slate-950">FAQ</h2>
            <div className="mt-5 grid gap-4">
              {faqFor(props).map(([question, answer]) => (
                <details key={question} className="rounded-lg border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-950">{question}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <LinkGroup title="Related platforms" items={platformLinks} />
            <LinkGroup title="Educational guides" items={educationalLinks.slice(0, 3)} />
            <LinkGroup title="Tools" items={toolLinks.slice(0, 3)} />
          </aside>
        </Container>
      </Section>
    </>
  );
}

export function faqFor(props: Pick<Props, "name" | "source" | "medium">) {
  return [
    [`What source should I use for ${props.name}?`, `Use ${props.source} as a practical starting point when you want reports to identify ${props.name} traffic clearly.`],
    [`What medium should I use for ${props.name}?`, `Use ${props.medium} when it matches the channel type. Keep medium values consistent across similar campaigns.`],
    [`Does GA4 support ${props.name} UTM links?`, "Yes. GA4 can read UTM source, medium, campaign, content, and term values from tagged landing URLs."],
    ["Should UTM values be lowercase?", "Yes. Lowercase values reduce fragmented reports and make campaign data easier to compare."],
  ];
}

function CodeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-950">{label}</p>
      <code className="mt-2 block break-all text-sm text-slate-700">{value}</code>
    </div>
  );
}

function LinkGroup({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h2 className="font-bold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block text-sm font-medium text-slate-700 hover:text-slate-950">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function labelFor(kind: ProgrammaticKind) {
  return {
    platform: "Platform page",
    country: "Country page",
    campaign: "Campaign template",
    example: "UTM examples",
    industry: "Industry page",
  }[kind];
}

function ProgrammaticSchema(props: Props) {
  const pageUrl = absoluteUrl(props.canonicalPath);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: props.title,
      url: pageUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: props.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqFor(props).map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: props.title, item: pageUrl },
      ],
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
