/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://utmbuilder.ziamuhammad.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin*", "/test*", "/api*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/test", "/api", "/*?*", "/search"],
      },
    ],
    additionalSitemaps: [
      // Add more sitemaps here as they grow
      // "https://utmbuilder.ziamuhammad.com/sitemap-tools.xml",
    ],
  },
};

