import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { UtmCleaner } from "@/components/tools/utm-cleaner";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free UTM Cleaner - Remove Tracking Parameters from URLs",
  description:
    "Clean tracking URLs instantly with our free UTM Cleaner. Remove UTM parameters, Facebook tracking IDs, Google Ads tags, analytics query strings, and campaign links safely.",
  alternates: { canonical: absoluteUrl("/utm-cleaner") },
  openGraph: {
    title: "Free UTM Cleaner - Remove Tracking Parameters from URLs",
    description:
      "Clean tracking URLs instantly with our free UTM Cleaner. Remove UTM parameters, Facebook tracking IDs, Google Ads tags, analytics query strings, and campaign links safely.",
    url: absoluteUrl("/utm-cleaner"),
  },
};

const privacyPoints = [
  "Tracking links exist so marketers can measure campaign performance.",
  "UTMs help analytics tools understand source, medium, and campaign names.",
  "Users clean URLs to share shorter links and reduce visible tracking clutter.",
  "Tracking parameters can reveal campaign context, ad clicks, or referral sources.",
  "Cleaner sharing links are easier to read, paste, document, and cite.",
];

const internalLinks = [
  ["UTM Builder", "/utm-builder"],
  ["UTM Decoder", "/utm-decoder"],
  ["UTM Validator", "/utm-validator"],
  ["Campaign Tracking Guide", "/campaign-tracking-guide"],
  ["UTM Best Practices", "/utm-best-practices"],
  ["Marketing Attribution Guide", "/marketing-attribution"],
];

const faqs = [
  ["What is a UTM cleaner?", "A UTM cleaner removes campaign tracking parameters and click IDs from URLs while preserving the destination page and useful query parameters."],
  ["Why remove tracking parameters?", "People remove tracking parameters to share cleaner links, reduce visible analytics clutter, and avoid passing campaign context into unrelated conversations."],
  ["Does removing UTMs affect SEO?", "Removing UTMs from a shared URL does not harm SEO. Canonical tags should point search engines to the clean preferred URL."],
  ["Are tracking URLs dangerous?", "Most tracking URLs are not dangerous by default, but they can expose campaign context and make links longer or harder to inspect."],
  ["Can I remove Facebook tracking IDs?", "Yes. The cleaner can remove fbclid values and other advertising click IDs such as gclid, ttclid, and msclkid."],
  ["Can I clean URLs in bulk?", "Yes. Paste multiple URLs into the bulk cleaner to clean them, copy them, or export TXT and CSV files."],
  ["Will removing UTMs break websites?", "Removing UTMs usually does not break a page, but some normal query parameters such as search, filters, page, or product variants should be preserved."],
];

