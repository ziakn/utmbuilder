import type { Metadata } from "next";
import { Container, Section } from "@/components/marketing/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for UTM Builder and Marketing Tracking Tools.",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">Terms of Use</h1>
        <div className="mt-8 space-y-6 leading-7 text-neutral-500">
          <p>These free tools are provided for campaign planning, education, and marketing analytics support.</p>
          <p>You are responsible for checking final campaign URLs, naming conventions, analytics settings, and compliance requirements before publishing links.</p>
          <p>The educational content is general information and should be adapted to your business, platform, and reporting setup.</p>
        </div>
      </Container>
    </Section>
  );
}

