import type { Metadata } from "next";
import {
  Inter,
  EB_Garamond,
  Cormorant_SC,
  Tiro_Devanagari_Sanskrit,
} from "next/font/google";

import "@/app/globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import {
  CommandPaletteProvider,
} from "@/components/search/command-palette-context";
import { CommandPalette } from "@/components/search/CommandPalette";
import { DomainBottomBar, DomainRail } from "@/components/nav/DomainRail";
import { DevanagariProvider } from "@/components/devanagari-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorantSc = Cormorant_SC({
  subsets: ["latin"],
  variable: "--font-cormorant-sc",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const tiroDevanagari = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari", "latin"],
  variable: "--font-tiro-devanagari",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jyotish Reference",
  description:
    "A reference for Vedic astrology — the nine grahas, twelve rashis, and twenty-seven nakshatras.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ebGaramond.variable} ${cormorantSc.variable} ${tiroDevanagari.variable} font-sans antialiased`}
      >
        <DevanagariProvider>
          <CommandPaletteProvider>
            <TooltipProvider delayDuration={200}>
              <DomainRail />
              <main className="container mx-auto min-h-[calc(100vh-12rem)] px-6 pb-32 pt-6 md:pt-8">
                {children}
              </main>
              <DomainBottomBar />
              <CommandPalette />
            </TooltipProvider>
          </CommandPaletteProvider>
        </DevanagariProvider>
      </body>
    </html>
  );
}
