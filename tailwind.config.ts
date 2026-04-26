import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-eb-garamond)", "ui-serif", "Georgia"],
        ui: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-eb-garamond)", "ui-serif", "Georgia"],
        titling: ["var(--font-cormorant-sc)", "ui-serif", "Georgia"],
        deva: ["var(--font-tiro-devanagari)", "var(--font-eb-garamond)", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Bridge: cosmos-* aliased to temple values via globals.css vars.
        cosmos: {
          midnight: "hsl(var(--cosmos-midnight))",
          surface: "hsl(var(--cosmos-surface))",
          line: "hsl(var(--cosmos-line))",
          indigo: "hsl(var(--cosmos-indigo))",
          gold: "hsl(var(--cosmos-gold))",
          rose: "hsl(var(--cosmos-rose))",
        },
        // Temple-at-night palette — direct hex tokens (no HSL wrapping).
        ink:   { DEFAULT: "var(--ink)", 2: "var(--ink-2)", 3: "var(--ink-3)", 4: "var(--ink-4)" },
        bone:  { DEFAULT: "var(--bone)", 2: "var(--bone-2)", 3: "var(--bone-3)", 4: "var(--bone-4)" },
        brass: { DEFAULT: "var(--brass)", hi: "var(--brass-hi)", lo: "var(--brass-lo)" },
        saffron: "var(--saffron)",
        vermilion: { DEFAULT: "var(--vermilion)", 2: "var(--vermilion-2)" },
        maroon: "var(--maroon)",
        turmeric: "var(--turmeric)",
        indigocloth: { DEFAULT: "var(--indigo)", 2: "var(--indigo-2)" },
        leaf: "var(--leaf)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
