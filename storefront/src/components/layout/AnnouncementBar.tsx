"use client";

import { useState } from "react";
import { X, Phone } from "lucide-react";
import { STORE } from "@/lib/config";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-[#fdf3e9] text-heading">
      <div className="container-app flex h-11 items-center justify-center gap-4 text-center text-[13px]">
        <span className="font-semibold">Besoin d&apos;un conseil avant d&apos;acheter ?</span>
        <a
          href={STORE.phoneHref}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold text-brand shadow-[var(--shadow-sm)] transition-colors hover:text-brand-dark"
        >
          <Phone className="h-3.5 w-3.5" />
          {STORE.phone}
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer l'annonce"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted transition-colors hover:text-heading"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
