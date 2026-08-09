import StaticPage from "@/components/layout/StaticPage";

export default function CommentAcheterPage() {
  return (
    <StaticPage title="Comment acheter ?">
      <p>
        Commander sur Karamtech.ma est simple, rapide et sécurisé. Que vous soyez un particulier à la recherche
        d&apos;un ordinateur portable ou une entreprise qui équipe ses bureaux, ce guide vous accompagne pas à pas,
        de la recherche du produit jusqu&apos;à la réception de votre colis.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">1. Trouver le produit qui vous convient</h2>
      <p>
        Vous pouvez parcourir notre catalogue par catégorie (informatique, impression, sécurité, énergie solaire,
        téléphonie, image &amp; sonorisation) depuis le menu principal, ou utiliser la barre de recherche en haut de
        page si vous connaissez déjà la référence ou la marque recherchée. Les filtres disponibles sur chaque page
        de catégorie vous permettent d&apos;affiner par marque, par gamme de prix ou par disponibilité.
      </p>
      <p>
        Chaque fiche produit détaille les caractéristiques techniques, la garantie applicable, l&apos;état du stock
        et le prix TTC. En cas de doute sur la compatibilité d&apos;un composant ou sur le choix d&apos;un modèle,
        nos conseillers techniques sont à votre disposition avant l&apos;achat.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">2. Ajouter au panier et vérifier votre commande</h2>
      <p>
        Depuis la fiche produit, sélectionnez la quantité souhaitée puis cliquez sur « Ajouter au panier ». Vous
        pouvez poursuivre vos achats et ajouter autant d&apos;articles que nécessaire. À tout moment, l&apos;icône
        du panier en haut de page indique le nombre d&apos;articles et le total de votre commande.
      </p>
      <p>
        Dans la page Panier, vous pouvez modifier les quantités, supprimer un article ou revenir au catalogue. Le
        récapitulatif affiche le sous-total, les frais de livraison et le montant total à régler. La livraison est
        offerte pour toute commande supérieure à 2 000 DHS.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">3. Valider la commande</h2>
      <p>
        Cliquez sur « Commander » pour accéder au formulaire de validation. Renseignez vos coordonnées complètes :
        nom et prénom, adresse de livraison, ville, numéro de téléphone et adresse e-mail. Ces informations sont
        indispensables pour que notre transporteur puisse vous contacter et livrer votre colis dans les meilleurs
        délais. Les entreprises peuvent également indiquer leur raison sociale et leur ICE afin de recevoir une
        facture conforme.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">4. Choisir votre mode de paiement</h2>
      <p>Karamtech met à votre disposition plusieurs moyens de paiement adaptés au marché marocain :</p>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>Carte bancaire Visa ou Mastercard via la plateforme sécurisée CMI.</li>
        <li>Paiement à la livraison (espèces remises au livreur au moment de la réception).</li>
        <li>Mandat Amana pour les clients ne disposant pas de carte bancaire.</li>
        <li>Virement bancaire, sur demande, pour les commandes professionnelles et les marchés publics.</li>
      </ul>
      <p>
        Les transactions par carte sont chiffrées de bout en bout par le Centre Monétique Interbancaire : à aucun
        moment Karamtech n&apos;a accès à vos données bancaires.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">5. Confirmation et préparation</h2>
      <p>
        Dès la validation de votre commande, un e-mail de confirmation contenant votre numéro de commande et le
        détail des articles vous est envoyé. Notre équipe vérifie la disponibilité des produits puis prépare votre
        colis. Vous êtes prévenu par téléphone ou par e-mail en cas d&apos;indisponibilité, avec une proposition de
        remplacement ou de remboursement immédiat.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">6. Livraison et réception</h2>
      <p>
        Votre commande est expédiée sous 24 à 72 heures partout au Maroc selon la ville de destination. Vous pouvez
        suivre son avancement depuis la page de suivi de commande à l&apos;aide de votre numéro de commande. À la
        réception, nous vous invitons à vérifier l&apos;état de l&apos;emballage et la conformité des articles en
        présence du livreur.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Besoin d&apos;aide pour commander ?</h2>
      <p>
        Si vous préférez commander par téléphone, ou si vous souhaitez un devis pour un projet d&apos;équipement,
        notre service commercial vous répond au +212 5 22 00 00 00 du lundi au samedi. Vous pouvez également nous
        écrire à contact@karamtech.ma en précisant les références souhaitées : nous vous rappelons pour finaliser
        votre commande.
      </p>
    </StaticPage>
  );
}
