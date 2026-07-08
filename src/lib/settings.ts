import { db } from "./db";

export type SettingsMap = Record<string, string>;

export const SETTING_KEYS = [
  "siteName",
  "siteUrl",
  "contactEmail",
  "contactPhone",
  "address",
  "leadNotifyEmail",
  "smtpHost",
  "smtpPort",
  "smtpUser",
  "smtpPass",
  "smtpFrom",
  "ga4Id",
  "metaPixelId",
  "tiktokPixelId",
  "gscVerification",
  "robotsTxt",
  "defaultOgImage",
  "socialLinkedin",
  "socialFacebook",
  "socialX",
  "socialInstagram",
  "pexelsApiKey",
] as const;

export async function getSettings(): Promise<SettingsMap> {
  const rows = await db.setting.findMany();
  const map: SettingsMap = {};
  for (const r of rows) map[r.key] = r.value;
  return map;
}

export async function getSetting(key: string): Promise<string> {
  const row = await db.setting.findUnique({ where: { key } });
  return row?.value ?? "";
}

export async function setSetting(key: string, value: string) {
  await db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export function siteUrl(settings?: SettingsMap) {
  return (
    settings?.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://compublue.com"
  ).replace(/\/$/, "");
}
