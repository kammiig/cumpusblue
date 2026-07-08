import { getSettings } from "@/lib/settings";
import { saveSettingsAction, changePasswordAction } from "../actions";
import { PageTitle, SavedBanner, Field } from "../ui";

export const dynamic = "force-dynamic";

const GROUPS: { title: string; hint?: string; fields: { key: string; label: string; hint?: string; rows?: number; type?: string }[] }[] = [
  {
    title: "Site identity",
    fields: [
      { key: "siteName", label: "Site name" },
      { key: "siteUrl", label: "Site URL", hint: "Used for canonical URLs, sitemap and Open Graph." },
      { key: "contactEmail", label: "Public contact email" },
      { key: "contactPhone", label: "Public contact phone" },
      { key: "defaultOgImage", label: "Default social sharing image URL", hint: "1200×630px. Used when a page has no specific OG image." },
    ],
  },
  {
    title: "Tracking & integrations",
    hint: "Each integration loads on the live site only when its ID is filled in.",
    fields: [
      { key: "ga4Id", label: "Google Analytics 4 Measurement ID", hint: "e.g. G-XXXXXXXXXX" },
      { key: "metaPixelId", label: "Meta Pixel ID", hint: "From Meta Business Suite → Events Manager." },
      { key: "tiktokPixelId", label: "TikTok Pixel ID", hint: "From TikTok Ads Manager → Assets → Events." },
      { key: "gscVerification", label: "Google Search Console verification code", hint: "Content of the google-site-verification meta tag." },
    ],
  },
  {
    title: "Lead notifications (SMTP)",
    hint: "Where and how enquiry notifications are emailed. Leads are always stored in the dashboard even if email is not configured.",
    fields: [
      { key: "leadNotifyEmail", label: "Send lead notifications to" },
      { key: "smtpHost", label: "SMTP host", hint: "e.g. smtp.gmail.com or your provider's relay." },
      { key: "smtpPort", label: "SMTP port", hint: "587 (TLS) or 465 (SSL)." },
      { key: "smtpUser", label: "SMTP username" },
      { key: "smtpPass", label: "SMTP password", type: "password" },
      { key: "smtpFrom", label: "From address", hint: 'e.g. CompuBlue Website <no-reply@compublue.com>' },
    ],
  },
  {
    title: "Social profiles",
    hint: "Used in the Organization schema markup.",
    fields: [
      { key: "socialLinkedin", label: "LinkedIn URL" },
      { key: "socialFacebook", label: "Facebook URL" },
      { key: "socialX", label: "X / Twitter URL" },
      { key: "socialInstagram", label: "Instagram URL" },
    ],
  },
  {
    title: "APIs",
    fields: [{ key: "pexelsApiKey", label: "Pexels API key", hint: "Powers the image search on the Images page.", type: "password" }],
  },
];

export default async function AdminSettings({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const settings = await getSettings();
  const allKeys = GROUPS.flatMap((g) => g.fields.map((f) => f.key));

  return (
    <>
      <PageTitle
        title="Settings & Integrations"
        sub="Site identity, analytics pixels, Search Console, email notifications and API keys."
      />
      <SavedBanner searchParams={searchParams} />

      <form action={saveSettingsAction} className="max-w-3xl">
        <input type="hidden" name="settingKeys" value={allKeys.join(",")} />
        <div className="space-y-8">
          {GROUPS.map((g) => (
            <fieldset key={g.title} className="card p-6">
              <legend className="h-display px-2 text-base">{g.title}</legend>
              {g.hint && <p className="mb-4 text-sm text-muted">{g.hint}</p>}
              <div className="space-y-5">
                {g.fields.map((f) => (
                  <Field
                    key={f.key}
                    label={f.label}
                    name={f.key}
                    defaultValue={settings[f.key] ?? ""}
                    hint={f.hint}
                    rows={f.rows}
                    type={f.type ?? "text"}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <button type="submit" className="btn-primary mt-8">Save settings</button>
      </form>

      <form action={changePasswordAction} className="card mt-10 max-w-3xl p-6">
        <h2 className="h-display text-base">Change admin password</h2>
        <div className="mt-4 max-w-sm">
          <Field label="New password" name="password" type="password" hint="Minimum 10 characters." />
        </div>
        <button type="submit" className="btn-ghost mt-5 !min-h-0 !px-5 !py-2.5 text-sm">
          Update password
        </button>
      </form>
    </>
  );
}
