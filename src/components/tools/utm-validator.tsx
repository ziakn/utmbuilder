"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardPaste, Copy, Eraser, ScanLine, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Diagnostic = {
  type: "success" | "warning" | "error";
  title: string;
  detail: string;
};

type ValidationStatus = Diagnostic["type"];

const exampleUrl =
  "https://example.com/?utm_source=Facebook Ads&utm_medium=social&utm_campaign=Summer Sale&utm_content=Hero Button";

const requiredKeys = ["utm_source", "utm_medium", "utm_campaign"];
const optionalKeys = ["utm_term", "utm_content"];
const allKeys = [...requiredKeys, ...optionalKeys];
const safeValuePattern = /^[a-zA-Z0-9_-]+$/;

export function UtmValidator() {
  const [input, setInput] = useState("https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=summer_sale");
  const [copied, setCopied] = useState(false);
  const analysis = useMemo(() => analyzeUrl(input), [input]);

  async function copyCleanUrl() {
    if (!analysis.cleanUrl) return;
    await navigator.clipboard.writeText(analysis.cleanUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div id="validator" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <ScanLine size={17} aria-hidden="true" />
          URL Input Section
        </div>
        <label className="mt-5 block text-sm font-medium text-slate-700">
          Campaign URL
          <Textarea
            className="mt-2 min-h-40 text-base"
            placeholder="https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=summer_sale"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button onClick={() => setInput(input.trim())}>
            <CheckCircle2 size={16} aria-hidden="true" />
            <span className="ml-2">Validate URL</span>
          </Button>
          <Button variant="secondary" onClick={() => setInput("")}>
            <Trash2 size={16} aria-hidden="true" />
            <span className="ml-2">Clear</span>
          </Button>
          <Button variant="secondary" onClick={() => setInput(exampleUrl)}>
            <ClipboardPaste size={16} aria-hidden="true" />
            <span className="ml-2">Paste Example</span>
          </Button>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="font-bold text-slate-950">Auto Fix Suggestions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setInput(analysis.fixUppercaseUrl)} disabled={!analysis.fixUppercaseUrl}>
              <Sparkles size={16} aria-hidden="true" />
              <span className="ml-2">Fix Uppercase</span>
            </Button>
            <Button variant="secondary" onClick={() => setInput(analysis.removeSpacesUrl)} disabled={!analysis.removeSpacesUrl}>
              <Eraser size={16} aria-hidden="true" />
              <span className="ml-2">Remove Spaces</span>
            </Button>
            <Button variant="secondary" onClick={() => setInput(analysis.cleanUrl)} disabled={!analysis.cleanUrl}>
              Clean URL
            </Button>
            <Button variant="secondary" onClick={copyCleanUrl} disabled={!analysis.cleanUrl}>
              <Copy size={16} aria-hidden="true" />
              <span className="ml-2">{copied ? "Copied" : "Copy Clean URL"}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className={`rounded-lg border p-5 shadow-sm ${statusStyle(analysis.status)}`}>
          <p className="text-sm font-semibold uppercase tracking-wide">Validation Results UI</p>
          <h2 className="mt-2 text-2xl font-bold">{analysis.statusLabel}</h2>
          <p className="mt-2 text-sm leading-6">{analysis.summary}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Detailed Analysis</h2>
          <div className="mt-5 grid gap-3">
            <AnalysisRow label="URL Structure" value={analysis.isValidUrl ? "Valid" : "Invalid"} />
            <AnalysisRow label="Campaign Source" value={analysis.params.utm_source || "Missing"} />
            <AnalysisRow label="Campaign Medium" value={analysis.params.utm_medium || "Missing"} />
            <AnalysisRow label="Campaign Name" value={analysis.params.utm_campaign || "Missing"} />
            <AnalysisRow label="Campaign Term" value={analysis.params.utm_term || "Not set"} />
            <AnalysisRow label="Campaign Content" value={analysis.params.utm_content || "Not set"} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-950">Problems Found</h2>
          <DiagnosticList items={analysis.diagnostics.filter((item) => item.type !== "success")} />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Recommendations</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            {analysis.recommendations.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Button className="flex-1" onClick={() => setInput(input.trim())}>
            Validate
          </Button>
          <Button className="flex-1" variant="secondary" onClick={copyCleanUrl} disabled={!analysis.cleanUrl}>
            Copy Clean
          </Button>
        </div>
      </div>
    </div>
  );
}

function analyzeUrl(input: string) {
  const diagnostics: Diagnostic[] = [];
  const recommendations = [
    "Use lowercase values for source, medium, campaign, term, and content.",
    "Use underscores or hyphens instead of spaces.",
    "Keep source and medium naming consistent across your whole team.",
    "Validate links before publishing them in ads, emails, social posts, or QR codes.",
  ];
  const params: Record<string, string> = {};
  let isValidUrl = false;
  let cleanUrl = "";
  let fixUppercaseUrl = "";
  let removeSpacesUrl = "";

  if ((input.match(/\?/g) ?? []).length > 1) {
    diagnostics.push({
      type: "error",
      title: "Multiple question marks",
      detail: "The URL contains multiple question marks, which can break query parsing.",
    });
  }

  try {
    decodeURIComponent(input);
  } catch {
    diagnostics.push({
      type: "error",
      title: "Broken encoding",
      detail: "The URL contains malformed percent encoding.",
    });
  }

  try {
    if (/^\s*javascript:/i.test(input)) throw new Error("Invalid protocol");
    const url = new URL(input);
    isValidUrl = Boolean(url.hostname.includes(".") || url.hostname === "localhost");
    if (!isValidUrl) {
      diagnostics.push({ type: "error", title: "Invalid URL", detail: "Use a valid domain such as example.com." });
    } else {
      diagnostics.push({ type: "success", title: "Valid URL", detail: "The URL structure can be parsed." });
    }

    if (url.protocol !== "https:") {
      diagnostics.push({ type: "warning", title: "HTTPS usage", detail: "HTTPS is preferred for campaign URLs." });
    }

    const rawPairs = url.search ? url.search.slice(1).split("&").filter(Boolean) : [];
    if (rawPairs.some((pair) => !pair.includes("="))) {
      diagnostics.push({ type: "warning", title: "Invalid query structure", detail: "One or more query pairs are missing an equals sign." });
    }

    const lowerKeys = rawPairs.map((pair) => pair.split("=")[0].toLowerCase());
    const duplicates = allKeys.filter((key) => lowerKeys.filter((item) => item === key).length > 1);
    if (duplicates.length) {
      diagnostics.push({ type: "error", title: "Duplicate UTM parameters", detail: duplicates.join(", ") });
    }

    allKeys.forEach((key) => {
      params[key] = url.searchParams.get(key) ?? url.searchParams.get(key.replace("utm_", "utm_").toUpperCase()) ?? "";
    });

    requiredKeys.forEach((key) => {
      if (!params[key]) diagnostics.push({ type: "warning", title: "Missing required parameter", detail: `${key} is recommended for campaign tracking.` });
    });

    url.searchParams.forEach((value, key) => {
      if (!key.toLowerCase().startsWith("utm_")) return;
      if (!value) diagnostics.push({ type: "warning", title: "Empty values", detail: `${key} has an empty value.` });
      if (/\s/.test(value)) diagnostics.push({ type: "warning", title: "Spaces in values", detail: `${key} contains spaces.` });
      if (/[A-Z]/.test(value) || /[A-Z]/.test(key)) diagnostics.push({ type: "warning", title: "Uppercase inconsistency", detail: `${key} should use lowercase naming.` });
      if (value && !safeValuePattern.test(value)) diagnostics.push({ type: "warning", title: "Invalid characters", detail: `${key} contains characters outside letters, numbers, hyphens, or underscores.` });
      if (value.length > 60) diagnostics.push({ type: "warning", title: "Long value", detail: `${key} is long and may be hard to read in reports.` });
    });

    const cleaned = normalizeUrl(url, { lowercase: true, spaces: true, removeDuplicates: true });
    cleanUrl = cleaned.toString();
    fixUppercaseUrl = normalizeUrl(url, { lowercase: true, spaces: false, removeDuplicates: false }).toString();
    removeSpacesUrl = normalizeUrl(url, { lowercase: false, spaces: true, removeDuplicates: false }).toString();
  } catch {
    diagnostics.push({
      type: "error",
      title: "Invalid URL",
      detail: "Enter a complete URL with protocol, such as https://example.com/?utm_source=facebook.",
    });
  }

  const hasErrors = diagnostics.some((item) => item.type === "error");
  const hasWarnings = diagnostics.some((item) => item.type === "warning");

  const status: ValidationStatus = hasErrors ? "error" : hasWarnings ? "warning" : "success";

  return {
    diagnostics,
    recommendations,
    params,
    isValidUrl,
    cleanUrl,
    fixUppercaseUrl,
    removeSpacesUrl,
    status,
    statusLabel: hasErrors ? "Errors found" : hasWarnings ? "Warnings found" : "URL looks clean",
    summary: hasErrors
      ? "Fix the errors before using this campaign URL in production."
      : hasWarnings
        ? "The URL can be parsed, but naming or tracking improvements are recommended."
        : "This campaign URL follows the core UTM validation checks.",
  };
}

function normalizeUrl(url: URL, options: { lowercase: boolean; spaces: boolean; removeDuplicates: boolean }) {
  const nextUrl = new URL(url.toString());
  const seen = new Set<string>();
  const entries = [...nextUrl.searchParams.entries()];
  nextUrl.search = "";

  entries.forEach(([key, value]) => {
    const normalizedKey = key.toLowerCase();
    if (options.removeDuplicates && seen.has(normalizedKey)) return;
    seen.add(normalizedKey);
    let nextValue = value;
    if (options.lowercase) nextValue = nextValue.toLowerCase();
    if (options.spaces) nextValue = nextValue.trim().replace(/\s+/g, "_");
    nextUrl.searchParams.append(normalizedKey, nextValue);
  });

  return nextUrl;
}

function statusStyle(status: ValidationStatus) {
  if (status === "success") return "border-emerald-200 bg-emerald-50 text-emerald-900";
  if (status === "warning") return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-red-200 bg-red-50 text-red-900";
}

function AnalysisRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm sm:grid-cols-[180px_1fr]">
      <span className="font-semibold text-slate-950">{label}</span>
      <span className="break-all text-slate-600">{value}</span>
    </div>
  );
}

function DiagnosticList({ items }: { items: Diagnostic[] }) {
  if (!items.length) {
    return <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-medium text-emerald-800">No problems found.</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <div key={`${item.title}-${item.detail}`} className={`rounded-md border p-3 text-sm ${statusStyle(item.type)}`}>
          <p className="font-semibold">{item.title}</p>
          <p className="mt-1 leading-6">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}
