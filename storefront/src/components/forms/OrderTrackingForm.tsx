"use client";

import { Button } from "@/components/ui/button";

export default function OrderTrackingForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <input placeholder="Numéro de commande" className="rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
      <input placeholder="Adresse e-mail" type="email" className="rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
      <Button type="submit" className="w-fit">Suivre ma commande</Button>
    </form>
  );
}
