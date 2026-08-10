"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { heroSlides } from "@/data/media";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

/**
 * Mirrors the Revolution Slider setup on karamtech.ma: each slide is a
 * photographic background with a pre-composed cut-out PNG layered on top.
 * The whole slide links through to the relevant category.
 */
const slides = heroSlides.map((slide, index) =>
  index === 0
    ? { ...slide, href: "/product-category/securite", label: "Karamtech, revendeur agréé Hikvision" }
    : { ...slide, href: "/product-category/informatique", label: "Solutions informatiques Karamtech" }
);

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="hero-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.background}>
          <Link
            href={slide.href}
            aria-label={slide.label}
            className="relative block h-[240px] w-full overflow-hidden sm:h-[360px] lg:h-[480px]"
          >
            <Image
              src={slide.background}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Pre-composed artwork (logos + product shots), centred like the original. */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[62%] w-[86%] max-w-[1100px]">
                <Image
                  src={slide.overlay}
                  alt={slide.label}
                  fill
                  priority
                  sizes="(max-width: 1100px) 86vw, 1100px"
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
