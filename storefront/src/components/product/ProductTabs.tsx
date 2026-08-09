"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Star } from "lucide-react";
import type { Product } from "@/types";

export default function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs.Root defaultValue="description" className="mt-12">
      <Tabs.List className="flex flex-wrap gap-2 border-b border-brand-border">
        <Tabs.Trigger
          value="description"
          className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-gray-500 data-[state=active]:border-brand data-[state=active]:text-brand"
        >
          Description
        </Tabs.Trigger>
        <Tabs.Trigger
          value="specs"
          className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-gray-500 data-[state=active]:border-brand data-[state=active]:text-brand"
        >
          Spécifications techniques
        </Tabs.Trigger>
        <Tabs.Trigger
          value="reviews"
          className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-gray-500 data-[state=active]:border-brand data-[state=active]:text-brand"
        >
          Avis ({product.reviewsCount})
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="description" className="py-6 text-sm leading-relaxed text-gray-600">
        <p>{product.description}</p>
      </Tabs.Content>

      <Tabs.Content value="specs" className="py-6">
        <table className="w-full max-w-2xl border-collapse text-sm">
          <tbody>
            {product.specs.map((spec) => (
              <tr key={spec.label} className="border-b border-brand-border">
                <td className="w-1/3 py-2.5 font-semibold text-brand-navy">{spec.label}</td>
                <td className="py-2.5 text-gray-600">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tabs.Content>

      <Tabs.Content value="reviews" className="py-6">
        {product.reviews.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun avis pour ce produit pour le moment.</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {product.reviews.map((review) => (
              <li key={review.id} className="border-b border-brand-border pb-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-brand-navy">{review.author}</span>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5" fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-gray-600">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
