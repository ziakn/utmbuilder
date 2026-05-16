import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { AdvancedUtmBuilder } from "@/components/tools/advanced-utm-builder";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free UTM Builder for Google Analytics & GA4",
  description:
    "Create campaign tracking URLs with our free UTM Builder. Generate UTM links for Google Analytics, GA4, email campaigns, social media, paid ads, affiliate marketing, and QR codes.",
  alternates: { canonical: absoluteUrl("/utm-builder") },
  openGraph: {
    title: "Free UTM Builder for Google Analytics & GA4",
    description:
      "Create campaign tracking URLs with our free UTM Builder. Generate UTM links for Google Analytics, GA4, email campaigns, social media, paid ads, affiliate marketing, and QR codes.",
    url: absoluteUrl("/utm-builder"),
  },
};

const bestRules = [
  "Always lowercase",
  "Avoid spaces",
  "Use hyphens or underscores",
  "Keep naming consistent",
  "Never mix naming styles",
];

const mistakes = [
  "Using uppercase and lowercase inconsistently",
  "Forgetting campaign names",
  "Using spaces",
  "Overwriting existing UTMs",
  "Using unreadable campaign names",
];

const examples = [
  ["Facebook", "https://store.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_sale"],
  ["Email", "https://store.com/?utm_source=newsletter&utm_medium=email&utm_campaign=june_launch"],
  ["YouTube", "https://store.com/?utm_source=youtube&utm_medium=video&utm_campaign=product_review"],
];

const internalLinks = [
  ["UTM examples", "/utm-examples"],
  ["UTM best practices", "/utm-best-practices"],
  ["Campaign tracking guide", "/campaign-tracking-guide"],
  ["GA4 tracking", "/ga4-campaign-tracking"],
  ["UTM validator", "/utm-validator"],
  ["QR code tool", "/qr-code-with-utm"],
];

const faqs = [
  ["What is a UTM parameter?", "A UTM parameter is a tracking value added to a URL so analytics tools can identify the source, medium, campaign, keyword, or creative that generated a visit."],
  ["Does GA4 support UTMs?", "Yes. GA4 reads UTM parameters and uses them in acquisition, traffic source, and campaign reporting."],
  ["Are UTMs case-sensitive?", "UTM values can appear as separate report rows when capitalization differs, so lowercase naming is recommended."],
  ["Can I use UTM links in QR codes?", "Yes. Use the generated UTM URL as the QR destination so offline scans are attributed to the right campaign."],
  ["Can I track social campaigns with UTMs?", "Yes. UTM links are useful for organic social posts, paid social ads, creator links, and profile links."],
  ["Do UTMs affect SEO?", "UTM parameters do not directly improve rankings. Use canonical tags on your site and avoid using tagged URLs for internal navigation."],
  ["Should I use uppercase in UTMs?", "No. Lowercase values are easier to keep consistent and reduce fragmented analytics reports."],
];

