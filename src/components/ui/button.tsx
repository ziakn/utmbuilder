import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-900",
        variant === "secondary" &&
          "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:outline-neutral-400",
        variant === "ghost" &&
          "text-neutral-600 hover:bg-neutral-100 focus-visible:outline-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

