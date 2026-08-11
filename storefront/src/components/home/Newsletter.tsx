"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    // No mailing backend yet — confirm locally rather than pretend to send.
    setStatus("done");
    setEmail("");
  }

  return (
    <section id="contact" className="border-t border-brand-border bg-[#f7f9fc]">
      <div className="container-app py-14 lg:py-20">
        <Reveal>
          <div
            className="relative grid items-center gap-8 overflow-hidden rounded-[26px] p-8 text-white shadow-[0_30px_70px_rgba(11,111,196,.28)] sm:p-12 lg:grid-cols-2"
            style={{ background: "linear-gradient(120deg,#0b6fc4,#1a8fe3 55%,#5b4bd6)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[10%] -inset-y-[40%]"
              style={{
                background:
                  "radial-gradient(35% 35% at 80% 40%, rgba(255,255,255,.28), transparent 70%)",
              }}
            />

            <div className="relative">
              <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-[2.375rem]">
                Recevez les nouveautés et les promos pro
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                Une newsletter courte, deux fois par mois. Arrivages, baisses de prix et fiches
                techniques.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="relative flex flex-wrap gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="votre@email.ma"
                aria-invalid={status === "error"}
                className="h-14 min-w-0 flex-1 basis-[220px] rounded-2xl border border-white/35 bg-white/15 px-5 text-[15px] text-white outline-none placeholder:text-white/60 focus:border-white"
              />
              <button
                type="submit"
                className="h-14 shrink-0 rounded-2xl bg-white px-7 font-heading text-[14.5px] font-extrabold text-brand transition-transform hover:-translate-y-0.5"
              >
                {status === "done" ? "Inscrit ✓" : "S'inscrire"}
              </button>

              {status === "error" && (
                <p className="basis-full text-sm text-white">
                  Merci de saisir une adresse e-mail valide.
                </p>
              )}
              {status === "done" && (
                <p className="basis-full text-sm text-white/90">
                  Merci ! Vous recevrez nos prochaines actualités.
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
