"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { STORE } from "@/lib/config";

/** WhatsApp glyph — lucide-react v1.30 ships no brand icons. */
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.87 9.87 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.14a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.53 3.7-8.22 8.23-8.22 4.53 0 8.22 3.69 8.22 8.22 0 4.54-3.69 8.23-8.23 8.23Z" />
    </svg>
  );
}

/** True once the page has been scrolled far enough to warrant a back-to-top. */
function useScrolled(threshold = 600): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false
  );
}

export default function FloatingActions() {
  const scrolled = useScrolled();
  const whatsapp = `https://wa.me/${STORE.phoneHref.replace(/\D/g, "")}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 grid justify-items-end gap-2.5">
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur WhatsApp"
        className="grid h-[54px] w-[54px] place-items-center rounded-full bg-[#25d366] text-white shadow-[0_16px_34px_rgba(37,211,102,.4)] transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>

      <button
        type="button"
        aria-label="Haut de page"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`grid h-[46px] w-[46px] place-items-center rounded-full border border-brand-border bg-white text-heading shadow-[0_14px_30px_rgba(13,27,42,.14)] transition-all hover:-translate-y-0.5 ${
          scrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
