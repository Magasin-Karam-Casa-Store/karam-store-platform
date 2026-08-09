"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-brand-border bg-white">
        <Image src={images[active]} alt={title} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" />
      </div>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2",
              active === i ? "border-brand" : "border-brand-border"
            )}
            aria-label={`Voir l'image ${i + 1}`}
          >
            <Image src={img} alt={`${title} miniature ${i + 1}`} fill sizes="80px" className="object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
