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
];

