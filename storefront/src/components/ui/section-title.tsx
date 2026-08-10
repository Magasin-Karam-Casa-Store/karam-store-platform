import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Section heading with an optional eyebrow, description and "see all" link.
 * Replaces the underline-bar treatment of the reference site with a lighter,
 * more editorial hierarchy.
 */
export default function SectionTitle({
  title,
  eyebrow,
  description,
  href,
  hrefLabel = "Voir tout",
  align = "left",
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", centered && "text-center")}>
        {eyebrow && (
          <span
            className={cn(
              "mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand",
              centered && "justify-center"
            )}
          >
            <span className="h-px w-6 bg-brand" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 className="font-heading text-2xl font-extrabold text-heading sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-sm text-body sm:text-base">{description}</p>}
      </div>

      {(children || href) && (
        <div className="flex shrink-0 items-center gap-5">
          {children}
          {href && (
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              {hrefLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
