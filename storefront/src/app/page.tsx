import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/home/HeroSlider";
import PopularCategories from "@/components/home/PopularCategories";
import NewArrivalsTabs from "@/components/home/NewArrivalsTabs";
import BrandSlider from "@/components/home/BrandSlider";
import TrustBadges from "@/components/home/TrustBadges";
import ProductCarousel from "@/components/home/ProductCarousel";
import SectionTitle from "@/components/ui/section-title";
import { getBestSellers } from "@/data/products";

export default function Home() {
  const bestSellers = getBestSellers(12);

  return (
    <>
      {/* Full-bleed hero, matching the edge-to-edge banner on karamtech.ma. */}
      <HeroSlider />

      <PopularCategories />

      <section className="container-app py-12">
        <SectionTitle title="Meilleures ventes">
          <Link
            href="/recherche"
            className="ml-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand transition-all hover:gap-2"
          >
            Voir tout <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </SectionTitle>
        <ProductCarousel products={bestSellers} />
      </section>

      <NewArrivalsTabs />

      <TrustBadges />

      <BrandSlider />
    </>
  );
}
