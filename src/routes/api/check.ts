import { createFileRoute } from "@tanstack/react-router";
import { dnsLookup, geocode, inspectSite } from "@/lib/net/lookup";

export const Route = createFileRoute("/api/check")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as { kind?: string; query?: string } | null;
        const kind = body?.kind ?? "";
        const query = body?.query ?? "";
        if (kind === "site") return Response.json(await inspectSite(query));
        if (kind === "dns") return Response.json(await dnsLookup(query));
        if (kind === "place") return Response.json(await geocode(query));
        return Response.json({ ok: false, error: "Unknown check." }, { status: 400 });
      },
    },
  },
});
