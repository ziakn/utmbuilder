export type Tool = {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  useCases: string[];
};

export const tools: Tool[] = [
  {
    slug: "utm-builder",
    name: "UTM Builder",
    title: "Free UTM Builder for Campaign Tracking",
    description:
      "Create clean UTM-tagged campaign URLs for Google Analytics, ads, email, social, and affiliate links.",
    keywords: ["utm builder", "utm generator", "campaign url builder"],
    useCases: ["Google Analytics campaigns", "Paid social links", "Newsletter attribution"],
  },
  {
    slug: "bulk-utm-builder",
    name: "Bulk UTM Builder",
    title: "Bulk UTM Builder for Marketing Teams",
    description:
      "Generate multiple UTM URLs from a simple list of destination links and shared campaign parameters.",
    keywords: ["bulk utm builder", "bulk campaign url builder", "utm spreadsheet alternative"],
    useCases: ["Agency campaign setup", "Influencer link batches", "Product launch links"],
  },
  {
    slug: "utm-validator",
    name: "UTM Validator",
    title: "UTM Validator for Clean Analytics Data",
    description:
      "Check campaign URLs for missing source, medium, campaign, malformed encoding, and duplicate parameters.",
    keywords: ["utm validator", "check utm parameters", "utm audit tool"],
    useCases: ["Pre-launch QA", "Analytics hygiene", "Campaign naming checks"],
  },
  {
    slug: "utm-decoder",
    name: "UTM Decoder",
    title: "UTM Decoder for Campaign URLs",
    description:
      "Decode encoded campaign links and inspect every UTM parameter in a readable table before publishing.",
    keywords: ["utm decoder", "decode utm url", "campaign url decoder"],
    useCases: ["Link review", "QA workflows", "Partner link inspection"],
  },
  {
    slug: "utm-cleaner",
    name: "UTM Cleaner",
    title: "UTM Cleaner for Shareable URLs",
    description:
      "Remove UTM parameters from long URLs while keeping the destination page and non-tracking parameters intact.",
    keywords: ["remove utm parameters", "utm cleaner", "clean url tool"],
    useCases: ["Customer support links", "Editorial cleanup", "Canonical URL review"],
  },
  {
    slug: "qr-code-utm-generator",
    name: "QR Code UTM Generator",
    title: "QR Code UTM Generator for Offline Campaigns",
    description:
      "Prepare UTM-ready URLs for QR campaigns across print, events, retail, packaging, and offline placements.",
    keywords: ["qr code utm generator", "qr campaign tracking", "offline campaign utm"],
    useCases: ["Event signage", "Retail displays", "Print campaign tracking"],
  },
];

export const glossaryTerms = [
  {
    slug: "utm-source",
    term: "UTM Source",
    definition:
      "The UTM source identifies where traffic comes from, such as google, newsletter, linkedin, or partner-site.",
  },
  {
    slug: "utm-medium",
    term: "UTM Medium",
    definition:
      "The UTM medium groups the marketing channel, such as cpc, email, social, affiliate, qr, or referral.",
  },
  {
    slug: "utm-campaign",
    term: "UTM Campaign",
    definition:
      "The UTM campaign names the promotion, launch, seasonal offer, or marketing initiative being measured.",
  },
  {
    slug: "utm-content",
    term: "UTM Content",
    definition:
      "The UTM content value distinguishes ads, buttons, creatives, placements, or link variations inside one campaign.",
  },
  {
    slug: "utm-term",
    term: "UTM Term",
    definition:
      "The UTM term is commonly used for paid search keywords or audience targeting notes when granular tracking is needed.",
  },
];

export const platforms = [
  { slug: "google-ads", name: "Google Ads", source: "google", medium: "cpc" },
  { slug: "facebook-ads", name: "Facebook Ads", source: "facebook", medium: "paid-social" },
  { slug: "instagram", name: "Instagram", source: "instagram", medium: "social" },
  { slug: "linkedin", name: "LinkedIn", source: "linkedin", medium: "social" },
  { slug: "email-newsletter", name: "Email Newsletter", source: "newsletter", medium: "email" },
  { slug: "youtube", name: "YouTube", source: "youtube", medium: "video" },
];

