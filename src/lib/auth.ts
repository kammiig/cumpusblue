import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-me"
);

export const SESSION_COOKIE = "cb_admin_session";

/** Scope the session to the sub-path the app is mounted under, so the cookie
 *  never leaks to -- or collides with -- the separate site served from "/". */
const COOKIE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/";

/** A `secure` cookie is dropped outright by the browser over plain HTTP, which
 *  would turn admin login into a silent redirect loop. Follow the real scheme
 *  of the deployed site rather than assuming production means HTTPS. */
const SECURE_COOKIE = (process.env.NEXT_PUBLIC_SITE_URL || "").startsWith("http://")
  ? false
  : process.env.NODE_ENV === "production";

export async function createSession(userId: string, email: string) {
  const token = await new SignJWT({ sub: userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: SECURE_COOKIE,
    path: COOKIE_PATH,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { sub: string; email: string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function destroySession() {
  cookies().set(SESSION_COOKIE, "", { path: COOKIE_PATH, maxAge: 0 });
}
