"use client";

import { useMemo, useState } from "react";
import { Copy, Eraser, ListChecks, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Options = {
  utm: boolean;
  facebook: boolean;
  google: boolean;
  tiktok: boolean;
  microsoft: boolean;
  custom: boolean;
  preserveImportant: boolean;
  removeDuplicates: boolean;
  normalize: boolean;
  removeEmpty: boolean;
  removeTrailing: boolean;
};

type DetectedParam = {
  key: string;
  value: string;
  type: string;
  removed: boolean;
};

const exampleUrl =
  "https://example.com/products?utm_source=facebook&utm_medium=social&utm_campaign=summer_sale&fbclid=abc123&page=2";

const bulkExample = "https://site1.com/?utm_source=facebook\nhttps://site2.com/?gclid=abc123";

const defaultOptions: Options = {
  utm: true,
  facebook: true,
  google: true,
  tiktok: true,
  microsoft: true,
  custom: false,
  preserveImportant: true,
  removeDuplicates: true,
  normalize: true,
  removeEmpty: true,
  removeTrailing: true,
};

const importantParams = new Set(["page", "q", "s", "search", "query", "sort", "filter", "category", "id", "variant"]);
const knownCustomTracking = new Set(["ref", "source", "affiliate", "tracking_id"]);

export function UtmCleaner() {
  const [input, setInput] = useState(exampleUrl);
  const [bulkInput, setBulkInput] = useState(bulkExample);
  const [options, setOptions] = useState(defaultOptions);
  const [copied, setCopied] = useState("");

  const cleaned = useMemo(() => cleanUrl(input, options), [input, options]);
  const bulk = useMemo(
    () =>
      bulkInput
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => cleanUrl(line, options))
        .filter((item) => item.valid),
    [bulkInput, options],
  );

  async function copyText(text: string, label: string) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1400);
  }

  function exportBulk(type: "txt" | "csv") {
    const content =
      type === "csv"
        ? ["original,clean_url", ...bulk.map((item) => `${csvEscape(item.original)},${csvEscape(item.cleanUrl)}`)].join("\n")
        : bulk.map((item) => item.cleanUrl).join("\n");
    downloadBlob(`clean-urls.${type}`, content, "text/plain");
  }

  function updateOption(key: keyof Options, value: boolean) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  return (
    <div id="cleaner" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <Shield size={17} aria-hidden="true" />
          URL Input Section
        </div>
        <label className="mt-5 block text-sm font-medium text-slate-700">
          Tracking URL
          <Textarea
            className="mt-2 min-h-40 text-base"
            placeholder="https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=summer_sale"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button onClick={() => setInput(cleaned.cleanUrl || input.trim())}>
            <Eraser size={16} aria-hidden="true" />
            <span className="ml-2">Clean URL</span>
          </Button>
          <Button variant="secondary" onClick={() => setInput("")}>
            <Trash2 size={16} aria-hidden="true" />
            <span className="ml-2">Clear</span>
          </Button>
          <Button variant="secondary" onClick={() => setInput(exampleUrl)}>
            Paste Example
          </Button>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="font-bold text-slate-950">Selective Removal System</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Toggle label="Remove UTM parameters" checked={options.utm} onChange={(value) => updateOption("utm", value)} />
            <Toggle label="Remove Facebook tracking" checked={options.facebook} onChange={(value) => updateOption("facebook", value)} />
            <Toggle label="Remove Google Ads tracking" checked={options.google} onChange={(value) => updateOption("google", value)} />
            <Toggle label="Remove TikTok tracking" checked={options.tiktok} onChange={(value) => updateOption("tiktok", value)} />
            <Toggle label="Remove Microsoft Ads tracking" checked={options.microsoft} onChange={(value) => updateOption("microsoft", value)} />
            <Toggle label="Remove custom query params" checked={options.custom} onChange={(value) => updateOption("custom", value)} />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-bold text-slate-950">Advanced Cleanup Options</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Toggle label="Preserve important query parameters" checked={options.preserveImportant} onChange={(value) => updateOption("preserveImportant", value)} />
            <Toggle label="Remove duplicate params" checked={options.removeDuplicates} onChange={(value) => updateOption("removeDuplicates", value)} />
            <Toggle label="Normalize URL structure" checked={options.normalize} onChange={(value) => updateOption("normalize", value)} />
            <Toggle label="Remove empty params" checked={options.removeEmpty} onChange={(value) => updateOption("removeEmpty", value)} />
            <Toggle label="Remove trailing symbols" checked={options.removeTrailing} onChange={(value) => updateOption("removeTrailing", value)} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Cleaned URL Output</h2>
          <BeforeAfter label="Original URL" value={cleaned.original || input} />
          <BeforeAfter label="Clean URL" value={cleaned.cleanUrl || "Enter a valid URL to generate a clean version."} highlight />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => copyText(cleaned.cleanUrl, "clean")} disabled={!cleaned.cleanUrl}>
              <Copy size={16} aria-hidden="true" />
              <span className="ml-2">{copied === "clean" ? "Copied" : "Copy Clean URL"}</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <ListChecks size={18} className="text-emerald-700" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-950">Tracking Parameters Detection</h2>
          </div>
          <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[520px] w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-left text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Parameter</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {cleaned.detected.length ? (
                  cleaned.detected.map((param) => (
                    <tr key={`${param.key}-${param.value}`} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-950">{param.key}</td>
                      <td className="px-4 py-3 text-slate-600">{param.type}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${param.removed ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          {param.removed ? "Removed" : "Preserved"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-6 text-slate-600" colSpan={3}>
                      No removable tracking parameters detected.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Supported Tracking Parameters</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <ParamGroup title="UTM" values={["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]} />
            <ParamGroup title="Advertising" values={["gclid", "fbclid", "ttclid", "msclkid"]} />
            <ParamGroup title="Other" values={["ref", "source", "affiliate", "tracking_id"]} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Bulk URL Cleaning Section</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Paste one URL per line to clean multiple tracking links at once.</p>
        <Textarea className="mt-4 min-h-36 font-mono text-sm" value={bulkInput} onChange={(event) => setBulkInput(event.target.value)} />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => setBulkInput(bulk.map((item) => item.cleanUrl).join("\n"))}>Clean All</Button>
          <Button variant="secondary" onClick={() => copyText(bulk.map((item) => item.cleanUrl).join("\n"), "bulk")} disabled={!bulk.length}>
            {copied === "bulk" ? "Copied" : "Copy All"}
          </Button>
          <Button variant="secondary" onClick={() => exportBulk("txt")} disabled={!bulk.length}>
            Export TXT
          </Button>
          <Button variant="secondary" onClick={() => exportBulk("csv")} disabled={!bulk.length}>
            Export CSV
          </Button>
        </div>
        <div className="mt-5 grid gap-3">
          {bulk.slice(0, 4).map((item) => (
            <div key={item.original} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
              <p className="break-all text-slate-500">{item.original}</p>
              <p className="mt-2 break-all font-medium text-slate-950">{item.cleanUrl}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Button className="flex-1" onClick={() => setInput(cleaned.cleanUrl || input.trim())}>
            Clean
          </Button>
          <Button className="flex-1" variant="secondary" onClick={() => copyText(cleaned.cleanUrl, "clean")} disabled={!cleaned.cleanUrl}>
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}

function cleanUrl(input: string, options: Options) {
  const detected: DetectedParam[] = [];
  try {
    if (/^\s*javascript:/i.test(input)) throw new Error("Invalid protocol");
    const url = new URL(input.trim());
    const entries = [...url.searchParams.entries()];
    const nextUrl = new URL(url.origin + url.pathname);
    const seen = new Set<string>();

    entries.forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      const type = getParamType(lowerKey);
      const shouldRemove = shouldRemoveParam(lowerKey, type, options);
      const isDuplicate = seen.has(lowerKey);
      const isEmpty = value.trim() === "";
      seen.add(lowerKey);

      detected.push({ key: lowerKey, value, type, removed: shouldRemove || (options.removeDuplicates && isDuplicate) || (options.removeEmpty && isEmpty) });

      if (shouldRemove) return;
      if (options.removeDuplicates && isDuplicate) return;
      if (options.removeEmpty && isEmpty) return;
      if (options.preserveImportant && importantParams.has(lowerKey)) {
        nextUrl.searchParams.append(lowerKey, value);
        return;
      }
      nextUrl.searchParams.append(options.normalize ? lowerKey : key, value);
    });

    let cleanUrl = nextUrl.toString();
    if (options.removeTrailing) cleanUrl = cleanUrl.replace(/[?&]+$/, "");
    return { original: input, cleanUrl, detected, valid: true };
  } catch {
    return { original: input, cleanUrl: "", detected, valid: false };
  }
}

function getParamType(key: string) {
  if (key.startsWith("utm_")) return "UTM";
  if (key === "fbclid") return "Facebook Tracking";
  if (key === "gclid") return "Google Ads Tracking";
  if (key === "ttclid") return "TikTok Tracking";
  if (key === "msclkid") return "Microsoft Ads Tracking";
  if (knownCustomTracking.has(key)) return "Other Tracking";
  return "Normal Query Parameter";
}

function shouldRemoveParam(key: string, type: string, options: Options) {
  if (options.preserveImportant && importantParams.has(key)) return false;
  if (options.utm && key.startsWith("utm_")) return true;
  if (options.facebook && key === "fbclid") return true;
  if (options.google && key === "gclid") return true;
  if (options.tiktok && key === "ttclid") return true;
  if (options.microsoft && key === "msclkid") return true;
  if (options.custom && type === "Other Tracking") return true;
  return false;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
      <input checked={checked} type="checkbox" onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

function BeforeAfter({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-slate-950">{label}</p>
      <p className={`mt-2 break-all rounded-md border p-3 text-sm leading-6 ${highlight ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
        {value}
      </p>
    </div>
  );
}

function ParamGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <div className="mt-2 space-y-1">
        {values.map((value) => (
          <code key={value} className="block text-xs text-slate-600">
            {value}
          </code>
        ))}
      </div>
    </div>
  );
}

function csvEscape(value: string) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

function downloadBlob(filename: string, content: string, type: string) {
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(new Blob([content], { type }));
  anchor.download = filename;
  anchor.click();
}
