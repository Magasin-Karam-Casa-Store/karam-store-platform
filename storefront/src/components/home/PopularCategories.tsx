import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { editorialBanners } from "@/data/media";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import SectionTitle from "@/components/ui/section-title";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

/** Number of catalogue entries under a category and everything beneath it. */
function countIn(path: string): number {
  return products.filter((p) => p.categoryPath === path || p.categoryPath.startsWith(`${path}/`)).length;
}

const tiles = [
  {
    title: "Informatique",
    tagline: "PC, réseaux & serveurs",
    href: "/product-category/informatique",
    image: editorialBanners.informatique,
    span: "lg:row-span-2",
  },
  {
    title: "Impression",
    tagline: "Imprimantes & consommables",
    href: "/product-category/informatique/impression",
    image: editorialBanners.impression,
    span: "",
  },
  {
    title: "Sécurité",
    tagline: "Caméras & contrôle d'accès",
    href: "/product-category/securite",
    image: editorialBanners.securite,
    span: "lg:row-span-2",
  },
  {
    title: "Image et son",
    tagline: "Projection & sonorisation",
    href: "/product-category/imageetsonorisation",
    image: editorialBanners.imageEtSon,
    span: "",
  },
].map((tile) => ({
  ...tile,
  count: countIn(tile.href.replace("/product-category/", "")),
}));

export default function PopularCategories() {
  return (
    <section className="bg-surface-muted py-16 lg:py-20">
      <div className="container-app">
        <SectionTitle
          eyebrow="Nos univers"
          title="Catégories populaires"
          description={`Plus de ${products.length} références réparties sur ${categories.length} familles de produits.`}
        />

        {/* Bento grid: two tall tiles flanking two stacked wide tiles. */}
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr] lg:grid-rows-2">
          {tiles.map((tile) => (
            <StaggerItem key={tile.title} className={tile.span}>
              <Link
                href={tile.href}
                className="group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] lg:min-h-[250px]"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Consistent scrim so the mixed source artwork reads as one set. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/45 to-transparent"
                />

                <div className="relative flex items-end justify-between gap-3 p-6">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                      {tile.count} produits
                    </span>
                    <h3 className="mt-1 font-heading text-xl font-extrabold text-white sm:text-2xl">
                      {tile.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-white/70">{tile.tagline}</p>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-accent group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
