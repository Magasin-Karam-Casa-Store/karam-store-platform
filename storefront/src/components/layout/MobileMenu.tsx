"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import type { Category } from "@/types";

function MobileCategoryItem({ category, depth = 0 }: { category: Category; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!category.children?.length;

  return (
    <div className="border-b border-brand-border" style={{ paddingLeft: depth * 12 }}>
      <div className="flex items-center justify-between py-2.5">
        <Link href={`/product-category/${category.path}`} className="text-sm font-medium text-brand-navy">
          {category.name}
        </Link>
        {hasChildren && (
          <button onClick={() => setOpen(!open)} aria-label="Ouvrir sous-catégories" className="p-1">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
      </div>
      {open && hasChildren && (
        <div className="pb-1">
          {category.children!.map((child) => (
            <MobileCategoryItem key={child.path} category={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Menu" className="flex items-center justify-center p-2 lg:hidden">
          <Menu className="h-6 w-6 text-brand-navy" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-0 top-0 z-50 h-full w-[85vw] max-w-sm overflow-y-auto bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-brand-border p-4">
            <Dialog.Title className="text-base font-bold text-brand-navy">Catégories</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Fermer" className="p-1"><X className="h-5 w-5" /></button>
            </Dialog.Close>
          </div>
          <div className="p-4">
            {categories.map((cat) => (
              <MobileCategoryItem key={cat.path} category={cat} />
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
