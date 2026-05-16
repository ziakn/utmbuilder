import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100",
        className,
      )}
      {...props}
    />
  );
}

