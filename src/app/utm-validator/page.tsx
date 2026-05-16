import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { UtmValidator } from "@/components/tools/utm-validator";
import { absoluteUrl, siteConfig } from "@/lib/site";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Free UTM Validator for Google Analytics & GA4",
  description:
    "Validate campaign tracking URLs with our free UTM Validator. Detect formatting issues, duplicate parameters, uppercase inconsistencies, and analytics tracking mistakes for GA4 and Google Analytics.",
  path: "/utm-validator",
});

const bestPractices = [
  "Use lowercase naming across source, medium, campaign, term, and content.",
  "Keep source names consistent across every team and platform.",
  "Use readable campaign names that explain the promotion later.",
  "Avoid spaces and use hyphens or underscores instead.",
  "Avoid duplicate UTM parameters because analytics tools may parse them unpredictably.",
  "Use proper encoding so campaign URLs survive ads, redirects, emails, and QR tools.",
];

const internalLinks = [
  ["UTM Builder", "/utm-builder"],
  ["Bulk UTM Builder", "/bulk-utm-builder"],
  ["UTM Naming Conventions", "/utm-naming-conventions"],
  ["UTM Best Practices", "/utm-best-practices"],
  ["Campaign Tracking Guide", "/campaign-tracking-guide"],
  ["UTM Cleaner", "/utm-cleaner"],
];

const faqs = [
  ["What is a UTM validator?", "A UTM validator checks campaign URLs for missing parameters, malformed query strings, duplicate UTM keys, uppercase values, spaces, invalid characters, and tracking issues."],
  ["Why should I validate campaign URLs?", "Validation helps catch mistakes before links are published in ads, emails, social posts, affiliate campaigns, or QR codes."],
  ["Do uppercase UTMs cause issues?", "Uppercase values can fragment reports because analytics tools may treat facebook and Facebook as different values."],
  ["Does GA4 support UTM tracking?", "Yes. GA4 reads UTM parameters and uses them in acquisition and campaign reporting."],
  ["Can invalid UTMs break analytics reports?", "Invalid or inconsistent UTM values can make reports harder to read, split campaign data, or hide the true source of traffic."],
  ["Should UTM values contain spaces?", "No. Spaces should be replaced with hyphens or underscores to keep campaign URLs readable and consistent."],
  ["Can I fix malformed UTM URLs?", "Many malformed UTM URLs can be improved by lowercasing values, removing spaces, cleaning duplicate parameters, and correcting query structure."],
];

import { BreadcrumbSchema, FAQSchema, WebAppSchema } from "@/components/seo/json-ld";

