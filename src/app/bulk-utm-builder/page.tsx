import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Mail, Megaphone, ShoppingCart } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { BulkUtmBuilder } from "@/components/tools/bulk-utm-builder";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bulk UTM Builder for Google Analytics & GA4",
  description:
    "Generate multiple campaign tracking URLs instantly with our free Bulk UTM Builder. Create UTM links for Google Analytics, GA4, email marketing, paid ads, affiliate campaigns, and social media tracking.",
  alternates: { canonical: absoluteUrl("/bulk-utm-builder") },
  openGraph: {
    title: "Bulk UTM Builder for Google Analytics & GA4",
    description:
      "Generate multiple campaign tracking URLs instantly with our free Bulk UTM Builder. Create UTM links for Google Analytics, GA4, email marketing, paid ads, affiliate campaigns, and social media tracking.",
    url: absoluteUrl("/bulk-utm-builder"),
  },
};

const useCases = [
  {
    title: "Agency Campaign Management",
    text: "Managing 100+ links across clients, channels, placements, and launch calendars.",
    icon: Building2,
  },
  {
    title: "Email Marketing",
    text: "Generating tracking links for newsletters, lifecycle emails, and promotional sends.",
    icon: Mail,
  },
  {
    title: "E-commerce",
    text: "Tracking campaigns by product category, collection page, offer, and audience.",
    icon: ShoppingCart,
  },
  {
    title: "Influencer Campaigns",
    text: "Tracking creators separately with clean source, campaign, and content values.",
    icon: Megaphone,
  },
];

const internalLinks = [
  ["UTM naming conventions", "/utm-naming-conventions"],
  ["GA4 campaign tracking", "/ga4-campaign-tracking"],
  ["UTM best practices", "/utm-best-practices"],
  ["UTM validator", "/utm-validator"],
  ["UTM examples", "/utm-examples"],
  ["Campaign tracking guide", "/campaign-tracking-guide"],
];

const faqs = [
  ["What is a bulk UTM builder?", "A bulk UTM builder generates many UTM-tagged campaign URLs at once from rows, pasted CSV data, or campaign templates."],
  ["Can I upload CSV files?", "This static version supports CSV paste. Paste rows with url, source, medium, campaign, term, and content columns, then generate links instantly."],
  ["Does GA4 support bulk UTM links?", "Yes. GA4 reads UTM parameters from every tagged URL, whether you create one link or hundreds of campaign links."],
  ["Can I export generated URLs?", "Yes. You can copy all URLs or export CSV, TXT, and JSON files directly in the browser."],
  ["How many URLs can I generate?", "The tool is client-side, so practical limits depend on your browser and device. Hundreds of rows are suitable for typical campaign workflows."],
  ["Should campaign names be lowercase?", "Yes. Lowercase campaign names reduce reporting fragmentation and keep GA4 campaign reports easier to read."],
  ["Can I generate QR codes in bulk?", "Yes. Selected rows can be exported as QR assets, including SVG files in a ZIP and PNG batch downloads."],
];

export default function BulkUtmBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchemas()) }} />
      <Section className="border-b border-slate-200 bg-white pb-10">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Spreadsheet UTM generator</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Bulk UTM Builder for Marketing Campaigns
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Generate multiple campaign tracking URLs instantly for Google Analytics, GA4, email marketing, paid ads, affiliate campaigns, and social media tracking.
            </p>
            <Link href="#bulk-tool" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
              Start Bulk Builder
              <ArrowRight className="ml-2" size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-xl font-bold text-slate-950">Built for teams that publish many links</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Use manual entry, CSV paste, or a spreadsheet-like table to create campaign URLs, validate naming issues, export files, and prepare QR assets without a backend.
            </p>
            <div className="mt-5 grid gap-3 text-sm font-medium text-emerald-900 sm:grid-cols-2">
              <span>Dynamic rows</span>
              <span>Inline validation</span>
              <span>CSV parsing</span>
              <span>CSV/TXT/JSON export</span>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <BulkUtmBuilder />
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="Real use cases" title="Why teams use bulk UTM generation" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon size={22} className="text-emerald-700" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="Bulk campaign tracking education" title="Why bulk UTM generation matters for growing marketing teams" />
          <EducationalContent />
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="Internal links" title="Plan, validate, and improve your UTM system" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm hover:text-slate-950 hover:shadow-md">
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="FAQ" title="Bulk UTM builder questions" />
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

