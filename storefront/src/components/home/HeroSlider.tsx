"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { heroSubjects } from "@/data/media";
import { products } from "@/data/products";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Slide {
  tag: string;
  title: string;
  accent: string;
  sub: string;
  cta: string;
  href: string;
  cta2: string;
  href2: string;
  subject: string;
  /** Light surface gradient behind the whole slide. */
  bg: string;
  /** Ambient colour glow behind the product cut-out. */
  glow: string;
  /** Small stat shown on the floating badge. */
  stat: string;
  statLabel: string;
}

const slides: Slide[] = [
  {
    tag: "Revendeur agréé",
    title: "Vidéosurveillance",
    accent: "professionnelle",
    sub: "Hikvision, Dahua et Ezviz — caméras IP, NVR et kits complets, installés et garantis.",
    cta: "Découvrir la sécurité",
    href: "/product-category/securite",
    cta2: "Demander un devis",
    href2: "/contact",
    subject: heroSubjects.cameraBullet,
    bg: "linear-gradient(120deg,#eef6fd,#dceafa 60%,#f6fbff)",
    glow: "rgba(26,143,227,.35)",
    stat: "40+",
    statLabel: "Marques",
  },
  {
    tag: "Solutions entreprise",
    title: "Équipez votre",
    accent: "infrastructure",
    sub: "Postes de travail, serveurs, réseau et impression — du poste unique au déploiement complet.",
    cta: "Voir l'informatique",
    href: "/product-category/informatique",
    cta2: "Nos marques",
    href2: "/recherche",
    subject: heroSubjects.monitor,
    bg: "linear-gradient(120deg,#fef4ec,#fde8dc 55%,#fffaf6)",
    glow: "rgba(255,122,24,.3)",
    stat: "24-72h",
    statLabel: "Livraison",
  },
  {
    tag: "Réseau & connectivité",
    title: "Infrastructure",
    accent: "réseau",
    sub: "Switches PoE, points d'accès Wi-Fi 6 et câblage structuré pour vos locaux professionnels.",
    cta: "Voir le réseau",
    href: "/product-category/informatique/reseau",
    cta2: "Nous contacter",
    href2: "/contact",
    subject: heroSubjects.networkSwitch,
    bg: "linear-gradient(120deg,#f1efff,#e4dffb 58%,#faf8ff)",
    glow: "rgba(91,75,214,.3)",
    stat: "7j/7",
    statLabel: "Support",
  },
];

const perks = ["Livraison 24-72h", "Produits garantis", "Support 7j/7"];

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative overflow-hidden" style={{ background: slide.bg }}>
              {/* Ambient glow behind the product */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[10%] top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full blur-[90px]"
                style={{ background: slide.glow }}
              />
              {/* Fine grid keeps the pale surface from reading as empty */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(13,27,42,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(13,27,42,.045) 1px, transparent 1px)",
                  backgroundSize: "58px 58px",
                }}
              />

              <div className="container-app relative grid items-center gap-10 py-14 md:grid-cols-[1.05fr_1fr] md:py-20 lg:py-24">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-heading shadow-[var(--shadow-sm)]">
                    <span className="h-2 w-2 rounded-full bg-brand-accent" />
                    {slide.tag}
                  </span>

                  <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.03] text-heading sm:text-5xl lg:text-[3.75rem]">
                    {slide.title}
                    <br />
                    <span className="text-brand-accent">{slide.accent}</span>
                  </h1>

                  <p className="mt-5 max-w-lg text-base leading-relaxed text-body">{slide.sub}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={slide.href}
                      className="group inline-flex items-center gap-2 rounded-xl bg-brand-navy px-7 py-4 font-heading text-sm font-bold text-white shadow-[var(--shadow-md)] transition-all hover:gap-3 hover:shadow-[var(--shadow-lg)]"
                    >
                      {slide.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href={slide.href2}
                      className="inline-flex items-center rounded-xl border border-border-strong bg-white px-7 py-4 font-heading text-sm font-bold text-heading transition-colors hover:border-brand hover:text-brand"
                    >
                      {slide.cta2}
                    </Link>
                  </div>

                  <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
                    {perks.map((label) => (
                      <li key={label} className="flex items-center gap-2 text-[13px] font-semibold text-body">
                        <Check className="h-4 w-4 text-brand-success" strokeWidth={3} />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product stage with floating stat badges */}
                <div className="relative hidden h-[320px] md:block lg:h-[400px]">
                  <div className="animate-float-slow relative h-full w-full drop-shadow-2xl">
                    <Image
                      src={slide.subject}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 768px) 0px, 45vw"
                      className="object-contain"
                    />
                  </div>

                  <div className="absolute right-2 top-6 rounded-2xl bg-white px-5 py-3 text-center shadow-[var(--shadow-lg)]">
                    <span className="block font-heading text-xl font-extrabold text-heading">
                      {slide.stat}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      {slide.statLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-0 rounded-2xl bg-white px-5 py-3 shadow-[var(--shadow-lg)]">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                      Références
                    </span>
                    <span className="font-heading text-xl font-extrabold text-heading">
                      {products.length.toLocaleString("fr-FR")}+
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
