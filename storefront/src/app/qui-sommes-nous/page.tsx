import StaticPage from "@/components/layout/StaticPage";
import { STORE } from "@/lib/config";

export default function QuiSommesNousPage() {
  return (
    <StaticPage title="Qui sommes-nous ?">
      <p>
        Karamtech est une société marocaine basée à Casablanca, spécialisée dans la distribution et
        l&apos;intégration de solutions technologiques. Née de la volonté de rendre le matériel informatique
        professionnel accessible aux particuliers comme aux entreprises, notre enseigne s&apos;est progressivement
        imposée comme un interlocuteur de référence sur le marché national.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Notre histoire</h2>
      <p>
        Nos débuts se sont construits autour d&apos;un point de vente dédié à l&apos;informatique et à la
        bureautique. Au fil des années, l&apos;écoute de nos clients nous a conduits à élargir notre offre bien
        au-delà du PC et de l&apos;imprimante : sécurité électronique, énergie solaire, téléphonie, sonorisation.
        Aujourd&apos;hui, notre catalogue rassemble plusieurs milliers de références disponibles en magasin et en
        ligne, soutenues par une logistique capable de livrer partout au Maroc en 24 à 72 heures.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Nos domaines d&apos;expertise</h2>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>
          <span className="font-semibold text-brand-navy">Informatique</span> — ordinateurs portables et de bureau,
          stations de travail, serveurs, composants, périphériques, stockage et accessoires, en neuf comme en
          reconditionné.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Impression &amp; bureautique</span> — imprimantes laser et
          jet d&apos;encre, multifonctions, traceurs, scanners, consommables originaux et solutions de gestion
          documentaire.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Sécurité électronique</span> — caméras de
          vidéosurveillance, enregistreurs NVR et DVR, contrôle d&apos;accès, alarmes et interphonie.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Énergie solaire</span> — panneaux photovoltaïques,
          onduleurs, batteries, régulateurs et kits complets pour installations résidentielles et professionnelles.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Téléphonie &amp; réseaux</span> — smartphones,
          téléphonie IP, routeurs, switchs, points d&apos;accès Wi-Fi et équipements de câblage structuré.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Image &amp; sonorisation</span> — vidéoprojecteurs,
          écrans professionnels, systèmes de sonorisation, micros et solutions de visioconférence.
        </li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Un service pour les particuliers et pour les entreprises</h2>
      <p>
        Nous servons aussi bien le grand public que les professionnels. Les particuliers trouvent chez Karamtech un
        conseil impartial et des prix étudiés ; les entreprises, administrations, écoles et associations bénéficient
        quant à elles d&apos;un accompagnement dédié : établissement de devis, tarifs dégressifs par volume,
        facturation conforme, marchés publics, installation sur site et contrats de maintenance.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Nos partenaires</h2>
      <p>
        Karamtech travaille directement avec les distributeurs officiels des plus grandes marques du secteur, ce qui
        garantit à nos clients des produits authentiques couverts par la garantie constructeur. Nous référençons
        notamment HP, Dell, Lenovo, Canon, Epson, Hikvision, Dahua, TP-Link, Ubiquiti, APC et Logitech, parmi de
        nombreuses autres marques.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Nos engagements</h2>
      <p>
        La confiance de nos clients repose sur trois principes simples : des produits d&apos;origine et garantis, un
        conseil technique honnête avant l&apos;achat, et un service après-vente qui répond réellement. Notre équipe
        est joignable au {STORE.phone} ou sur WhatsApp au {STORE.whatsappPhone} ou à l&apos;adresse {STORE.email}, du lundi au samedi.
      </p>
    </StaticPage>
  );
}
