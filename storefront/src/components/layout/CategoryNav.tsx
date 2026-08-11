"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { Category } from "@/types";
import { navPromos, defaultPromo } from "@/data/nav-promos";

/**
 * Counts what we actually carry. `category.productCount` comes from the live
 * taxonomy and is much larger than our catalogue, so it would overstate stock.
 */
function countInCatalogue(path: string): number {
  return products.filter((p) => p.categoryPath === path || p.categoryPath.startsWith(`${path}/`))
    .length;
}

/**
 * Drops the legacy duplicates the live taxonomy carries (for example
 * "Composants de pc" alongside "Composants PC"), keeping the entry with the
 * most children.
 */
function dedupe(nodes: Category[]): Category[] {
  // Strip accents, punctuation AND French particles, so "Composants de pc" and
  // "Composants PC" collapse to the same key.
  const normalise = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/\b(de|du|des|la|le|les|et|d|l|a|au|aux|en|pour)\b/g, "")
      .replace(/[^a-z0-9]/g, "");

  const best = new Map<string, Category>();
  for (const node of nodes) {
    const key = normalise(node.name);
    const current = best.get(key);
    if (!current || (node.children?.length ?? 0) > (current.children?.length ?? 0)) {
      best.set(key, node);
    }
  }
  return [...best.values()];
}

/** One row: category name on the left, catalogue count on the right. */
function MenuRow({ node }: { node: Category }) {
  return (
    <li>
      <Link
        href={`/product-category/${node.path}`}
        className="group/row flex items-center justify-between gap-4 py-[7px] text-[14px] text-heading transition-colors hover:text-brand"
      >
        <span>{node.name}</span>
        <span className="shrink-0 text-[12px] tabular-nums text-muted transition-colors group-hover/row:text-brand">
          {countInCatalogue(node.path)}
        </span>
      </Link>
    </li>
  );
}

/** Mega-menu panel: category columns on the left, a promo tile on the right. */
function MegaPanel({ category }: { category: Category }) {
  const subs = dedupe(category.children ?? []);
  if (subs.length === 0) return null;

  // A sub-category with no children of its own would otherwise render as a
  // heading over an empty list. Those become plain rows instead, chunked so a
  // long tail (Image et Sonorisation has 11) fills several columns rather than
  // one very long one.
  const grouped = subs.filter((s) => dedupe(s.children ?? []).length > 0);
  const loose = subs.filter((s) => dedupe(s.children ?? []).length === 0);

  // Two rows of four at most. Informatique has 13 sub-trees; rendering them all
  // pushed the panel past the fold, so the overflow is left to the promo tile's
  // "see everything" link.
  const COLUMNS = 4;
  const MAX_SLOTS = COLUMNS * 2;
  const ROWS_PER_COLUMN = 5;

  const slots: { label: string | null; nodes: Category[] }[] = grouped.map((sub) => ({
    label: sub.name,
    nodes: dedupe(sub.children ?? []).slice(0, ROWS_PER_COLUMN),
  }));

  if (loose.length > 0) {
    const remaining = Math.max(1, COLUMNS - slots.length);
    const perColumn = Math.max(ROWS_PER_COLUMN, Math.ceil(loose.length / remaining));
    for (let i = 0; i < loose.length; i += perColumn) {
      slots.push({ label: i === 0 ? category.name : null, nodes: loose.slice(i, i + perColumn) });
    }
  }

  const visibleSlots = slots.slice(0, MAX_SLOTS);

  const promo = navPromos[category.path] ?? defaultPromo;

  return (
    // Full-bleed panel with a fixed min height, so every category opens the
    // same size instead of the box resizing per entry.
    <div className="absolute inset-x-0 top-full z-40 border-t border-brand-border bg-white shadow-[var(--shadow-lg)]">
      <div className="container-app flex max-h-[min(560px,calc(100vh-220px))] min-h-[320px] gap-10 overflow-y-auto py-8">
        <div className="grid flex-1 grid-cols-2 content-start gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {visibleSlots.map((slot, index) => (
            <div key={slot.nodes[0]?.path ?? index}>
              {/* Continuation columns keep the label slot for alignment but
                  hide the text, so rows line up across the grid. */}
              <span
                className={`mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-brand ${
                  slot.label ? "" : "opacity-0"
                }`}
                aria-hidden={!slot.label}
              >
                {slot.label ?? category.name}
              </span>
              <ul className="flex flex-col">
                {slot.nodes.map((node) => (
                  <MenuRow key={node.path} node={node} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Promo tile — doubles as the "see everything" entry point. */}
        <Link
          href={`/product-category/${category.path}`}
          className="group hidden w-64 shrink-0 flex-col justify-end rounded-2xl p-7 text-white lg:flex"
          style={{ background: promo.gradient }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Sélection {category.name}
          </span>
          <p className="mt-2.5 font-heading text-[22px] font-extrabold leading-[1.2]">{promo.title}</p>
          <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold transition-all group-hover:gap-3">
            Découvrir <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function CategoryNav() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav className="relative hidden bg-brand text-white shadow-sm lg:block">
      <div className="container-app flex items-center">
        {/* Top-level categories with per-category mega menus. */}
        <ul className="flex flex-1 items-center">
          {categories.map((cat) => (
            <li
              key={cat.path}
              onMouseEnter={() => setActive(cat.path)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={`/product-category/${cat.path}`}
                className={`flex items-center gap-1 px-3 py-3.5 text-[13px] font-semibold uppercase tracking-tight transition-colors xl:px-4 ${
                  active === cat.path ? "bg-brand-dark" : "hover:bg-brand-dark"
                }`}
              >
                {cat.name}
                {cat.children && <ChevronDown className="h-3 w-3 opacity-70" />}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Anchored to the nav itself, so the panel spans the full viewport
          width rather than being clipped to the container. */}
      {active && (
        <div onMouseEnter={() => setActive(active)} onMouseLeave={() => setActive(null)}>
          {categories
            .filter((cat) => cat.path === active && cat.children?.length)
            .map((cat) => (
              <MegaPanel key={cat.path} category={cat} />
            ))}
        </div>
      )}
    </nav>
  );
}
