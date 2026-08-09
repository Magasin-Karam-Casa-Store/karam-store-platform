"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { products } from "@/data/products";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <Breadcrumb items={[{ label: "Favoris" }]} />
      <div className="container-app py-10">
        <h1 className="mb-8 flex items-center gap-2 text-2xl font-bold text-brand-navy sm:text-3xl">
          <Heart className="h-7 w-7" /> Mes favoris
        </h1>
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">Votre liste de favoris est vide.</p>
            <Link href="/">
              <Button className="mt-6">Découvrir nos produits</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
