import type { Metadata } from "next";
import { Container, Section } from "@/components/marketing/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for UTM Builder and Marketing Tracking Tools.",
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">Privacy Policy</h1>
        <div className="mt-8 space-y-6 leading-7 text-neutral-500">
          <p>UTM Builder is designed as a static marketing utility website. UTM links are generated in your browser and are not stored by this site.</p>
          <p>We do not require accounts, and the initial version does not use a database or external application programming interfaces for tool workflows.</p>
          <p>Future advertising, analytics, or affiliate integrations may use standard third-party technologies. This page should be updated before those services are enabled.</p>
        </div>
      </Container>
    </Section>
  );
}

