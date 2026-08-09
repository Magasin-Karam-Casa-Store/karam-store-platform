"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductCarousel({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-sm text-gray-500">Aucun produit disponible pour le moment.</p>;
  }

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
      className="product-swiper !pb-2"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
