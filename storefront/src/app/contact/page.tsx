import StaticPage from "@/components/layout/StaticPage";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <StaticPage title="Contact">
      <p>Une question sur un produit, une commande ou un service ? Contactez notre équipe.</p>
      <ul className="flex flex-col gap-1">
        <li>Téléphone : +212 5 22 00 00 00</li>
        <li>Email : contact@karamtech.ma</li>
        <li>Adresse : Casablanca, Maroc</li>
      </ul>
      <ContactForm />
    </StaticPage>
  );
}
