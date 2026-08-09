"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Heart, ShoppingCart } from "lucide-react";
import { LOGO_URL } from "@/data/media";
import SearchBar from "@/components/layout/SearchBar";
import MobileMenu from "@/components/layout/MobileMenu";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useMounted } from "@/lib/useMounted";

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const openDrawer = useCartStore((s) => s.openDrawer);
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const mounted = useMounted();

  return (
    <header className="border-b border-brand-border bg-white">
      <div className="container-app flex items-center gap-4 py-4">
        <MobileMenu />
        <Link href="/" className="shrink-0" aria-label="Karamtech - Accueil">
          <Image
            src={LOGO_URL}
            alt="Karamtech"
            width={180}
            height={48}
            priority
            style={{ width: "auto", height: "auto" }}
            className="max-h-10 w-auto object-contain sm:max-h-12"
          />
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-4">
          <Link href="/mon-compte" className="hidden flex-col items-center text-xs text-brand-navy hover:text-brand sm:flex">
            <User className="h-6 w-6" />
            <span className="mt-0.5">Mon compte</span>
          </Link>
          <Link href="/wishlist" className="relative hidden flex-col items-center text-xs text-brand-navy hover:text-brand sm:flex">
            <Heart className="h-6 w-6" />
            <span className="mt-0.5">Favoris</span>
            {mounted && wishlistCount > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button onClick={openDrawer} className="relative flex flex-col items-center text-xs text-brand-navy hover:text-brand">
            <ShoppingCart className="h-6 w-6" />
            <span className="mt-0.5">Panier</span>
            {mounted && totalItems > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="container-app pb-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
