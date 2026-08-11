"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
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
 * Only renders artwork the taxonomy actually provides. Falling back to a
 * generic package glyph made every column header look identical, so categories
 * without an image simply show none.
 */
function CategoryIcon({ category, className = "h-5 w-5" }: { category: Category; className?: string }) {
  if (!category.image) return null;
  return (
    <Image
      src={category.image}
      alt=""
      width={20}
      height={20}
      className={`${className} shrink-0 object-contain`}
    />
  );
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

/** Mega-menu panel: category columns on the left, a promo tile on the right. */
function MegaPanel({ category }: { category: Category }) {
  const columns = dedupe(category.children ?? []);
  if (columns.length === 0) return null;

  const promo = navPromos[category.path] ?? defaultPromo;

  return (
    <div className="absolute left-0 top-full z-40 flex max-h-[70vh] w-[min(1040px,92vw)] gap-7 overflow-hidden rounded-b-2xl border border-t-0 border-brand-border bg-white p-7 shadow-[var(--shadow-lg)]">
      <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-7 overflow-y-auto md:grid-cols-3">
        {columns.map((sub) => (
          <div key={sub.path}>
            <Link
              href={`/product-category/${sub.path}`}
              className="mb-2.5 flex items-center gap-2 font-heading text-[13px] font-bold text-heading transition-colors hover:text-brand"
            >
              <CategoryIcon category={sub} className="h-4 w-4" />
              {sub.name}
            </Link>
            <ul className="flex flex-col gap-1.5">
              {dedupe(sub.children ?? [])
                .slice(0, 6)
                .map((leaf) => (
                  <li key={leaf.path}>
                    <Link
                      href={`/product-category/${leaf.path}`}
                      className="text-[13px] text-soft transition-colors hover:text-brand"
                    >
                      {leaf.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Promo tile — doubles as the "see everything" entry point. */}
      <Link
        href={`/product-category/${category.path}`}
        className="group hidden w-56 shrink-0 flex-col justify-between rounded-2xl p-6 text-white lg:flex"
        style={{ background: promo.gradient }}
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
            {countInCatalogue(category.path)} références
          </span>
          <p className="mt-2 font-heading text-lg font-extrabold leading-snug">{promo.title}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm transition-all group-hover:gap-2.5 group-hover:bg-white group-hover:text-heading">
          Voir tout <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </div>
  );
}

export default function CategoryNav() {
  const [active, setActive] = useState<string | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [hoveredInAll, setHoveredInAll] = useState<string>(categories[0].path);

  return (
    <nav className="relative hidden bg-brand text-white shadow-sm lg:block">
      <div className="container-app flex items-center">
        {/* "All categories" flyout, mirroring the sidebar browse pattern. */}
        <div
          className="relative"
          onMouseEnter={() => setAllOpen(true)}
          onMouseLeave={() => setAllOpen(false)}
        >
          <button className="flex items-center gap-2 bg-brand-navy px-5 py-3.5 text-sm font-bold uppercase tracking-wide">
            <Menu className="h-4 w-4" /> Toutes les catégories
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {allOpen && (
            <div className="absolute left-0 top-full z-40 flex w-[min(1000px,90vw)] rounded-b-lg border border-brand-border border-t-0 bg-white text-brand-navy shadow-2xl">
              <ul className="w-64 shrink-0 border-r border-brand-border py-2">
                {categories.map((cat) => (
                  <li key={cat.path} onMouseEnter={() => setHoveredInAll(cat.path)}>
                    <Link
                      href={`/product-category/${cat.path}`}
                      className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                        hoveredInAll === cat.path ? "bg-brand/5 text-brand" : "hover:bg-brand-gray"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <CategoryIcon category={cat} />
                        {cat.name}
                      </span>
                      {cat.children && <ChevronRight className="h-3.5 w-3.5" />}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="max-h-[70vh] flex-1 overflow-y-auto p-7">
                {categories
                  .filter((cat) => cat.path === hoveredInAll)
                  .map((cat) => (
                    <div key={cat.path} className="grid grid-cols-3 gap-x-7 gap-y-6">
                      {dedupe(cat.children ?? []).map((sub) => (
                        <div key={sub.path}>
                          <Link
                            href={`/product-category/${sub.path}`}
                            className="mb-2 flex items-center gap-2 font-heading text-[13px] font-bold hover:text-brand"
                          >
                            <CategoryIcon category={sub} className="h-4 w-4" />
                            {sub.name}
                          </Link>
                          <ul className="flex flex-col gap-1.5">
                            {dedupe(sub.children ?? [])
                              .slice(0, 5)
                              .map((leaf) => (
                                <li key={leaf.path}>
                                  <Link
                                    href={`/product-category/${leaf.path}`}
                                    className="text-[13px] text-soft hover:text-brand"
                                  >
                                    {leaf.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

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

      {/* Panel lives outside the scrolling list so it can span the full width. */}
      {active && (
        <div
          className="container-app relative"
          onMouseEnter={() => setActive(active)}
          onMouseLeave={() => setActive(null)}
        >
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