export default function UtmBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchemas()) }} />
      <Section className="border-b border-slate-200 bg-white pb-10">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Free UTM generator</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Free UTM Builder for Google Analytics &amp; GA4
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Generate clean campaign tracking URLs for email marketing, social media, paid ads, QR codes, affiliate campaigns, and analytics reporting.
            </p>
            <Link href="#builder" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
              Generate Tracking URL
              <ArrowRight className="ml-2" size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-xl font-bold text-slate-950">Built for repeat campaign workflows</h2>
            <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {["Instant generation", "Copy button", "QR downloads", "Validation warnings", "Preset templates", "Mobile sticky actions"].map((item) => (
                <span key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={17} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <AdvancedUtmBuilder />
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container className="grid gap-10 lg:grid-cols-2">
          <InfoBlock title="UTM Naming Best Practices">
            <ul className="space-y-3 text-slate-600">
              {bestRules.map((rule) => (
                <li key={rule} className="flex gap-2">
                  <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={16} aria-hidden="true" />
                  {rule}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ExampleBox title="Bad" values={["FacebookAds", "FACEBOOK", "fbAds"]} />
              <ExampleBox title="Good" values={["facebook", "facebook_ads", "facebook-paid"]} />
            </div>
          </InfoBlock>
          <InfoBlock title="Common Mistakes">
            <div className="grid gap-3">
              {mistakes.map((mistake) => (
                <div key={mistake} className="rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700">
                  {mistake}
                </div>
              ))}
            </div>
          </InfoBlock>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Example URLs" title="Copy a structure and adapt it to your campaign" />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {examples.map(([label, url]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-950">{label}</h3>
                <p className="mt-3 break-all rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-600">{url}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="UTM education" title="How UTM tracking connects campaigns, attribution, and analytics reporting" />
          <LongContent />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Internal links" title="Continue improving your campaign tracking setup" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm hover:text-slate-950 hover:shadow-md">
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="FAQ" title="UTM builder questions" />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details key={question} className="rounded-lg border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer font-semibold text-slate-950">{question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-slate-950">{title}</h2>
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ExampleBox({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-bold text-slate-950">{title}</h3>
      <div className="mt-3 space-y-2">
        {values.map((value) => (
          <code key={value} className="block rounded bg-white px-2 py-1 text-sm text-slate-700">
            {value}
          </code>
        ))}
      </div>
    </div>
  );
}

function LongContent() {
  return (
    <div className="mt-8 space-y-6 text-base leading-8 text-slate-600">
      <p>
        UTM parameters are campaign tracking values that sit at the end of a URL. They do not change the destination page, but they add context that analytics platforms can read when a visitor arrives. A UTM link can show that a visit came from google, facebook, a newsletter, youtube, an affiliate partner, or a QR code. It can also show the marketing channel, campaign name, paid keyword, creative variation, or button placement that produced the click.
      </p>
      <p>
        The five most common parameters are utm_source, utm_medium, utm_campaign, utm_term, and utm_content. Source identifies the traffic source. Medium identifies the channel type. Campaign names the promotion or initiative. Term is mostly used for paid keywords or audience labels. Content helps compare creative variations, buttons, banners, placements, or links inside the same campaign. Used together, these values turn a plain URL into a reliable campaign measurement tool.
      </p>
      <p>
        Google Analytics and GA4 use UTMs to classify visits and sessions into traffic acquisition reports. When someone clicks a tagged link, GA4 reads the parameters and stores that campaign context with the visit. This makes it easier to compare paid search against email, social posts against affiliate partners, or QR scans against online ads. Without UTM links, traffic may appear as direct, referral, or a generic source that does not explain which campaign created the visit.
      </p>
      <p>
        GA4 tracking is event-based, but campaign context still matters. UTMs help you connect acquisition data to downstream behavior such as page views, form submissions, purchases, signups, or other conversion events. If a campaign brings fewer visits but a higher conversion rate, UTM data helps you see that. If an ad gets clicks but visitors leave quickly, campaign reporting can reveal that the message, audience, or landing page needs work.
      </p>
      <p>
        Attribution is the process of assigning credit to marketing touchpoints. UTMs are not the only attribution system, but they are one of the simplest and most transparent ways to label traffic. They are especially useful in multi-channel marketing where campaigns run across email, paid social, search, influencers, affiliates, YouTube, LinkedIn, TikTok, and offline materials. Each channel can use a consistent source and medium so reports stay readable.
      </p>
      <p>
        Campaign measurement depends on consistency. If your team uses facebook, Facebook, fb, and meta as source values for the same channel, reports split into separate rows. If one person uses social and another uses paid_social for paid ads, performance becomes harder to compare. This is why naming conventions are as important as the builder itself. Lowercase values, a shared list of medium names, and clear campaign names make reporting faster and more trustworthy.
      </p>
      <p>
        A useful campaign name should describe the initiative in a way that makes sense later. Names like summer_sale, black_friday, product_launch, webinar_signup, and creator_push are easier to understand than internal codes with no context. Content values can add another layer for testing. For example, you might compare hero_cta against footer_link, blue_button against green_button, or carousel_ad against video_ad.
      </p>
      <p>
        Analytics reporting improves when UTMs are planned before a campaign launches. Create the URL, validate it, click it, confirm that the landing page loads, and check that redirects preserve parameters. If your website redirects from one URL version to another, test that the final URL still contains the UTM values. For QR codes, print materials, and offline placements, test scans on a mobile phone before sending assets to production.
      </p>
      <p>
        UTMs are also useful for repeat traffic and team workflows. A free UTM builder lets marketers generate links without remembering exact query string formatting. Presets help teams create common campaign structures quickly. Validation warnings catch spaces, uppercase values, duplicate parameters, and invalid characters before the link reaches ads or email templates. QR exports make the same tracked URL usable in offline campaigns.
      </p>
      <p>
        UTMs should usually be used on external campaign links, not internal site navigation. Adding tracking parameters to internal links can overwrite original acquisition data and make analytics reports less reliable. For SEO, UTM parameters do not directly improve rankings. They are measurement tools. Keep canonical tags configured on your pages and avoid spreading multiple tracked versions of the same URL as if they were separate organic landing pages.
      </p>
      <p>
        The best workflow is simple: define a source, choose a medium, name the campaign, add optional term and content values when needed, generate the URL, validate it, and document the pattern. When every team follows the same approach, GA4 reports become easier to trust and campaign decisions become easier to explain.
      </p>
    </div>
  );
}

function buildSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Free UTM Builder for Google Analytics & GA4",
      url: absoluteUrl("/utm-builder"),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Create campaign tracking URLs for Google Analytics, GA4, email campaigns, social media, paid ads, affiliate marketing, and QR codes.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "UTM Builder", item: absoluteUrl("/utm-builder") },
      ],
    },
  ];
}
