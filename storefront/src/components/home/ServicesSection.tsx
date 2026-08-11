import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { editorialBanners } from "@/data/media";
import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: "1 400+", label: "Installations livrées" },
  { value: "48h", label: "Délai d'intervention" },
  { value: "7j/7", label: "Support technique" },
];

/**
 * Dark "installation & intégration" band: the services pitch that separates
 * Karamtech from a pure box-shifter.
 */
export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      {/* Aurora wash behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[10%] -inset-y-[30%]"
        style={{
          background:
            "radial-gradient(40% 40% at 30% 50%, rgba(26,143,227,.4), transparent 70%)",
        }}
      />

      <div className="container-app relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <Reveal>
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6fc0f5]">
            <span className="h-0.5 w-7 bg-[#6fc0f5]" />
            Installation &amp; intégration
          </div>

          <h2 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.875rem]">
            On ne vend pas juste du matériel — on le met en service.
          </h2>

          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-white/75">
            Audit, câblage structuré, installation de caméras, configuration réseau et maintenance :
            nos techniciens interviennent partout au Maroc.
          </p>

          <dl className="mt-8 grid max-w-lg grid-cols-1 gap-3.5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/[0.07] px-[18px] py-4"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-heading text-2xl font-extrabold text-white">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-white/65">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-3 rounded-2xl px-7 py-4 font-heading text-[15px] font-extrabold text-[#10202f] transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#ff7a18,#ff9d3f)" }}
          >
            Demander un devis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal direction="left">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
            <div className="relative aspect-[16/10]">
              <Image
                src={editorialBanners.informatique}
                alt="Intervention technique Karamtech"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
