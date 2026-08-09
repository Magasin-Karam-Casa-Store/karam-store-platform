"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Truck, Landmark, CreditCard, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useOrderStore, type PaymentMethod } from "@/store/order";
import { useMounted } from "@/lib/useMounted";
import { formatMAD, cn } from "@/lib/utils";
import { STORE } from "@/lib/config";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

type FieldErrors = Partial<Record<keyof FormState | "terms", string>>;

const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  label: string;
  description: string;
  Icon: typeof Truck;
}[] = [
  {
    value: "cod",
    label: "Paiement à la livraison",
    description: "Payez en espèces au livreur à la réception de votre commande.",
    Icon: Truck,
  },
  {
    value: "virement",
    label: "Virement bancaire",
    description: "Nos coordonnées bancaires vous seront envoyées par e-mail après validation.",
    Icon: Landmark,
  },
  {
    value: "cmi",
    label: "Carte bancaire (CMI)",
    description:
      "Vous serez redirigé vers la plateforme de paiement sécurisée CMI pour finaliser le règlement.",
    Icon: CreditCard,
  },
];

/** Moroccan mobile/landline, tolerant of spaces, dashes and +212. */
const PHONE_PATTERN = /^(?:\+212|0)\s?[5-7](?:[\s.-]?\d{2}){4}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function buildOrderReference(): string {
  // Called from a submit handler only — never during render.
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `KT-${stamp}-${random}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useMounted();
  const { items, subtotal, clearCart } = useCartStore();
  const placeOrder = useOrderStore((s) => s.placeOrder);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const sub = subtotal();
  const shipping = items.length === 0 || sub >= STORE.freeShippingThreshold ? 0 : STORE.shippingFlatRate;
  const total = sub + shipping;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.firstName.trim()) next.firstName = "Le prénom est requis.";
    if (!form.lastName.trim()) next.lastName = "Le nom est requis.";
    if (!form.phone.trim()) next.phone = "Le téléphone est requis.";
    else if (!PHONE_PATTERN.test(form.phone.trim()))
      next.phone = "Numéro invalide. Exemple : 0612 34 56 78";
    if (!form.email.trim()) next.email = "L'adresse e-mail est requise.";
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = "Adresse e-mail invalide.";
    if (!form.address.trim()) next.address = "L'adresse est requise.";
    if (!form.city.trim()) next.city = "La ville est requise.";
    if (form.postalCode.trim() && !/^\d{5}$/.test(form.postalCode.trim()))
      next.postalCode = "Le code postal doit contenir 5 chiffres.";
    if (!acceptedTerms) next.terms = "Vous devez accepter les conditions générales de vente.";
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>("[data-field-error='true']")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setSubmitting(true);
    placeOrder({
      reference: buildOrderReference(),
      items,
      subtotal: sub,
      shipping,
      total,
      paymentMethod: payment,
      customer: { ...form },
    });
    clearCart();
    router.push("/commande/confirmation");
  }

  // Render nothing cart-dependent until mounted: the cart lives in localStorage
  // and would otherwise mismatch the server-rendered markup.
  if (!mounted) {
    return (
      <>
        <Breadcrumb items={[{ label: "Panier", href: "/panier" }, { label: "Commande" }]} />
        <div className="container-app py-16">
          <p className="text-sm text-body">Chargement de votre commande…</p>
        </div>
      </>
    );
  }

  // While submitting the cart has already been cleared, so skip the empty-cart
  // branch to avoid flashing "panier vide" during the redirect.
  if (items.length === 0 && !submitting) {
    return (
      <>
        <Breadcrumb items={[{ label: "Panier", href: "/panier" }, { label: "Commande" }]} />
        <div className="container-app py-16 text-center">
          <h1 className="font-heading text-2xl font-bold text-heading">Votre panier est vide</h1>
          <p className="mt-2 text-sm text-body">
            Ajoutez des produits à votre panier avant de passer commande.
          </p>
          <Link href="/">
            <Button className="mt-6" size="lg">Continuer mes achats</Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Panier", href: "/panier" }, { label: "Commande" }]} />
      <div className="container-app py-10">
        <h1 className="mb-8 font-heading text-2xl font-bold uppercase text-heading sm:text-3xl">
          Finaliser la commande
        </h1>

        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          {/* ---------------- Billing / delivery details ---------------- */}
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="mb-4 font-heading text-lg font-bold uppercase text-heading">
                Détails de livraison
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="firstName"
                  label="Prénom"
                  required
                  value={form.firstName}
                  error={errors.firstName}
                  onChange={(v) => update("firstName", v)}
                  autoComplete="given-name"
                />
                <Field
                  id="lastName"
                  label="Nom"
                  required
                  value={form.lastName}
                  error={errors.lastName}
                  onChange={(v) => update("lastName", v)}
                  autoComplete="family-name"
                />
                <Field
                  id="phone"
                  label="Téléphone"
                  required
                  type="tel"
                  placeholder="0612 34 56 78"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(v) => update("phone", v)}
                  autoComplete="tel"
                />
                <Field
                  id="email"
                  label="Adresse e-mail"
                  required
                  type="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => update("email", v)}
                  autoComplete="email"
                />
                <div className="sm:col-span-2">
                  <Field
                    id="address"
                    label="Adresse"
                    required
                    placeholder="Rue, numéro, quartier"
                    value={form.address}
                    error={errors.address}
                    onChange={(v) => update("address", v)}
                    autoComplete="street-address"
                  />
                </div>
                <Field
                  id="city"
                  label="Ville"
                  required
                  value={form.city}
                  error={errors.city}
                  onChange={(v) => update("city", v)}
                  autoComplete="address-level2"
                />
                <Field
                  id="postalCode"
                  label="Code postal"
                  inputMode="numeric"
                  value={form.postalCode}
                  error={errors.postalCode}
                  onChange={(v) => update("postalCode", v)}
                  autoComplete="postal-code"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-heading">
                    Notes de commande <span className="font-normal text-muted">(facultatif)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Instructions de livraison, point de repère…"
                    className="w-full rounded-md border border-brand-border px-3 py-2 text-sm outline-none transition-colors focus:border-brand"
                  />
                </div>
              </div>
            </section>

            {/* ---------------- Payment method ---------------- */}
            <section>
              <h2 className="mb-4 font-heading text-lg font-bold uppercase text-heading">
                Mode de paiement
              </h2>
              <div className="flex flex-col gap-3">
                {PAYMENT_OPTIONS.map(({ value, label, description, Icon }) => (
                  <label
                    key={value}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors",
                      payment === value
                        ? "border-brand bg-brand/5"
                        : "border-brand-border hover:border-brand/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={payment === value}
                      onChange={() => setPayment(value)}
                      className="mt-1 accent-[#007bc4]"
                    />
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span>
                      <span className="block text-sm font-semibold text-heading">{label}</span>
                      <span className="mt-0.5 block text-xs text-body">{description}</span>
                    </span>
                  </label>
                ))}
              </div>
              {payment === "cmi" && (
                <p className="mt-3 flex items-start gap-2 rounded-md bg-brand-gray p-3 text-xs text-body">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  Aucune donnée bancaire n&apos;est saisie ni stockée sur ce site. Le paiement est
                  traité directement par la plateforme sécurisée du Centre Monétique Interbancaire.
                </p>
              )}
            </section>
          </div>

          {/* ---------------- Order summary ---------------- */}
          <aside className="h-fit rounded-lg border border-brand-border p-6 lg:sticky lg:top-6">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase text-heading">
              Votre commande
            </h2>

            <ul className="flex max-h-72 flex-col gap-3 overflow-y-auto border-b border-brand-border pb-4">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded border border-brand-border bg-white">
                    <Image src={item.image} alt={item.title} fill sizes="56px" className="object-contain p-1" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="line-clamp-2 font-product text-xs text-heading">{item.title}</span>
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

            <dl className="flex flex-col gap-2 py-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-body">Sous-total</dt>
                <dd className="font-medium text-heading">{formatMAD(sub)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-body">Livraison</dt>
                <dd className="font-medium text-heading">
                  {shipping === 0 ? "Gratuite" : formatMAD(shipping)}
                </dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-brand-border pt-3 text-base">
                <dt className="font-bold text-heading">Total</dt>
                <dd className="font-bold text-brand">{formatMAD(total)}</dd>
              </div>
            </dl>

            <label className="flex items-start gap-2 text-xs text-body" data-field-error={!!errors.terms}>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  setErrors((prev) => ({ ...prev, terms: undefined }));
                }}
                className="mt-0.5 accent-[#007bc4]"
              />
              <span>
                J&apos;ai lu et j&apos;accepte les{" "}
                <Link href="/conditions-generales-de-vente" className="text-brand hover:underline">
                  conditions générales de vente
                </Link>
                .
              </span>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}

            <Button type="submit" size="lg" className="mt-5 w-full" disabled={submitting}>
              <Lock className="h-4 w-4" />
              {submitting ? "Traitement…" : "Confirmer la commande"}
            </Button>

            <p className="mt-3 text-center text-xs text-muted">
              Livraison sous {STORE.deliveryWindow} partout au Maroc
            </p>
          </aside>
        </form>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
}) {
  return (
    <div data-field-error={!!error}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-heading">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors",
          error ? "border-red-400 focus:border-red-500" : "border-brand-border focus:border-brand"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
