import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";

import "@/app/globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import {
  CommandPaletteProvider,
} from "@/components/search/command-palette-context";
import { CommandPalette } from "@/components/search/CommandPalette";
import { DomainBottomBar, DomainRail } from "@/components/nav/DomainRail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}
      >
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
      </body>
    </html>
  );
}
