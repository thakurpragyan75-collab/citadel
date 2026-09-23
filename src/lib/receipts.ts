export type ModuleId = "system" | "leak" | "lie" | "device" | "household" | "tax" | "panic";
export type Receipt = { id: string; ts: number; module: ModuleId; action: string; detail: string; prevHash: string; hash: string; };
export const GENESIS = "0".repeat(64);
export async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
export function canonical(r: Omit<Receipt, "hash">): string {
  return `${r.id}|${r.ts}|${r.module}|${r.action}|${r.detail}|${r.prevHash}`;
}
export async function sealReceipt(prevHash: string, module: ModuleId, action: string, detail: string): Promise<Receipt> {
  const draft: Omit<Receipt, "hash"> = { id: crypto.randomUUID(), ts: Date.now(), module, action, detail, prevHash };
  return { ...draft, hash: await sha256Hex(canonical(draft)) };
}
export async function verifyChain(receipts: Receipt[]) {
  let prev = GENESIS;
  for (let i = 0; i < receipts.length; i++) {
    const r = receipts[i];
    if (r.prevHash !== prev) return { ok: false, brokenAt: i };
    if ((await sha256Hex(canonical(r))) !== r.hash) return { ok: false, brokenAt: i };
    prev = r.hash;
  }
  return { ok: true, brokenAt: null };
}
export function shortHash(h: string, n = 10): string { return h.slice(0, n); }
