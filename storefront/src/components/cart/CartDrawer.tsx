"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatMAD } from "@/lib/utils";
import { STORE } from "@/lib/config";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal } = useCartStore();

  return (
    <Dialog.Root open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-brand-border p-4">
            <Dialog.Title className="flex items-center gap-2 text-lg font-semibold text-brand-navy">
              <ShoppingBag className="h-5 w-5" /> Mon Panier ({items.length})
            </Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Fermer" className="rounded-full p-1 hover:bg-brand-gray">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="mt-10 text-center text-sm text-gray-500">Votre panier est vide.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3">
                    <Link href={`/produit/${item.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-brand-border bg-white">
                      <Image src={item.image} alt={item.title} fill sizes="80px" className="object-contain p-1.5" />
                    </Link>
                    <div className="flex flex-1 flex-col gap-1">
                      <Link href={`/produit/${item.slug}`} className="line-clamp-2 text-sm font-medium text-brand-navy hover:text-brand">
                        {item.title}
                      </Link>
                      <span className="text-sm font-semibold text-brand-navy">{formatMAD(item.price)}</span>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-brand-border hover:bg-brand-gray"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-brand-border hover:bg-brand-gray"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="ml-2 text-gray-400 hover:text-red-600"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-brand-border p-4">
              <div className="mb-3 flex items-center justify-between text-base font-semibold text-brand-navy">
                <span>Sous-total</span>
                <span>{formatMAD(subtotal())}</span>
              </div>
              {subtotal() < STORE.freeShippingThreshold && (
                <p className="mb-3 rounded-md bg-brand-gray p-2.5 text-center text-xs text-body">
                  Plus que{" "}
                  <strong className="text-brand">
                    {formatMAD(STORE.freeShippingThreshold - subtotal())}
                  </strong>{" "}
                  pour la livraison gratuite
                </p>
              )}
              <div className="flex flex-col gap-2">
                <Link href="/panier" onClick={closeDrawer}>
                  <Button variant="outline" className="w-full" size="lg">Voir le panier</Button>
                </Link>
                <Link href="/commande" onClick={closeDrawer}>
                  <Button className="w-full" size="lg">Commander</Button>
                </Link>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
