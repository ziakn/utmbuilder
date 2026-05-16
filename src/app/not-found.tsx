import Link from "next/link";
import { Container, Section } from "@/components/marketing/section";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">404</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900">Page not found</h1>
        <p className="mt-5 text-base md:text-lg leading-8 text-neutral-500">
          The page may have moved, or the campaign URL may have been typed incorrectly.
        </p>
        <Link href="/utm-builder" className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white hover:bg-neutral-800">
          Open UTM Builder
        </Link>
      </Container>
    </Section>
  );
}

