import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'ariane" className="border-b border-brand-border bg-brand-gray">
      <div className="container-app flex items-center gap-2 py-3 text-xs text-gray-500">
        <Link href="/" className="flex items-center gap-1 hover:text-brand"><Home className="h-3.5 w-3.5" /> Accueil</Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand">{item.label}</Link>
            ) : (
              <span className="font-medium text-brand-navy">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
