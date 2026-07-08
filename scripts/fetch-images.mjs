#!/usr/bin/env node
/**
 * Downloads the site's Pexels imagery to /public/images for self-hosting
 * (faster, no third-party requests) using your Pexels API key.
 *
 * Usage:  PEXELS_API_KEY=your-key node scripts/fetch-images.mjs
 * (reads .env automatically if the key is set there)
 *
 * After running, images are available at /images/<name>.jpg. Swap the URLs
 * in src/lib/images.ts (or via the admin Images page) to use local copies.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd());
const OUT = path.join(ROOT, "public", "images");

// Same photo IDs as src/lib/images.ts
const PHOTOS = {
  "hero-office": 12903168,
  "about-team": 3184359,
  "dev-team": 6804068,
  "code-review": 12899191,
  "team-code": 12899153,
  "programmer": 6805148,
  "analytics-chart": 5833762,
  "tablet-analytics": 36950598,
  "trading-desk": 31738798,
  "data-center": 37730212,
  "server-rack": 37605910,
  "engineer-laptop": 1181341,
  "meeting": 7693692,
  "four-people": 8204363,
  "woman-laptop": 6779536,
  "marketing": 34069,
  "ai-robot": 8386437,
  "presentation": 7988758,
};

async function loadEnvKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY;
  try {
    const env = await readFile(path.join(ROOT, ".env"), "utf8");
    const m = env.match(/^PEXELS_API_KEY="?([^"\n]+)"?/m);
    if (m) return m[1];
  } catch {
    /* no .env */
  }
  return null;
}

const key = await loadEnvKey();
if (!key) {
  console.error("Set PEXELS_API_KEY (env var or .env) first.");
  process.exit(1);
}

if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

let done = 0;
for (const [name, id] of Object.entries(PHOTOS)) {
  const file = path.join(OUT, `${name}.jpg`);
  if (existsSync(file)) {
    console.log(`• ${name}.jpg already exists, skipping`);
    continue;
  }
  try {
    // Verify via API (also records the download per Pexels guidelines)
    const meta = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: { Authorization: key },
    }).then((r) => r.json());

    const url =
      (meta.src && (meta.src.large2x || meta.src.large)) ||
      `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
    const finalUrl = `${url.split("?")[0]}?auto=compress&cs=tinysrgb&w=1920`;

    const res = await fetch(finalUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(file, buf);
    console.log(`✔ ${name}.jpg (${Math.round(buf.length / 1024)} KB) — photo by ${meta.photographer ?? "Pexels"}`);
    done++;
  } catch (e) {
    console.error(`✘ ${name} (id ${id}): ${e.message}`);
  }
}
console.log(`\nDone. ${done} images saved to public/images/.`);
console.log("Next.js serves and optimizes them automatically via next/image.");
