import { cn } from "@/lib/utils";

/**
 * Section heading with the Karamtech blue underline accent, optionally with
 * inline controls (tabs, carousel arrows) rendered to the right of the title.
 */
export default function SectionTitle({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end gap-x-8 gap-y-3 border-b border-brand-border", className)}>
      <h2 className="relative -mb-px shrink-0 border-b-2 border-brand pb-3 text-lg font-extrabold uppercase tracking-tight text-brand-navy sm:text-xl">
        {title}
      </h2>
      {children && <div className="flex flex-1 flex-wrap items-center gap-4 pb-3">{children}</div>}
    </div>
  );
}
