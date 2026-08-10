"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AccountForms() {
  const router = useRouter();
  const [loginMsg, setLoginMsg] = useState<string | null>(null);
  const [registerMsg, setRegisterMsg] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginMsg("Connexion réussie. Redirection vers l'accueil...");
    setTimeout(() => router.push("/"), 1200);
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegisterMsg("Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.");
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="rounded-lg border border-brand-border p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-bold text-brand-navy">Connexion</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-brand-navy">
              Nom d&apos;utilisateur ou adresse e-mail *
            </label>
            <input id="username" name="username" required type="text" className="w-full rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-brand-navy">Mot de passe *</label>
            <input id="password" name="password" required type="password" className="w-full rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" name="remember" className="accent-[--brand-primary]" />
            Se souvenir de moi
          </label>
          <Button type="submit" size="lg">Se connecter</Button>
          <a href="#" className="text-sm text-brand hover:underline">Mot de passe oublié ?</a>
          {loginMsg && <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{loginMsg}</p>}
        </form>
      </div>

      <div className="rounded-lg border border-brand-border p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-bold text-brand-navy">Inscription</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label htmlFor="reg_name" className="mb-1 block text-sm font-medium text-brand-navy">Nom complet *</label>
            <input id="reg_name" name="name" required type="text" className="w-full rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
          </div>
          <div>
            <label htmlFor="reg_email" className="mb-1 block text-sm font-medium text-brand-navy">Adresse e-mail *</label>
            <input id="reg_email" name="email" required type="email" className="w-full rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
          </div>
          <div>
            <label htmlFor="reg_password" className="mb-1 block text-sm font-medium text-brand-navy">Mot de passe *</label>
            <input id="reg_password" name="password" required type="password" className="w-full rounded-md border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand" />
          </div>
          <p className="text-xs text-gray-500">
            Vos données personnelles seront utilisées pour vous accompagner au cours de votre visite du site web,
            gérer l&apos;accès à votre compte, et pour d&apos;autres raisons décrites dans notre politique de confidentialité.
          </p>
          <Button type="submit" variant="dark" size="lg">S&apos;inscrire</Button>
          {registerMsg && <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{registerMsg}</p>}
        </form>
      </div>
    </div>
  );
}
