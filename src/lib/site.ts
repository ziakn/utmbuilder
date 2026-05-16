export const siteConfig = {
  name: "UTM Builder",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://utmbuilder.com",
  description:
    "Free UTM builder, campaign tracking tools, and practical marketing analytics guides for clean attribution.",
  creator: "UTM Builder",
  keywords: [
    "utm builder",
    "utm generator",
    "campaign tracking",
    "utm parameters",
    "marketing analytics",
    "google analytics tracking",
  ],
};

export const defaultSeo = {
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: `${siteConfig.name} - Free UTM Generator and Marketing Tracking Tools`,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Free UTM Generator and Marketing Tracking Tools`,
    description: siteConfig.description,
  },
};

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
