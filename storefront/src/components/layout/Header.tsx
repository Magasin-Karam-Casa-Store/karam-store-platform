"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
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
      <div className="container-app flex items-center gap-4 py-4 lg:gap-8">
        <MobileMenu />

        {/* Karamtech's own logo, in a fixed-ratio box so next/image has both
            dimensions and does not warn about a CSS-modified aspect ratio. */}
        <Link
          href="/"
          aria-label="Karamtech - Accueil"
          className="relative block h-10 w-[150px] shrink-0 sm:h-12 sm:w-[178px]"
        >
          <Image
            src={LOGO_URL}
            alt="Karamtech"
            fill
            priority
            sizes="178px"
            className="object-contain object-left"
          />
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <HeaderAction href="/wishlist" label="Favoris" badge={mounted ? wishlistCount : 0} badgeClass="bg-brand-accent">
            <Heart className="h-5 w-5" />
          </HeaderAction>

          <button
            onClick={openDrawer}
            className="relative flex flex-col items-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-heading transition-colors hover:bg-surface-muted hover:text-brand"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:block">Panier</span>
            {mounted && totalItems > 0 && (
              <span className="absolute right-0 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
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

function HeaderAction({
  href,
  label,
  badge = 0,
  badgeClass = "bg-brand",
  children,
}: {
  href: string;
  label: string;
  badge?: number;
  badgeClass?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative hidden flex-col items-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-heading transition-colors hover:bg-surface-muted hover:text-brand sm:flex"
    >
      {children}
      <span>{label}</span>
      {badge > 0 && (
        <span
          className={`absolute right-0 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ${badgeClass}`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
