import { Sanskrit } from "@/components/Sanskrit";

interface IndexHeaderProps {
  number: 1 | 2 | 3;
  title: string;
  sanskritTitle: string;
  count: number;
  description: string;
}

/**
 * Big-number page header used at the top of each index route, mirroring the
 * rail's tile styling at a larger scale.
 */
export function IndexHeader({
  number,
  title,
  sanskritTitle,
  count,
  description,
}: IndexHeaderProps) {
  return (
    <header className="flex flex-col gap-3 pb-6 md:flex-row md:items-end md:gap-8 md:pb-10">
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden
          className="font-display text-7xl font-light leading-none tabular-nums text-foreground md:text-8xl"
        >
          {number}
        </span>
        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-light leading-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <Sanskrit className="text-sm not-italic text-muted-foreground">
            {sanskritTitle} · {count}
          </Sanskrit>
        </div>
      </div>
      <p className="max-w-xl text-sm text-muted-foreground md:ml-auto md:text-base md:text-right">
        {description}
      </p>
    </header>
  );
}
