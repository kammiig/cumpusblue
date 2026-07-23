import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendLeadNotification } from "@/lib/mail";

export const dynamic = "force-dynamic";

// Simple in-memory rate limit (per-IP): 5 submissions / 10 minutes
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (arr.length >= LIMIT) return true;
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

/**
 * Verify a reCAPTCHA v3 token with Google. Returns true when verification
 * passes — or when no secret key is configured (so local/dev still works).
 */
async function verifyRecaptcha(token: string, ip: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // Not configured — skip gracefully.
  if (!token) return false;
  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") params.set("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = (await res.json()) as { success?: boolean; score?: number; action?: string };
    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || "0.5");
    return Boolean(data.success) && (data.score ?? 0) >= minScore;
  } catch (e) {
    console.error("[contact] recaptcha verify failed:", e);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Spam protection: honeypot + minimum fill time + rate limit
    if (body.website) {
      // Bot filled the hidden field — pretend success
      return NextResponse.json({ ok: true });
    }
    if (typeof body.elapsedMs === "number" && body.elapsedMs < 2500) {
      return NextResponse.json({ ok: true });
    }
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // reCAPTCHA v3 verification (no-op when not configured)
    const passedCaptcha = await verifyRecaptcha(String(body.recaptchaToken || ""), ip);
    if (!passedCaptcha) {
      return NextResponse.json(
        { error: "We couldn't verify that you're human. Please try again." },
        { status: 400 }
      );
    }

    // Support both the current (first/last + interests) and legacy (name/service) shapes.
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const name = (String(body.name || "").trim() || `${firstName} ${lastName}`.trim()).slice(0, 200);
    const email = String(body.email || "").trim().slice(0, 200);
    const message = String(body.message || "").trim().slice(0, 5000);

    const interests = Array.isArray(body.interests)
      ? body.interests.map((s: unknown) => String(s)).filter(Boolean)
      : [];
    const service = (interests.length ? interests.join(", ") : String(body.service || "")).slice(0, 300);
    const preferredContact = String(body.preferredContact || body.budget || "").slice(0, 100);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email and message." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone: String(body.phone || "").slice(0, 50),
        company: String(body.company || "").slice(0, 200),
        service,
        budget: preferredContact, // repurposed column: preferred contact method
        message,
        page: String(body.page || "").slice(0, 300),
        ip,
      },
    });

    // Email notification — failure to send never loses the lead
    try {
      await sendLeadNotification(lead);
    } catch (e) {
      console.error("[contact] email notification failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please email us directly." },
      { status: 500 }
    );
  }
}
