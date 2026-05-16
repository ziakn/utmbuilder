"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  Copy,
  Download,
  ImageDown,
  Link2,
  QrCode,
  RefreshCcw,
  Share2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormValues = {
  websiteUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};

const initialValues: FormValues = {
  websiteUrl: "https://example.com",
  source: "facebook",
  medium: "social",
  campaign: "summer_sale",
  term: "",
  content: "",
};

const presets: { label: string; values: Partial<FormValues> }[] = [
  { label: "Facebook Ads", values: { source: "facebook", medium: "paid_social", campaign: "summer_sale", content: "feed_ad" } },
  { label: "Instagram Campaign", values: { source: "instagram", medium: "social", campaign: "product_launch", content: "story_link" } },
  { label: "Email Newsletter", values: { source: "newsletter", medium: "email", campaign: "june_launch", content: "header_cta" } },
  { label: "Google Ads", values: { source: "google", medium: "cpc", campaign: "brand_search", term: "utm_builder" } },
  { label: "Affiliate Link", values: { source: "partner_name", medium: "affiliate", campaign: "creator_launch" } },
  { label: "LinkedIn Campaign", values: { source: "linkedin", medium: "social", campaign: "b2b_webinar", content: "sponsored_post" } },
  { label: "YouTube Campaign", values: { source: "youtube", medium: "video", campaign: "product_review", content: "description_link" } },
  { label: "TikTok Campaign", values: { source: "tiktok", medium: "social", campaign: "creator_push", content: "bio_link" } },
];

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const safeValuePattern = /^[a-zA-Z0-9_-]*$/;

export function AdvancedUtmBuilder() {
  const [values, setValues] = useState(initialValues);
  const [copied, setCopied] = useState("");
  const [qrPng, setQrPng] = useState("");
  const [qrSvg, setQrSvg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const result = useMemo(() => buildUrl(values), [values]);
  const validation = useMemo(() => validateValues(values), [values]);

  useEffect(() => {
    let active = true;
    if (!result) {
      const context = canvasRef.current?.getContext("2d");
      if (context && canvasRef.current) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    QRCode.toDataURL(result, { width: 280, margin: 2, color: { dark: "#0f172a", light: "#ffffff" } }).then((png) => {
      if (active) setQrPng(png);
    });
    QRCode.toString(result, { type: "svg", margin: 2, color: { dark: "#0f172a", light: "#ffffff" } }).then((svg) => {
      if (active) setQrSvg(svg);
    });
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, result, { width: 220, margin: 2 });
    }

    return () => {
      active = false;
    };
  }, [result]);

  function update(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setValues(initialValues);
    setCopied("");
  }

  async function copyText(text: string, label: string) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1400);
  }

  async function copyQrImage() {
    if (!qrPng) return;
    const response = await fetch(qrPng);
    const blob = await response.blob();
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    setCopied("qr");
    window.setTimeout(() => setCopied(""), 1400);
  }

  async function shareLink() {
    if (!result) return;
    if (navigator.share) {
      await navigator.share({ title: "UTM tracking URL", url: result });
    } else {
      await copyText(result, "share");
    }
  }

  function download(filename: string, href: string) {
    if (!href) return;
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.click();
  }

  function downloadSvg() {
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    download("utm-qr-code.svg", URL.createObjectURL(blob));
  }

  return (
    <div id="builder" className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          <Link2 size={17} aria-hidden="true" />
          Main UTM Builder Form
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm font-medium text-neutral-600">
            Website URL
            <Input className="mt-2 h-12" placeholder="https://example.com" value={values.websiteUrl} onChange={(event) => update("websiteUrl", event.target.value)} />
          </label>
          <Field label="Campaign Source" examples="google, facebook, instagram, newsletter, youtube" value={values.source} onChange={(value) => update("source", value)} />
          <Field label="Campaign Medium" examples="cpc, social, email, affiliate, qr" value={values.medium} onChange={(value) => update("medium", value)} />
          <Field label="Campaign Name" examples="summer_sale, black_friday, product_launch" value={values.campaign} onChange={(value) => update("campaign", value)} />
          <Field label="Campaign Term" examples="Optional: paid keywords or PPC campaigns" value={values.term} onChange={(value) => update("term", value)} />
          <Field label="Campaign Content" examples="Optional: A/B testing, buttons, banners" value={values.content} onChange={(value) => update("content", value)} className="sm:col-span-2" />
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-neutral-900">Preset templates</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                type="button"
                onClick={() => setValues((current) => ({ ...current, ...preset.values }))}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => copyText(result, "generated")} disabled={!result}>
            <Wand2 size={16} aria-hidden="true" />
            <span className="ml-2">{copied === "generated" ? "Generated" : "Generate URL"}</span>
          </Button>
          <Button variant="secondary" onClick={() => copyText(result, "url")} disabled={!result}>
            <Copy size={16} aria-hidden="true" />
            <span className="ml-2">{copied === "url" ? "Copied" : "Copy URL"}</span>
          </Button>
          <Button variant="secondary" onClick={reset}>
            <RefreshCcw size={16} aria-hidden="true" />
            <span className="ml-2">Reset</span>
          </Button>
          <Button variant="ghost" onClick={shareLink} disabled={!result}>
            <Share2 size={16} aria-hidden="true" />
            <span className="ml-2">Share Link</span>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-neutral-900">Live URL Preview</h2>
            <span className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${validation.errors.length ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
              {validation.errors.length ? "Fix required" : "Ready"}
            </span>
          </div>
          <pre className="mt-4 min-h-28 whitespace-pre-wrap font-mono break-all rounded-xl border border-neutral-200 bg-white p-4 text-sm leading-6 text-neutral-600">
            {result || "Enter a valid HTTPS website URL to generate a tracking URL."}
          </pre>
          <ValidationList title="Warnings" items={validation.warnings} tone="warning" />
          <ValidationList title="Recommendations" items={validation.recommendations} tone="info" />
          <ValidationList title="Fixes needed" items={validation.errors} tone="error" />
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <QrCode size={18} className="text-blue-700" aria-hidden="true" />
            <h2 className="text-lg font-bold text-neutral-900">QR Code Section</h2>
          </div>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex min-h-56 min-w-56 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
              <canvas ref={canvasRef} aria-label="Mobile preview of generated QR code" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Button variant="secondary" onClick={() => download("utm-qr-code.png", qrPng)} disabled={!result || !qrPng}>
                <ImageDown size={16} aria-hidden="true" />
                <span className="ml-2">Download PNG</span>
              </Button>
              <Button variant="secondary" onClick={downloadSvg} disabled={!result || !qrSvg}>
                <Download size={16} aria-hidden="true" />
                <span className="ml-2">Download SVG</span>
              </Button>
              <Button variant="secondary" onClick={copyQrImage} disabled={!result || !qrPng}>
                <Copy size={16} aria-hidden="true" />
                <span className="ml-2">{copied === "qr" ? "Copied" : "Copy QR image"}</span>
              </Button>
              <p className="text-sm leading-6 text-neutral-500">Mobile preview updates automatically as you type.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Button className="flex-1" onClick={() => copyText(result, "mobile")} disabled={!result}>
            Generate URL
          </Button>
          <Button className="flex-1" variant="secondary" onClick={() => copyText(result, "url")} disabled={!result}>
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}

