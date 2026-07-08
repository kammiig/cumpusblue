import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSetting } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = req.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json({ photos: [] });

  const key = (await getSetting("pexelsApiKey")) || process.env.PEXELS_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "No Pexels API key configured. Add it in Settings." },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=18&orientation=landscape`,
    { headers: { Authorization: key }, next: { revalidate: 0 } }
  );
  if (!res.ok) {
    return NextResponse.json({ error: `Pexels API error (${res.status})` }, { status: 502 });
  }
  const json = await res.json();
  return NextResponse.json({ photos: json.photos ?? [] });
}
