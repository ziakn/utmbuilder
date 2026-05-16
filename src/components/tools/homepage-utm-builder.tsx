"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy, QrCode, RefreshCcw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialValues = {
  websiteUrl: "https://example.com/landing-page",
  source: "google",
  medium: "cpc",
  campaign: "spring_launch",
  term: "",
  content: "hero_cta",
};

export function HomepageUtmBuilder() {
  const [values, setValues] = useState(initialValues);
  const [generated, setGenerated] = useState(true);
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const result = useMemo(() => {
    try {
      const url = new URL(values.websiteUrl);
      const params = {
        utm_source: values.source,
        utm_medium: values.medium,
        utm_campaign: values.campaign,
        utm_term: values.term,
        utm_content: values.content,
      };
      Object.entries(params).forEach(([key, value]) => {
        if (value.trim()) url.searchParams.set(key, value.trim());
      });
      return url.toString();
    } catch {
      return "";
    }
  }, [values]);

  const missing = [
    ["Website URL", values.websiteUrl],
    ["Campaign Source", values.source],
    ["Campaign Medium", values.medium],
    ["Campaign Name", values.campaign],
  ].filter(([, value]) => !value.trim());

  const isValid = Boolean(result) && missing.length === 0;
  const visibleResult = generated && result ? result : "Your final campaign URL will appear here.";

  function updateValue(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setGenerated(false);
    setQrReady(false);
  }

  async function copyUrl() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function reset() {
    setValues(initialValues);
    setGenerated(true);
    setCopied(false);
    setQrReady(false);
  }

  return (
    <div id="homepage-builder" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Homepage UTM Builder</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">Create a trackable campaign URL</h2>
        </div>
        <div className="hidden rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 sm:block">
          {isValid ? "Valid setup" : "Needs review"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2 text-sm font-medium text-slate-700">
          Website URL
          <Input className="mt-2" value={values.websiteUrl} onChange={(event) => updateValue("websiteUrl", event.target.value)} />
        </label>
        <Field label="Campaign Source" value={values.source} onChange={(value) => updateValue("source", value)} placeholder="google" />
        <Field label="Campaign Medium" value={values.medium} onChange={(value) => updateValue("medium", value)} placeholder="cpc" />
        <Field label="Campaign Name" value={values.campaign} onChange={(value) => updateValue("campaign", value)} placeholder="spring_launch" />
        <Field label="Campaign Term" value={values.term} onChange={(value) => updateValue("term", value)} placeholder="running shoes" />
        <Field label="Campaign Content" value={values.content} onChange={(value) => updateValue("content", value)} placeholder="hero_cta" className="sm:col-span-2" />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => setGenerated(true)}>
          <Wand2 size={16} aria-hidden="true" />
          <span className="ml-2">Generate URL</span>
        </Button>
        <Button variant="secondary" onClick={copyUrl} disabled={!result}>
          <Copy size={16} aria-hidden="true" />
          <span className="ml-2">{copied ? "Copied" : "Copy URL"}</span>
        </Button>
        <Button variant="ghost" onClick={reset}>
          <RefreshCcw size={16} aria-hidden="true" />
          <span className="ml-2">Reset</span>
        </Button>
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <CheckCircle2 className={isValid ? "text-emerald-600" : "text-amber-600"} size={17} aria-hidden="true" />
            Validation status: {isValid ? "Ready to use" : "Check required fields"}
          </div>
          <Button variant="secondary" onClick={() => setQrReady(true)} disabled={!result}>
            <QrCode size={16} aria-hidden="true" />
            <span className="ml-2">QR code</span>
          </Button>
        </div>
        <pre className="mt-4 min-h-20 whitespace-pre-wrap break-all rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700">
          {visibleResult}
        </pre>
        {qrReady ? (
          <p className="mt-3 text-sm text-slate-600">
            QR workflow ready: use this generated URL as the destination for your QR campaign.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={`text-sm font-medium text-slate-700 ${className}`}>
      {label}
      <Input className="mt-2" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

