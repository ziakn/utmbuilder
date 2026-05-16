import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Badge, Building2, House, Megaphone, Package, Store, Tag, Utensils, Users } from "lucide-react";
import { Container, Section } from "@/components/marketing/section";
import { QrUtmGenerator } from "@/components/tools/qr-utm-generator";
import { absoluteUrl, siteConfig } from "@/lib/site";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "QR Code Generator with UTM Tracking for GA4",
  description:
    "Generate QR codes with UTM tracking parameters for Google Analytics and GA4. Track offline campaigns, flyers, events, packaging, posters, and marketing campaigns with measurable QR scans.",
  path: "/qr-code-with-utm",
});

const offlineExamples = [
  ["Restaurant Flyer", "utm_source=flyer&utm_medium=qr"],
  ["Event Banner", "utm_source=event&utm_medium=qr"],
  ["Product Packaging", "utm_source=packaging&utm_medium=qr"],
  ["Business Card", "utm_source=business_card&utm_medium=qr"],
];

const useCases = [
  ["Restaurant menus", Utensils],
  ["Packaging campaigns", Package],
  ["Conference booths", Building2],
  ["Real estate signs", House],
  ["Business cards", Badge],
  ["Posters", Megaphone],
  ["Retail stores", Store],
  ["Product labels", Tag],
  ["Influencer events", Users],
];

const internalLinks = [
  ["UTM Builder", "/utm-builder"],
  ["UTM Best Practices", "/utm-best-practices"],
  ["Campaign Tracking Guide", "/campaign-tracking-guide"],
  ["GA4 Tracking", "/ga4-campaign-tracking"],
  ["UTM Examples", "/utm-examples"],
  ["Marketing Attribution Guide", "/marketing-attribution"],
];

const faqs: [string, string][] = [
  ["Can QR codes track scans?", "Yes. A QR code can point to a UTM-tagged URL, and each scan becomes a website visit that analytics tools can measure."],
  ["How do QR codes work with GA4?", "When someone scans a QR code and lands on your site, GA4 can read UTM parameters such as source, medium, and campaign from the URL."],
  ["What are UTM QR codes?", "UTM QR codes are QR codes whose destination URLs include UTM tracking parameters for campaign attribution."],
  ["Can I track flyer campaigns?", "Yes. Use a source such as flyer and medium such as qr so flyer scans can appear in GA4 campaign reports."],
  ["Do QR scans appear in Google Analytics?", "QR scans appear as website visits when the scanned URL opens your site and analytics tracking is installed."],
  ["Can I use QR tracking for events?", "Yes. Event banners, booth signs, brochures, badges, and handouts can all use UTM-tagged QR codes."],
  ["Are QR code campaigns measurable?", "Yes. QR code campaigns are measurable when the QR destination uses consistent UTM tracking and the landing page has analytics installed."],
];

import { BreadcrumbSchema, FAQSchema, WebAppSchema } from "@/components/seo/json-ld";

