import { Truck, Zap, ShieldCheck, Headphones } from "lucide-react";
import { STORE } from "@/lib/config";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const badges = [
  {
    Icon: Truck,
    title: "Livraison gratuite",
    text: `Pour tout achat supérieur à ${STORE.freeShippingThreshold} DHS`,
  },
  { Icon: Zap, title: "Livraison express", text: "Livraisons rapides chez vous" },
  { Icon: ShieldCheck, title: "Sécurisé", text: "Parcours d'achat 100% sécurisé" },
  { Icon: Headphones, title: "Support et SAV", text: "Support client 24h/24 et 7j/7" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-brand-border bg-white py-12">
      <StaggerGroup className="container-app grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map(({ Icon, title, text }) => (
          <StaggerItem key={title}>
            <div className="group flex flex-col items-center gap-3 text-center">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand/25 text-brand transition-all duration-300 group-hover:scale-110 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand">
                {title}
              </h3>
              <p className="text-sm text-body">{text}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