export const countries = [
  { slug: "united-states", name: "United States", market: "US" },
  { slug: "united-kingdom", name: "United Kingdom", market: "UK" },
  { slug: "canada", name: "Canada", market: "CA" },
  { slug: "australia", name: "Australia", market: "AU" },
  { slug: "india", name: "India", market: "IN" },
  { slug: "uae", name: "United Arab Emirates", market: "UAE" },
];

export const guides = [
  {
    slug: "utm-naming-conventions",
    title: "UTM Naming Conventions for Clean Campaign Reports",
    description:
      "A practical guide to lowercase naming, channel consistency, and campaign structures that keep analytics readable.",
  },
  {
    slug: "campaign-tracking-checklist",
    title: "Campaign Tracking Checklist Before Launch",
    description:
      "A simple pre-launch checklist for validating UTM links, landing pages, redirects, and analytics reports.",
  },
  {
    slug: "google-analytics-utm-guide",
    title: "Google Analytics UTM Guide for Marketers",
    description:
      "Learn how UTM source, medium, campaign, term, and content values appear inside GA4 acquisition reports.",
  },
];

export const blogPosts = [
  {
    slug: "utm-tracking-basics",
    title: "UTM Tracking Basics: A Practical Guide for Marketers",
    description:
      "Learn what UTM parameters do, when to use them, and how to avoid messy campaign reporting.",
    date: "2026-05-16",
  },
  {
    slug: "how-to-track-facebook-campaigns",
    title: "How to Track Facebook Campaigns with UTM Parameters",
    description:
      "A practical setup guide for Facebook campaign links, source and medium naming, and analytics QA.",
    date: "2026-05-16",
  },
  {
    slug: "best-utm-naming-conventions",
    title: "Best UTM Naming Conventions for Clean Reports",
    description:
      "Naming rules for source, medium, campaign, content, and term values that keep reports readable.",
    date: "2026-05-16",
  },
  {
    slug: "common-utm-mistakes",
    title: "Common UTM Mistakes Marketers Should Avoid",
    description:
      "Avoid fragmented reports, inconsistent capitalization, missing campaign names, and broken redirect tracking.",
    date: "2026-05-16",
  },
  {
    slug: "utm-best-practices",
    title: "UTM Best Practices for Marketing Teams",
    description:
      "A concise checklist for UTM governance, campaign planning, and QA before links go live.",
    date: "2026-05-16",
  },
  {
    slug: "utm-case-sensitive-guide",
    title: "Are UTM Parameters Case Sensitive?",
    description:
      "Learn why capitalization matters in analytics reports and how to standardize campaign values.",
    date: "2026-05-16",
  },
  {
    slug: "ga4-campaign-reporting-guide",
    title: "GA4 Campaign Reporting Guide",
    description:
      "Understand where UTM campaigns appear in GA4 and how to read acquisition reports.",
    date: "2026-05-16",
  },
  {
    slug: "how-to-use-ga4-with-utms",
    title: "How to Use GA4 with UTMs",
    description:
      "Connect UTM naming conventions with GA4 acquisition reports and campaign performance analysis.",
    date: "2026-05-16",
  },
];

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  category:
    | "tool"
    | "education"
    | "platform"
    | "example"
    | "glossary"
    | "comparison"
    | "utility"
    | "country"
    | "legal";
  intent: string;
  toolMode?: string;
};

