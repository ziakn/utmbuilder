"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Copy, Download, ImageDown, Printer, QrCode, Upload } from "lucide-react";
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
  source: "flyer",
  medium: "qr",
  campaign: "summer_sale",
  term: "",
  content: "",
};

const correctionLevels = ["L", "M", "Q", "H"] as const;

export function QrUtmGenerator() {
  const [values, setValues] = useState(initialValues);
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [level, setLevel] = useState<(typeof correctionLevels)[number]>("M");
  const [darkMode, setDarkMode] = useState(false);
  const [rounded, setRounded] = useState(true);
  const [foreground, setForeground] = useState("#0f172a");
  const [background, setBackground] = useState("#ffffff");
  const [png, setPng] = useState("");
  const [svg, setSvg] = useState("");
  const [copied, setCopied] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const trackedUrl = useMemo(() => buildTrackedUrl(values), [values]);
  const valid = Boolean(trackedUrl);
  useEffect(() => {
    let active = true;
    if (!trackedUrl) return;
    const qrColor = darkMode ? { dark: "#ffffff", light: "#0f172a" } : { dark: foreground, light: background };
    const options = {
      width: size,
      margin,
      errorCorrectionLevel: level,
      color: qrColor,
    };
    QRCode.toDataURL(trackedUrl, options).then((dataUrl) => {
      if (active) setPng(dataUrl);
    });
    QRCode.toString(trackedUrl, { ...options, type: "svg" }).then((nextSvg) => {
      if (active) setSvg(nextSvg);
    });
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, trackedUrl, options);
    }
    return () => {
      active = false;
    };
  }, [trackedUrl, size, margin, level, foreground, background, darkMode]);

  function update(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function copyQr() {
    if (!png) return;
    const response = await fetch(png);
    const blob = await response.blob();
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    flash("qr");
  }

  async function copyUrl() {
    if (!trackedUrl) return;
    await navigator.clipboard.writeText(trackedUrl);
    flash("url");
  }

  function flash(label: string) {
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1400);
  }

  function download(filename: string, href: string) {
    if (!href) return;
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.click();
  }

  function downloadSvg() {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    download("utm-qr-code.svg", URL.createObjectURL(blob));
  }

  return (
    <div id="qr-generator" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <QrCode size={17} aria-hidden="true" />
          URL + UTM Builder Form
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm font-medium text-slate-700">
            Website URL
            <Input className="mt-2 h-12" value={values.websiteUrl} onChange={(event) => update("websiteUrl", event.target.value)} />
          </label>
          <Field label="Campaign Source" value={values.source} onChange={(value) => update("source", value)} placeholder="flyer" />
          <Field label="Campaign Medium" value={values.medium} onChange={(value) => update("medium", value)} placeholder="qr" />
          <Field label="Campaign Name" value={values.campaign} onChange={(value) => update("campaign", value)} placeholder="summer_sale" />
          <Field label="Campaign Term" value={values.term} onChange={(value) => update("term", value)} placeholder="optional" />
          <Field label="Campaign Content" value={values.content} onChange={(value) => update("content", value)} placeholder="poster_a" />
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="font-bold text-slate-950">Live UTM URL Preview</h2>
          <p className="mt-3 break-all rounded-md bg-white p-3 text-sm leading-6 text-slate-700">
            {trackedUrl || "Enter a valid website URL to generate a tracked QR destination."}
          </p>
          <Button className="mt-4" variant="secondary" onClick={copyUrl} disabled={!valid}>
            <Copy size={16} aria-hidden="true" />
            <span className="ml-2">{copied === "url" ? "Copied" : "Copy URL"}</span>
          </Button>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-bold text-slate-950">QR Customization Section</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Range label="QR size" value={size} min={220} max={640} onChange={setSize} suffix="px" />
            <Range label="Margin" value={margin} min={0} max={6} onChange={setMargin} />
            <label className="text-sm font-medium text-slate-700">
              Error correction
              <select className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm" value={level} onChange={(event) => setLevel(event.target.value as typeof level)}>
                {correctionLevels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Foreground color
              <Input className="mt-2 h-11" type="color" value={foreground} onChange={(event) => setForeground(event.target.value)} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Background color
              <Input className="mt-2 h-11" type="color" value={background} onChange={(event) => setBackground(event.target.value)} />
            </label>
            <Toggle label="Dark/light mode" checked={darkMode} onChange={setDarkMode} />
            <Toggle label="Rounded corners" checked={rounded} onChange={setRounded} />
            <div className="flex min-h-11 items-center gap-2 rounded-md border border-dashed border-slate-300 px-3 text-sm text-slate-600">
              <Upload size={16} aria-hidden="true" />
              Logo upload placeholder
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">QR Code Generator Section</h2>
          <div className="mt-5 flex justify-center rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className={rounded ? "overflow-hidden rounded-lg bg-white p-3" : "bg-white p-3"}>
              <canvas ref={canvasRef} aria-label="Generated QR code with UTM tracking" />
            </div>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button onClick={() => flash("generated")} disabled={!valid}>
              Generate QR
            </Button>
            <Button variant="secondary" onClick={() => download("utm-qr-code.png", png)} disabled={!png}>
              <ImageDown size={16} aria-hidden="true" />
              <span className="ml-2">Download PNG</span>
            </Button>
            <Button variant="secondary" onClick={downloadSvg} disabled={!svg}>
              <Download size={16} aria-hidden="true" />
              <span className="ml-2">Download SVG</span>
            </Button>
            <Button variant="secondary" onClick={copyQr} disabled={!png}>
              <Copy size={16} aria-hidden="true" />
              <span className="ml-2">{copied === "qr" ? "Copied" : "Copy QR"}</span>
            </Button>
            <Button className="sm:col-span-2" variant="secondary" onClick={() => window.print()} disabled={!valid}>
              <Printer size={16} aria-hidden="true" />
              <span className="ml-2">Print QR</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-bold text-slate-950">Analytics Tracking Explanation</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            QR scans become website visits. GA4 can read the UTM source, medium, and campaign from the destination URL, so offline placements like flyers, packaging, booths, and posters can appear in acquisition reports.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Bulk QR Generation Section</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Future version: paste multiple campaign links, generate a batch of QR codes, and download everything as a ZIP. For now, use the single QR workflow above for high-quality print exports.
          </p>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Button className="flex-1" onClick={() => flash("generated")} disabled={!valid}>
            Generate QR
          </Button>
          <Button className="flex-1" variant="secondary" onClick={() => download("utm-qr-code.png", png)} disabled={!png}>
            PNG
          </Button>
        </div>
      </div>
    </div>
  );
}

function buildTrackedUrl(values: FormValues) {
  if (/^\s*javascript:/i.test(values.websiteUrl)) return "";
  try {
    const url = new URL(values.websiteUrl);
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return "";
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
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="text-sm font-medium text-slate-700">
      {label}
      <Input className="mt-2 h-12" placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Range({
  label,
  value,
  min,
  max,
  onChange,
  suffix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <label className="text-sm font-medium text-slate-700">
      {label}: {value}
      {suffix}
      <input className="mt-3 w-full accent-emerald-600" type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
      <input checked={checked} type="checkbox" onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}
