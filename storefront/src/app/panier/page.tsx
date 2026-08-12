"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatMAD } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { STORE } from "@/lib/config";
import { useMounted } from "@/lib/useMounted";

const { shippingFlatRate: SHIPPING_FLAT_RATE, freeShippingThreshold: FREE_SHIPPING_THRESHOLD } = STORE;

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const mounted = useMounted();
  const sub = subtotal();
  const shipping = items.length === 0 || sub >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = sub + shipping;
  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - sub;

  return (
    <>
      <Breadcrumb items={[{ label: "Panier" }]} />
      <div className="container-app py-10">
        <h1 className="mb-8 flex items-center gap-2 text-2xl font-bold text-brand-navy sm:text-3xl">
          <ShoppingBag className="h-7 w-7" /> Mon Panier
        </h1>

        {!mounted ? (
          <p className="py-16 text-center text-sm text-body">Chargement de votre panier…</p>
        ) : items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">Votre panier est actuellement vide.</p>
            <Link href="/">
              <Button className="mt-6">Continuer mes achats</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-brand-border text-left text-xs uppercase text-gray-500">
                    <th className="py-3">Produit</th>
                    <th className="py-3">Prix</th>
                    <th className="py-3">Quantité</th>
                    <th className="py-3">Total</th>
                    <th className="py-3" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.productId} className="border-b border-brand-border">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-brand-border bg-white">
                            <Image src={item.image} alt={item.title} fill sizes="64px" className="object-contain p-1.5" />
                          </div>
                          <Link href={`/produit/${item.slug}`} className="line-clamp-2 font-medium text-brand-navy hover:text-brand">
                            {item.title}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4">{formatMAD(item.price)}</td>
                      <td className="py-4">
                        <div className="flex items-center rounded-md border border-brand-border w-fit">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center hover:bg-brand-gray"
                            aria-label="Diminuer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center hover:bg-brand-gray"
                            aria-label="Augmenter"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-semibold text-brand-navy">{formatMAD(item.price * item.quantity)}</td>
                      <td className="py-4">
                        <button onClick={() => removeItem(item.productId)} aria-label="Supprimer" className="text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="h-fit rounded-lg border border-brand-border p-6">
              <h2 className="mb-4 text-lg font-bold text-brand-navy">Résumé de la commande</h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sous-total</span>
                  <span>{formatMAD(sub)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : formatMAD(shipping)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-brand-border pt-3 text-base font-bold text-brand-navy">
                  <span>Total</span>
                  <span>{formatMAD(total)}</span>
                </div>
              </div>

              {missingForFreeShipping > 0 && (
                <p className="mt-4 rounded-md bg-brand-gray p-3 text-xs text-body">
                  Plus que <strong className="text-brand">{formatMAD(missingForFreeShipping)}</strong>{" "}
                  pour bénéficier de la livraison gratuite.
                </p>
              )}

              <Link href="/commande" className="mt-6 block">
                <Button size="lg" className="w-full">Passer la commande</Button>
              </Link>
              <Link
                href="/"
                className="mt-3 block text-center text-xs text-body transition-colors hover:text-brand"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
