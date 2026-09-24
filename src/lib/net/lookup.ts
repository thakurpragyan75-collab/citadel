import { analyzeTraffic } from "@/lib/engine/lie";

const KNOWN: Record<string, string> = {
  instagram: "https://www.instagram.com",
  facebook: "https://www.facebook.com",
  whatsapp: "https://www.whatsapp.com",
  tiktok: "https://www.tiktok.com",
  youtube: "https://www.youtube.com",
  google: "https://www.google.com",
  gmail: "https://mail.google.com",
  twitter: "https://x.com",
  x: "https://x.com",
  snapchat: "https://www.snapchat.com",
  reddit: "https://www.reddit.com",
  netflix: "https://www.netflix.com",
  spotify: "https://www.spotify.com",
  amazon: "https://www.amazon.com",
  uber: "https://www.uber.com",
  paypal: "https://www.paypal.com",
  linkedin: "https://www.linkedin.com",
  telegram: "https://telegram.org",
  discord: "https://discord.com",
  zoom: "https://zoom.us",
  microsoft: "https://www.microsoft.com",
  apple: "https://www.apple.com",
  weather: "https://weather.com",
  nytimes: "https://www.nytimes.com",
  bbc: "https://www.bbc.com",
};

export function resolveTarget(input: string): string | null {
  const raw = input.trim().toLowerCase().replace(/^@/, "");
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return assertPublic(raw);
  if (raw.includes(".") && !raw.includes(" ")) return assertPublic(`https://${raw}`);
  const key = raw.replace(/[^a-z0-9]/g, "");
  if (KNOWN[key]) return KNOWN[key];
  for (const [name, url] of Object.entries(KNOWN)) {
    if (key.includes(name)) return url;
  }
  return assertPublic(`https://www.${key}.com`);
}

export function assertPublic(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return null;
  const m = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return null;
  }
  return url.toString();
}

export async function inspectSite(input: string) {
  const target = resolveTarget(input);
  if (!target) return { ok: false as const, error: "Type an app name or a website, such as Instagram or bbc.com." };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(target, { redirect: "follow", signal: ctrl.signal, headers: { "User-Agent": "CitadelPrivacyCheck/1.0" } });
    const html = (await res.text()).slice(0, 400000);
    const urls = [...html.matchAll(/https?:\/\/[^\"'\\\s<>]+/g)].map((m) => m[0]).slice(0, 400);
    const rawTitle = html.match(/<title[^>]*>([^<]{1,140})/i)?.[1]?.trim() ?? target;
    const title = rawTitle.replace(/&amp;/g, "&").replace(/&#39;/g, "'");
    const report = analyzeTraffic(urls, "its public page", title);
    const count = report.hits.length;
    const sentence = count
      ? `The public page "${title}" includes ${count} known tracker${count === 1 ? "" : "s"}.`
      : `The public page "${title}" did not include known tracker addresses. The app can still track you after you sign in.`;
    return { ok: true as const, title, url: res.url || target, status: res.status, hits: report.hits.map((h) => ({ host: h.host, name: h.tracker.name, kind: h.tracker.kind })), sentence };
  } catch {
    return { ok: false as const, error: "That site did not respond. Check the name and try again." };
  } finally {
    clearTimeout(timer);
  }
}

export async function dnsLookup(domain: string) {
  const name = domain.trim().replace(/^https?:\/\//, "").split("/")[0];
  if (!name.includes(".")) return { ok: false as const, error: "Type a domain such as example.com." };
  const types = ["A", "AAAA", "MX", "NS", "TXT"];
  const rows: { label: string; value: string }[] = [];
  for (const type of types) {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, { headers: { Accept: "application/dns-json" } });
    const j = (await res.json()) as { Answer?: { data: string }[] };
    const data = (j.Answer ?? []).map((a) => a.data).slice(0, 4);
    rows.push({ label: type, value: data.join(" · ") || "No records" });
  }
  return { ok: true as const, rows };
}

export async function geocode(query: string) {
  const q = query.trim();
  if (q.length < 2) return { ok: false as const, error: "Type a city or address." };
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`, { headers: { "User-Agent": "CitadelPrivacyCheck/1.0", Accept: "application/json" } });
  const list = (await res.json()) as { lat: string; lon: string; display_name: string }[];
  const hit = list[0];
  if (!hit) return { ok: false as const, error: "No place found." };
  return { ok: true as const, lat: Number(hit.lat), lon: Number(hit.lon), label: hit.display_name };
}