export default function UtmValidatorPage() {
  return (
    <>
      <WebAppSchema
        name="Free UTM Validator for Google Analytics & GA4"
        description="Validate campaign tracking URLs and detect formatting issues, duplicate parameters, uppercase inconsistencies, and analytics tracking mistakes."
        url={absoluteUrl("/utm-validator")}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: siteConfig.url },
          { name: "UTM Validator", item: absoluteUrl("/utm-validator") },
        ]}
      />
      <Section className="border-b border-slate-200 bg-white pb-10">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">UTM audit tool</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              UTM Validator for Google Analytics &amp; GA4
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Check campaign tracking URLs for formatting errors, missing parameters, naming inconsistencies, and analytics tracking issues.
            </p>
            <Link href="#validator" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
              Validate URL
              <ArrowRight className="ml-2" size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-xl font-bold text-slate-950">Detect tracking issues before launch</h2>
            <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {["Valid URL", "HTTPS usage", "Duplicate UTM parameters", "Missing required parameters", "Uppercase inconsistency", "Broken encoding"].map((item) => (
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
          <UtmValidator />
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">UTM Best Practices</h2>
            <ul className="mt-5 space-y-3 text-slate-600">
              {bestPractices.map((practice) => (
                <li key={practice} className="flex gap-2">
                  <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={16} aria-hidden="true" />
                  {practice}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">Common Errors Examples</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <h3 className="font-bold text-red-900">Bad Example</h3>
                <code className="mt-3 block break-all rounded bg-white px-3 py-2 text-sm text-red-800">utm_Source=Facebook Ads</code>
                <p className="mt-3 text-sm leading-6 text-red-800">Problems: uppercase, spaces, inconsistent naming.</p>
              </div>
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <h3 className="font-bold text-emerald-900">Good Example</h3>
                <code className="mt-3 block break-all rounded bg-white px-3 py-2 text-sm text-emerald-800">utm_source=facebook_ads</code>
                <p className="mt-3 text-sm leading-6 text-emerald-800">Lowercase, readable, and consistent.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="UTM validation education" title="Why campaign URL validation matters for analytics quality" />
          <EducationalContent />
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="Internal links" title="Fix, build, and standardize your campaign links" />
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
          <SectionHeader eyebrow="FAQ" title="UTM validator questions" />
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
        UTM validation matters because campaign tracking URLs are often created quickly, copied between tools, edited by several people, and published across channels where mistakes are expensive to fix later. A single malformed parameter can split reports, hide traffic sources, or make a campaign look less effective than it really was. A UTM validator gives marketers, agencies, PPC teams, affiliate managers, and analytics teams a way to inspect campaign links before they reach ads, newsletters, social posts, influencer briefs, or QR codes.
      </p>
      <p>
        A campaign URL usually contains a destination page followed by query parameters. The most important UTM parameters are utm_source, utm_medium, and utm_campaign. Source identifies where traffic came from, such as facebook, google, newsletter, youtube, linkedin, or an affiliate partner. Medium identifies the channel type, such as social, cpc, email, affiliate, referral, video, or qr. Campaign names the promotion or initiative, such as summer_sale, product_launch, webinar_signup, or black_friday. Term and content are optional, but they are useful for paid keywords, ad variations, button testing, and creative comparisons.
      </p>
      <p>
        GA4 campaign attribution depends on clean values. When someone clicks a tagged URL, GA4 can read the UTM parameters and associate the visit with traffic acquisition reports. This makes it possible to compare campaigns, channels, audiences, creatives, and landing pages. If the UTM values are inconsistent, GA4 may still collect the visit, but the reports become harder to interpret. For example, facebook, Facebook, FB, and facebook_ads may all appear separately. That fragmentation makes it harder to answer simple questions like how much traffic came from Facebook campaigns.
      </p>
      <p>
        Data consistency is the real reason validation is valuable. Campaign tracking is not only a technical task. It is a naming governance task. Teams need shared rules for source, medium, campaign, term, and content values. Without those rules, every marketer invents their own style. One person may use paid_social, another may use social-paid, and another may use cpc for the same social campaign. A validator cannot replace team governance, but it can catch common problems and remind users to follow a cleaner pattern.
      </p>
      <p>
        Analytics reporting quality depends on the health of the input data. If campaign links contain spaces, uppercase values, duplicate UTM keys, empty values, malformed encoding, or multiple question marks, reports may become unreliable or difficult to read. Duplicate parameters are especially risky because different systems may parse them differently. One tool might read the first value, another might read the last value, and another might preserve both. A validator can flag duplicate keys before a campaign is launched.
      </p>
      <p>
        Common campaign tracking mistakes happen in predictable ways. Users paste a campaign name from a document and accidentally include spaces. Someone edits a URL manually and changes utm_source to utm_Source. A landing page already has UTMs, and a new builder appends another set. A percent-encoded character is broken during copying. A redirect strips query parameters. A campaign name is written as SummerSale in one platform and summer_sale in another. Each mistake seems small, but at scale these issues make reports messy.
      </p>
      <p>
        Naming governance should start with a simple taxonomy. Decide which source values are approved. Decide which medium values are allowed. Use lowercase values by default. Choose either hyphens or underscores and stick with that style. Keep campaign names readable enough that someone can understand them months later. Use utm_content for variations instead of stuffing every detail into the campaign name. Document examples for ads, email, social, affiliate, influencer, YouTube, LinkedIn, and QR campaigns so every team follows the same pattern.
      </p>
      <p>
        Team collaboration issues are common when multiple departments create links. Paid media teams, email marketers, social media managers, creators, affiliate managers, agencies, and analytics teams may all touch campaign URLs. If there is no validation step, issues spread into live campaigns and remain in reports permanently. A UTM checker gives teams a shared QA step. Before publishing, paste the URL, review warnings, apply auto-fixes when appropriate, copy the clean URL, and document the final version in the launch plan.
      </p>
      <p>
        Validation is also useful after a campaign has already launched. If GA4 reports look strange, marketers can inspect the links used in ads, emails, or partner documents. The validator can reveal whether source values are inconsistent, campaign names contain uppercase letters, values include spaces, or duplicate parameters were published. This makes troubleshooting faster because the team can focus on the actual link structure instead of guessing why reports look fragmented.
      </p>
      <p>
        UTM validation does not directly affect SEO rankings, but it helps avoid SEO-adjacent mistakes. Tagged URLs should not be used as canonical internal links. A website should keep canonical tags configured so search engines understand the preferred clean URL. For campaign tracking, UTMs are best used on external acquisition links. If internal site navigation uses UTMs, original acquisition data may be overwritten and analytics reports can become less trustworthy.
      </p>
      <p>
        A good validation workflow is simple: paste the campaign URL, check whether the URL is valid, confirm HTTPS usage, review required parameters, inspect source and medium values, remove spaces, lowercase values, eliminate duplicates, and copy the clean version. For important campaigns, click the final URL and confirm that redirects preserve the tracking parameters. For QR campaigns, scan the code on a mobile device and validate the final destination URL after redirect.
      </p>
      <p>
        Over time, validation improves marketing operations. It reduces reporting cleanup, increases trust in GA4 campaign reports, and helps teams understand which campaigns actually performed. It also creates a repeatable quality standard. When every campaign URL passes the same checks before launch, analytics becomes more reliable, team collaboration improves, and future campaign decisions are based on cleaner data.
      </p>
    </div>
  );
}
