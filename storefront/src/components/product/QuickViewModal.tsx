"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatMAD } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";

export default function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="sr-only">{product.title}</Dialog.Title>
          <Dialog.Close asChild>
            <button aria-label="Fermer" className="absolute right-4 top-4 rounded-full p-1 hover:bg-brand-gray">
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-md border border-brand-border bg-white">
              <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 640px) 90vw, 40vw" className="object-contain p-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase text-brand">{product.brand}</span>
              <h2 className="text-lg font-semibold text-brand-navy">{product.title}</h2>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
                <span className="ml-1 text-xs text-gray-500">({product.reviewsCount} avis)</span>
              </div>
              <span className="text-2xl font-bold text-brand-navy">{formatMAD(product.price)}</span>
              <p className="line-clamp-4 text-sm text-gray-600">{product.description}</p>
              <div className="mt-2 flex gap-2">
                <Button
                  disabled={product.stock === "outofstock"}
                  onClick={() => {
                    addItem(product);
                    onClose();
                  }}
                >
                  <ShoppingCart className="h-4 w-4" /> Ajouter au panier
                </Button>
                <Link href={`/produit/${product.slug}`}>
                  <Button variant="outline">Voir le produit</Button>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
