"use client";

import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <input placeholder="Votre nom" className="rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
      <input placeholder="Votre email" type="email" className="rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
      <textarea placeholder="Votre message" rows={4} className="rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
      <Button type="submit" className="w-fit">Envoyer</Button>
    </form>
  );
}
