import StaticPage from "@/components/layout/StaticPage";
import ContactForm from "@/components/forms/ContactForm";
import { STORE } from "@/lib/config";

export default function ContactPage() {
  return (
    <StaticPage title="Contact">
      <p>Une question sur un produit, une commande ou un service ? Contactez notre équipe.</p>
      <ul className="flex flex-col gap-1">
        <li>Téléphone (Fixe) : <a href={STORE.phoneHref} className="text-brand hover:underline">{STORE.phone}</a></li>
        <li>WhatsApp : <a href={STORE.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{STORE.whatsappPhone}</a></li>
        <li>Email : <a href={`mailto:${STORE.email}`} className="text-brand hover:underline">{STORE.email}</a></li>
        <li>Adresse : {STORE.address}</li>
      </ul>
      <ContactForm />
    </StaticPage>
  );
}
