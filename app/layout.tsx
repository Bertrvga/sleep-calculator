import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";
import { ADS_ENABLED } from "@/lib/ads";

export const metadata: Metadata = {
  title: {
    default: "Uyku Hesaplayıcı — İdeal Yatma ve Uyanma Saatleri",
    template: "%s | Uyku Hesaplayıcı",
  },
  description:
    "90 dakikalık uyku döngülerine göre ideal yatma ve uyanma saatlerini hesaplayın. Daha dinç uyanmanız için bilimsel temelli, hızlı ve ücretsiz uyku hesaplayıcı.",
  keywords: [
    "uyku hesaplayıcı",
    "sleep calculator",
    "uyku döngüsü",
    "kaçta uyumalıyım",
    "kaçta uyanmalıyım",
    "REM uyku",
    "90 dakika uyku",
  ],
  authors: [{ name: "Sleep Calculator" }],
  openGraph: {
    title: "Uyku Hesaplayıcı — İdeal Yatma ve Uyanma Saatleri",
    description:
      "90 dakikalık uyku döngülerine göre ideal yatma ve uyanma saatlerini hesaplayın.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uyku Hesaplayıcı",
    description:
      "İdeal yatma ve uyanma saatlerini uyku döngülerine göre hesaplayın.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "6ob9Wnl0wTXlnheUKicwsJKsX6t0_OxVu1bs7uZeOuc",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-night-gradient text-slate-100">
        <div className="relative min-h-screen overflow-hidden">
          {/* Decorative stars background */}
          <div
            className="pointer-events-none absolute inset-0 stars-bg opacity-70"
            aria-hidden="true"
          />

          {/* Top banner ad */}
          {ADS_ENABLED && (
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-4">
              <AdPlaceholder id="ad-top" label="Reklam Alanı — Üst Banner" className="h-24 md:h-28" />
            </div>
          )}

          {/* Main layout with side ads on desktop (centered, narrower when ads are off) */}
          <div
            className={`relative z-10 mx-auto flex w-full gap-4 px-4 ${
              ADS_ENABLED ? "max-w-[1400px]" : "max-w-5xl"
            }`}
          >
            {/* Left side ad (desktop only) */}
            {ADS_ENABLED && (
              <aside className="hidden xl:block w-40 shrink-0 py-6">
                <div className="sticky top-6">
                  <AdPlaceholder
                    id="ad-left"
                    label="Sol Reklam"
                    className="h-[600px]"
                  />
                </div>
              </aside>
            )}

            {/* Main content */}
            <main className="min-w-0 flex-1">{children}</main>

            {/* Right side ad (desktop only) */}
            {ADS_ENABLED && (
              <aside className="hidden xl:block w-40 shrink-0 py-6">
                <div className="sticky top-6">
                  <AdPlaceholder
                    id="ad-right"
                    label="Sağ Reklam"
                    className="h-[600px]"
                  />
                </div>
              </aside>
            )}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
