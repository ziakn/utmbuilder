import type { Metadata } from "next";
import { Container, Section } from "@/components/marketing/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact UTM Builder for feedback, corrections, and partnership opportunities.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-950">Contact</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          For corrections, content suggestions, sponsored placements, or partnership inquiries, add a dedicated email address here before launch.
        </p>
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
          Suggested launch address: hello@utmbuilder.com
        </div>
      </Container>
    </Section>
  );
}