export default function UtmCleanerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchemas()) }} />
      <Section className="border-b border-slate-200 bg-white pb-10">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Privacy-focused URL cleanup</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              UTM Cleaner for Tracking URLs
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Remove UTM parameters, analytics tags, tracking IDs, and campaign query strings from URLs instantly.
            </p>
            <Link href="#cleaner" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
              Clean URL
              <ArrowRight className="ml-2" size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-xl font-bold text-slate-950">Remove tracking clutter safely</h2>
            <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {["Preserve path structure", "Remove UTM parameters", "Remove ad click IDs", "Preserve useful query params", "Bulk URL cleaning", "TXT and CSV export"].map((item) => (
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
          <UtmCleaner />
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="Privacy explanation" title="Why people clean tracking links" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {privacyPoints.map((point) => (
              <div key={point} className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
                {point}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="URL hygiene education" title="How tracking parameters affect sharing, privacy, analytics, and SEO" />
          <EducationalContent />
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="Internal links" title="Build, decode, validate, and understand tracking URLs" />
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
          <SectionHeader eyebrow="FAQ" title="UTM cleaner questions" />
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
        Tracking parameters are query string values added to URLs to pass information between platforms, analytics tools, advertising systems, affiliate networks, and websites. They often appear after a question mark in a URL. A link might include UTM values such as utm_source, utm_medium, and utm_campaign, or advertising click IDs such as gclid, fbclid, ttclid, and msclkid. These values help marketers understand how a visitor reached a site, but they can also make URLs long, messy, and harder to share.
      </p>
      <p>
        UTM values exist because campaign measurement matters. Marketers need to know whether traffic came from Facebook, Google Ads, an email newsletter, an affiliate partner, a YouTube video, or a QR code. A tagged link can explain the source, channel, campaign, creative, and keyword behind a visit. This is useful for analytics reporting, budget decisions, and attribution. Without tracking parameters, many campaign visits would appear as generic referral or direct traffic.
      </p>
      <p>
        Privacy-conscious users often clean URLs because campaign links can reveal context that is not needed when sharing a page. A link might show the ad campaign someone clicked, the newsletter it came from, the affiliate partner involved, or the platform that generated the click. This information is usually not secret, but it is often unnecessary in a clean share link. Removing tracking parameters can make a URL shorter and reduce the amount of visible marketing metadata attached to it.
      </p>
      <p>
        Analytics platforms use query strings to read campaign context. GA4, for example, can interpret UTM parameters and use them in acquisition reports. Advertising platforms may add click IDs to connect site visits with ad interactions. Affiliate systems may add partner identifiers. Referral systems may use ref or source parameters. Some of these values are important for measurement, while others are only useful during the original click. Once someone wants to share the base page, the tracking values are often no longer needed.
      </p>
      <p>
        URL hygiene is the practice of keeping links readable, functional, and appropriate for the context where they are used. A clean URL is easier to paste into documentation, send in a message, cite in an article, or share on social media. It reduces confusion because the reader can see the destination more clearly. For developers and SEO specialists, clean URLs are also easier to inspect when debugging redirects, canonical tags, duplicate content, and query parameter behavior.
      </p>
      <p>
        A good UTM cleaner should preserve the path structure of the URL. If the destination is a product page, article, category page, or search result, the cleaned link should still point to that destination. It should remove tracking clutter without breaking useful query parameters. For example, page=2, q=shoes, sort=price, filter=blue, id=123, or variant=large may be important for the page experience. Removing those values blindly can change what the user sees. Selective cleanup matters.
      </p>
      <p>
        Advertising click IDs are common cleanup targets. gclid is associated with Google Ads, fbclid with Facebook, ttclid with TikTok, and msclkid with Microsoft Ads. These values can be long and are usually not useful when someone simply wants to share a page. UTM parameters such as utm_source, utm_medium, utm_campaign, utm_term, and utm_content are also common cleanup targets. Other parameters such as ref, source, affiliate, and tracking_id may or may not be important depending on the site.
      </p>
      <p>
        Bulk URL cleaning is helpful when users have many links copied from reports, spreadsheets, newsletters, ads, or partner documents. Instead of cleaning one URL at a time, a multiline cleaner can process a list and produce clean output for each valid URL. TXT export is useful for quickly sharing a list of cleaned links. CSV export is useful when the original and clean URLs need to be compared or saved for documentation.
      </p>
      <p>
        Removing UTMs does not directly affect SEO rankings when done for sharing or cleanup. Search engines generally prefer a canonical clean URL when multiple tracking versions point to the same page. Website owners should use canonical tags so search engines understand the preferred URL. Users should avoid using UTM-tagged links for internal navigation because internal UTMs can overwrite acquisition data and create confusing analytics reports. For external campaigns, UTMs are useful; for general sharing, clean URLs are often better.
      </p>
      <p>
        Tracking URLs are not automatically dangerous. A long URL with UTM values is usually just a measurement link. However, long links can be harder to inspect, and users may prefer to remove unnecessary tracking metadata before sharing. Cleaning a URL does not guarantee safety, and users should still inspect the domain and path before clicking or forwarding a link. A cleaner is a hygiene tool, not a security scanner.
      </p>
      <p>
        The safest workflow is to paste the URL, review detected tracking parameters, choose which categories to remove, preserve important query parameters when needed, and copy the clean result. If the page is a search page, product variant, filtered collection, checkout-related page, or paginated list, verify that the cleaned URL still shows the intended content. For bulk cleaning, review a few sample outputs before sharing or exporting the full list.
      </p>
      <p>
        A UTM cleaner is useful for marketers too. Marketers often need both tracked links and clean links. Tracked links are appropriate for campaigns, reports, and attribution. Clean links are appropriate for internal documentation, public citations, support messages, and organic sharing. Understanding when to use each version helps teams keep analytics useful while also making links easier for people to read and trust.
      </p>
    </div>
  );
}

function buildSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Free UTM Cleaner",
      url: absoluteUrl("/utm-cleaner"),
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Remove UTM parameters, Facebook tracking IDs, Google Ads tags, analytics query strings, and campaign links safely.",
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
        { "@type": "ListItem", position: 2, name: "UTM Cleaner", item: absoluteUrl("/utm-cleaner") },
      ],
    },
  ];
}

