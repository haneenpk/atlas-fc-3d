import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: `${BRAND.name} (${BRAND.nickname}), a fan-owned football club from ${BRAND.city}. Fixtures, squad, season stats, tickets and membership.`,
  metadataBase: new URL("https://atlasfc.com"),
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: `Fixtures, squad and membership for ${BRAND.name}, est. ${BRAND.founded}.`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F1F0EA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="grain">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
