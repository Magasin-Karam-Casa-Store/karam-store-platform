/** Single source of truth for storefront commercial rules and contact details. */
export const STORE = {
  name: "Karamtech",
  phone: "+212 5 22 00 00 00",
  phoneHref: "tel:+212522000000",
  email: "contact@karamtech.ma",
  city: "Casablanca, Maroc",
  /** Orders at or above this subtotal (MAD) ship free. */
  freeShippingThreshold: 2000,
  /** Flat shipping fee (MAD) applied below the free-shipping threshold. */
  shippingFlatRate: 40,
  deliveryWindow: "24 à 72h",
  returnWindowDays: 7,
} as const;
