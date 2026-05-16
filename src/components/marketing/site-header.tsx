import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { tools } from "@/data/site-data";

const nav = [
  { href: "/tools/utm-builder", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary/utm-source", label: "Glossary" },
  { href: "/blog/utm-tracking-basics", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <span className="flex size-9 items-center justify-center rounded-md bg-emerald-600 text-white">
            <BarChart3 size={18} aria-hidden="true" />
          </span>
          <span>UTM Builder</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={`/tools/${tools[0].slug}`}
          className="rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Build UTM
        </Link>
      </div>
    </header>
  );
}

