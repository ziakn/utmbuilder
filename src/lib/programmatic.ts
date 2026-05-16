import platforms from "../../data/platforms.json";
import countries from "../../data/countries.json";
import campaigns from "../../data/campaigns.json";
import industries from "../../data/industries.json";

export type ProgrammaticKind = "platform" | "country" | "campaign" | "example" | "industry";

export type PlatformItem = (typeof platforms)[number];
export type CountryItem = (typeof countries)[number];
export type CampaignItem = (typeof campaigns)[number];
export type IndustryItem = (typeof industries)[number];
export type ProgrammaticItem = PlatformItem | CountryItem | CampaignItem | IndustryItem;

export { platforms, countries, campaigns, industries };

export function getPlatform(slug: string) {
  return platforms.find((item) => item.slug === slug);
}

export function getCountryFromRootSlug(slug: string) {
  const countrySlug = slug.replace(/^utm-builder-/, "");
  return countries.find((item) => item.slug === countrySlug);
}

export function getIndustryFromRootSlug(slug: string) {
  const industrySlug = slug.replace(/^utm-builder-for-/, "");
  return industries.find((item) => item.slug === industrySlug);
}

export function getCampaign(slug: string) {
  return campaigns.find((item) => item.slug === slug);
}

export function exampleUrl(source: string, medium: string, campaign: string, content = "hero_cta") {
  const url = new URL("https://example.com/");
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export function relatedPlatforms(currentSlug?: string) {
  return platforms.filter((item) => item.slug !== currentSlug).slice(0, 3);
}

export const educationalLinks = [
  { href: "/utm-best-practices", label: "UTM Best Practices" },
  { href: "/campaign-tracking-guide", label: "Campaign Tracking Guide" },
  { href: "/ga4-campaign-tracking", label: "GA4 Campaign Tracking" },
  { href: "/utm-naming-conventions", label: "UTM Naming Conventions" },
];

export const toolLinks = [
  { href: "/utm-builder", label: "UTM Builder" },
  { href: "/utm-validator", label: "UTM Validator" },
  { href: "/bulk-utm-builder", label: "Bulk UTM Builder" },
  { href: "/utm-decoder", label: "UTM Decoder" },
];

