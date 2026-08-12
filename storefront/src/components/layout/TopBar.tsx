import Link from "next/link";
import { MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { STORE } from "@/lib/config";

export default function TopBar() {
  return (
    <div className="hidden bg-brand-navy text-white md:block">
      <div className="container-app flex h-10 items-center justify-between text-[11px] font-semibold tracking-wide">
        <nav className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-accent">
            <MapPin className="h-3 w-3 shrink-0" />
            {STORE.branchName} — Filiale du {STORE.parentCompany}
          </span>
          <Link href="/about-us" className="transition-colors hover:text-brand-accent">À PROPOS</Link>
          <Link href="/conditions-generales-de-vente" className="transition-colors hover:text-brand-accent">CGV</Link>
          <Link href="/contact" className="transition-colors hover:text-brand-accent">CONTACT</Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="font-normal text-white/60">Livraison partout au Maroc</span>
          <span className="flex items-center gap-2">
            <a href="#" aria-label="Facebook" className="hover:text-brand-accent"><FacebookIcon className="h-3.5 w-3.5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand-accent"><InstagramIcon className="hover:text-brand-accent h-3.5 w-3.5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-brand-accent"><LinkedinIcon className="h-3.5 w-3.5" /></a>
          </span>
        </div>
      </div>
    </div>
  );
}
