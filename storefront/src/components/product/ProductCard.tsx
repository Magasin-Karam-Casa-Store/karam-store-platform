"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star, Check } from "lucide-react";
import type { Product } from "@/types";
import { formatMAD, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import QuickViewModal from "@/components/product/QuickViewModal";

export default function ProductCard({ product, listView = false }: { product: Product; listView?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.ids.includes(product.id));
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const outOfStock = product.stock === "outofstock";
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  function handleAdd() {
    addItem(product);
    // Brief confirmation state; the drawer opening is the primary feedback.
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-xl border border-brand-border bg-surface transition-all duration-300",
          "hover:-translate-y-1 hover:border-brand/30 hover:shadow-[var(--shadow-lg)]",
          listView && "sm:flex-row"
        )}
      >
        <div className={cn("relative shrink-0 overflow-hidden bg-white", listView ? "sm:w-56" : "")}>
          <Link href={`/produit/${product.slug}`} className="relative block aspect-square w-full">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.07]"
            />
          </Link>

          {/* Status badges */}
          <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {discount && (
              <span className="rounded-md bg-brand-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                -{discount}%
              </span>
            )}
            {product.isNew && !discount && (
              <span className="rounded-md bg-brand px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                Nouveau
              </span>
            )}
            {outOfStock && (
              <span className="rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted shadow-sm backdrop-blur">
                Rupture
              </span>
            )}
          </div>

          {/* Hover actions — slide in from the right */}
          <div className="absolute right-3 top-3 flex translate-x-2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 focus-within:translate-x-0 focus-within:opacity-100">
            <button
              type="button"
              aria-label={isWished ? "Retirer des favoris" : "Ajouter aux favoris"}
              aria-pressed={isWished}
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[var(--shadow-md)] transition-colors",
                isWished ? "text-brand-accent" : "text-heading hover:bg-brand hover:text-white"
              )}
            >
              <Heart className="h-4 w-4" fill={isWished ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              aria-label="Aperçu rapide"
              onClick={() => setQuickViewOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-heading shadow-[var(--shadow-md)] transition-colors hover:bg-brand hover:text-white"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <Link
            href={`/product-category/${product.categoryPath}`}
            className="text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors hover:text-brand"
          >
            {product.categoryName}
          </Link>

          <Link
            href={`/produit/${product.slug}`}
            className="line-clamp-2 min-h-[2.6rem] font-product text-sm font-medium leading-snug text-heading transition-colors hover:text-brand"
          >
            {product.title}
          </Link>

          {product.reviewsCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3"
                    fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-[11px] text-muted">({product.reviewsCount})</span>
            </div>
          )}

          {listView && <p className="line-clamp-2 text-sm text-body">{product.shortDescription}</p>}

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div className="flex flex-col">
              {product.oldPrice && (
                <span className="text-xs text-muted line-through">{formatMAD(product.oldPrice)}</span>
              )}
              <span className="font-heading text-lg font-extrabold text-heading">
                {formatMAD(product.price)}
              </span>
            </div>

            <button
              type="button"
              disabled={outOfStock}
              onClick={handleAdd}
              aria-label={`Ajouter ${product.title} au panier`}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                outOfStock
                  ? "cursor-not-allowed bg-surface-sunken text-muted"
                  : justAdded
                    ? "bg-emerald-500 text-white"
                    : "bg-brand-navy text-white hover:bg-brand hover:shadow-[var(--shadow-brand)]"
              )}
            >
              {justAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </article>

      {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
