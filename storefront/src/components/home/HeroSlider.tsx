"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Headphones } from "lucide-react";
import { heroSubjects } from "@/data/media";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Slide {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  cta: string;
  href: string;
  secondaryCta: string;
  secondaryHref: string;
  subject: string;
  /** Background gradient stops for the slide surface. */
  from: string;
  via: string;
  /** Colour of the ambient glow behind the product. */
  glow: string;
}

const slides: Slide[] = [
  {
    eyebrow: "Revendeur agréé",
    title: "Vidéosurveillance",
    highlight: "professionnelle",
    subtitle:
      "Hikvision, Dahua et Ezviz — caméras IP, NVR et kits complets, installés et garantis.",
    cta: "Découvrir la sécurité",
    href: "/product-category/securite",
    secondaryCta: "Demander un devis",
    secondaryHref: "/contact",
    subject: heroSubjects.cameraBullet,
    from: "#041d31",
    via: "#0a4f80",
    glow: "rgba(0,163,255,0.35)",
  },
  {
    eyebrow: "Solutions entreprise",
    title: "Équipez votre",
    highlight: "infrastructure",
    subtitle:
      "Postes de travail, serveurs, réseau et impression — du poste unique au déploiement complet.",
    cta: "Voir l'informatique",
    href: "/product-category/informatique",
    secondaryCta: "Nos marques",
    secondaryHref: "/recherche",
    subject: heroSubjects.monitor,
    from: "#05263c",
    via: "#12658f",
    glow: "rgba(62,198,255,0.32)",
  },
  {
    eyebrow: "Réseau & connectivité",
    title: "Infrastructure",
    highlight: "réseau",
    subtitle:
      "Switches PoE, points d'accès Wi-Fi 6 et câblage structuré pour vos locaux professionnels.",
    cta: "Voir le réseau",
    href: "/product-category/informatique/reseau",
    secondaryCta: "Nous contacter",
    secondaryHref: "/contact",
    subject: heroSubjects.networkSwitch,
    from: "#1a1035",
    via: "#4b2a9c",
    glow: "rgba(161,124,255,0.32)",
  },
];

const perks = [
  { Icon: Truck, label: "Livraison 24-72h" },
  { Icon: ShieldCheck, label: "Produits garantis" },
  { Icon: Headphones, label: "Support 7j/7" },
];

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
            <div
              className="relative overflow-hidden"
              style={{ background: `linear-gradient(120deg, ${slide.from} 0%, ${slide.via} 100%)` }}
            >
              {/* Ambient glow behind the product */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-[100px]"
                style={{ background: slide.glow }}
              />
              {/* Fine grid texture keeps the flat gradient from looking empty */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />

              <div className="container-app relative grid items-center gap-8 py-14 md:grid-cols-[1.05fr_1fr] md:py-20 lg:py-24">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                    {slide.eyebrow}
                  </span>

                  <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                    <br />
                    <span className="bg-gradient-to-r from-brand-accent to-amber-300 bg-clip-text text-transparent">
                      {slide.highlight}
                    </span>
                  </h1>

                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                    {slide.subtitle}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={slide.href}
                      className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-heading text-sm font-bold text-brand-navy shadow-lg transition-all hover:gap-3 hover:shadow-xl"
                    >
                      {slide.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href={slide.secondaryHref}
                      className="inline-flex items-center rounded-xl border border-white/25 px-7 py-3.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10"
                    >
                      {slide.secondaryCta}
                    </Link>
                  </div>

                  <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
                    {perks.map(({ Icon, label }) => (
                      <li key={label} className="flex items-center gap-2 text-xs font-medium text-white/65">
                        <Icon className="h-4 w-4 text-brand-accent" strokeWidth={2} />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product cut-out — decorative, hidden on small screens */}
                <div className="relative hidden h-[300px] md:block lg:h-[380px]">
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
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
