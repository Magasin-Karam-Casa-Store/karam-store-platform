import Link from "next/link";
import Image from "next/image";
import { categoryBanners } from "@/data/media";
import SectionTitle from "@/components/ui/section-title";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

interface Banner {
  title: string;
  href: string;
  image: string;
  /** Grid placement inside the bento layout. */
  className: string;
  /** Where the artwork's empty space sits, so the label never covers a product. */
  align: string;
}

/**
 * Uses Karamtech's own category artwork. The 1000x1000 files fill the two tall
 * side tiles and the 800x320 files fill the stacked middle tiles, matching the
 * aspect ratios they were authored for.
 */
const banners: Banner[] = [
  {
    title: "Informatique",
    href: "/product-category/informatique",
    image: categoryBanners.informatique,
    className: "lg:row-span-2",
    align: "items-start justify-start",
  },
  {
    title: "Objets connectés",
    href: "/product-category/securite/serrureintelligent",
    image: categoryBanners.objetsConnectes,
    className: "",
    align: "items-start justify-start",
  },
  {
    title: "Sécurité",
    href: "/product-category/securite",
    image: categoryBanners.securite,
    className: "lg:row-span-2",
    align: "items-start justify-start",
  },
  {
    title: "Image et son",
    href: "/product-category/imageetsonorisation",
    image: categoryBanners.imageEtSon,
    className: "",
    align: "items-start justify-start",
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-brand-gray py-14">
      <div className="container-app">
        <SectionTitle title="Catégories populaires" />
        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1.35fr_1fr] lg:grid-rows-2">
          {banners.map((banner) => (
            <StaggerItem key={banner.title} className={banner.className}>
              <Link
                href={banner.href}
                className="group relative flex h-full min-h-[220px] overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-xl lg:min-h-[250px]"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className={`relative flex flex-col p-7 ${banner.align}`}>
                  <h3 className="max-w-[9ch] font-heading text-2xl font-extrabold uppercase leading-tight text-white drop-shadow-md">
                    {banner.title}
                  </h3>
                  <span className="mt-4 inline-flex rounded-full bg-white px-6 py-2.5 font-heading text-[11px] font-bold uppercase tracking-wide text-brand-navy transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                    Découvrir
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
