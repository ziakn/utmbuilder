import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { UtmDecoder } from "@/components/tools/utm-decoder";
import { absoluteUrl, siteConfig } from "@/lib/site";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Free UTM Decoder for Google Analytics & GA4",
  description:
    "Decode campaign tracking URLs with our free UTM Decoder. Analyze UTM parameters, decode tracking links, inspect campaign attribution, and troubleshoot GA4 analytics URLs.",
  path: "/utm-decoder",
});

const examples = [
  ["Facebook Ads", "utm_source=facebook&utm_medium=paid_social"],
  ["Email Newsletter", "utm_source=newsletter&utm_medium=email"],
  ["Affiliate Campaign", "utm_source=affiliate&utm_medium=referral"],
];

const internalLinks = [
  ["UTM Builder", "/utm-builder"],
  ["UTM Validator", "/utm-validator"],
  ["UTM Cleaner", "/utm-cleaner"],
  ["UTM Best Practices", "/utm-best-practices"],
  ["GA4 Tracking Guide", "/ga4-campaign-tracking"],
  ["Campaign Attribution Guide", "/campaign-attribution"],
];

const faqs: [string, string][] = [
  ["What is a UTM decoder?", "A UTM decoder parses a campaign tracking URL and displays decoded UTM parameters, click IDs, and attribution values in a readable format."],
  ["How do I decode tracking URLs?", "Paste the full tracking URL into the decoder. The tool extracts query parameters, decodes encoded values, and shows a GA4 attribution preview."],
  ["Why are some URL values encoded?", "URL encoding converts spaces and special characters into safe sequences such as %20, %2F, %3A, and %26 so links can travel through browsers and tools correctly."],
  ["Does GA4 decode UTM values automatically?", "GA4 reads UTM parameters from landing page URLs and uses them in campaign and acquisition reports, but marketers often decode links manually for audits and troubleshooting."],
  ["Can malformed UTMs affect analytics?", "Yes. Malformed, duplicated, or inconsistent values can fragment reports and make campaign attribution harder to trust."],
  ["What do utm_source and utm_medium mean?", "utm_source identifies where traffic came from, while utm_medium identifies the marketing channel type such as social, email, cpc, affiliate, or qr."],
  ["Can I export decoded data?", "Yes. The decoder can export decoded parameters as JSON, CSV, or copied text directly in the browser."],
];

import { BreadcrumbSchema, FAQSchema, WebAppSchema } from "@/components/seo/json-ld";

