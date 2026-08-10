"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Heart, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatMAD, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export default function AddToCartBox({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.ids.includes(product.id));
  const outOfStock = product.stock === "outofstock";

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-medium uppercase tracking-wide text-brand">{product.brand}</span>
      <h1 className="text-2xl font-bold text-brand-navy sm:text-3xl">{product.title}</h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4" fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-sm text-gray-500">{product.reviewsCount} avis</span>
        <span className="text-sm text-gray-300">|</span>
        <span className="text-sm text-gray-500">SKU: {product.sku}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-brand-navy">{formatMAD(product.price)}</span>
        {product.oldPrice && <span className="text-lg text-gray-400 line-through">{formatMAD(product.oldPrice)}</span>}
      </div>

      <div className="flex items-center gap-2">
        <Badge variant={outOfStock ? "outofstock" : "instock"}>
          {outOfStock ? "Rupture de stock" : "En stock"}
        </Badge>
        <Badge>{product.condition === "reconditionne" ? "Reconditionné" : "Neuf"}</Badge>
      </div>

      <p className="text-sm leading-relaxed text-gray-600">{product.shortDescription}</p>

      <div className="flex flex-wrap items-center gap-3 border-t border-brand-border pt-4">
        <div className="flex items-center rounded-md border border-brand-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center hover:bg-brand-gray"
            aria-label="Diminuer la quantité"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center hover:bg-brand-gray"
            aria-label="Augmenter la quantité"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Button size="lg" disabled={outOfStock} onClick={() => addItem(product, quantity)} className="flex-1 sm:flex-none">
          <ShoppingCart className="h-4 w-4" /> Ajouter au panier
        </Button>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Ajouter aux favoris"
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-md border border-brand-border hover:border-brand hover:text-brand",
            isWished && "border-brand bg-brand text-white"
          )}
        >
          <Heart className="h-5 w-5" fill={isWished ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
        <span>
          Catégorie:{" "}
          <Link href={`/product-category/${product.categoryPath}`} className="font-medium text-brand hover:underline">
            {product.categoryName}
          </Link>
        </span>
      </div>
    </div>
  );
}
