import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { HomepageUtmBuilder } from "@/components/tools/homepage-utm-builder";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { constructMetadata } from "@/lib/seo";
import {
  BreadcrumbSchema,
  FAQSchema,
  OrganizationSchema,
  WebAppSchema,
  WebSiteSchema,
} from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata({
  title: "Free UTM Builder - Create Campaign Tracking URLs for GA4",
  description:
    "Use our free UTM Builder to create campaign tracking URLs for Google Analytics, GA4, ads, social media, email marketing, affiliate links, and QR campaigns.",
  path: "/",
});

const popularTools = [
  ["UTM Builder", "/utm-builder", "Create clean campaign tracking URLs with source, medium, campaign, term, and content values."],
  ["Bulk UTM Builder", "/bulk-utm-builder", "Generate multiple UTM links from a list of landing pages and shared campaign values."],
  ["UTM Validator", "/utm-validator", "Check campaign URLs for missing required UTM parameters and naming issues."],
  ["UTM Decoder", "/utm-decoder", "Decode campaign URLs and inspect each tracking parameter in a readable format."],
  ["UTM Cleaner", "/utm-cleaner", "Remove UTM parameters from long URLs while preserving the destination page."],
  ["QR Code with UTM", "/qr-code-with-utm", "Prepare UTM-tagged URLs for QR campaigns across print, retail, events, and offline media."],
  ["GA4 URL Builder", "/ga4-url-builder", "Build UTM links designed for clean GA4 acquisition and campaign reports."],
  ["Campaign URL Builder", "/campaign-url-builder", "Create trackable campaign links for ads, email, social media, and affiliate promotions."],
];

const steps = [
  "Enter your website URL",
  "Add campaign source and medium",
  "Add campaign name",
  "Generate your trackable URL",
  "Use it in ads, email, social media, or QR codes",
  "Track results inside Google Analytics or GA4",
];

const useCases = [
  ["Facebook Ads tracking", "/utm-builder-for-facebook"],
  ["Google Ads tracking", "/utm-builder-for-google-ads"],
  ["Email newsletter tracking", "/utm-builder-for-email-marketing"],
  ["Affiliate campaign tracking", "/utm-builder-for-affiliate-marketing"],
  ["Influencer campaign tracking", "/utm-builder-for-influencers"],
  ["QR code campaign tracking", "/qr-code-with-utm"],
  ["YouTube link tracking", "/utm-builder-for-youtube"],
  ["LinkedIn campaign tracking", "/utm-builder-for-linkedin"],
];

const examples = [
  ["Facebook campaign", "https://example.com/?utm_source=facebook&utm_medium=paid-social&utm_campaign=spring_launch&utm_content=carousel_ad"],
  ["Email newsletter", "https://example.com/?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest&utm_content=header_cta"],
  ["Google Ads campaign", "https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand_search&utm_term=utm_builder"],
  ["YouTube video link", "https://example.com/?utm_source=youtube&utm_medium=video&utm_campaign=tutorial_series&utm_content=description_link"],
  ["Affiliate link", "https://example.com/?utm_source=partner_name&utm_medium=affiliate&utm_campaign=creator_launch"],
  ["QR code campaign", "https://example.com/?utm_source=event_booth&utm_medium=qr&utm_campaign=conference_2026"],
];

const featuredGuides = [
  ["What is UTM?", "/what-is-utm"],
  ["How to Use UTM Parameters", "/how-to-use-utm-parameters"],
  ["UTM Parameters Explained", "/utm-parameters-explained"],
  ["UTM Best Practices", "/utm-best-practices"],
  ["Campaign Tracking Guide", "/campaign-tracking-guide"],
  ["GA4 Campaign Tracking", "/ga4-campaign-tracking"],
];

const glossaryLinks = [
  ["UTM Source", "/utm-source"],
  ["UTM Medium", "/utm-medium"],
  ["UTM Campaign", "/utm-campaign"],
  ["UTM Content", "/utm-content"],
  ["UTM Term", "/utm-term"],
  ["Campaign Attribution", "/campaign-attribution"],
  ["Traffic Source", "/traffic-source"],
  ["Conversion Rate", "/conversion-rate"],
];

