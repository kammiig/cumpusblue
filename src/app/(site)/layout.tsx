import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getServiceLinks } from "@/lib/data";
import { getSettings } from "@/lib/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const services = await getServiceLinks();
  let settings: Record<string, string> = {};
  try {
    settings = await getSettings();
  } catch {
    // defaults below
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header services={services} />
      <main id="main-content">{children}</main>
      <Footer
        services={services}
        contact={{
          email: settings.contactEmail || "contact@compublue.com",
          phone: settings.contactPhone || "+1 (818) 662-8800",
        }}
      />
    </>
  );
}
