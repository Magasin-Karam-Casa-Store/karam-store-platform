"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import * as Icons from "lucide-react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import type { Category } from "@/types";

function CategoryIcon({ category, className = "h-5 w-5" }: { category: Category; className?: string }) {
  if (category.image) {
    return <Image src={category.image} alt="" width={20} height={20} className={`${className} shrink-0 object-contain`} />;
  }
  const Icon =
    (category.icon && (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon]) || Icons.Package;
  return <Icon className={`${className} shrink-0`} />;
}

/** Mega-menu panel listing a category's children and grandchildren. */
function MegaPanel({ category }: { category: Category }) {
  const columns = category.children ?? [];
  if (columns.length === 0) return null;

  return (
    <div className="absolute left-0 top-full z-40 w-[min(920px,90vw)] rounded-b-lg border border-brand-border border-t-0 bg-white p-6 shadow-2xl">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
        {columns.map((sub) => (
          <div key={sub.path}>
            <Link
              href={`/product-category/${sub.path}`}
              className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy transition-colors hover:text-brand"
            >
              <CategoryIcon category={sub} className="h-5 w-5" />
              {sub.name}
            </Link>
            <ul className="flex flex-col gap-1.5 border-l border-brand-border pl-3">
              {(sub.children ?? []).map((leaf) => (
                <li key={leaf.path}>
                  <Link
                    href={`/product-category/${leaf.path}`}
                    className="text-xs text-gray-500 transition-colors hover:text-brand"
                  >
                    {leaf.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        href={`/product-category/${category.path}`}
        className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand hover:gap-2 transition-all"
      >
        Voir tout {category.name} <ChevronRight className="h-3.5 w-3.5" />
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
              <div className="flex-1 p-6">
                {categories
                  .filter((cat) => cat.path === hoveredInAll)
                  .map((cat) => (
                    <div key={cat.path} className="grid grid-cols-3 gap-x-6 gap-y-5">
                      {(cat.children ?? []).map((sub) => (
                        <div key={sub.path}>
                          <Link
                            href={`/product-category/${sub.path}`}
                            className="mb-1.5 flex items-center gap-2 text-sm font-bold hover:text-brand"
                          >
                            <CategoryIcon category={sub} />
                            {sub.name}
                          </Link>
                          <ul className="flex flex-col gap-1">
                            {(sub.children ?? []).map((leaf) => (
                              <li key={leaf.path}>
                                <Link
                                  href={`/product-category/${leaf.path}`}
                                  className="text-xs text-gray-500 hover:text-brand"
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
