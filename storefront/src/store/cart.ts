import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isDrawerOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                image: product.images[0],
                quantity,
              },
            ],
            isDrawerOpen: true,
          };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "karamtech-cart",
      // Bumped because v0 payloads also persisted `isDrawerOpen`.
      version: 1,
      // Only the line items belong in storage. Persisting `isDrawerOpen` would
      // make the drawer pop open on every page load.
      partialize: (state) => ({ items: state.items }),
      // Keep the shopper's basket when upgrading from a v0 payload.
      migrate: (persisted) => ({
        items: (persisted as { items?: CartItem[] } | undefined)?.items ?? [],
      }),
      // Guard against any stored payload still carrying UI state.
      merge: (persisted, current) => ({
        ...current,
        items: (persisted as { items?: CartItem[] } | undefined)?.items ?? [],
        isDrawerOpen: false,
      }),
    }
  )
);
