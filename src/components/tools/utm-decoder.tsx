"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardPaste, Copy, Download, FileJson, SearchCode, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type DecodedParam = {
  key: string;
  rawValue: string;
  decodedValue: string;
  standard: boolean;
};

type Diagnostic = {
  type: "success" | "warning" | "error";
  title: string;
  detail: string;
};

const exampleUrl =
  "https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=summer%20sale&utm_content=banner_a&utm_term=running_shoes&fbclid=abc123";

const standardParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const extraParams = ["fbclid", "gclid", "msclkid", "ttclid", "ref", "source"];

export function UtmDecoder() {
  const [input, setInput] = useState(exampleUrl);
  const [copied, setCopied] = useState("");
  const decoded = useMemo(() => decodeTrackingUrl(input), [input]);

  async function copyText(text: string, label: string) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1400);
  }

  function exportFile(type: "csv" | "txt" | "json") {
    const filename = `decoded-utm-values.${type}`;
    const content =
      type === "json"
        ? JSON.stringify(decoded.params, null, 2)
        : type === "csv"
          ? toCsv(decoded.params)
          : decoded.params.map((item) => `${item.key}: ${item.decodedValue}`).join("\n");
    downloadBlob(filename, content, type === "json" ? "application/json" : "text/plain");
  }

  return (
    <div id="decoder" className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <SearchCode size={17} aria-hidden="true" />
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
          <Button onClick={() => setInput(input.trim())}>
            <CheckCircle2 size={16} aria-hidden="true" />
            <span className="ml-2">Decode URL</span>
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

        <div className={`mt-6 rounded-lg border p-4 ${decoded.hasErrors ? "border-red-200 bg-red-50 text-red-900" : decoded.hasWarnings ? "border-amber-200 bg-amber-50 text-amber-900" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>
          <h2 className="font-bold">URL Structure Analysis</h2>
          <DiagnosticList diagnostics={decoded.diagnostics} />
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="font-bold text-slate-950">Copy Actions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => copyText(decoded.textExport, "values")} disabled={!decoded.params.length}>
              <Copy size={16} aria-hidden="true" />
              <span className="ml-2">{copied === "values" ? "Copied" : "Copy Decoded Values"}</span>
            </Button>
            <Button variant="secondary" onClick={() => copyText(decoded.cleanUrl, "clean")} disabled={!decoded.cleanUrl}>
              <Copy size={16} aria-hidden="true" />
              <span className="ml-2">{copied === "clean" ? "Copied" : "Copy Clean URL"}</span>
            </Button>
            <Button variant="secondary" onClick={() => exportFile("json")} disabled={!decoded.params.length}>
              <FileJson size={16} aria-hidden="true" />
              <span className="ml-2">Export JSON</span>
            </Button>
            <Button variant="secondary" onClick={() => exportFile("csv")} disabled={!decoded.params.length}>
              <Download size={16} aria-hidden="true" />
              <span className="ml-2">Export CSV</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Decoded Parameters</h2>
          <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-[620px] w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-left text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Parameter</th>
                  <th className="px-4 py-3 font-semibold">Value</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {decoded.params.length ? (
                  decoded.params.map((param) => (
                    <tr key={`${param.key}-${param.rawValue}`} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-950">{param.key}</td>
                      <td className="break-all px-4 py-3 text-slate-700">{param.decodedValue || "Empty"}</td>
                      <td className="px-4 py-3 text-slate-600">{param.standard ? "UTM" : "Extra"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-6 text-slate-600" colSpan={3}>
                      No tracking parameters found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid gap-3 md:hidden">
            {decoded.params.map((param) => (
              <details key={`card-${param.key}-${param.rawValue}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-950">{param.key}</summary>
                <p className="mt-3 break-all text-sm leading-6 text-slate-600">{param.decodedValue || "Empty"}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-950">Human Readable Summary</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{decoded.summary}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Analytics Attribution Preview</h2>
          <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
            {[
              ["Session Source", decoded.utm.utm_source || "Not set"],
              ["Session Medium", decoded.utm.utm_medium || "Not set"],
              ["Campaign", decoded.utm.utm_campaign || "Not set"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[150px_1fr] border-b border-slate-100 px-4 py-3 text-sm last:border-b-0">
                <span className="font-medium text-slate-950">{label}</span>
                <span className="break-all text-slate-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Encoded URL Decoder</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["summer%20sale", safeDecode("summer%20sale")],
              ["%2F", safeDecode("%2F")],
              ["%3A", safeDecode("%3A")],
              ["%26", safeDecode("%26")],
            ].map(([encoded, plain]) => (
              <div key={encoded} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
                <code className="text-slate-950">{encoded}</code>
                <span className="mx-2 text-slate-400">to</span>
                <code className="text-emerald-700">{plain}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Button className="flex-1" onClick={() => setInput(input.trim())}>
            Decode
          </Button>
          <Button className="flex-1" variant="secondary" onClick={() => copyText(decoded.textExport, "values")} disabled={!decoded.params.length}>
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}

function decodeTrackingUrl(input: string) {
  const diagnostics: Diagnostic[] = [];
  const params: DecodedParam[] = [];
  const utm: Record<string, string> = {};
  let cleanUrl = "";

  try {
    decodeURIComponent(input);
    diagnostics.push({ type: "success", title: "Proper encoding", detail: "Encoded values can be decoded safely." });
  } catch {
    diagnostics.push({ type: "error", title: "Proper encoding", detail: "The URL contains malformed percent encoding." });
  }

  try {
    if (/^\s*javascript:/i.test(input)) throw new Error("Invalid protocol");
    const url = new URL(input);
    diagnostics.push({ type: "success", title: "Valid URL", detail: "The URL can be parsed." });

    const rawPairs = url.search ? url.search.slice(1).split("&").filter(Boolean) : [];
    const keys = rawPairs.map((pair) => safeDecode(pair.split("=")[0]).toLowerCase());
    const duplicates = [...new Set(keys.filter((key, index) => keys.indexOf(key) !== index))];
    if (duplicates.length) {
      diagnostics.push({ type: "error", title: "Duplicate parameters", detail: duplicates.join(", ") });
    }

    standardParams.forEach((key) => {
      const value = url.searchParams.get(key) ?? "";
      if (value) utm[key] = value;
    });

    ["utm_source", "utm_medium", "utm_campaign"].forEach((key) => {
      if (!utm[key]) diagnostics.push({ type: "warning", title: "Missing required parameters", detail: `${key} is not set.` });
    });

    url.searchParams.forEach((value, key) => {
      const normalizedKey = key.toLowerCase();
      if (![...standardParams, ...extraParams].includes(normalizedKey)) return;
      const decodedValue = safeDecode(value);
      params.push({
        key: normalizedKey,
        rawValue: value,
        decodedValue,
        standard: standardParams.includes(normalizedKey),
      });
      if (/[^a-zA-Z0-9_\-\s.:/@+]/.test(decodedValue)) {
        diagnostics.push({ type: "warning", title: "Invalid characters", detail: `${normalizedKey} includes unusual characters.` });
      }
      if (/test|unknown|xxx|undefined|null/i.test(decodedValue)) {
        diagnostics.push({ type: "warning", title: "Suspicious tracking values", detail: `${normalizedKey} may be a placeholder value.` });
      }
    });

    cleanUrl = normalizeUrl(url).toString();
  } catch {
    diagnostics.push({ type: "error", title: "Valid URL", detail: "Enter a complete URL such as https://example.com/?utm_source=facebook." });
  }

  const hasErrors = diagnostics.some((item) => item.type === "error");
  const hasWarnings = diagnostics.some((item) => item.type === "warning");
  const source = utm.utm_source || "an unknown source";
  const medium = utm.utm_medium || "an unknown medium";
  const campaign = utm.utm_campaign || "an unnamed campaign";

  return {
    diagnostics,
    params,
    utm,
    cleanUrl,
    hasErrors,
    hasWarnings,
    summary: `This URL tracks traffic coming from ${source} ${medium} campaigns related to the "${campaign}" promotion.`,
    textExport: params.map((item) => `${item.key}: ${item.decodedValue}`).join("\n"),
  };
}

function normalizeUrl(url: URL) {
  const nextUrl = new URL(url.toString());
  const entries = [...nextUrl.searchParams.entries()];
  nextUrl.search = "";
  entries.forEach(([key, value]) => {
    nextUrl.searchParams.append(key.toLowerCase(), safeDecode(value));
  });
  return nextUrl;
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

function DiagnosticList({ diagnostics }: { diagnostics: Diagnostic[] }) {
  return (
    <div className="mt-4 space-y-2">
      {diagnostics.map((item) => (
        <div key={`${item.title}-${item.detail}`} className="rounded-md bg-white/70 p-3 text-sm">
          <p className="font-semibold">{item.title}</p>
          <p className="mt-1 leading-6">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

function toCsv(params: DecodedParam[]) {
  return ["parameter,value,type", ...params.map((item) => [item.key, csvEscape(item.decodedValue), item.standard ? "utm" : "extra"].join(","))].join("\n");
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

