import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("flex h-11 w-full rounded-sm border border-border bg-raised px-3 text-sm text-fg placeholder:text-subtle outline-none", className)} {...props} />;
}
