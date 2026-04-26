"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className="gap-1.5"
    >
      <Printer className="size-3.5" />
      Print
    </Button>
  );
}
