"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Link2, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fields = [
  ["utm_source", "Source", "google, newsletter, linkedin"] as const,
  ["utm_medium", "Medium", "cpc, email, social"] as const,
  ["utm_campaign", "Campaign", "spring_launch"] as const,
  ["utm_term", "Term", "running shoes"] as const,
  ["utm_content", "Content", "blue_button"] as const,
];

function appendUtms(url: string, values: Record<string, string>) {
  try {
    const nextUrl = new URL(url);
    fields.forEach(([key]) => {
      const value = values[key]?.trim();
      if (value) nextUrl.searchParams.set(key, value);
    });
    return nextUrl.toString();
  } catch {
    return "";
  }
}

function cleanUrl(value: string) {
  try {
    const url = new URL(value);
    [...url.searchParams.keys()].forEach((key) => {
      if (key.toLowerCase().startsWith("utm_")) url.searchParams.delete(key);
    });
    return url.toString();
  } catch {
    return "";
  }
}

function parseUtms(value: string) {
  try {
    const url = new URL(value);
    return fields.map(([key, label]) => ({
      key,
      label,
      value: url.searchParams.get(key) ?? "",
    }));
  } catch {
    return [];
  }
}

export function UtmToolbox({ mode = "builder" }: { mode?: string }) {
  const [baseUrl, setBaseUrl] = useState("https://example.com/landing-page");
  const [bulkUrls, setBulkUrls] = useState("https://example.com/page-one\nhttps://example.com/page-two");
  const [copied, setCopied] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "spring_launch",
    utm_term: "",
    utm_content: "hero_cta",
  });

  const builtUrl = useMemo(() => appendUtms(baseUrl, values), [baseUrl, values]);
  const decoded = useMemo(() => parseUtms(baseUrl), [baseUrl]);
  const cleaned = useMemo(() => cleanUrl(baseUrl), [baseUrl]);
  const bulk = useMemo(
    () =>
      bulkUrls
        .split(/\n+/)
        .map((url) => appendUtms(url.trim(), values))
        .filter(Boolean)
        .join("\n"),
    [bulkUrls, values],
  );
  const missingRequired = ["utm_source", "utm_medium", "utm_campaign"].filter(
    (key) => !parseUtms(baseUrl).find((item) => item.key === key)?.value,
  );

  const output =
    mode === "bulk-utm-builder"
      ? bulk
      : mode === "utm-cleaner"
        ? cleaned
        : mode === "utm-decoder" || mode === "utm-validator"
          ? baseUrl
          : builtUrl;

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          <Link2 size={16} aria-hidden="true" />
          Campaign URL inputs
        </div>
        <div className="mt-5 space-y-4">
          {mode === "bulk-utm-builder" ? (
            <label className="block text-sm font-medium text-neutral-600">
              Destination URLs
              <Textarea className="mt-2" value={bulkUrls} onChange={(event) => setBulkUrls(event.target.value)} />
            </label>
          ) : (
            <label className="block text-sm font-medium text-neutral-600">
              URL
              <Input className="mt-2" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} />
            </label>
          )}
          {mode !== "utm-cleaner" && mode !== "utm-decoder" && mode !== "utm-validator" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(([key, label, placeholder]) => (
                <label key={key} className="block text-sm font-medium text-neutral-600">
                  {label}
                  <Input
                    className="mt-2"
                    placeholder={placeholder}
                    value={values[key] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                  />
                </label>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            {mode === "utm-cleaner" ? <Trash2 size={16} aria-hidden="true" /> : <ShieldCheck size={16} aria-hidden="true" />}
            Result
          </div>
          <Button variant="secondary" onClick={copyOutput} disabled={!output}>
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
        {mode === "utm-validator" ? (
          <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-4">
            <p className="font-semibold text-neutral-900">
              {missingRequired.length === 0 ? "This URL has the core UTM fields." : "Missing required UTM fields"}
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              {missingRequired.length === 0
                ? "Review naming consistency, capitalization, and redirects before publishing."
                : missingRequired.join(", ")}
            </p>
          </div>
        ) : mode === "utm-decoder" ? (
          <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {decoded.map((item) => (
              <div key={item.key} className="grid grid-cols-[120px_1fr] border-b border-neutral-100 px-4 py-3 text-sm last:border-b-0">
                <span className="font-medium text-neutral-600">{item.label}</span>
                <span className="font-mono break-all text-neutral-500">{item.value || "Not set"}</span>
              </div>
            ))}
          </div>
        ) : (
          <pre className="mt-5 min-h-40 whitespace-pre-wrap font-mono break-all rounded-xl border border-neutral-200 bg-white p-4 text-sm leading-6 text-neutral-600">
            {output || "Enter a valid URL to generate a result."}
          </pre>
        )}
        {mode === "qr-code-utm-generator" ? (
          <div className="mt-4 rounded-xl border border-dashed border-neutral-300 bg-white p-4 text-sm text-neutral-500">
            QR image export can be added later without changing the URL workflow. The generated UTM link above is ready for any QR tool.
          </div>
        ) : null}
      </div>
    </div>
  );
}

