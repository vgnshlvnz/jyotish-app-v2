import { cn } from "@/lib/utils";

interface SanskritProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * Wraps Sanskrit (or other IAST-Latin) text with the proper lang tag and
 * the display serif. Use for any Sanskrit-origin label that should read as
 * a proper noun, not an English word.
 */
export function Sanskrit({ children, className, ...props }: SanskritProps) {
  return (
    <span lang="sa-Latn" className={cn("font-display", className)} {...props}>
      {children}
    </span>
  );
}
