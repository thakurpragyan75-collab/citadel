import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "danger" | "quiet"; size?: "default" | "sm" };

export function Button({ className, variant = "default", size = "default", ...props }: Props) {
  return (
    <button className={cn("inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium disabled:opacity-40", size === "sm" ? "h-9 px-3 text-xs" : "h-11 px-4", variant === "default" && "bg-primary text-primary-fg hover:opacity-90", variant === "outline" && "border border-border-strong hover:bg-raised", variant === "ghost" && "hover:bg-raised", variant === "danger" && "bg-danger text-fg hover:opacity-90", variant === "quiet" && "border border-border bg-surface hover:bg-raised", className)} {...props} />
  );
}
