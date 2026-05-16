import Link from "next/link";
import { countries, platforms, tools } from "@/data/site-data";

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
        <FooterGroup title="Tools" items={tools.slice(0, 5).map((tool) => ({ href: `/tools/${tool.slug}`, label: tool.name }))} />
        <FooterGroup title="Platforms" items={platforms.slice(0, 5).map((platform) => ({ href: `/platforms/${platform.slug}`, label: platform.name }))} />
        <FooterGroup
          title="Company"
          items={[
            { href: `/countries/${countries[0].slug}`, label: "Country pages" },
            { href: "/compare", label: "Comparisons" },
            { href: "/privacy", label: "Privacy" },
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

