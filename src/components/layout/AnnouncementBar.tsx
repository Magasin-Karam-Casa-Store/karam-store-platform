"use client";

import { useState } from "react";
import { X, Phone } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-navy via-brand-slate to-brand-navy text-white">
      <div className="container-app flex h-9 items-center justify-center gap-2 text-center text-xs sm:text-sm">
        <Phone className="hidden h-3.5 w-3.5 text-brand-accent sm:block" />
        <span dir="rtl" className="font-semibold text-brand-accent">
          بغيتي تشري ؟ أو محتاج مساعدة ؟
        </span>
        <a href="tel:+212522000000" className="hidden font-semibold underline-offset-2 hover:underline sm:inline">
          Appelez-nous : +212 5 22 00 00 00
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer l'annonce"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 transition-colors hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
