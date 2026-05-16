import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("px-4 py-16 sm:px-6 sm:py-20", className)}>{children}</section>;
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl", className)}>{children}</div>;
}