export default function QrCodeWithUtmPage() {
  return (
    <>
      <WebAppSchema
        name="QR Code Generator with UTM Tracking for GA4"
        description="Generate QR codes with UTM tracking parameters for Google Analytics and GA4 to track offline campaigns, flyers, events, packaging, and posters."
        url={absoluteUrl("/qr-code-with-utm")}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: siteConfig.url },
          { name: "QR Code with UTM", item: absoluteUrl("/qr-code-with-utm") },
        ]}
      />
      <Section className="border-b border-neutral-200 bg-white pb-10">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Offline campaign tracking</p>
            <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-neutral-900">
              QR Code Generator with UTM Tracking
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-neutral-500">
              Generate QR codes with campaign tracking parameters for Google Analytics, GA4, offline marketing, events, flyers, packaging, and social campaigns.
            </p>
            <Link href="#qr-generator" className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white hover:bg-neutral-800">
              Generate QR Code
              <ArrowRight className="ml-2" size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-xl font-bold text-neutral-900">Track offline scans in GA4</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Build the UTM destination, render a high-contrast QR code, export PNG or SVG, and measure scans from flyers, posters, packaging, booths, labels, and cards.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <QrUtmGenerator />
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container>
          <SectionHeader eyebrow="Offline campaign examples" title="UTM patterns for print and physical placements" />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {offlineExamples.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-neutral-900">{label}</h3>
                <code className="mt-4 block font-mono break-all rounded-xl bg-neutral-50 p-3 text-sm text-neutral-600">{value}</code>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Real use cases" title="Where tracked QR codes create measurable visits" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map(([label, Icon]) => (
              <div key={label as string} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <Icon size={22} className="text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-neutral-900">{label as string}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container className="max-w-4xl">
          <SectionHeader eyebrow="QR tracking education" title="How QR code tracking connects offline campaigns to GA4 reports" />
          <EducationalContent />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Internal links" title="Improve your campaign tracking workflow" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm font-semibold text-neutral-600 shadow-sm hover:text-neutral-900 hover:shadow-md">
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50">
        <Container>
          <SectionHeader eyebrow="FAQ" title="QR code tracking questions" />
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
        QR code tracking works by turning a physical scan into a measurable website visit. A QR code is simply a machine-readable way to open a URL. When that URL contains UTM parameters, the scan can carry campaign context into Google Analytics or GA4. Instead of printing a plain landing page URL on a flyer, menu, package, poster, or booth sign, marketers can print a QR code that points to a tracked URL. When someone scans it, the browser opens the destination and GA4 can read the source, medium, and campaign values.
      </p>
      <p>
        UTM parameters are especially useful for offline campaigns because offline media is traditionally hard to measure. A restaurant may print QR codes on flyers, table tents, menus, and local posters. A conference team may place QR codes on booth signs, stage banners, badges, and handouts. An ecommerce brand may add QR codes to packaging, inserts, and product labels. Without UTM tracking, scans may appear as direct traffic or generic visits. With UTM tracking, those same scans can be grouped by campaign and placement.
      </p>
      <p>
        A typical QR tracking URL uses values such as utm_source=flyer and utm_medium=qr. The source explains the physical placement or origin of the scan, while the medium identifies the channel as QR. Campaign can describe the promotion, event, season, launch, or offline initiative. Content can be used to separate variations, such as poster_a, booth_banner, table_tent, packaging_insert, or business_card. These values help marketers compare which physical assets drive the most website visits.
      </p>
      <p>
        Measuring flyer performance is a common use case. A business might distribute flyers in different neighborhoods, events, stores, or partner venues. Each flyer version can use a slightly different UTM content value. If one version drives more scans, marketers can see that in analytics reports. For example, utm_source=flyer, utm_medium=qr, utm_campaign=summer_sale, and utm_content=downtown could distinguish one distribution area from another. This turns print distribution into measurable campaign data.
      </p>
      <p>
        Event tracking with QR codes is also powerful. Conferences, trade shows, meetups, and local events often involve many physical touchpoints. A booth poster can point to a demo signup page. A badge QR code can point to a personal profile or lead capture page. A session handout can point to slides or a resource page. By adding UTM values, marketers can understand which event assets produced the most traffic and which calls to action generated engagement after the event.
      </p>
      <p>
        GA4 QR analytics works because GA4 records visits after the QR code opens the website. The QR code itself does not report scans unless it uses a third-party dynamic QR platform. A static QR code with UTM tracking measures visits that reach your site. This is often enough for campaign analysis because marketers usually care about landing page visits, signups, purchases, downloads, or other conversion events. If someone scans the code but closes the browser before the page loads, GA4 may not record a visit.
      </p>
      <p>
        QR marketing campaigns should be designed with measurement in mind before printing. The destination page should load quickly on mobile. The UTM source and medium should be consistent. The QR code should be large enough for the viewing distance. Contrast should be strong, usually dark foreground on a light background. The quiet zone, or margin around the QR code, should not be removed. Before sending files to print, scan the code with several phones and confirm the final landing URL keeps the UTM parameters after redirects.
      </p>
      <p>
        QR best practices are practical. Use short but readable campaign names. Avoid spaces in UTM values. Use lowercase naming. Keep medium as qr across offline QR campaigns so reports are easy to filter. Use source to identify the physical placement, such as flyer, event, packaging, poster, retail_display, business_card, or product_label. Use content to identify the specific version or location. When campaigns involve many QR assets, keep a spreadsheet of each URL, file name, placement, and final printed asset.
      </p>
      <p>
        Print marketing attribution has always been challenging because offline impressions do not automatically connect to website behavior. QR codes help bridge that gap. A scan is an intentional action, and a UTM-tagged scan can connect the physical material to a digital session. This does not measure every person who saw the flyer or poster, but it does measure people who were interested enough to scan. That makes QR data useful for comparing creative, placement, and offer performance.
      </p>
      <p>
        Dynamic QR tracking and static UTM tracking are different. Dynamic QR platforms usually redirect through a service that can count scans and let users change the destination later. Static UTM QR codes encode the final destination directly. They are simple, fast, and do not require a backend, but the destination cannot be changed after printing. For many campaigns, static QR codes with UTM parameters are a good starting point because they are easy to create and can still be measured in GA4.
      </p>
      <p>
        Packaging campaigns are another strong use case. A product insert can point to a registration page, recipe page, setup guide, warranty form, review page, or loyalty offer. Product labels can point to instructions, sustainability details, or campaign landing pages. With UTM tracking, the brand can separate packaging traffic from paid ads, email, organic search, and social traffic. This improves campaign reporting and helps teams understand whether physical product touchpoints are driving digital engagement.
      </p>
      <p>
        The best workflow is to generate the UTM URL first, render a clear QR code, download PNG or SVG assets, test scans, and document the final file. PNG is convenient for quick use and digital sharing. SVG is better for print design because it scales cleanly. Keep contrast high, avoid tiny codes, and leave enough whitespace around the QR. After launch, review GA4 reports for the source, medium, campaign, and content values used in the QR destination. That review turns offline material into measurable marketing data.
      </p>
    </div>
  );
}
