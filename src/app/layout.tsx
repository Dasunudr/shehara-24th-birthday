import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Happy 24th Birthday | A Celebration of You`,
  description: `A cinematic and interactive 24th birthday memory book dedicated to ${siteConfig.herName}.`,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${caveat.variable} font-sans bg-night-900 text-champagne-50 antialiased selection:bg-roseGold-400 selection:text-white min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
