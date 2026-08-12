"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatMAD } from "@/lib/utils";
import { STORE } from "@/lib/config";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal } = useCartStore();

  const sub = subtotal();
  const freeShipping = sub >= STORE.freeShippingThreshold;
  const shipping = items.length === 0 || freeShipping ? 0 : STORE.shippingFlatRate;
  const missing = STORE.freeShippingThreshold - sub;
  const progress = Math.min(100, (sub / STORE.freeShippingThreshold) * 100);

  return (
    <Dialog.Root open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-navy/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-brand-border px-6 py-5">
            <Dialog.Title className="flex items-center gap-2.5 font-heading text-lg font-extrabold text-heading">
              <ShoppingBag className="h-5 w-5 text-brand" />
              Mon panier
              <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-bold text-brand">
                {items.length}
              </span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Fermer"
                className="rounded-full p-1.5 text-soft transition-colors hover:bg-surface-muted hover:text-heading"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Free-shipping progress */}
          {items.length > 0 && (
            <div className="border-b border-brand-border px-6 py-4">
              {freeShipping ? (
                <p className="text-[13px] font-semibold text-brand-success">
                  🎉 Livraison offerte débloquée
                </p>
              ) : (
                <p className="text-[13px] text-body">
                  Plus que <strong className="text-heading">{formatMAD(missing)}</strong> pour la
                  livraison offerte
                </p>
              )}
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${progress}%`,
                    background: freeShipping
                      ? "var(--brand-success)"
                      : "linear-gradient(90deg,#1a8fe3,#0b5fa5)",
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-muted text-muted">
                  <ShoppingBag className="h-7 w-7" />
                </span>
                <p className="text-sm text-body">Votre panier est vide.</p>
                <Dialog.Close asChild>
                  <Link href="/">
                    <Button size="md">Continuer mes achats</Button>
                  </Link>
                </Dialog.Close>
              </div>
            ) : (
              <ul>
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="grid grid-cols-[76px_1fr_auto] gap-3.5 border-b border-[#f0f4f9] py-3.5"
                  >
                    <Link
                      href={`/produit/${item.slug}`}
                      onClick={closeDrawer}
                      className="relative h-[76px] w-[76px] overflow-hidden rounded-2xl border border-[#eef3f9] bg-[#f8fbfe]"
                    >
                      <Image src={item.image} alt={item.title} fill sizes="76px" className="object-contain p-1.5" />
                    </Link>

                    <div className="grid min-w-0 content-start gap-[7px]">
                      <Link
                        href={`/produit/${item.slug}`}
                        onClick={closeDrawer}
                        className="line-clamp-2 font-heading text-[13.5px] font-semibold leading-[1.35] text-heading transition-colors hover:text-brand"
                      >
                        {item.title}
                      </Link>
                      <span className="text-xs text-muted">{formatMAD(item.price)} / unité</span>

                      <span className="inline-flex w-max items-center overflow-hidden rounded-[10px] border border-brand-border">
                        <button
                          aria-label="Diminuer la quantité"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="grid h-[30px] w-[30px] place-items-center bg-surface-muted transition-colors hover:bg-surface-sunken"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[34px] text-center font-heading text-[13px] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Augmenter la quantité"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="grid h-[30px] w-[30px] place-items-center bg-surface-muted transition-colors hover:bg-surface-sunken"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </div>

                    <div className="grid content-between justify-items-end gap-2.5">
                      <span className="whitespace-nowrap font-heading text-[14.5px] font-extrabold text-heading">
                        {formatMAD(item.price * item.quantity)}
                      </span>
                      <button
                        aria-label={`Retirer ${item.title}`}
                        onClick={() => removeItem(item.productId)}
                        className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#f4dde3] bg-[#fff5f7] text-[#e0344a] transition-colors hover:bg-[#ffe3e8]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="grid gap-3 border-t border-[#e6ecf3] bg-[#fbfcfe] px-6 pb-6 pt-4">
              <div className="flex items-center justify-between text-[13.5px] text-body">
                <span>Sous-total</span>
                <b className="font-heading text-heading">{formatMAD(sub)}</b>
              </div>
              <div className="flex items-center justify-between text-[13.5px] text-body">
                <span>Livraison</span>
                <b className={`font-heading ${freeShipping ? "text-brand-success" : "text-heading"}`}>
                  {freeShipping ? "Offerte" : formatMAD(shipping)}
                </b>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-[#dde5ee] pt-2.5 font-heading text-lg font-extrabold text-heading">
                <span>Total</span>
                <span>{formatMAD(sub + shipping)}</span>
              </div>

              <Link href="/commande" onClick={closeDrawer} className="mt-1 block">
                <Button size="lg" className="w-full">Passer la commande</Button>
              </Link>
              <Link
                href="/panier"
                onClick={closeDrawer}
                className="text-center text-[13px] font-semibold text-body transition-colors hover:text-brand"
              >
                Voir le panier
              </Link>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
