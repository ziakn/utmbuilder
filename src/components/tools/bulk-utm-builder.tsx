"use client";

import { useMemo, useState } from "react";
import QRCode from "qrcode";
import { Copy, Download, FileJson, FileSpreadsheet, Plus, QrCode, Rows3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BulkRow = {
  id: number;
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  selected: boolean;
};

const starterRows: BulkRow[] = [
  {
    id: 1,
    url: "https://site.com",
    source: "facebook",
    medium: "social",
    campaign: "summer_sale",
    term: "",
    content: "feed_post",
    selected: true,
  },
  {
    id: 2,
    url: "https://site.com",
    source: "newsletter",
    medium: "email",
    campaign: "june_launch",
    term: "",
    content: "hero_cta",
    selected: true,
  },
];

const templates = [
  ["Facebook Ads Campaign", { source: "facebook", medium: "paid_social", campaign: "summer_sale", content: "feed_ad" }],
  ["Google Ads Campaign", { source: "google", medium: "cpc", campaign: "brand_search", term: "keyword" }],
  ["Email Marketing Campaign", { source: "newsletter", medium: "email", campaign: "weekly_digest", content: "header_cta" }],
  ["Influencer Campaign", { source: "creator_name", medium: "influencer", campaign: "creator_launch", content: "bio_link" }],
  ["Affiliate Campaign", { source: "partner_name", medium: "affiliate", campaign: "affiliate_push" }],
  ["TikTok Campaign", { source: "tiktok", medium: "social", campaign: "creator_push", content: "video_link" }],
  ["Product Launch Campaign", { source: "launch_list", medium: "email", campaign: "product_launch", content: "announcement" }],
] as const;

const headers = ["url", "source", "medium", "campaign", "term", "content"];

export function BulkUtmBuilder() {
  const [tab, setTab] = useState<"manual" | "csv" | "table">("table");
  const [rows, setRows] = useState<BulkRow[]>(starterRows);
  const [csvText, setCsvText] = useState("url,source,medium,campaign\nhttps://site.com,facebook,social,summer_sale\nhttps://site.com,newsletter,email,june_launch");
  const [copied, setCopied] = useState("");

  const generated = useMemo(() => rows.map((row) => ({ row, url: buildUrl(row), issues: validateRow(row, rows) })), [rows]);
  const selectedGenerated = generated.filter((item) => item.row.selected && item.url);
  const validCount = generated.filter((item) => item.url && item.issues.errors.length === 0).length;
  const issueCount = generated.reduce((sum, item) => sum + item.issues.errors.length + item.issues.warnings.length, 0);

  function updateRow(id: number, key: keyof BulkRow, value: string | boolean) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  }

  function addRow(row?: Partial<BulkRow>) {
    setRows((current) => [
      ...current,
      {
        id: Date.now(),
        url: row?.url ?? "",
        source: row?.source ?? "",
        medium: row?.medium ?? "",
        campaign: row?.campaign ?? "",
        term: row?.term ?? "",
        content: row?.content ?? "",
        selected: true,
      },
    ]);
  }

  function duplicateRow() {
    const lastSelected = [...rows].reverse().find((row) => row.selected) ?? rows.at(-1);
    if (lastSelected) addRow(lastSelected);
  }

  function deleteSelected() {
    setRows((current) => current.filter((row) => !row.selected));
  }

  function applyTemplate(values: Partial<BulkRow>) {
    setRows((current) => current.map((row) => (row.selected ? { ...row, ...values } : row)));
  }

  function parseCsv() {
    const parsed = parseCsvRows(csvText);
    if (parsed.length) setRows(parsed);
    setTab("table");
  }

  async function copyAll() {
    await navigator.clipboard.writeText(generated.map((item) => item.url).filter(Boolean).join("\n"));
    flash("copy");
  }

  function exportFile(type: "csv" | "txt" | "json") {
    const filename = `bulk-utm-links.${type}`;
    const content =
      type === "csv"
        ? toCsv(generated)
        : type === "json"
          ? JSON.stringify(generated.map((item) => ({ ...pickRow(item.row), generated_url: item.url, issues: item.issues })), null, 2)
          : generated.map((item) => item.url).filter(Boolean).join("\n");
    downloadBlob(filename, content, type === "json" ? "application/json" : "text/plain");
  }

  async function downloadPngBatch() {
    for (const [index, item] of selectedGenerated.entries()) {
      const png = await QRCode.toDataURL(item.url, { width: 420, margin: 2 });
      downloadHref(`utm-qr-${index + 1}.png`, png);
      await new Promise((resolve) => window.setTimeout(resolve, 120));
    }
  }

  async function downloadZip() {
    const files: { name: string; content: string }[] = [];
    for (const [index, item] of selectedGenerated.entries()) {
      const svg = await QRCode.toString(item.url, { type: "svg", margin: 2 });
      files.push({ name: `utm-qr-${index + 1}.svg`, content: svg });
    }
    const blob = createZip(files);
    downloadHref("bulk-utm-qr-codes.zip", URL.createObjectURL(blob));
  }

  function flash(value: string) {
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1400);
  }

  return (
    <div id="bulk-tool" className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Bulk Input Section</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">Generate many UTM URLs at once</h2>
          </div>
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[
              ["manual", "Manual Entry"],
              ["csv", "CSV Paste"],
              ["table", "Table Builder"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`rounded-md px-3 py-2 text-sm font-semibold ${tab === value ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"}`}
                onClick={() => setTab(value as typeof tab)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "csv" ? (
          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">
              Paste CSV
              <Textarea className="mt-2 min-h-48 font-mono" value={csvText} onChange={(event) => setCsvText(event.target.value)} />
            </label>
            <Button className="mt-4" onClick={parseCsv}>
              Parse CSV into rows
            </Button>
          </div>
        ) : null}

        {tab === "manual" ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {starterRows.map((row) => (
              <button
                key={row.id}
                type="button"
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-700 hover:bg-white"
                onClick={() => {
                  addRow(row);
                  setTab("table");
                }}
              >
                Add example: {row.source} / {row.medium}
              </button>
            ))}
          </div>
        ) : null}

        {tab === "table" ? (
          <>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => addRow()}>
                <Plus size={16} aria-hidden="true" />
                <span className="ml-2">Add Row</span>
              </Button>
              <Button variant="secondary" onClick={duplicateRow}>
                <Rows3 size={16} aria-hidden="true" />
                <span className="ml-2">Duplicate Row</span>
              </Button>
              <Button variant="secondary" onClick={deleteSelected}>
                <Trash2 size={16} aria-hidden="true" />
                <span className="ml-2">Delete Row</span>
              </Button>
              <Button variant="ghost" onClick={() => setRows([])}>
                Clear All
              </Button>
            </div>

            <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-[980px] w-full border-collapse bg-white text-sm">
                <thead className="bg-slate-50 text-left text-slate-700">
                  <tr>
                    <th className="w-12 px-3 py-3">Use</th>
                    {["Landing URL", "Source", "Medium", "Campaign", "Term", "Content", "Generated URL", "Status"].map((heading) => (
                      <th key={heading} className="px-3 py-3 font-semibold">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {generated.map((item) => (
                    <tr key={item.row.id} className="border-t border-slate-100 align-top">
                      <td className="px-3 py-3">
                        <input
                          aria-label="Select row"
                          checked={item.row.selected}
                          type="checkbox"
                          onChange={(event) => updateRow(item.row.id, "selected", event.target.checked)}
                        />
                      </td>
                      {(["url", "source", "medium", "campaign", "term", "content"] as const).map((key) => (
                        <td key={key} className="min-w-36 px-3 py-3">
                          <Input value={item.row[key]} onChange={(event) => updateRow(item.row.id, key, event.target.value)} />
                        </td>
                      ))}
                      <td className="min-w-72 px-3 py-3">
                        <p className="break-all rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600">{item.url || "Invalid URL"}</p>
                      </td>
                      <td className="min-w-56 px-3 py-3">
                        <InlineIssues errors={item.issues.errors} warnings={item.issues.warnings} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid gap-3 md:hidden">
              {generated.map((item) => (
                <div key={`card-${item.row.id}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-950">{item.row.campaign || "Untitled campaign"}</p>
                  <p className="mt-2 break-all text-xs leading-5 text-slate-600">{item.url || "Invalid URL"}</p>
                  <InlineIssues errors={item.issues.errors} warnings={item.issues.warnings} />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-950">Export System</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {validCount} valid URLs generated. {issueCount} validation notes found.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={copyAll}>
              <Copy size={16} aria-hidden="true" />
              <span className="ml-2">{copied === "copy" ? "Copied" : "Copy All"}</span>
            </Button>
            <Button variant="secondary" onClick={() => exportFile("csv")}>
              <FileSpreadsheet size={16} aria-hidden="true" />
              <span className="ml-2">Export CSV</span>
            </Button>
            <Button variant="secondary" onClick={() => exportFile("txt")}>
              <Download size={16} aria-hidden="true" />
              <span className="ml-2">Export TXT</span>
            </Button>
            <Button variant="secondary" onClick={() => exportFile("json")}>
              <FileJson size={16} aria-hidden="true" />
              <span className="ml-2">Download Spreadsheet</span>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <QrCode size={18} className="text-emerald-700" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-950">Bulk QR Code Section</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Generate QR assets for all selected rows. The ZIP download contains lightweight SVG files, and PNG batch downloads each selected QR image.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={downloadZip} disabled={!selectedGenerated.length}>
              Download ZIP
            </Button>
            <Button variant="secondary" onClick={downloadPngBatch} disabled={!selectedGenerated.length}>
              PNG batch
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Bulk Templates</h2>
        <p className="mt-2 text-sm text-slate-600">Select rows, then apply a preset campaign template.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {templates.map(([label, values]) => (
            <button key={label} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" type="button" onClick={() => applyTemplate(values)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Button className="flex-1" onClick={copyAll}>
            Copy All
          </Button>
          <Button className="flex-1" variant="secondary" onClick={() => exportFile("csv")}>
            CSV
          </Button>
        </div>
      </div>
    </div>
  );
}

function buildUrl(row: BulkRow) {
  if (!row.url.trim() || /^\s*javascript:/i.test(row.url)) return "";
  try {
    const url = new URL(row.url);
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return "";
    if (!row.source.trim() || !row.medium.trim() || !row.campaign.trim()) return "";
    url.searchParams.set("utm_source", row.source.trim());
    url.searchParams.set("utm_medium", row.medium.trim());
    url.searchParams.set("utm_campaign", row.campaign.trim());
    if (row.term.trim()) url.searchParams.set("utm_term", row.term.trim());
    if (row.content.trim()) url.searchParams.set("utm_content", row.content.trim());
    return url.toString();
  } catch {
    return "";
  }
}

function validateRow(row: BulkRow, rows: BulkRow[]) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const values = [row.source, row.medium, row.campaign, row.term, row.content];

  if (!buildUrl(row)) errors.push("Invalid or incomplete URL.");
  if (!row.source.trim()) errors.push("Missing source.");
  if (!row.medium.trim()) errors.push("Empty medium.");
  if (!row.campaign.trim()) errors.push("Missing campaign.");
  if (values.some((value) => /\s/.test(value))) errors.push("Spaces in parameters.");
  if (values.some((value) => /[A-Z]/.test(value))) warnings.push("Uppercase inconsistency.");
  if (rows.filter((item) => item.campaign && item.campaign === row.campaign).length > 1) warnings.push("Duplicate campaign name.");

  return { errors, warnings };
}

function parseCsvRows(text: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const first = lines[0]?.toLowerCase();
  const dataLines = first?.startsWith("url,") ? lines.slice(1) : lines;

  return dataLines
    .map((line, index) => {
      const cells = line.split(",").map((cell) => cell.trim());
      if (!cells[0]) return null;
      return {
        id: Date.now() + index,
        url: cells[0] ?? "",
        source: cells[1] ?? "",
        medium: cells[2] ?? "",
        campaign: cells[3] ?? "",
        term: cells[4] ?? "",
        content: cells[5] ?? "",
        selected: true,
      };
    })
    .filter((row): row is BulkRow => Boolean(row));
}

function toCsv(items: { row: BulkRow; url: string }[]) {
  const rows = [headers.concat("generated_url").join(",")];
  items.forEach((item) => rows.push([...headers.map((key) => csvEscape(String(item.row[key as keyof BulkRow] ?? ""))), csvEscape(item.url)].join(",")));
  return rows.join("\n");
}

function csvEscape(value: string) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

function pickRow(row: BulkRow) {
  return {
    url: row.url,
    source: row.source,
    medium: row.medium,
    campaign: row.campaign,
    term: row.term,
    content: row.content,
  };
}

function InlineIssues({ errors, warnings }: { errors: string[]; warnings: string[] }) {
  if (!errors.length && !warnings.length) {
    return <span className="inline-flex rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">Valid</span>;
  }
  return (
    <div className="space-y-1 text-xs leading-5">
      {errors.map((error) => (
        <p key={error} className="text-red-700">
          {error}
        </p>
      ))}
      {warnings.map((warning) => (
        <p key={warning} className="text-amber-700">
          {warning}
        </p>
      ))}
    </div>
  );
}

function downloadBlob(filename: string, content: string, type: string) {
  downloadHref(filename, URL.createObjectURL(new Blob([content], { type })));
}

function downloadHref(filename: string, href: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
}

function createZip(files: { name: string; content: string }[]) {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  files.forEach((file) => {
    const name = encoder.encode(file.name);
    const data = encoder.encode(file.content);
    const crc = crc32(data);
    const local = zipHeader(0x04034b50, name, data.length, crc, offset);
    chunks.push(local, data);
    central.push(zipHeader(0x02014b50, name, data.length, crc, offset));
    offset += local.length + data.length;
  });

  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const view = new DataView(end.buffer);
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(8, files.length, true);
  view.setUint16(10, files.length, true);
  view.setUint32(12, centralSize, true);
  view.setUint32(16, offset, true);
  return new Blob([...chunks, ...central, end].map(toBlobPart), { type: "application/zip" });
}

function toBlobPart(part: Uint8Array) {
  const copy = new Uint8Array(part.byteLength);
  copy.set(part);
  return copy.buffer;
}

function zipHeader(signature: number, name: Uint8Array, size: number, crc: number, offset: number) {
  const isCentral = signature === 0x02014b50;
  const header = new Uint8Array(isCentral ? 46 + name.length : 30 + name.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, signature, true);
  if (isCentral) {
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint32(16, crc, true);
    view.setUint32(20, size, true);
    view.setUint32(24, size, true);
    view.setUint16(28, name.length, true);
    view.setUint32(42, offset, true);
    header.set(name, 46);
  } else {
    view.setUint16(4, 20, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, size, true);
    view.setUint32(22, size, true);
    view.setUint16(26, name.length, true);
    header.set(name, 30);
  }
  return header;
}

function crc32(data: Uint8Array) {
  let crc = -1;
  for (let i = 0; i < data.length; i += 1) {
    crc ^= data[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}
