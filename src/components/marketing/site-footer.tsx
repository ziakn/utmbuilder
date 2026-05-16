import Link from "next/link";

const footerGroups = [
  {
    title: "Tools",
    items: [
      { href: "/utm-builder", label: "UTM Builder" },
      { href: "/bulk-utm-builder", label: "Bulk UTM Builder" },
      { href: "/utm-validator", label: "UTM Validator" },
      { href: "/utm-decoder", label: "UTM Decoder" },
      { href: "/qr-code-with-utm", label: "QR Code with UTM" },
    ],
  },
  {
    title: "Guides",
    items: [
      { href: "/what-is-utm", label: "What is UTM?" },
      { href: "/campaign-tracking-guide", label: "Campaign Tracking Guide" },
      { href: "/ga4-campaign-tracking", label: "GA4 Campaign Tracking" },
      { href: "/utm-best-practices", label: "UTM Best Practices" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/advertise", label: "Advertise" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
        <div>
          <p className="font-semibold text-slate-950">UTM Builder</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Free static marketing tracking tools and practical analytics education for cleaner attribution.
          </p>
        </div>
        {footerGroups.map((group) => (
          <FooterGroup key={group.title} title={group.title} items={group.items} />
        ))}
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-semibold text-slate-950">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
