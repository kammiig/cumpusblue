import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { getSettings, siteUrl } from "@/lib/settings";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let settings: Record<string, string> = {};
  try {
    settings = await getSettings();
  } catch {
    // DB not ready yet — use defaults
  }
  const base = siteUrl(settings);
  return {
    metadataBase: new URL(base),
    title: {
      default: "CompuBlue | AI Automation & SaaS Development Company",
      template: "%s",
    },
    description:
      "CompuBlue builds AI automation, SaaS products, custom dashboards and intelligent chatbots that help businesses scale.",
    icons: { icon: "/favicon.svg" },
    verification: settings.gscVerification
      ? { google: settings.gscVerification }
      : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings: Record<string, string> = {};
  try {
    settings = await getSettings();
  } catch {
    // DB not ready yet
  }

  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <JsonLd data={[organizationSchema(settings), websiteSchema(settings)]} />
        {children}
        <Analytics
          ga4Id={settings.ga4Id}
          metaPixelId={settings.metaPixelId}
          tiktokPixelId={settings.tiktokPixelId}
        />
      </body>
    </html>
  );
}
