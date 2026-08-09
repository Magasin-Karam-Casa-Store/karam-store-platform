import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "new" | "sale" | "outofstock" | "instock";
  className?: string;
}) {
  const styles: Record<string, string> = {
    default: "bg-brand-gray text-brand-navy",
    new: "bg-brand-accent text-white",
    sale: "bg-red-600 text-white",
    outofstock: "bg-gray-200 text-gray-600",
    instock: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
