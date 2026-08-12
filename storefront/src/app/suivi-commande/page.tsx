import StaticPage from "@/components/layout/StaticPage";
import OrderTrackingForm from "@/components/forms/OrderTrackingForm";

export default function OrderTrackingPage() {
  return (
    <StaticPage title="Suivi de commande">
      <p>Entrez votre numéro de commande et votre adresse e-mail pour suivre l&apos;état de votre livraison.</p>
      <OrderTrackingForm />
    </StaticPage>
  );
}
