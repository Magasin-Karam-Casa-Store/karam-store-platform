import HeroSlider from "@/components/home/HeroSlider";
import PopularCategories from "@/components/home/PopularCategories";
import NewArrivalsTabs from "@/components/home/NewArrivalsTabs";
import BrandSlider from "@/components/home/BrandSlider";
import TrustBadges from "@/components/home/TrustBadges";
import ProductCarousel from "@/components/home/ProductCarousel";
import ServicesSection from "@/components/home/ServicesSection";
import Newsletter from "@/components/home/Newsletter";
import SectionTitle from "@/components/ui/section-title";
import { getLiveBestSellers } from "@/lib/karamtech-api";

export default async function Home() {
  const bestSellers = await getLiveBestSellers(12);

  return (
    <>
      <HeroSlider />

      <TrustBadges />

      <PopularCategories />

      <section className="container-app py-16 lg:py-20">
        <SectionTitle
          eyebrow="Les plus demandés"
          title="Meilleures ventes"
          description="Les références que nos clients professionnels commandent le plus."
          href="/recherche"
        />
        <ProductCarousel products={bestSellers} />
      </section>

      <ServicesSection />

      <NewArrivalsTabs />

      <BrandSlider />

      <Newsletter />
    </>
  );
}
