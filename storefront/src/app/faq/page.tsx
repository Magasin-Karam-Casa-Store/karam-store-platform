import StaticPage from "@/components/layout/StaticPage";

const faqs = [
  { q: "Quels sont les délais de livraison ?", a: "La livraison s'effectue généralement sous 24 à 72h partout au Maroc selon la ville." },
  { q: "Puis-je payer à la livraison ?", a: "Oui, le paiement à la livraison est disponible pour la majorité des produits." },
  { q: "Les produits sont-ils garantis ?", a: "Tous nos produits neufs bénéficient de la garantie constructeur. Les produits reconditionnés sont garantis 6 à 12 mois." },
];

export default function FaqPage() {
  return (
    <StaticPage title="Questions fréquentes">
      {faqs.map((item) => (
        <div key={item.q}>
          <h3 className="font-semibold text-brand-navy">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </StaticPage>
  );
}
