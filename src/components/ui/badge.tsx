import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Badge({ className, tone = "muted", ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: "muted" | "ok" | "warn" | "danger" | "fg" }) {
  const tones = { muted: "border-border text-muted", ok: "border-ok/40 text-ok", warn: "border-warn/40 text-warn", danger: "border-danger/40 text-danger", fg: "border-border-strong text-fg" };
  return <span className={cn("inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider", tones[tone], className)} {...props} />;
}
