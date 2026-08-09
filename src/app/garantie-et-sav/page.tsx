import StaticPage from "@/components/layout/StaticPage";

export default function GarantieEtSavPage() {
  return (
    <StaticPage title="Garantie et SAV">
      <p>
        Tous les produits distribués par Karamtech proviennent de circuits officiels et bénéficient à ce titre de la
        garantie constructeur. Notre service après-vente, basé à Casablanca, assure l&apos;interface entre vous et
        les fabricants afin de vous éviter des démarches longues et incertaines.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Durées de garantie</h2>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>
          <span className="font-semibold text-brand-navy">Matériel neuf</span> — 12 mois de garantie constructeur au
          minimum, à compter de la date de facturation. Certaines gammes professionnelles (serveurs, imprimantes
          laser, onduleurs, panneaux solaires) bénéficient de durées supérieures, précisées sur la fiche produit.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Matériel reconditionné</span> — 6 à 12 mois de garantie
          selon le produit et son état, après test complet et remise en état par nos techniciens.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Consommables et accessoires</span> — garantie limitée aux
          défauts de fabrication constatés à l&apos;ouverture, hors usure normale.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Batteries et pièces d&apos;usure</span> — généralement 3 à
          6 mois, conformément aux conditions du constructeur.
        </li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Ce que couvre la garantie</h2>
      <p>
        La garantie couvre l&apos;ensemble des défauts de fabrication et des pannes survenant dans le cadre
        d&apos;un usage normal du produit : composant défaillant, dysfonctionnement électronique, défaut
        d&apos;assemblage ou panne prématurée. Selon la politique du constructeur et la disponibilité des pièces, la
        prise en charge se traduit par une réparation, un échange standard ou le remplacement du produit par un
        modèle équivalent.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Ce que la garantie ne couvre pas</h2>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>Les dommages physiques : chutes, chocs, écrans brisés, boîtiers fissurés, liquide renversé.</li>
        <li>Les dégâts liés aux surtensions, à la foudre ou à une alimentation électrique non conforme.</li>
        <li>Les pannes résultant d&apos;une installation incorrecte ou d&apos;une utilisation non conforme à la notice.</li>
        <li>Les interventions, réparations ou modifications effectuées par un tiers non agréé.</li>
        <li>Les produits dont le numéro de série ou le sceau de garantie a été retiré, effacé ou altéré.</li>
        <li>L&apos;usure normale, les problèmes purement logiciels, les virus et la perte de données.</li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Faire une demande de prise en charge</h2>
      <p>
        Contactez notre service après-vente au +212 5 22 00 00 00 ou par e-mail à contact@karamtech.ma en indiquant
        votre numéro de facture, la référence et le numéro de série du produit, ainsi qu&apos;une description
        précise du problème rencontré (message d&apos;erreur, circonstances d&apos;apparition, photos ou vidéo si
        possible). Un numéro de dossier SAV vous est alors attribué.
      </p>
      <p>
        Le produit doit ensuite nous être remis, de préférence dans son emballage d&apos;origine avec ses
        accessoires, soit par dépôt dans notre magasin de Casablanca, soit par expédition à l&apos;adresse
        communiquée avec votre numéro de dossier. Pensez à sauvegarder vos données au préalable : Karamtech ne peut
        être tenu responsable de leur perte lors d&apos;une intervention technique.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Délais de traitement</h2>
      <p>
        Un premier diagnostic est établi sous 48 à 72 heures ouvrées après réception du matériel. La durée totale de
        traitement dépend de la nature de la panne et de la politique du constructeur : elle est généralement de 5 à
        10 jours ouvrés pour une réparation en atelier, et peut atteindre 2 à 4 semaines lorsqu&apos;un envoi au
        centre agréé de la marque ou une commande de pièce à l&apos;étranger s&apos;avère nécessaire. Vous êtes tenu
        informé de l&apos;avancement de votre dossier à chaque étape.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Interventions hors garantie</h2>
      <p>
        Lorsque la panne n&apos;entre pas dans le cadre de la garantie, notre atelier peut réaliser un devis de
        réparation payante. Le devis vous est communiqué avant toute intervention et n&apos;engage aucun frais tant
        que vous ne l&apos;avez pas accepté. En cas de refus, le matériel vous est restitué en l&apos;état.
      </p>
    </StaticPage>
  );
}
