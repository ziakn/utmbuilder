import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  tags: string[];
  author: string;
  featuredImage: string;
  readingTime: string;
  body: string;
  headings: { id: string; text: string; level: number }[];
};

const blogDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts() {
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getPostBySlug(file.replace(/\.mdx$/, "")))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontmatter(raw);

  return {
    slug,
    title: data.title ?? titleFromSlug(slug),
    description: data.description ?? "",
    date: data.date ?? "2026-05-16",
    updated: data.updated ?? data.date ?? "2026-05-16",
    category: data.category ?? "UTM Guides",
    tags: parseList(data.tags),
    author: data.author ?? "UTM Builder Editorial Team",
    featuredImage: data.featuredImage ?? "analytics-dashboard",
    readingTime: data.readingTime ?? estimateReadingTime(body),
    body,
    headings: extractHeadings(body),
  };
}

export function getRelatedPosts(post: BlogPost, limit = 4) {
  return getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      post: item,
      score:
        (item.category === post.category ? 3 : 0) +
        item.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getCategories(posts = getAllPosts()) {
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

export function getTags(posts = getAllPosts()) {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, body: raw };
  const data = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const index = line.indexOf(":");
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      }),
  );
  return { data, body: match[2].trim() };
}

function parseList(value?: string) {
  if (!value) return [];
  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function extractHeadings(body: string) {
  return body
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.startsWith("###") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s/, "").trim();
      return { id: slugify(text), text, level };
    });
}

function estimateReadingTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(4, Math.ceil(words / 220))} min read`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

