"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatMAD, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import QuickViewModal from "@/components/product/QuickViewModal";

export default function ProductCard({ product, listView = false }: { product: Product; listView?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.ids.includes(product.id));
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const outOfStock = product.stock === "outofstock";
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-xl border border-brand-border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg",
          listView && "sm:flex-row"
        )}
      >
        <Link
          href={`/produit/${product.slug}`}
          className={cn(
            "relative block aspect-square w-full shrink-0 overflow-hidden bg-white",
            listView && "sm:w-56"
          )}
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && <Badge variant="new">Nouveau</Badge>}
            {discount && <Badge variant="sale">-{discount}%</Badge>}
            {outOfStock && <Badge variant="outofstock">Rupture</Badge>}
          </div>
          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
            <button
              type="button"
              aria-label="Ajouter aux favoris"
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-brand hover:text-white",
                isWished && "bg-brand text-white"
              )}
            >
              <Heart className="h-4 w-4" fill={isWished ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              aria-label="Aperçu rapide"
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-brand hover:text-white"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-1.5 border-t border-brand-border p-4 sm:border-t-0">
          <Link
            href={`/produit/${product.slug}`}
            className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-brand-navy transition-colors hover:text-brand"
          >
            {product.title}
          </Link>

          <Link
            href={`/product-category/${product.categoryPath}`}
            className="text-xs text-gray-400 transition-colors hover:text-brand"
          >
            {product.categoryName}
          </Link>

          {product.reviewsCount > 0 && (
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
              ))}
              <span className="ml-1 text-xs text-gray-400">({product.reviewsCount})</span>
            </div>
          )}

          <div className="mt-auto flex items-baseline gap-2 pt-1">
            <span className="text-base font-bold text-brand">{formatMAD(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">{formatMAD(product.oldPrice)}</span>
            )}
          </div>

          {listView && <p className="line-clamp-2 text-sm text-gray-500">{product.shortDescription}</p>}

          <button
            type="button"
            disabled={outOfStock}
            onClick={() => addItem(product)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-navy py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <ShoppingCart className="h-4 w-4" />
            {outOfStock ? "Rupture de stock" : "Ajouter au panier"}
          </button>
        </div>
      </div>
      {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
