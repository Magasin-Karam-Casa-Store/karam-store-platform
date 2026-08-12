import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { LOGO_URL, PAYMENT_LOGOS_URL } from "@/data/media";
import { STORE } from "@/lib/config";

const legalLinks = [
  { label: "Recrutements", href: "/recrutements" },
  { label: "CGV", href: "/conditions-generales-de-vente" },
  { label: "Confidentialité", href: "/politique-de-confidentialite" },
  { label: "Retour et Remboursement", href: "/retour-et-remboursement" },
  { label: "Garantie et SAV", href: "/garantie-et-sav" },
  { label: "Cookies", href: "/cookies" },
];

const supportLinks = [
  { label: "Comment acheter ?", href: "/comment-acheter" },
  { label: "Support et SAV", href: "/garantie-et-sav" },
  { label: "Livraison & Retours", href: "/livraison" },
  { label: "Suivi de commande", href: "/suivi-commande" },
  { label: "FAQ", href: "/faq" },
];

const corporateLinks = [
  { label: "Qui sommes-nous ?", href: "/qui-sommes-nous" },
  { label: "Pourquoi Karamtech ?", href: "/pourquoi-karamtech" },
  { label: "À propos", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-base font-bold text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5 text-sm text-white/60">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="transition-colors hover:text-brand-accent">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-navy text-white">
      <div className="container-app py-14">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2">
            <Link href="/" className="inline-block" aria-label="Karamtech Casablanca - Accueil">
              <Image
                src={LOGO_URL}
                alt="Karamtech"
                width={220}
                height={60}
                style={{ width: "auto", height: "auto" }}
                className="max-h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <span className="text-xs font-medium text-white/60">
              {STORE.branchName} — Filiale officielle du {STORE.parentCompany}
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <span className="text-lg font-bold">Nous suivre</span>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-brand">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-brand">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-brand">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Cadre Légale" links={legalLinks} />
          <FooterColumn title="Support" links={supportLinks} />
          <FooterColumn title="Karamtech" links={corporateLinks} />
          <div>
            <h4 className="mb-4 text-base font-bold text-white">Nous contacter</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /> {STORE.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <a href={STORE.phoneHref} className="hover:text-brand-accent">Fixe : {STORE.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#25d366]" />
                <a href={STORE.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">WhatsApp : {STORE.whatsappPhone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <a href={`mailto:${STORE.email}`} className="hover:text-brand-accent">{STORE.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-app flex flex-col items-center justify-between gap-4 text-xs text-white/50 sm:flex-row">
          <span>
            <strong className="font-bold text-white/80">KARAMTECH CASABLANCA</strong> {new Date().getFullYear()} — Filiale du {STORE.parentCompany}. Tous droits réservés.
          </span>
          {/* Karamtech's own payment-methods strip (Visa, Mastercard, CMI,
              Amana, cash on delivery) rather than text badges. */}
          <Image
            src={PAYMENT_LOGOS_URL}
            alt="Moyens de paiement acceptés : Visa, Mastercard, CMI, Amana, paiement à la livraison"
            width={420}
            height={40}
            className="h-8 w-auto opacity-90 sm:h-9"
          />
        </div>
      </div>
    </footer>
  );
}
