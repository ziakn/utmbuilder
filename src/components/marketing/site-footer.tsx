import Link from "next/link";
import { seoPages } from "@/data/site-data";

const toolLinks = seoPages.filter((page) => page.category === "tool").slice(0, 5);
const platformLinks = seoPages.filter((page) => page.category === "platform").slice(0, 5);

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-semibold text-slate-950">UTM Builder</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Free static marketing tracking tools and practical analytics education for cleaner attribution.
          </p>
        </div>
        <FooterGroup title="Tools" items={toolLinks.map((page) => ({ href: `/${page.slug}`, label: page.title }))} />
        <FooterGroup title="Platforms" items={platformLinks.map((page) => ({ href: `/${page.slug}`, label: page.title }))} />
        <FooterGroup
          title="Company"
          items={[
            { href: "/utm-builder-usa", label: "Country pages" },
            { href: "/compare", label: "Comparisons" },
            { href: "/privacy-policy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "/contact", label: "Contact" },
          ]}
        />
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