const corePages: SeoPage[] = [
  {
    slug: "utm-builder",
    title: "Free UTM Builder",
    description: "Create clean campaign tracking URLs with source, medium, campaign, term, and content parameters.",
    category: "tool",
    intent: "Generate a complete UTM URL for Google Analytics, ads, email, social, affiliate, and QR campaigns.",
    toolMode: "utm-builder",
  },
  {
    slug: "campaign-url-builder",
    title: "Campaign URL Builder",
    description: "Build campaign URLs with UTM parameters for analytics and marketing attribution.",
    category: "tool",
    intent: "Use this alternative campaign URL builder when your workflow starts with campaign naming rather than UTM terminology.",
    toolMode: "utm-builder",
  },
  {
    slug: "ga4-url-builder",
    title: "GA4 URL Builder",
    description: "Generate UTM links for GA4 acquisition reports and campaign tracking.",
    category: "tool",
    intent: "Prepare GA4-friendly campaign URLs with consistent source, medium, campaign, content, and term values.",
    toolMode: "utm-builder",
  },
  {
    slug: "marketing-url-builder",
    title: "Marketing URL Builder",
    description: "Create trackable marketing links for ads, email newsletters, social posts, and partner campaigns.",
    category: "tool",
    intent: "Build URLs that help marketing teams compare campaign performance across channels.",
    toolMode: "utm-builder",
  },
  {
    slug: "bulk-utm-builder",
    title: "Bulk UTM Builder",
    description: "Generate multiple campaign URLs with shared UTM parameters from a list of destination links.",
    category: "tool",
    intent: "Speed up launch workflows for agencies, paid media teams, creators, and ecommerce campaigns.",
    toolMode: "bulk-utm-builder",
  },
  {
    slug: "utm-validator",
    title: "UTM Validator",
    description: "Validate UTM links before publishing and catch missing campaign tracking parameters.",
    category: "tool",
    intent: "Check source, medium, campaign, encoding, and naming consistency before a campaign goes live.",
    toolMode: "utm-validator",
  },
  {
    slug: "utm-decoder",
    title: "UTM Decoder",
    description: "Decode campaign links and inspect UTM parameters in a readable format.",
    category: "tool",
    intent: "Review encoded URLs from ads, partners, newsletters, and social campaigns.",
    toolMode: "utm-decoder",
  },
  {
    slug: "utm-cleaner",
    title: "UTM Cleaner",
    description: "Remove UTM tracking parameters from a URL while preserving the destination page.",
    category: "tool",
    intent: "Clean long links for editorial, support, sharing, and canonical URL checks.",
    toolMode: "utm-cleaner",
  },
  {
    slug: "utm-template-generator",
    title: "UTM Template Generator",
    description: "Create reusable UTM templates for consistent campaign naming across your marketing team.",
    category: "tool",
    intent: "Document source, medium, campaign, content, and term patterns before campaign production starts.",
    toolMode: "utm-builder",
  },
  {
    slug: "qr-code-with-utm",
    title: "QR Code with UTM Tracking",
    description: "Prepare UTM-tagged URLs for QR code campaigns across events, retail, print, and offline media.",
    category: "tool",
    intent: "Create the tracked destination URL before generating QR assets for offline placements.",
    toolMode: "qr-code-utm-generator",
  },
];

const educationSlugs = [
  ["what-is-utm", "What Is UTM?", "A beginner-friendly explanation of UTM parameters and why marketers use them."],
  ["how-to-use-utm-parameters", "How to Use UTM Parameters", "Learn how to add source, medium, campaign, term, and content values to marketing links."],
  ["utm-parameters-explained", "UTM Parameters Explained", "Understand each UTM parameter and how it affects analytics reports."],
  ["utm-guide-for-beginners", "UTM Guide for Beginners", "A practical beginner guide to campaign URLs and marketing attribution."],
  ["how-utm-tracking-works", "How UTM Tracking Works", "Learn how tagged links pass campaign information into analytics platforms."],
  ["how-google-analytics-tracks-users", "How Google Analytics Tracks Users", "Understand traffic sources, sessions, events, and campaign attribution at a high level."],
  ["campaign-tracking-guide", "Campaign Tracking Guide", "Plan campaign links, naming conventions, and QA workflows for reliable reporting."],
  ["ga4-campaign-tracking", "GA4 Campaign Tracking", "Set up UTM links that appear cleanly in Google Analytics 4 acquisition reports."],
  ["email-marketing-tracking-guide", "Email Marketing Tracking Guide", "Track newsletters, lifecycle emails, and promotional campaigns with UTM parameters."],
  ["social-media-tracking-guide", "Social Media Tracking Guide", "Measure organic and paid social traffic with consistent UTM naming."],
  ["affiliate-tracking-guide", "Affiliate Tracking Guide", "Use UTM parameters to organize affiliate partner traffic and campaign performance."],
  ["how-to-track-link-clicks", "How to Track Link Clicks", "Track link clicks with tagged URLs, analytics events, and campaign reports."],
  ["how-to-track-campaigns", "How to Track Campaigns", "A practical campaign tracking workflow for marketers and small businesses."],
  ["how-to-track-facebook-ads", "How to Track Facebook Ads", "Use UTM links to measure Facebook ad traffic beyond platform-reported metrics."],
  ["how-to-track-google-ads", "How to Track Google Ads", "Create trackable Google Ads landing page URLs for campaign analysis."],
  ["how-to-track-instagram-campaigns", "How to Track Instagram Campaigns", "Track Instagram bio links, stories, ads, and influencer campaigns."],
  ["how-to-track-youtube-traffic", "How to Track YouTube Traffic", "Measure YouTube descriptions, pinned comments, shorts, and channel campaigns with UTMs."],
  ["utm-best-practices", "UTM Best Practices", "Rules for clean campaign tracking, naming consistency, and analytics QA."],
  ["common-utm-mistakes", "Common UTM Mistakes", "Avoid common campaign tracking errors that fragment analytics reports."],
  ["utm-case-sensitive-guide", "UTM Case Sensitive Guide", "Learn how capitalization affects campaign reporting and naming standards."],
  ["utm-naming-conventions", "UTM Naming Conventions", "Create a UTM naming system for source, medium, campaign, term, and content values."],
];