function buildUrl(values: FormValues) {
  if (/^\s*javascript:/i.test(values.websiteUrl)) return "";
  try {
    const url = new URL(values.websiteUrl);
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return "";
    url.searchParams.set("utm_source", values.source.trim());
    url.searchParams.set("utm_medium", values.medium.trim());
    url.searchParams.set("utm_campaign", values.campaign.trim());
    if (values.term.trim()) url.searchParams.set("utm_term", values.term.trim());
    if (values.content.trim()) url.searchParams.set("utm_content", values.content.trim());
    return url.toString();
  } catch {
    return "";
  }
}

function validateValues(values: FormValues) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  try {
    const url = new URL(values.websiteUrl);
    if (/^javascript:/i.test(values.websiteUrl)) errors.push("Javascript links are not allowed.");
    if (!url.hostname.includes(".") && url.hostname !== "localhost") errors.push("Use a valid domain such as example.com.");
    if (url.protocol !== "https:") warnings.push("HTTPS is preferred for campaign URLs.");
    const keys = [...url.searchParams.keys()].map((key) => key.toLowerCase());
    const duplicates = utmKeys.filter((key) => keys.filter((item) => item === key).length > 1);
    if (duplicates.length) errors.push(`Duplicate UTM parameters found: ${duplicates.join(", ")}.`);
    if (utmKeys.some((key) => keys.includes(key))) warnings.push("Existing UTM parameters will be overwritten by the builder.");
  } catch {
    errors.push("Enter a valid URL, including https://.");
  }

  Object.entries({
    utm_source: values.source,
    utm_medium: values.medium,
    utm_campaign: values.campaign,
    utm_term: values.term,
    utm_content: values.content,
  }).forEach(([key, value]) => {
    if (!value.trim() && ["utm_source", "utm_medium", "utm_campaign"].includes(key)) {
      errors.push(`${key} cannot be empty.`);
    }
    if (/\s/.test(value)) errors.push(`${key} contains spaces. Use hyphens or underscores.`);
    if (!safeValuePattern.test(value)) errors.push(`${key} contains invalid characters. Use letters, numbers, hyphens, or underscores.`);
    if (/[A-Z]/.test(value)) warnings.push(`${key} contains uppercase letters. Lowercase values keep reports consistent.`);
  });

  if (values.source.includes("-") && values.medium.includes("_")) {
    warnings.push("You are mixing hyphens and underscores across fields. Pick one naming style.");
  }
  if (values.campaign.length < 4) recommendations.push("Use a descriptive campaign name, not a short internal code.");
  recommendations.push("Keep a shared UTM naming document for repeat campaigns.");
  recommendations.push("Click the final link before launch to confirm redirects preserve UTM parameters.");

  return { errors, warnings, recommendations };
}

function Field({
  label,
  examples,
  value,
  onChange,
  className = "",
}: {
  label: string;
  examples: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`text-sm font-medium text-neutral-600 ${className}`}>
      {label}
      <Input className="mt-2 h-12" value={value} onChange={(event) => onChange(event.target.value)} />
      <span className="mt-1 block text-xs leading-5 text-neutral-500">{examples}</span>
    </label>
  );
}

function ValidationList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "error" | "warning" | "info";
}) {
  if (!items.length) return null;

  const styles = {
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    info: "border-neutral-200 bg-white text-neutral-600",
  };

  return (
    <div className={`mt-4 rounded-xl border p-3 ${styles[tone]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-2 space-y-1 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