function EducationalContent() {
  return (
    <div className="mt-8 space-y-6 text-base leading-8 text-slate-600">
      <p>
        Bulk UTM generation matters when marketing work moves beyond one campaign link at a time. A small team might build a few links manually for a newsletter or a paid social post, but agencies, PPC teams, affiliate managers, creators, ecommerce teams, and enterprise marketers often need dozens or hundreds of tracked URLs before a launch. A bulk UTM builder turns that repetitive work into a structured process. Instead of editing one URL, copying it, and repeating the same naming decisions again and again, teams can create rows, paste campaign data, apply templates, validate issues, and export the final tracking URLs in formats that fit their workflow.
      </p>
      <p>
        Campaign organization is the main reason bulk tools become valuable. Each landing page needs a source, medium, and campaign name that makes sense later in analytics reports. When teams rush, they often create inconsistent values such as Facebook, facebook_ads, fb, paidSocial, or social-paid for related campaigns. Those differences may look small when the links are created, but they split reports after traffic arrives. A spreadsheet-like UTM generator helps marketers see all rows at once and catch inconsistent naming before links are loaded into ads, email tools, affiliate dashboards, influencer briefs, or QR code systems.
      </p>
      <p>
        Scaling a tracking system requires more than generating URLs. It requires a shared naming convention. Source should identify where traffic comes from, such as google, facebook, newsletter, youtube, linkedin, partner-name, or creator-name. Medium should identify the channel type, such as cpc, paid_social, organic_social, email, affiliate, referral, video, or qr. Campaign should describe the launch, offer, promotion, or initiative. Term can be used for paid keywords or audience notes. Content can identify ad creative, button placement, link position, banner, variation, or creator asset.
      </p>
      <p>
        Team consistency is especially important for agencies and larger organizations. A paid media specialist may create Google Ads links while a lifecycle marketer builds email links and a social media manager prepares creator links. If each person invents their own naming style, the analytics team has to clean the data later. Bulk campaign URL builders reduce that cleanup by putting the structure in front of every user. Preset templates for Facebook Ads, Google Ads, email marketing, affiliate campaigns, influencer promotions, TikTok campaigns, and product launches give teams a starting point that can be adapted without losing consistency.
      </p>
      <p>
        GA4 reporting depends on clean campaign values. GA4 can read UTM parameters and use them in traffic acquisition, user acquisition, and campaign reports. When values are consistent, marketers can compare channels and campaigns quickly. When values are messy, reports become fragmented. For example, paid social traffic might be split between social, paid-social, paid_social, Paid Social, and cpc depending on who created the link. A bulk GA4 URL builder helps prevent this by validating spaces, missing sources, empty mediums, uppercase inconsistencies, duplicate campaign names, and invalid URLs before launch.
      </p>
      <p>
        Spreadsheet campaign management remains common because it is familiar, flexible, and easy to share. Many teams plan campaigns in spreadsheets before uploading ads, preparing email campaigns, or sending influencer briefs. A bulk UTM builder should fit that behavior rather than fight it. CSV paste support lets marketers move from a spreadsheet into a browser tool quickly. CSV export lets the generated links go back into a spreadsheet, ad upload file, launch checklist, or project management document. TXT export is useful when a team simply needs a clean list of generated URLs. JSON export can support more technical workflows.
      </p>
      <p>
        Bulk UTM generation also helps with quality assurance. Reviewing one generated URL at a time is slow. Reviewing a table of generated URLs makes patterns easier to see. If one row has a missing source, another has an uppercase campaign name, and another uses spaces in a content value, the issues are visible before the campaign is published. Inline validation gives marketers immediate feedback without a page refresh. This is especially useful for high-volume campaign launches where mistakes can spread into ads, newsletters, partner documents, and reports quickly.
      </p>
      <p>
        Agencies can use bulk UTM tools to manage client campaigns across many platforms. An agency might need separate links for Facebook ads, Google Ads, LinkedIn posts, email announcements, affiliate partners, and landing page variations. Each client may have its own naming convention. The bulk workflow makes it possible to prepare a clean campaign sheet, validate it, export it, and keep a record of every tracking URL that was delivered. That record is useful when clients ask why a report shows a certain source, medium, or campaign name.
      </p>
      <p>
        Ecommerce teams benefit from bulk tracking because product launches usually involve many destinations. A seasonal campaign might have links for category pages, product pages, bundles, discount pages, blog posts, and email-specific landing pages. Tracking by product category and channel helps teams understand which parts of the store respond to which campaigns. Affiliate teams can generate one row per partner, creator, coupon page, or placement. Influencer teams can generate one row per creator and content variation, making creator performance easier to compare after traffic arrives.
      </p>
      <p>
        QR campaigns add another layer. Offline campaigns often need many QR codes for booths, posters, packaging, direct mail, restaurant tables, retail displays, or event signage. If each QR code points to a different UTM-tagged URL, marketers can compare offline placements inside GA4. Bulk QR exports help convert a table of campaign URLs into usable assets. SVG files are useful for design workflows because they stay sharp in print. PNG files are convenient for quick sharing and testing. Mobile previews help teams confirm that a QR code is scannable before it appears in the real world.
      </p>
      <p>
        The best bulk workflow is simple: define the naming convention, prepare rows, paste or enter data, apply templates, validate the table, export the generated URLs, and keep a copy of the final file. Before launch, click a sample of the generated links and confirm that redirects preserve UTM parameters. For large campaigns, test at least one link per channel or platform. After launch, review GA4 reports and adjust the naming convention before the next campaign. Over time, this makes marketing reporting more reliable and makes campaign decisions easier to defend.
      </p>
      <p>
        Bulk UTM builders are not only productivity tools. They are governance tools. They help teams turn campaign tracking from an improvised habit into a repeatable system. When links are generated consistently, exported cleanly, and validated before launch, the entire organization gets better data. Better data improves reporting, budget allocation, channel comparisons, affiliate management, influencer analysis, and long-term marketing strategy.
      </p>
    </div>
  );
}

function buildSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Bulk UTM Builder for Google Analytics & GA4",
      url: absoluteUrl("/bulk-utm-builder"),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Generate multiple campaign tracking URLs instantly for Google Analytics, GA4, email marketing, paid ads, affiliate campaigns, and social media tracking.",
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
        { "@type": "ListItem", position: 2, name: "Bulk UTM Builder", item: absoluteUrl("/bulk-utm-builder") },
      ],
    },
  ];
}