const platformSlugs = [
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "tiktok",
  "google-ads",
  "shopify",
  "wordpress",
  "nextjs",
  "email-marketing",
  "agencies",
  "small-business",
  "ecommerce",
  "affiliate-marketing",
  "influencers",
];

const exampleSlugs = [
  ["utm-examples", "UTM Examples", "Review UTM examples for ads, email, social, affiliate links, and offline campaigns."],
  ["utm-examples-for-facebook-ads", "UTM Examples for Facebook Ads", "Example Facebook Ads UTM structures for campaigns, ad sets, creatives, and placements."],
  ["utm-examples-for-google-ads", "UTM Examples for Google Ads", "Example Google Ads tracking URLs for paid search, display, and remarketing campaigns."],
  ["utm-examples-for-instagram", "UTM Examples for Instagram", "Example UTM links for Instagram bio, stories, ads, reels, and influencer campaigns."],
  ["utm-examples-for-email", "UTM Examples for Email", "Example UTM naming for newsletters, automations, lifecycle emails, and promotions."],
  ["utm-examples-for-youtube", "UTM Examples for YouTube", "Example UTM links for descriptions, pinned comments, shorts, and sponsorship campaigns."],
  ["utm-template-for-newsletter", "UTM Template for Newsletter", "A reusable UTM template for weekly newsletters and promotional email sends."],
  ["utm-template-for-affiliate-links", "UTM Template for Affiliate Links", "A reusable UTM template for partner, creator, and affiliate campaigns."],
  ["utm-template-for-tiktok", "UTM Template for TikTok", "A reusable UTM template for TikTok organic, paid, creator, and shop campaigns."],
  ["utm-template-for-linkedin", "UTM Template for LinkedIn", "A reusable UTM template for LinkedIn posts, ads, newsletters, and employee advocacy."],
];

const glossarySlugs = [
  ["google-analytics", "Google Analytics", "A web analytics platform used to measure website traffic, events, and marketing performance."],
  ["ga4", "GA4", "Google Analytics 4, the current Google Analytics property type for event-based measurement."],
  ["traffic-source", "Traffic Source", "The origin of a website visit, such as a search engine, social network, email, or referral."],
  ["campaign-attribution", "Campaign Attribution", "The process of assigning visits, conversions, and revenue to marketing campaigns."],
  ["click-through-rate", "Click-Through Rate", "The percentage of impressions that result in clicks."],
  ["conversion-rate", "Conversion Rate", "The percentage of visitors or clicks that complete a desired action."],
  ["marketing-attribution", "Marketing Attribution", "The practice of connecting marketing touchpoints to business outcomes."],
];

const comparisonSlugs = [
  ["utm-builder-vs-bitly", "UTM Builder vs Bitly", "Compare campaign URL building with short link management."],
  ["utm-vs-cookies", "UTM vs Cookies", "Understand the difference between link-based campaign tracking and browser cookies."],
  ["utm-vs-pixels", "UTM vs Pixels", "Compare UTM parameters with tracking pixels for marketing measurement."],
  ["utm-vs-short-links", "UTM vs Short Links", "Learn when to use UTM parameters, short links, or both."],
  ["ga4-vs-universal-analytics", "GA4 vs Universal Analytics", "Compare campaign reporting concepts between GA4 and Universal Analytics."],
  ["best-free-marketing-tools", "Best Free Marketing Tools", "A curated static list of free tools for marketers."],
  ["best-url-builders", "Best URL Builders", "Compare URL builders for campaign tracking and link management."],
];

