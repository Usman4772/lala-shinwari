import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Marcellus, Outfit } from "next/font/google";
import "./globals.css";

import { site } from "@/data/site";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartButton } from "@/components/cart/CartButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealScope } from "@/components/ui/Reveal";

/** Headings — a Roman-inscription style serif with a regal, upright feel. */
const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/** Accent — flowing italic used for highlighted words inside headings. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});

/** Body — clean geometric sans that pairs well with the serifs. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const title =
  "Golden Fork by Lala Shinwari | Shinwari Karahi, BBQ & Family Restaurant on Ferozepur Road, Lahore";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "Shinwari karahi Lahore",
    "BBQ restaurant Ferozepur Road",
    "family restaurant Lahore",
    "Golden Fork",
    "Lala Shinwari",
    "high tea Lahore",
    "dinner buffet Lahore",
    "wedding venue Lahore",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.name,
    title,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${marcellus.variable} ${cormorant.variable} ${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col pb-16 md:pb-0">
        {/* Reveal targets start hidden (see globals.css); show them if JS is disabled. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important}`}</style>
        </noscript>
        <JsonLd />
        <CartProvider>
          <Header />
          <RevealScope>
            <main className="flex-1">{children}</main>
          </RevealScope>
          <Footer />
          <CartButton />
          <CartDrawer />
          <FloatingWhatsApp />
          <MobileActionBar />
        </CartProvider>
      </body>
    </html>
  );
}
