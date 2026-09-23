import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-xs font-medium uppercase tracking-wider text-muted", className)} {...props} />;
}
