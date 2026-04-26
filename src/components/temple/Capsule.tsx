import * as React from "react";

import { cn } from "@/lib/utils";

export type CapsuleTone =
  | "default"
  | "brass"
  | "maroon"
  | "indigo"
  | "leaf"
  | "turmeric"
  | "vermilion";

interface CapsuleProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: CapsuleTone;
  children: React.ReactNode;
}

const TONE_CLASS: Record<CapsuleTone, string> = {
  default: "",
  brass: "capsule-brass",
  maroon: "capsule-maroon",
  indigo: "capsule-indigo",
  leaf: "capsule-leaf",
  turmeric: "capsule-turmeric",
  vermilion: "capsule-vermilion",
};

/**
 * Pill-shaped tag used in card chip rows (e.g. Element / Modality / Gana).
 * Tone determines border + tinted background per the temple palette.
 */
export function Capsule({ tone = "default", className, children, ...props }: CapsuleProps) {
  return (
    <span className={cn("capsule", TONE_CLASS[tone], className)} {...props}>
      {children}
    </span>
  );
}
