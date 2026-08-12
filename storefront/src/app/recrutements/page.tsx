import StaticPage from "@/components/layout/StaticPage";
import { STORE } from "@/lib/config";

export default function RecrutementsPage() {
  return (
    <StaticPage title="Recrutements">
      <p>
        Karamtech grandit, et ce sont les femmes et les hommes de l&apos;équipe qui portent cette croissance. Nous
        recherchons régulièrement des profils motivés, curieux et rigoureux, aussi bien dans la vente et le conseil
        technique que dans la logistique et l&apos;ingénierie. Si la technologie vous passionne et que le service
        client vous tient à cœur, votre candidature nous intéresse.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Postes régulièrement ouverts</h2>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>
          <span className="font-semibold text-brand-navy">Commercial(e) B2B / B2C</span> — développement du
          portefeuille clients, établissement de devis, suivi des comptes entreprises et administrations. Profil
          Bac+2 minimum, aisance relationnelle et goût pour la prospection.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Technicien(ne) support &amp; SAV</span> — diagnostic et
          réparation de matériel informatique et bureautique, gestion des dossiers de garantie, assistance
          téléphonique aux clients. Formation en maintenance informatique appréciée.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Ingénieur(e) réseau &amp; sécurité</span> — étude,
          déploiement et maintenance d&apos;infrastructures réseau, de systèmes de vidéosurveillance et de contrôle
          d&apos;accès chez nos clients professionnels. Bac+5 ou équivalent, certifications constructeur bienvenues.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Magasinier(ère) / gestionnaire de stock</span> —
          réception, contrôle et rangement des marchandises, préparation des commandes, inventaires et coordination
          avec les transporteurs. Rigueur et sens de l&apos;organisation indispensables.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Chargé(e) e-commerce</span> — enrichissement du catalogue
          en ligne, rédaction de fiches produits, suivi des commandes web et relation client digitale.
        </li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Ce que nous offrons</h2>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>Un environnement de travail technique et varié, au contact des dernières technologies du marché.</li>
        <li>Une formation continue sur les produits et les solutions de nos partenaires constructeurs.</li>
        <li>Une rémunération motivante, complétée de primes sur objectifs pour les fonctions commerciales.</li>
        <li>Une équipe à taille humaine où les initiatives sont écoutées et les responsabilités confiées vite.</li>
        <li>De réelles perspectives d&apos;évolution au sein d&apos;une entreprise en développement.</li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Comment postuler</h2>
      <p>
        Envoyez votre CV accompagné d&apos;une courte lettre de motivation à l&apos;adresse {STORE.email}, en
        indiquant en objet l&apos;intitulé du poste visé (par exemple « Candidature — Technicien support »). Merci
        de préciser votre disponibilité et votre ville de résidence. Les candidatures spontanées sont également les
        bienvenues : mentionnez simplement « Candidature spontanée » en objet et décrivez le type de fonction qui
        vous intéresse.
      </p>
      <p>
        Chaque candidature est étudiée avec attention. Les profils retenus sont contactés sous quinze jours pour un
        premier entretien, généralement suivi d&apos;un échange technique avec le responsable du service concerné.
        Pour toute question sur nos recrutements, vous pouvez nous joindre au {STORE.phone}.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Stages et alternance</h2>
      <p>
        Karamtech accueille chaque année des stagiaires et des alternants issus des filières informatique,
        électronique, réseaux, commerce et logistique. Les demandes de stage se font par e-mail à
        {STORE.email}, de préférence deux mois avant la date de début souhaitée, en joignant votre convention
        type et le descriptif attendu de la mission.
      </p>
    </StaticPage>
  );
}
