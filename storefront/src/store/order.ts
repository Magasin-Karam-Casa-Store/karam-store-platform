import { create } from "zustand";
import type { CartItem } from "@/store/cart";

export type PaymentMethod = "cod" | "virement" | "cmi";

export interface PlacedOrder {
  reference: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
}

interface OrderState {
  lastOrder: PlacedOrder | null;
  placeOrder: (order: PlacedOrder) => void;
  clearOrder: () => void;
}

/**
 * Deliberately NOT persisted: the confirmation page should only be meaningful
 * right after checkout, not on a fresh visit days later.
 */
export const useOrderStore = create<OrderState>((set) => ({
  lastOrder: null,
  placeOrder: (order) => set({ lastOrder: order }),
  clearOrder: () => set({ lastOrder: null }),
}));

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: "Paiement à la livraison",
  virement: "Virement bancaire",
  cmi: "Carte bancaire (CMI)",
};
