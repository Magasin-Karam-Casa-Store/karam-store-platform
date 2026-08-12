import type { Product } from "@/types";
import {
  products as fallbackProducts,
  getProductBySlug as getFallbackProductBySlug,
  getProductsByCategoryPaths as getFallbackProductsByCategoryPaths,
  getBestSellers as getFallbackBestSellers,
  getNewArrivals as getFallbackNewArrivals,
  getRelatedProducts as getFallbackRelatedProducts,
  searchProducts as getFallbackSearchProducts,
} from "@/data/products";
import { KNOWN_BRANDS } from "@/data/brands";

const API_BASE = "https://karamtech.ma/wp-json/wc/store/v1";

interface WCStoreProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku: string;
  on_sale: boolean;
  is_in_stock: boolean;
  average_rating?: string;
  review_count?: number;
  short_description?: string;
  description?: string;
  prices?: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_minor_unit?: number;
  };
  images?: { src: string }[];
  categories?: { id: number; name: string; slug: string }[];
}

/** Decode HTML entities from API strings. */
function decodeHTML(html: string = ""): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Converts minor units price string (e.g. "107702") to number (1077.02). */
function parsePrice(raw?: string, minorUnit = 2): number {
  if (!raw) return 0;
  const num = Number(raw);
  if (isNaN(num)) return 0;
  return num / Math.pow(10, minorUnit);
}

const brandMatchers = [...KNOWN_BRANDS]
  .sort((a, b) => b.length - a.length)
  .map((name) => ({ name, pattern: new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")}\\b`, "i") }));

function detectBrand(title: string): string {
  for (const { name, pattern } of brandMatchers) {
    if (pattern.test(title)) return name;
  }
  const first = title.split(/[\s,(/-]/)[0].replace(/[^\p{L}\p{N}&.+]/gu, "");
  if (first.length < 2 || /\d/.test(first)) return "Autre";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

export function mapWCProduct(p: WCStoreProduct, index = 0): Product {
  const minor = p.prices?.currency_minor_unit ?? 2;
  const price = parsePrice(p.prices?.price, minor);
  const regularPrice = parsePrice(p.prices?.regular_price, minor);
  const brand = detectBrand(p.name);
  const mainCat = p.categories?.[0];
  const categoryName = mainCat ? decodeHTML(mainCat.name) : "Catalogue";
  const categoryPath = mainCat ? mainCat.slug : "informatique";

  const images = (p.images ?? []).map((i) => i.src).filter(Boolean);
  const cleanTitle = decodeHTML(p.name);
  const cleanDesc = decodeHTML(p.description || p.short_description || cleanTitle);
  const cleanShortDesc = decodeHTML(p.short_description || cleanTitle);

  return {
    id: String(p.id),
    title: cleanTitle,
    slug: p.slug,
    categoryPath,
    categoryName,
    brand,
    price,
    oldPrice: regularPrice > price ? regularPrice : undefined,
    currency: "MAD",
    stock: p.is_in_stock ? "instock" : "outofstock",
    condition: /reconditionn|refurb/i.test(cleanTitle) ? "reconditionne" : "neuf",
    sku: p.sku || `KT-${p.id}`,
    images: images.length ? images : ["/placeholder-product.svg"],
    description: cleanDesc,
    shortDescription: cleanShortDesc,
    specs: [
      { label: "Marque", value: brand },
      { label: "Référence", value: p.sku || `KT-${p.id}` },
      { label: "Catégorie", value: categoryName },
      { label: "Garantie", value: "12 mois" },
      { label: "État", value: /reconditionn/i.test(cleanTitle) ? "Reconditionné" : "Neuf" },
    ],
    rating: Number(p.average_rating) || 4.5,
    reviewsCount: p.review_count || 3,
    reviews: [],
    isNew: index % 5 === 0,
    isBestSeller: p.is_in_stock && index % 3 === 0,
    createdAt: new Date().toISOString(),
  };
}

/** Fetch live product by slug dynamically from karamtech.ma API. */
export async function getLiveProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_BASE}/products?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: WCStoreProduct[] = await res.json();
    if (data.length > 0) {
      return mapWCProduct(data[0]);
    }
  } catch (err) {
    console.warn(`[Karamtech API] Failed to fetch product by slug '${slug}', using fallback:`, err);
  }
  return getFallbackProductBySlug(slug);
}

/** Fetch live products by search query dynamically from karamtech.ma API. */
export async function getLiveSearchProducts(query: string, categoryPath?: string): Promise<Product[]> {
  try {
    const url = `${API_BASE}/products?search=${encodeURIComponent(query)}&per_page=30`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: WCStoreProduct[] = await res.json();
    if (data.length > 0) {
      const mapped = data.map((p, i) => mapWCProduct(p, i));
      if (categoryPath && categoryPath !== "all") {
        return mapped.filter((p) => p.categoryPath.startsWith(categoryPath));
      }
      return mapped;
    }
  } catch (err) {
    console.warn(`[Karamtech API] Failed to search products for '${query}', using fallback:`, err);
  }
  return getFallbackSearchProducts(query, categoryPath);
}

/** Fetch live products by category dynamically from karamtech.ma API. */
export async function getLiveProductsByCategory(paths: string[]): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products?per_page=40`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: WCStoreProduct[] = await res.json();
    if (data.length > 0) {
      const mapped = data.map((p, i) => mapWCProduct(p, i));
      const set = new Set(paths);
      const filtered = mapped.filter((p) => set.has(p.categoryPath) || paths.some((path) => p.categoryPath.startsWith(path)));
      if (filtered.length > 0) return filtered;
      return mapped;
    }
  } catch (err) {
    console.warn(`[Karamtech API] Failed to fetch category products, using fallback:`, err);
  }
  return getFallbackProductsByCategoryPaths(paths);
}

/** Fetch live best sellers from karamtech.ma API. */
export async function getLiveBestSellers(limit = 10): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products?orderby=popularity&per_page=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: WCStoreProduct[] = await res.json();
    if (data.length > 0) {
      return data.map((p, i) => mapWCProduct(p, i));
    }
  } catch (err) {
    console.warn(`[Karamtech API] Failed to fetch best sellers, using fallback:`, err);
  }
  return getFallbackBestSellers(limit);
}

/** Fetch live new arrivals from karamtech.ma API. */
export async function getLiveNewArrivals(limit = 10): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products?orderby=date&order=desc&per_page=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: WCStoreProduct[] = await res.json();
    if (data.length > 0) {
      return data.map((p, i) => mapWCProduct(p, i));
    }
  } catch (err) {
    console.warn(`[Karamtech API] Failed to fetch new arrivals, using fallback:`, err);
  }
  return getFallbackNewArrivals(limit);
}

export function getLiveRelatedProducts(product: Product, limit = 6): Product[] {
  return getFallbackRelatedProducts(product, limit);
}
