"use client";

import * as React from "react";

interface CommandPaletteContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(
  null,
);

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = React.useState(false);

  // Cmd/Ctrl+K and Esc handled at the provider level so they work everywhere.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = React.useMemo<CommandPaletteContextValue>(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      isOpen,
      setOpen,
    }),
    [isOpen],
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      "useCommandPalette must be called inside <CommandPaletteProvider>",
    );
  }
  return ctx;
}
