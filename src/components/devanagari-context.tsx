"use client";

import * as React from "react";

const STORAGE_KEY = "jyotish:show-devanagari";

interface DevanagariContextValue {
  showDevanagari: boolean;
  setShowDevanagari: (v: boolean) => void;
  toggle: () => void;
}

const DevanagariContext = React.createContext<DevanagariContextValue | null>(null);

/**
 * Tracks the user's Devanāgarī display preference. Persisted to localStorage.
 * Default ON. The provider also adds/removes a `no-deva` class on the
 * document body so the global `.no-deva .deva-only { display: none }` rule
 * in globals.css can hide marked nodes without per-component plumbing.
 */
export function DevanagariProvider({ children }: { children: React.ReactNode }) {
  const [showDevanagari, setShow] = React.useState<boolean>(true);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "false") setShow(false);
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, showDevanagari ? "true" : "false");
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.body.classList.toggle("no-deva", !showDevanagari);
    }
  }, [showDevanagari]);

  const value = React.useMemo<DevanagariContextValue>(
    () => ({
      showDevanagari,
      setShowDevanagari: setShow,
      toggle: () => setShow((v) => !v),
    }),
    [showDevanagari],
  );

  return (
    <DevanagariContext.Provider value={value}>{children}</DevanagariContext.Provider>
  );
}

export function useDevanagari(): DevanagariContextValue {
  const ctx = React.useContext(DevanagariContext);
  if (!ctx) {
    throw new Error("useDevanagari must be called inside <DevanagariProvider>");
  }
  return ctx;
}

/**
 * Wraps Devanāgarī text with the proper lang and font, marked with the
 * `deva-only` class so the global toggle hides it. Caller may pass
 * additional className for sizing/color.
 */
export function Deva({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag lang="sa" className={`deva deva-only ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
