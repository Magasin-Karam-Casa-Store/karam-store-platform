import { Truck, Zap, ShieldCheck, Headphones } from "lucide-react";
import { STORE } from "@/lib/config";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const badges = [
  {
    Icon: Truck,
    title: "Livraison offerte",
    text: `Dès ${STORE.freeShippingThreshold.toLocaleString("fr-FR")} DH d'achat`,
  },
  { Icon: Zap, title: "Expédition rapide", text: `Partout au Maroc en ${STORE.deliveryWindow}` },
  { Icon: ShieldCheck, title: "Produits garantis", text: "Garantie constructeur incluse" },
  { Icon: Headphones, title: "Conseil expert", text: "Une équipe technique à l'écoute" },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-brand-border bg-surface">
      <StaggerGroup className="container-app grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {badges.map(({ Icon, title, text }) => (
          <StaggerItem key={title}>
            <div className="group flex items-center gap-4 px-2 py-7 lg:px-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-heading text-sm font-bold text-heading">{title}</h3>
                <p className="mt-0.5 text-[13px] text-body">{text}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
