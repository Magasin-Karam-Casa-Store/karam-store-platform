/** Single source of truth for storefront commercial rules, branch info and contact details. */
export const STORE = {
  name: "Karamtech Casablanca",
  parentCompany: "Groupe Karamtech",
  branchName: "Magasin Casablanca",
  phone: "+212 5 20 15 94 52",
  phoneHref: "tel:+212520159452",
  whatsappPhone: "+212 6 61 07 95 39",
  whatsappHref: "https://wa.me/212661079539",
  email: "karamcasa0002@gmail.com",
  city: "Casablanca, Maroc",
  address: "Magasin Karamtech, Casablanca, Maroc",
  /** Orders at or above this subtotal (MAD) ship free. */
  freeShippingThreshold: 2000,
  /** Flat shipping fee (MAD) applied below the free-shipping threshold. */
  shippingFlatRate: 40,
  deliveryWindow: "24 à 72h",
  returnWindowDays: 7,
} as const;
