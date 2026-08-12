import StaticPage from "@/components/layout/StaticPage";
import { STORE } from "@/lib/config";

export default function PourquoiKaramtechPage() {
  return (
    <StaticPage title="Pourquoi Karamtech ?">
      <p>
        Le marché marocain de la technologie ne manque pas de vendeurs. Ce qui distingue Karamtech, c&apos;est la
        combinaison d&apos;un catalogue véritablement large, de produits authentiques garantis et d&apos;un
        accompagnement humain avant comme après l&apos;achat. Voici, concrètement, ce que vous obtenez en
        commandant chez nous.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Un catalogue de plus de 4 000 références</h2>
      <p>
        De l&apos;ordinateur portable au panneau photovoltaïque, en passant par les caméras de vidéosurveillance,
        les imprimantes professionnelles et les équipements réseau, notre catalogue couvre l&apos;essentiel des
        besoins technologiques d&apos;un foyer ou d&apos;une entreprise. Cette étendue vous évite de multiplier les
        fournisseurs : un seul interlocuteur, une seule facture, une seule livraison.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Des prix compétitifs et transparents</h2>
      <p>
        Nos volumes d&apos;achat et nos relations directes avec les distributeurs officiels nous permettent de
        proposer des tarifs serrés toute l&apos;année, sans frais cachés. Les prix affichés sont TTC, et la
        livraison est offerte dès 2 000 DHS d&apos;achat. Les professionnels bénéficient en outre de remises
        dégressives selon les quantités commandées.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Des produits authentiques et garantis</h2>
      <p>
        Tous nos articles proviennent de circuits de distribution officiels. Le matériel neuf est couvert par la
        garantie constructeur (généralement 12 mois, parfois davantage selon la marque), et nos produits
        reconditionnés sont testés, remis en état puis garantis de 6 à 12 mois. Vous savez exactement ce que vous
        achetez : chaque fiche produit précise l&apos;état et la durée de garantie applicable.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Un conseil technique avant l&apos;achat</h2>
      <p>
        Choisir un onduleur, dimensionner une installation solaire, vérifier la compatibilité d&apos;une barrette
        mémoire ou sélectionner le bon enregistreur pour huit caméras : ces décisions méritent mieux qu&apos;une
        fiche technique. Nos conseillers connaissent les produits qu&apos;ils vendent et vous orientent vers la
        solution réellement adaptée à votre besoin et à votre budget, sans surdimensionnement inutile.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Un service après-vente réactif</h2>
      <p>
        Un problème après la livraison n&apos;est pas la fin de la relation, c&apos;est le moment où elle se juge.
        Notre service après-vente prend en charge les demandes de garantie, les retours et les diagnostics
        techniques, avec un premier retour sous 48 heures ouvrées. Nous assurons l&apos;interface avec les
        constructeurs pour vous éviter des démarches longues et incertaines.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Une livraison rapide partout au Maroc</h2>
      <p>
        Les commandes validées sont expédiées sous 24 à 72 heures vers toutes les villes du Royaume. Le paiement à
        la livraison est disponible sur la majorité des produits, et vous pouvez suivre l&apos;acheminement de votre
        colis à tout moment depuis notre page de suivi de commande.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Un partenaire pour les entreprises</h2>
      <p>
        Karamtech accompagne les sociétés, administrations, écoles et associations dans leurs projets
        d&apos;équipement : établissement de devis sous 24 heures, réponse aux appels d&apos;offres, facturation
        conforme, installation sur site et contrats de maintenance. Pour toute demande professionnelle, contactez
        notre service commercial au {STORE.phone} ou à {STORE.email}.
      </p>
    </StaticPage>
  );
}