export default function UtmDecoderPage() {
  return (
    <>
      <WebAppSchema
        name="Free UTM Decoder for Google Analytics & GA4"
        description="Decode campaign tracking URLs, analyze UTM parameters, inspect campaign attribution, and troubleshoot GA4 analytics URLs."
        url={absoluteUrl("/utm-decoder")}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: siteConfig.url },
          { name: "UTM Decoder", item: absoluteUrl("/utm-decoder") },
        ]}
      />
      <Section className="border-b border-neutral-200 bg-white pb-10">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Tracking URL parser</p>
            <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-neutral-900">
              UTM Decoder for Campaign Tracking URLs
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-neutral-500">
              Decode UTM parameters, inspect campaign tracking URLs, and analyze Google Analytics or GA4 attribution links instantly.
            </p>
            <Link href="#decoder" className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white hover:bg-neutral-800">
              Decode URL
              <ArrowRight className="ml-2" size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-xl font-bold text-neutral-900">Inspect attribution data fast</h2>
            <div className="mt-5 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
              {["Decode encoded values", "Parse UTM parameters", "Find click IDs", "Preview GA4 attribution", "Export JSON and CSV", "Troubleshoot tracking links"].map((item) => (
                <span key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={17} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <UtmDecoder />
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container>
          <SectionHeader eyebrow="Common tracking examples" title="Recognize common UTM patterns" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {examples.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-neutral-900">{label}</h3>
                <code className="mt-4 block font-mono break-all rounded-xl bg-neutral-50 p-3 text-sm text-neutral-600">{value}</code>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="UTM decoding education" title="How decoding campaign URLs helps marketers troubleshoot attribution" />
          <EducationalContent />
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container>
          <SectionHeader eyebrow="Internal links" title="Build, validate, clean, and improve UTM links" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm font-semibold text-neutral-600 shadow-sm hover:text-neutral-900 hover:shadow-md">
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="FAQ" title="UTM decoder questions" />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details key={question} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <summary className="cursor-pointer font-semibold text-neutral-900">{question}</summary>
                <p className="mt-3 text-sm leading-6 text-neutral-500">{answer}</p>
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
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl font-semibold leading-tight text-neutral-900">{title}</h2>
    </div>
  );
}

function EducationalContent() {
  return (
    <div className="mt-8 space-y-6 text-base md:text-lg leading-8 text-neutral-500">
      <p>
        UTM parameters are small pieces of campaign information added to a URL. They help marketers understand where traffic came from, which channel produced the visit, and which campaign should receive credit. A UTM decoder takes an existing tracking URL and turns the query string into a readable table. This is useful when a link has been copied from an ad platform, email tool, affiliate dashboard, spreadsheet, QR code generator, or analytics report and the marketer needs to understand what it contains.
      </p>
      <p>
        The standard UTM parameters are utm_source, utm_medium, utm_campaign, utm_content, and utm_term. Source identifies the traffic source, such as facebook, google, newsletter, youtube, linkedin, or an affiliate partner. Medium identifies the channel type, such as paid_social, email, cpc, video, affiliate, referral, or qr. Campaign names the initiative, such as summer_sale, product_launch, webinar_signup, or black_friday. Content helps distinguish creatives, buttons, placements, or link variations. Term is often used for paid keywords or targeting details.
      </p>
      <p>
        Campaign attribution works by passing this information into analytics tools when someone clicks the link and lands on the site. GA4 reads UTM values from the landing page URL and uses them in acquisition and campaign reporting. If the values are clean and consistent, marketers can compare channels, campaigns, creatives, and partners. If the values are messy, reports can become fragmented. A decoder helps reveal exactly what GA4 is likely to receive from the URL.
      </p>
      <p>
        URL encoding is one reason tracking links can be hard to read. Browsers and platforms convert spaces and special characters into encoded sequences so a URL remains valid. For example, a space may become %20, a slash may become %2F, a colon may become %3A, and an ampersand may become %26. This protects the structure of the URL, but it makes campaign names harder for humans to inspect. A UTM decoder converts encoded values back into readable text so marketers can audit them.
      </p>
      <p>
        Marketers decode URLs for many reasons. An agency may receive a campaign link from a client and need to verify the naming convention. An SEO specialist may inspect whether tagged links are being used incorrectly on internal pages. An affiliate manager may compare partner links. A paid media specialist may check whether ad platform tracking templates are adding the expected parameters. An analytics team may investigate why GA4 reports show unexpected campaign names or source values.
      </p>
      <p>
        Troubleshooting analytics links often starts with the final URL. A campaign may look correct inside an ad manager, but redirects, link shorteners, email click wrappers, or QR code tools can modify the destination before the user lands on the site. Decoding the actual landing URL helps teams confirm whether utm_source, utm_medium, and utm_campaign survived the journey. It can also reveal extra parameters such as gclid, fbclid, msclkid, ttclid, ref, or source that help identify ad click IDs and referral context.
      </p>
      <p>
        Campaign auditing workflows benefit from decoding because they make hidden structure visible. A long URL can contain many query parameters, and the important tracking values may be buried in the middle. When the decoder extracts each parameter into a table, it becomes easier to spot missing campaign names, unexpected mediums, placeholder values, duplicate parameters, suspicious values, and unusual characters. This saves time during pre-launch QA and post-launch troubleshooting.
      </p>
      <p>
        GA4 does not require marketers to manually decode every link, but manual inspection is still useful. GA4 reports show the data after traffic arrives. A decoder helps inspect the link before or during a campaign. This is especially valuable when several teams create links independently. Paid media, email, social, affiliate, influencer, and agency teams may each use slightly different naming conventions unless there is a shared process. Decoding links makes those differences visible.
      </p>
      <p>
        Clean campaign attribution depends on consistent naming. If a link uses Facebook, another uses facebook, and a third uses fb, the analytics report may split related traffic into separate rows. If a campaign value is encoded as summer%20sale, it may decode to summer sale, which is readable but contains a space. Spaces are usually better replaced with underscores or hyphens. A decoder helps identify these values so the team can decide whether to clean or rebuild the link.
      </p>
      <p>
        Extra parameters are also worth reviewing. Click IDs such as gclid, fbclid, msclkid, and ttclid can be added by ad platforms. They may support platform-specific measurement or attribution. Ref and source parameters may come from referral systems, internal tools, or partner links. These values are not the same as standard UTMs, but they can still help explain how a visitor arrived. A useful tracking URL parser should show both standard UTM parameters and common extra parameters.
      </p>
      <p>
        The best debugging workflow is simple. Paste the tracking URL into the decoder, review the decoded UTM values, check the human-readable summary, compare the GA4 attribution preview, inspect warnings, and export the decoded data if it needs to be shared with a teammate. If the values are inconsistent or malformed, rebuild the URL with a UTM builder, validate it, then test the final landing page after redirects. This process improves reporting quality and reduces confusion during campaign analysis.
      </p>
      <p>
        A UTM decoder is especially helpful for agencies and analytics teams because it turns opaque tracking links into explainable campaign data. Instead of guessing what a URL does, the team can see each value, how it decodes, and how it maps to source, medium, and campaign reporting. That clarity improves collaboration, documentation, and confidence in GA4 campaign reports.
      </p>
    </div>
  );
}
