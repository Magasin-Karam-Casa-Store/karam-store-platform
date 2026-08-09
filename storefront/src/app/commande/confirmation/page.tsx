"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Package, Truck, Phone, Mail } from "lucide-react";
import { useOrderStore, PAYMENT_LABELS } from "@/store/order";
import { useMounted } from "@/lib/useMounted";
import { formatMAD } from "@/lib/utils";
import { STORE } from "@/lib/config";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
  const mounted = useMounted();
  const order = useOrderStore((s) => s.lastOrder);

  if (!mounted) {
    return (
      <>
        <Breadcrumb items={[{ label: "Confirmation" }]} />
        <div className="container-app py-16">
          <p className="text-sm text-body">Chargement…</p>
        </div>
      </>
    );
  }

  // Direct visit with no order in memory (refresh, bookmark, shared link).
  if (!order) {
    return (
      <>
        <Breadcrumb items={[{ label: "Confirmation" }]} />
        <div className="container-app py-16 text-center">
          <Package className="mx-auto h-12 w-12 text-muted" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-heading">
            Aucune commande à afficher
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-body">
            Cette page affiche le récapitulatif juste après la validation d&apos;une commande. Pour
            retrouver une commande passée, utilisez le suivi de commande ou contactez-nous.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/">
              <Button size="lg">Retour à la boutique</Button>
            </Link>
            <Link href="/suivi-commande">
              <Button variant="outline" size="lg">Suivre une commande</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const { customer } = order;

  return (
    <>
      <Breadcrumb items={[{ label: "Commande confirmée" }]} />
      <div className="container-app py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
            <h1 className="mt-4 font-heading text-2xl font-bold text-emerald-800 sm:text-3xl">
              Merci pour votre commande !
            </h1>
            <p className="mt-2 text-sm text-emerald-800/80">
              Votre commande a bien été enregistrée. Notre équipe vous contactera pour la confirmer.
            </p>
            <p className="mt-4 inline-block rounded-md border border-emerald-300 bg-white px-4 py-2 font-heading text-sm font-bold tracking-wide text-emerald-800">
              Référence : {order.reference}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InfoCard title="Livraison" Icon={Truck}>
              <p className="font-medium text-heading">
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address}</p>
              <p>
                {customer.city}
                {customer.postalCode ? ` — ${customer.postalCode}` : ""}
              </p>
              <p className="mt-2 text-xs text-muted">
                Délai estimé : {STORE.deliveryWindow}
              </p>
            </InfoCard>

            <InfoCard title="Paiement" Icon={Package}>
              <p className="font-medium text-heading">{PAYMENT_LABELS[order.paymentMethod]}</p>
              {order.paymentMethod === "cod" && (
                <p className="mt-1 text-xs">Préparez le montant exact à remettre au livreur.</p>
              )}
              {order.paymentMethod === "virement" && (
                <p className="mt-1 text-xs">
                  Nos coordonnées bancaires vous seront envoyées à {customer.email}.
                </p>
              )}
              {order.paymentMethod === "cmi" && (
                <p className="mt-1 text-xs">
                  Un lien de paiement sécurisé CMI vous sera transmis par e-mail.
                </p>
              )}
            </InfoCard>
          </div>

          <section className="mt-8 rounded-lg border border-brand-border">
            <h2 className="border-b border-brand-border px-6 py-4 font-heading text-base font-bold uppercase text-heading">
              Récapitulatif
            </h2>
            <ul className="flex flex-col divide-y divide-brand-border">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-center gap-4 px-6 py-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded border border-brand-border bg-white">
                    <Image src={item.image} alt={item.title} fill sizes="64px" className="object-contain p-1.5" />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/produit/${item.slug}`}
                      className="line-clamp-2 font-product text-sm text-heading hover:text-brand"
                    >
                      {item.title}
                    </Link>
                    <span className="text-xs text-muted">
                      {item.quantity} × {formatMAD(item.price)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-heading">
                    {formatMAD(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="flex flex-col gap-2 border-t border-brand-border px-6 py-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-body">Sous-total</dt>
                <dd className="text-heading">{formatMAD(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-body">Livraison</dt>
                <dd className="text-heading">
                  {order.shipping === 0 ? "Gratuite" : formatMAD(order.shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-brand-border pt-2 text-base font-bold">
                <dt className="text-heading">Total</dt>
                <dd className="text-brand">{formatMAD(order.total)}</dd>
              </div>
            </dl>
          </section>

          <div className="mt-8 rounded-lg bg-brand-gray p-6 text-center text-sm text-body">
            <p className="font-semibold text-heading">Une question sur votre commande ?</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href={STORE.phoneHref} className="flex items-center gap-2 hover:text-brand">
                <Phone className="h-4 w-4 text-brand" /> {STORE.phone}
              </a>
              <a href={`mailto:${STORE.email}`} className="flex items-center gap-2 hover:text-brand">
                <Mail className="h-4 w-4 text-brand" /> {STORE.email}
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/">
              <Button size="lg">Continuer mes achats</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoCard({
  title,
  Icon,
  children,
}: {
  title: string;
  Icon: typeof Truck;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-brand-border p-5 text-sm text-body">
      <h2 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold uppercase text-heading">
        <Icon className="h-4 w-4 text-brand" /> {title}
      </h2>
      {children}
    </div>
  );
}
