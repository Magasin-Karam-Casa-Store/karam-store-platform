"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brandsWithLogos } from "@/data/catalog";
import { brandLogos } from "@/data/media";
import "swiper/css";

export default function BrandSlider() {
  return (
    <section className="border-y border-brand-border bg-brand-gray py-8">
      <div className="container-app">
        <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-gray-500">
          Nos marques partenaires
        </h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={3}
          loop
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
        >
          {brandsWithLogos.map((brand) => (
            <SwiperSlide key={brand.slug}>
              <div className="flex h-20 items-center justify-center rounded-md border border-brand-border bg-white p-4">
                <Image
                  src={brandLogos[brand.name]}
                  alt={brand.name}
                  width={120}
                  height={48}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-12 max-w-[120px] object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
