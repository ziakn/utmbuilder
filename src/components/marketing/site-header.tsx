"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Menu, X } from "lucide-react";

const nav = [
  { href: "/utm-builder", label: "Tools" },
  { href: "/campaign-tracking-guide", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/utm-source", label: "Glossary" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-900" onClick={() => setIsOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BarChart3 size={18} aria-hidden="true" />
          </span>
          <span>UTM Builder</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-500 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-neutral-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/utm-builder"
            className="hidden md:inline-flex rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Start Building
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] bg-white px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-6 text-lg font-medium text-neutral-900">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link
              href="/utm-builder"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-base font-medium text-white hover:bg-neutral-800"
              onClick={() => setIsOpen(false)}
            >
              Start Building
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
