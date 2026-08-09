import type { Product, Review } from "@/types";
import rawProducts from "@/data/generated/products.json";
import { KNOWN_BRANDS } from "@/data/brands";

interface RawProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku: string;
  categoryPath: string;
  categoryName: string;
  price: number;
  regularPrice: number | null;
  onSale: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  shortDescription: string;
  description: string;
}

/** Deterministic pseudo-random in [0,1) so server and client agree. */
function seeded(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Fixed anchor for all synthesized dates. Using Date.now() here would make the
 * server and the client compute different timestamps, which changes the sort
 * order of the "new arrivals" rail and triggers a hydration mismatch.
 */
const DATE_ANCHOR = Date.parse("2026-08-01T00:00:00.000Z");
const DAY_MS = 86_400_000;

/**
 * The live catalog does not expose a brand attribute, so we infer it from the
 * product title by matching the longest known brand name that appears in it.
 */
const brandMatchers = [...KNOWN_BRANDS]
  .sort((a, b) => b.length - a.length)
  .map((name) => ({ name, pattern: new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")}\\b`, "i") }));

/**
 * Titles that start with a product noun rather than a vendor. Without this the
 * first-token fallback invents "brands" like "Adaptateur" or "Cable".
 */
const NON_BRAND_TOKENS = new Set([
  "adaptateur", "adapter", "cable", "câble", "clavier", "souris", "carte", "kit", "pack",
  "support", "chargeur", "batterie", "toner", "cartouche", "encre", "papier", "ecran", "écran",
  "imprimante", "camera", "caméra", "switch", "routeur", "onduleur", "disque", "cle", "clé",
  "boitier", "boîtier", "ventilateur", "alimentation", "memoire", "mémoire", "processeur",
  "casque", "micro", "microphone", "enceinte", "webcam", "tablette", "telephone", "téléphone",
  "serveur", "armoire", "coffret", "rack", "panneau", "module", "capteur", "detecteur",
  "détecteur", "alarme", "serrure", "lampe", "projecteur", "convertisseur", "repeteur",
  "répéteur", "antenne", "bobine", "connecteur", "prise", "multiprise", "rallonge", "hub",
  "station", "chaise", "fauteuil", "bureau", "sac", "sacoche", "housse", "the", "pc", "kits",
  "motorized", "projector", "monitor", "keyboard", "mouse", "printer", "scanner", "laptop",
  "desktop", "server", "cabinet", "power", "smart", "mini", "usb", "hdmi", "wifi", "led", "lcd",
  "be", "lb", "sam", "new", "pour", "avec", "set", "lot", "type", "video", "audio", "solar",
  "original", "brasseur", "dénudeur", "denudeur", "spliter", "splitter", "pince", "outil",
]);

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function detectBrand(title: string): string {
  for (const { name, pattern } of brandMatchers) {
    if (pattern.test(title)) return name;
  }
  // Fall back to the first token, which is the vendor for most catalog entries.
  const first = title.split(/[\s,(/-]/)[0].replace(/[^\p{L}\p{N}&.+]/gu, "");
  // Reject anything containing a digit — those are model numbers (R400, PEBB112),
  // not vendors — along with stop-words and single characters.
  if (first.length < 2 || /\d/.test(first) || NON_BRAND_TOKENS.has(first.toLowerCase())) {
    return "Autre";
  }
  // Normalise casing so "ADAPTATEUR" and "Adaptateur" collapse into one entry.
  return first.length <= 4 && first === first.toUpperCase() ? first : titleCase(first);
}

const REVIEWERS = ["Youssef", "Amina", "Karim", "Sara", "Mehdi", "Nadia", "Hamza", "Salma"];
const REVIEW_TEXTS = [
  "Bon rapport qualité prix, livraison rapide et produit conforme à la description.",
  "Produit reçu en parfait état, je recommande Karamtech.",
  "Très satisfait de mon achat, le service client est réactif.",
  "Conforme à mes attentes, installation simple et rapide.",
];

function buildReviews(id: number, count: number): Review[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${id}-review-${i}`,
    author: REVIEWERS[(id + i) % REVIEWERS.length],
    rating: 4 + Math.round(seeded(id * 3.7 + i)),
    date: new Date(DATE_ANCHOR - (i + 1) * DAY_MS * 11).toISOString(),
    comment: REVIEW_TEXTS[(id + i) % REVIEW_TEXTS.length],
  }));
}

export const products: Product[] = (rawProducts as RawProduct[]).map((raw, index) => {
  // Reviews are illustrative: the Store API returns 0 for every product.
  const reviewCount = raw.reviewCount || Math.floor(seeded(raw.id) * 5);
  const reviews = buildReviews(raw.id, reviewCount);
  const rating =
    raw.rating ||
    (reviews.length
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : 4 + Math.round(seeded(raw.id * 1.3) * 10) / 10);

  const brand = detectBrand(raw.name);
  const description =
    raw.description ||
    raw.shortDescription ||
    `${raw.name} — disponible chez Karamtech. Produit ${brand} vendu neuf avec garantie constructeur et livraison partout au Maroc.`;

  return {
    id: String(raw.id),
    title: raw.name,
    slug: raw.slug,
    categoryPath: raw.categoryPath,
    categoryName: raw.categoryName,
    brand,
    price: raw.price,
    oldPrice: raw.regularPrice ?? undefined,
    currency: "MAD",
    stock: raw.inStock ? "instock" : "outofstock",
    condition: /reconditionn|second vie|refurb/i.test(`${raw.name} ${raw.categoryPath}`)
      ? "reconditionne"
      : "neuf",
    sku: raw.sku,
    images: raw.images.length ? raw.images : ["/placeholder-product.svg"],
    description,
    shortDescription: raw.shortDescription || `${raw.name} - ${brand}. Disponible chez Karamtech.`,
    specs: [
      { label: "Marque", value: brand },
      { label: "Référence", value: raw.sku },
      { label: "Catégorie", value: raw.categoryName },
      { label: "Garantie", value: "12 mois" },
      { label: "État", value: /reconditionn/i.test(raw.name) ? "Reconditionné" : "Neuf" },
    ],
    rating,
    reviewsCount: reviews.length,
    reviews,
    // Deterministic flags so featured rails stay stable between renders.
    isNew: index % 17 === 0,
    isBestSeller: raw.inStock && index % 11 === 0,
    createdAt: new Date(DATE_ANCHOR - Math.floor(seeded(raw.id * 1.9) * 120) * DAY_MS).toISOString(),
  };
});

const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProductBySlug(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getProductsByCategoryPaths(paths: string[]): Product[] {
  const set = new Set(paths);
  return products.filter((p) => set.has(p.categoryPath));
}

export function getBestSellers(limit = 10): Product[] {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export function getNewArrivals(limit = 10): Product[] {
  return products
    .filter((p) => p.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 6): Product[] {
  const sameLeaf = products.filter((p) => p.id !== product.id && p.categoryPath === product.categoryPath);
  if (sameLeaf.length >= limit) return sameLeaf.slice(0, limit);

  // Widen to the parent category when a leaf has too few siblings.
  const parentPath = product.categoryPath.split("/").slice(0, -1).join("/");
  const sameParent = products.filter(
    (p) => p.id !== product.id && p.categoryPath.startsWith(parentPath) && !sameLeaf.includes(p)
  );
  return [...sameLeaf, ...sameParent].slice(0, limit);
}

export function searchProducts(query: string, categoryPath?: string): Product[] {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    const matchesQuery = q
      ? p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      : true;
    const matchesCategory = categoryPath && categoryPath !== "all" ? p.categoryPath.startsWith(categoryPath) : true;
    return matchesQuery && matchesCategory;
  });
}
