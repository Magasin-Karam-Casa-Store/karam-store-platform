import StaticPage from "@/components/layout/StaticPage";
import { STORE } from "@/lib/config";

export default function RetourEtRemboursementPage() {
  return (
    <StaticPage title="Retour et remboursement">
      <p>
        Karamtech souhaite que chaque achat soit une expérience sereine. Si un produit ne vous convient pas, ne
        correspond pas à votre commande ou présente un défaut, vous disposez d&apos;un droit de retour dans les
        conditions décrites ci-dessous. Cette politique s&apos;applique à toutes les commandes passées sur
        karamtech.ma et en magasin.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Délai de rétractation</h2>
      <p>
        Vous disposez de <span className="font-semibold text-brand-navy">7 jours</span> à compter de la date de
        réception de votre colis pour nous signaler votre souhait de retourner un article. Passé ce délai, seule la
        garantie constructeur peut être mobilisée en cas de panne, selon les modalités décrites sur notre page
        Garantie et SAV.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Conditions d&apos;acceptation du retour</h2>
      <p>Pour qu&apos;un retour soit accepté, le produit doit impérativement remplir les conditions suivantes :</p>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>Être restitué dans son emballage d&apos;origine, complet et non détérioré.</li>
        <li>
          Être accompagné de l&apos;ensemble de ses accessoires, câbles, notices, cartes de garantie et cadeaux
          éventuellement offerts.
        </li>
        <li>Ne pas avoir été utilisé au-delà de ce qui est nécessaire pour en vérifier le bon fonctionnement.</li>
        <li>Ne présenter aucune trace de choc, de rayure, d&apos;humidité ni de tentative de démontage.</li>
        <li>Conserver ses étiquettes, scellés et numéros de série intacts.</li>
        <li>Être présenté avec la facture ou le ticket de caisse correspondant.</li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Produits non repris</h2>
      <p>
        Certains articles ne peuvent, par nature, faire l&apos;objet d&apos;un retour une fois ouverts ou activés :
      </p>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>Les logiciels, licences et clés d&apos;activation dont le scellé a été rompu ou le code utilisé.</li>
        <li>Les consommables ouverts : cartouches d&apos;encre, toners, papiers spéciaux, supports d&apos;impression.</li>
        <li>Les produits d&apos;hygiène et accessoires personnels tels que les écouteurs intra-auriculaires déballés.</li>
        <li>Les articles personnalisés, configurés sur mesure ou commandés spécialement à votre demande.</li>
        <li>Les produits endommagés par une mauvaise utilisation, une surtension ou une installation non conforme.</li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Comment initier un retour</h2>
      <p>
        Contactez notre service client au {STORE.phone} ou par e-mail à {STORE.email} en précisant votre
        numéro de commande, la référence du produit concerné et le motif du retour. Joignez si possible des photos
        du produit et de son emballage : cela accélère sensiblement le traitement de votre demande.
      </p>
      <p>
        Après validation, un numéro de retour vous est communiqué. Le produit doit alors nous être réexpédié ou
        déposé dans notre magasin de Casablanca. Les frais de retour restent à votre charge lorsque le retour
        résulte d&apos;un changement d&apos;avis ; ils sont intégralement pris en charge par Karamtech en cas
        d&apos;erreur de préparation de notre part ou de produit défectueux à la livraison.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Remboursement</h2>
      <p>
        Dès réception du colis, notre équipe procède au contrôle du produit sous 48 à 72 heures ouvrées. Si les
        conditions de retour sont réunies, le remboursement est déclenché dans un délai de 7 à 14 jours ouvrés selon
        le mode de paiement initial :
      </p>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>Paiement par carte bancaire (Visa, Mastercard, CMI) : remboursement sur la carte ayant servi à l&apos;achat.</li>
        <li>Paiement à la livraison ou par mandat Amana : remboursement par virement bancaire ou mandat, sur présentation de votre RIB.</li>
        <li>Sur demande, un avoir d&apos;une durée de validité de six mois peut remplacer le remboursement.</li>
      </ul>
      <p>
        Les frais de livraison initiaux sont remboursés uniquement lorsque le retour est imputable à Karamtech. En
        cas de refus du retour, le produit vous est réexpédié et les frais d&apos;envoi vous sont facturés ; une
        explication écrite du motif de refus vous est systématiquement transmise.
      </p>
    </StaticPage>
  );
}
