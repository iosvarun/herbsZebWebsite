import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HerbsZen | Premium Ayurvedic Health & Wellness",
  description: "HERBSZEN PRIVATE LIMITED - Nature’s Wisdom, Modern Wellness. Standardized Ayurvedic extracts for Pain Relief, Kidney Health, Hair Care, and Daily Nutrition.",
  metadataBase: new URL("https://herbszen.com"),
  openGraph: {
    title: "HerbsZen | Premium Ayurvedic Health & Wellness",
    description: "Nature's Wisdom, Modern Wellness. Standardized Ayurvedic solutions for Pain Relief, Kidney Health, Hair Care, and Daily Nutrition.",
    type: "website",
    locale: "en_IN",
    siteName: "HerbsZen",
  },
  twitter: {
    card: "summary_large_image",
    title: "HerbsZen | Premium Ayurvedic Health & Wellness",
    description: "Standardized Ayurvedic solutions for Pain Relief, Kidney Health, Hair Care, and Daily Nutrition.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