const utilitySlugs = [
  ["marketing-tools", "Marketing Tools", "Free marketing utilities for campaign planning, tracking, and analytics cleanup."],
  ["free-seo-tools", "Free SEO Tools", "Free tools and resources for search visibility, content planning, and technical checks."],
  ["free-marketing-tools", "Free Marketing Tools", "A collection of free marketing tools for small teams and creators."],
  ["free-analytics-tools", "Free Analytics Tools", "Free analytics utilities for campaign links, attribution, and reporting hygiene."],
  ["campaign-tools", "Campaign Tools", "Tools for campaign URLs, launch QA, naming conventions, and performance tracking."],
  ["link-management-tools", "Link Management Tools", "Utilities for building, cleaning, validating, and organizing campaign links."],
];

const countrySlugs = [
  ["utm-builder-usa", "UTM Builder USA", "Create UTM links for campaigns targeting the United States."],
  ["utm-builder-uk", "UTM Builder UK", "Create UTM links for campaigns targeting the United Kingdom."],
  ["utm-builder-canada", "UTM Builder Canada", "Create UTM links for campaigns targeting Canada."],
  ["utm-builder-germany", "UTM Builder Germany", "Create UTM links for campaigns targeting Germany."],
  ["utm-builder-australia", "UTM Builder Australia", "Create UTM links for campaigns targeting Australia."],
  ["utm-builder-india", "UTM Builder India", "Create UTM links for campaigns targeting India."],
  ["utm-builder-pakistan", "UTM Builder Pakistan", "Create UTM links for campaigns targeting Pakistan."],
];

const legalSlugs = [
  ["about", "About UTM Builder", "Learn about UTM Builder and its mission to make campaign tracking simpler."],
  ["privacy-policy", "Privacy Policy", "How UTM Builder handles privacy for a static browser-based marketing tools website."],
  ["cookie-policy", "Cookie Policy", "Cookie policy for UTM Builder and future advertising or analytics integrations."],
  ["disclaimer", "Disclaimer", "Important disclaimers for free marketing tracking tools and educational content."],
  ["advertise", "Advertise", "Sponsored placement and advertising opportunities on UTM Builder."],
];

function makePage(
  [slug, title, description]: string[],
  category: SeoPage["category"],
  intent = description,
): SeoPage {
  return { slug, title, description, category, intent };
}

export const seoPages: SeoPage[] = [
  ...corePages,
  ...educationSlugs.map((item) => makePage(item, "education")),
  ...platformSlugs.map((slug) => {
    const name = slug
      .split("-")
      .map((word) => (word === "ga4" ? "GA4" : word === "nextjs" ? "Next.js" : word[0].toUpperCase() + word.slice(1)))
      .join(" ");
    return {
      slug: `utm-builder-for-${slug}`,
      title: `UTM Builder for ${name}`,
      description: `Create campaign tracking URLs for ${name} with clean UTM source, medium, campaign, and content values.`,
      category: "platform" as const,
      intent: `Use this page as a starting point for ${name} campaign tracking and naming conventions.`,
      toolMode: "utm-builder",
    };
  }),
  ...exampleSlugs.map((item) => makePage(item, "example")),
  ...glossaryTerms.map((term) => ({
    slug: term.slug,
    title: term.term,
    description: term.definition,
    category: "glossary" as const,
    intent: "Use this glossary page to understand the term and link to practical campaign tracking tools.",
  })),
  ...glossarySlugs.map((item) => makePage(item, "glossary")),
  ...comparisonSlugs.map((item) => makePage(item, "comparison")),
  ...utilitySlugs.map((item) => makePage(item, "utility")),
  ...countrySlugs.map((item) => makePage(item, "country", "Use regional UTM naming conventions for paid, organic, email, affiliate, and offline campaigns.")),
  ...legalSlugs.map((item) => makePage(item, "legal")),
];
