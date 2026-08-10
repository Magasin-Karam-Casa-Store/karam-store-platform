import Link from "next/link";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";

export default function TopBar() {
  return (
    <div className="hidden bg-brand-navy text-white md:block">
      <div className="container-app flex h-9 items-center justify-between text-xs">
        <nav className="flex items-center gap-4">
          <Link href="/about-us" className="hover:text-brand-accent">À PROPOS</Link>
          <Link href="/conditions-generales-de-vente" className="hover:text-brand-accent">CGV</Link>
          <Link href="/contact" className="hover:text-brand-accent">CONTACT</Link>
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-white/70">Livraison partout au Maroc</span>
          <span className="flex items-center gap-2">
            <a href="#" aria-label="Facebook" className="hover:text-brand-accent"><FacebookIcon className="h-3.5 w-3.5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand-accent"><InstagramIcon className="h-3.5 w-3.5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-brand-accent"><LinkedinIcon className="h-3.5 w-3.5" /></a>
          </span>
        </div>
      </div>
    </div>
  );
}
