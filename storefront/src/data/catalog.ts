import { products } from "@/data/products";
import { toBrandSlug, type Brand } from "@/data/brands";
import { brandLogos } from "@/data/media";

/** Brands actually present in the catalog, most-stocked first. */
export const brands: Brand[] = Object.entries(
  products.reduce<Record<string, number>>((acc, p) => {
    acc[p.brand] = (acc[p.brand] ?? 0) + 1;
    return acc;
  }, {})
)
  .map(([name, productCount]) => ({ name, slug: toBrandSlug(name), productCount }))
  .sort((a, b) => b.productCount - a.productCount);

/** Subset that has a real logo asset, for the homepage brand carousel. */
export const brandsWithLogos = brands.filter((b) => brandLogos[b.name]);

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
