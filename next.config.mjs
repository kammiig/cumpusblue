/**
 * Deploying under a sub-path (e.g. https://compublue.com/new) is driven by
 * NEXT_PUBLIC_BASE_PATH, which must be set at BUILD time -- Next.js bakes the
 * value into the server output and the client bundle. Leave it unset for local
 * dev and the app serves from "/" exactly as before.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/**
 * While the new site is staged at a sub-path it duplicates the live site, so
 * keep crawlers out. A robots.txt under /new is NOT honoured -- crawlers only
 * read it at the domain root -- so this has to be a header.
 *
 * Opt-in on purpose: forgetting to set it leaves a staged copy indexable,
 * which is visible and reversible, whereas defaulting it on would silently
 * de-index the real site the day it moves to the domain root.
 */
const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          ...(noindex
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