const faqs = [
  ["What is a UTM builder?", "A UTM builder is a tool that adds campaign tracking parameters to a website URL so analytics platforms can identify the source, medium, campaign, keyword, and content associated with a visit."],
  ["Is this UTM builder free?", "Yes. The UTM builder is free to use and runs in your browser without requiring an account."],
  ["Do UTM links work with GA4?", "Yes. GA4 reads UTM parameters and uses them in acquisition and campaign reports when visitors arrive through tagged links."],
  ["What is utm_source?", "utm_source identifies where traffic came from, such as google, facebook, newsletter, linkedin, or a partner website."],
  ["What is utm_medium?", "utm_medium describes the marketing channel, such as cpc, email, social, affiliate, referral, video, or qr."],
  ["What is utm_campaign?", "utm_campaign names the campaign, promotion, launch, offer, or marketing initiative you want to measure."],
  ["Can I use UTM links for Facebook Ads?", "Yes. UTM links are useful for Facebook Ads because they help compare campaign traffic in GA4 and other analytics tools."],
  ["Can I use UTM links in email campaigns?", "Yes. UTM links are commonly used in newsletters, automations, lifecycle campaigns, and promotional email sends."],
  ["Are UTM parameters case-sensitive?", "Analytics tools can treat different capitalization as different values, so spring_sale and Spring_Sale may appear separately. Lowercase naming is usually best."],
  ["Can I remove UTM parameters from a URL?", "Yes. A UTM cleaner can remove tracking parameters from a URL while keeping the destination page intact."],
];

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <WebAppSchema
        name="Free UTM Builder"
        description="Create campaign tracking URLs for Google Analytics, GA4, ads, social media, email marketing, affiliate links, and QR campaigns."
        url={siteConfig.url}
      />
      <BreadcrumbSchema items={[{ name: "Home", item: siteConfig.url }]} />
      <FAQSchema faqs={faqs} />
      <Section className="border-b border-slate-200 bg-white pb-10">
        <Container className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Free UTM builder</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Free UTM Builder for Campaign Tracking
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Create clean, trackable campaign URLs for Google Analytics, GA4, email marketing, social media, ads, and affiliate campaigns.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800" href="#homepage-builder">
                Build UTM Link
                <ArrowRight className="ml-2" size={17} aria-hidden="true" />
              </Link>
              <Link className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-semibold text-slate-950 hover:bg-slate-50" href="/utm-examples">
                View Examples
              </Link>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              {["No signup required", "Static and fast", "GA4-ready links", "Built for marketers"].map((item) => (
                <span key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={17} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <HomepageUtmBuilder />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Popular tools" title="Campaign tracking tools for everyday marketing workflows" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {popularTools.map(([name, href, description]) => (
              <ToolCard key={href} name={name} href={href} description={description} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="How it works" title="From landing page to trackable campaign URL" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-5">
                <span className="flex size-9 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-4 font-semibold text-slate-950">{step}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Use cases" title="Track the channels that matter most" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map(([name, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm hover:text-slate-950 hover:shadow-md">
                {name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeader eyebrow="UTM examples" title="Example campaign URLs you can adapt" />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {examples.map(([label, url]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-950">{label}</h3>
                <p className="mt-3 break-all rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-600">{url}</p>
              </div>
            ))}
          </div>
          <Link href="/utm-examples" className="mt-6 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-900">
            View all UTM examples
          </Link>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="Campaign tracking education" title="Why UTM parameters make marketing analytics clearer" />
          <div className="mt-8 space-y-6 text-base leading-8 text-slate-600">
            <p>
              UTM parameters are small pieces of tracking information added to the end of a URL. They tell analytics tools where a visitor came from, which channel brought the click, and which campaign should receive credit. A normal landing page URL may show that someone visited a page, but a UTM-tagged URL can show whether the visit came from a Facebook ad, a Google Ads search campaign, an email newsletter, a YouTube description link, an affiliate partner, or a QR code printed at an event.
            </p>
            <p>
              Campaign tracking matters because modern marketing work happens across many channels at once. A launch might include paid search, organic social posts, creator links, partner emails, display ads, and offline material. Without consistent UTM links, those visits can appear in reports as direct traffic, referrals, or fragmented source names. That makes it harder to understand which campaigns deserve more budget and which messages need improvement.
            </p>
            <p>
              GA4 uses UTM links to populate acquisition and campaign reporting. When a visitor lands on your website through a tagged URL, GA4 can read values such as <strong>utm_source</strong>, <strong>utm_medium</strong>, and <strong>utm_campaign</strong>. These values help marketers compare channels and campaigns in a cleaner way. For example, source might be google, facebook, newsletter, youtube, or partner-name. Medium might be cpc, paid-social, email, video, affiliate, referral, or qr. Campaign should describe the promotion or initiative, such as spring_launch, black_friday, product_demo, or webinar_signup.
            </p>
            <p>
              One common UTM mistake is inconsistent capitalization. Analytics platforms can split values like Facebook, facebook, and FB into separate rows. Another mistake is using vague campaign names that are impossible to understand later. A campaign value like promo may not help anyone after the campaign ends. A clearer value such as spring_sale_2026 or q2_webinar_signup gives reports more context. Marketers also often mix source and medium values. Source should identify the place traffic came from, while medium should identify the channel type.
            </p>
            <p>
              The best naming conventions are simple, lowercase, and documented. Use hyphens or underscores consistently. Choose a fixed set of medium values for your team, such as cpc, paid-social, organic-social, email, affiliate, referral, video, and qr. Keep campaign names descriptive enough to be useful, but short enough to scan in reports. Use utm_content when you need to compare creatives, buttons, placements, audiences, or link positions inside the same campaign.
            </p>
            <p>
              Consistent source and medium values are especially important because they shape channel reporting. If one team uses paid_social and another uses social-paid, the same type of traffic may be split into separate rows. If newsletters sometimes use email and sometimes use newsletter as the medium, reporting becomes harder to trust. A free UTM builder helps reduce those mistakes by giving marketers a structured workflow before links are published.
            </p>
            <p>
              Before launching a campaign, generate the final URL, copy it into a browser, confirm the landing page loads correctly, and check that redirects preserve the tracking parameters. For high-value campaigns, keep a spreadsheet or shared document of approved naming patterns. This makes future reporting easier and helps agencies, paid media teams, email marketers, affiliate managers, and content creators use the same tracking language.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container className="grid gap-10 lg:grid-cols-2">
          <LinkGroup title="Featured guides" items={featuredGuides} />
          <LinkGroup title="Glossary" items={glossaryLinks} />
        </Container>
      </Section>

      <Section>
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

function ToolCard({ name, href, description }: { name: string; href: string; description: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{name}</h3>
      <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">{description}</p>
      <Link href={href} className="mt-5 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-950 hover:bg-slate-50">
        Open tool
      </Link>
    </div>
  );
}

function LinkGroup({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-950">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

  );
}
