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
        "inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-slate-950 text-white hover:bg-slate-800 focus-visible:outline-slate-950",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50 focus-visible:outline-slate-400",
        variant === "ghost" &&
          "text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-400",
        className,
      )}
      {...props}
    />
  );
}

