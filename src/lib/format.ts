export function fmtClock(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
export function fmtStamp(ts: number): string {
  return new Date(ts).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
export function severityTone(s: string): string {
  if (s === "critical" || s === "crit" || s === "danger") return "text-danger";
  if (s === "high" || s === "warn") return "text-warn";
  if (s === "ok" || s === "hit") return "text-ok";
  return "text-muted";
}
