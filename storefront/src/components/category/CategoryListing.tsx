"use client";

import { useMemo, useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Checkbox from "@radix-ui/react-checkbox";
import { LayoutGrid, List, Check, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { formatMAD, cn } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

type SortKey = "popularity" | "price-asc" | "price-desc" | "newest";
type ConditionKey = "all" | "neuf" | "reconditionne";

const PAGE_SIZE = 12;
/** Above this many distinct brands the sidebar gets its own brand search box. */
const BRAND_SEARCH_THRESHOLD = 12;

const CONDITION_LABELS: Record<ConditionKey, string> = {
  all: "Tous",
  neuf: "Neuf",
  reconditionne: "Reconditionné",
};

/**
 * Windowed pager: 1 … current-1 current current+1 … last.
 * Returns page numbers interleaved with "gap" markers.
 */
function buildPageWindow(current: number, total: number): (number | "gap")[] {
  const wanted = [1, current - 1, current, current + 1, total].filter(
    (p, i, arr) => p >= 1 && p <= total && arr.indexOf(p) === i
  );
  wanted.sort((a, b) => a - b);

  const out: (number | "gap")[] = [];
  let previous = 0;
  for (const page of wanted) {
    if (previous && page - previous > 1) out.push("gap");
    out.push(page);
    previous = page;
  }
  return out;
}

export default function CategoryListing({ products }: { products: Product[] }) {
  const maxPrice = useMemo(
    () => products.reduce((max, p) => (p.price > max ? p.price : max), 1000),
    [products]
  );
  const sliderMax = Math.ceil(maxPrice);
  const allBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort((a, b) => a.localeCompare(b, "fr")),
    [products]
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, sliderMax]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandQuery, setBrandQuery] = useState("");
  const [condition, setCondition] = useState<ConditionKey>("all");
  const [sort, setSort] = useState<SortKey>("popularity");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Adjust state during render (not in an effect — `react-hooks/set-state-in-effect`
  // forbids that) so navigating between categories re-seeds the price slider and
  // drops filters that referenced the previous category's brands.
  const [prevMaxPrice, setPrevMaxPrice] = useState(maxPrice);
  if (prevMaxPrice !== maxPrice) {
    setPrevMaxPrice(maxPrice);
    setPriceRange([0, sliderMax]);
    setSelectedBrands([]);
    setBrandQuery("");
    setInStockOnly(false);
    setCondition("all");
    setPage(1);
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (inStockOnly) list = list.filter((p) => p.stock === "instock");
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (condition !== "all") list = list.filter((p) => p.condition === condition);

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        list = [...list].sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
    return list;
  }, [products, priceRange, inStockOnly, selectedBrands, condition, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const visibleBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    if (!q) return allBrands;
    return allBrands.filter((b) => b.toLowerCase().includes(q));
  }, [allBrands, brandQuery]);

  const priceTouched = priceRange[0] > 0 || priceRange[1] < sliderMax;
  const activeFilterCount =
    (priceTouched ? 1 : 0) + (inStockOnly ? 1 : 0) + (condition !== "all" ? 1 : 0) + selectedBrands.length;

  function toggleBrand(brand: string) {
    setPage(1);
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  }

  function clearFilters() {
    setPriceRange([0, sliderMax]);
    setInStockOnly(false);
    setSelectedBrands([]);
    setBrandQuery("");
    setCondition("all");
    setPage(1);
  }

  function goToPage(next: number) {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold uppercase text-brand-navy">
            Filtres
            {activeFilterCount > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </h2>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-brand">
              <X className="h-3.5 w-3.5" /> Effacer les filtres
            </Button>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase text-brand-navy">Prix</h3>
          <Slider.Root
            className="relative flex h-5 w-full touch-none items-center"
            min={0}
            max={sliderMax}
            step={10}
            value={priceRange}
            onValueChange={(v) => {
              setPage(1);
              setPriceRange([v[0], v[1]]);
            }}
          >
            <Slider.Track className="relative h-1 grow rounded-full bg-brand-border">
              <Slider.Range className="absolute h-full rounded-full bg-brand" />
            </Slider.Track>
            <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-brand bg-white" aria-label="Prix minimum" />
            <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-brand bg-white" aria-label="Prix maximum" />
          </Slider.Root>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>{formatMAD(priceRange[0])}</span>
            <span>{formatMAD(priceRange[1])}</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase text-brand-navy">Disponibilité</h3>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <Checkbox.Root
              checked={inStockOnly}
              onCheckedChange={(v) => {
                setPage(1);
                setInStockOnly(!!v);
              }}
              className="flex h-4 w-4 items-center justify-center rounded border border-brand-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
            >
              <Checkbox.Indicator><Check className="h-3 w-3 text-white" /></Checkbox.Indicator>
            </Checkbox.Root>
            En stock uniquement
          </label>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase text-brand-navy">État</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {(["all", "neuf", "reconditionne"] as const).map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="condition"
                  checked={condition === c}
                  onChange={() => {
                    setPage(1);
                    setCondition(c);
                  }}
                  className="accent-[--brand-primary]"
                />
                {CONDITION_LABELS[c]}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase text-brand-navy">Marques</h3>
          {allBrands.length > BRAND_SEARCH_THRESHOLD && (
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={brandQuery}
                onChange={(e) => setBrandQuery(e.target.value)}
                placeholder="Rechercher une marque"
                aria-label="Rechercher une marque"
                className="w-full rounded-md border border-brand-border py-1.5 pl-8 pr-2 text-sm outline-none focus:border-brand"
              />
            </div>
          )}
          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto text-sm text-gray-700">
            {visibleBrands.length === 0 ? (
              <p className="text-xs text-gray-500">Aucune marque ne correspond.</p>
            ) : (
              visibleBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2">
                  <Checkbox.Root
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-brand-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                  >
                    <Checkbox.Indicator><Check className="h-3 w-3 text-white" /></Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="truncate">{brand}</span>
                </label>
              ))
            )}
          </div>
        </div>
      </aside>

      <div ref={resultsRef} className="scroll-mt-24">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-brand-border pb-4">
          <span className="text-sm text-gray-500">
            {filtered.length} résultat(s)
            {activeFilterCount > 0 && ` · ${activeFilterCount} filtre(s) actif(s)`}
          </span>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value as SortKey);
              }}
              aria-label="Trier les produits"
              className="rounded-md border border-brand-border px-3 py-1.5 text-sm"
            >
              <option value="popularity">Popularité</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="newest">Nouveautés</option>
            </select>
            <div className="flex overflow-hidden rounded-md border border-brand-border">
              <button
                type="button"
                aria-label="Vue grille"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
                className={cn("flex h-8 w-8 items-center justify-center", view === "grid" ? "bg-brand text-white" : "bg-white text-brand-navy")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Vue liste"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
                className={cn("flex h-8 w-8 items-center justify-center", view === "list" ? "bg-brand text-white" : "bg-white text-brand-navy")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">Aucun produit ne correspond aux filtres sélectionnés.</p>
            {activeFilterCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
                Effacer les filtres
              </Button>
            )}
          </div>
        ) : (
          <div className={cn("grid gap-4", view === "grid" ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} listView={view === "list"} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Page précédente"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="flex h-9 items-center gap-1 rounded-md border border-brand-border px-3 text-sm font-medium text-brand-navy hover:border-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-brand-border"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            {buildPageWindow(currentPage, totalPages).map((entry, i) =>
              entry === "gap" ? (
                <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-sm text-gray-400">
                  …
                </span>
              ) : (
                <button
                  key={entry}
                  type="button"
                  aria-label={`Page ${entry}`}
                  aria-current={entry === currentPage ? "page" : undefined}
                  onClick={() => goToPage(entry)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium",
                    entry === currentPage
                      ? "border-brand bg-brand text-white"
                      : "border-brand-border text-brand-navy hover:border-brand"
                  )}
                >
                  {entry}
                </button>
              )
            )}

            <button
              type="button"
              aria-label="Page suivante"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="flex h-9 items-center gap-1 rounded-md border border-brand-border px-3 text-sm font-medium text-brand-navy hover:border-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-brand-border"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
