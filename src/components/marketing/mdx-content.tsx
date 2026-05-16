import Link from "next/link";
import { slugify } from "@/lib/blog";

export function MdxContent({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/);

  return (
    <div className="space-y-6 text-base md:text-lg leading-8 text-neutral-500">
      {blocks.map((block, index) => renderBlock(block.trim(), index))}
    </div>
  );
}

function renderBlock(block: string, index: number) {
  if (!block) return null;
  if (block.startsWith("### ")) {
    const text = block.replace("### ", "");
    return (
      <h3 key={index} id={slugify(text)} className="pt-4 text-3xl md:text-4xl font-semibold leading-tight text-neutral-900">
        {text}
      </h3>
    );
  }
  if (block.startsWith("## ")) {
    const text = block.replace("## ", "");
    return (
      <h2 key={index} id={slugify(text)} className="pt-8 text-3xl md:text-4xl font-semibold leading-tight text-neutral-900">
        {text}
      </h2>
    );
  }
  if (block.startsWith("- ")) {
    return (
      <ul key={index} className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        {block.split("\n").map((item) => (
          <li key={item} className="ml-5 list-disc">
            {renderInline(item.replace(/^- /, ""))}
          </li>
        ))}
      </ul>
    );
  }
  if (block.startsWith("```")) {
    const code = block.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
    return (
      <pre key={index} className="overflow-x-auto rounded-2xl border border-neutral-200 bg-neutral-900 p-4 text-sm leading-6 text-neutral-50">
        <code>{code}</code>
      </pre>
    );
  }
  if (block.startsWith("> ")) {
    return (
      <blockquote key={index} className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-5 font-medium text-blue-950">
        {renderInline(block.replace(/^> /, ""))}
      </blockquote>
    );
  }
  return (
    <p key={index} className="text-base md:text-lg leading-8">
      {renderInline(block)}
    </p>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <Link key={index} href={linkMatch[2]} className="font-semibold text-blue-700 hover:text-blue-900">
          {linkMatch[1]}
        </Link>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-900">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-neutral-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

