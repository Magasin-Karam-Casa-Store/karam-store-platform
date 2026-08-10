"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/product/ProductCard";
import SectionTitle from "@/components/ui/section-title";
import type { Product } from "@/types";

const LIMIT = 10;

/** Newest in-stock products, newest first. */
const recent = [...products]
  .filter((p) => p.stock === "instock")
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const tabs = [
  { path: "all", name: "Tous", items: recent.slice(0, LIMIT) },
  ...categories.map((cat) => ({
    path: cat.path,
    name: cat.name,
    items: recent.filter((p) => p.categoryPath.startsWith(`${cat.path}/`) || p.categoryPath === cat.path).slice(0, LIMIT),
  })),
].filter((tab) => tab.items.length > 0);

export default function NewArrivalsTabs() {
  return (
    <section className="container-app py-16 lg:py-20">
      <Tabs.Root defaultValue={tabs[0].path}>
        <SectionTitle
          eyebrow="Fraîchement arrivé"
          title="Nouvel arrivage"
          description="Les dernières références ajoutées au catalogue."
        >
          {/* Pill tab bar, scrollable on narrow screens. */}
          <Tabs.List className="-mx-1 flex max-w-full gap-1.5 overflow-x-auto px-1 pb-1">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.path}
                value={tab.path}
                className="shrink-0 whitespace-nowrap rounded-full border border-brand-border px-4 py-2 text-xs font-semibold text-body transition-colors hover:border-brand hover:text-brand data-[state=active]:border-brand-navy data-[state=active]:bg-brand-navy data-[state=active]:text-white"
              >
                {tab.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </SectionTitle>

        {tabs.map((tab) => (
          <Tabs.Content key={tab.path} value={tab.path}>
            <Grid items={tab.items} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  );
}

function Grid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
