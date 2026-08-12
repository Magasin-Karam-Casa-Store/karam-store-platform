import Link from "next/link";
import StaticPage from "@/components/layout/StaticPage";
import { STORE } from "@/lib/config";

export default function CookiesPage() {
  return (
    <StaticPage title="Politique de cookies">
      <p>
        Cette page explique ce que sont les cookies, lesquels sont utilisés sur karamtech.ma, à quoi ils servent et
        comment vous pouvez les contrôler. En poursuivant votre navigation sur notre site, vous acceptez le dépôt
        des cookies décrits ci-dessous, à l&apos;exception de ceux que vous choisissez de désactiver.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Qu&apos;est-ce qu&apos;un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre ordinateur, votre tablette ou votre smartphone lors de
        la consultation d&apos;un site web. Il permet au site de mémoriser certaines informations entre deux pages
        ou entre deux visites : contenu de votre panier, préférences d&apos;affichage, session de connexion. Un
        cookie ne peut pas exécuter de programme sur votre appareil ni transporter de virus.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Les cookies utilisés sur karamtech.ma</h2>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>
          <span className="font-semibold text-brand-navy">Cookies essentiels</span> — indispensables au
          fonctionnement du site. Ils assurent la conservation de votre panier, le maintien de votre session
          client, la sécurisation du tunnel de commande et la protection contre la fraude. Ces cookies ne peuvent
          pas être désactivés sans rendre le site inutilisable.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Cookies de préférences</span> — mémorisent vos choix
          d&apos;affichage tels que la langue, le tri des produits, le mode d&apos;affichage du catalogue ou les
          derniers articles consultés, afin de vous éviter de les redéfinir à chaque visite.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Cookies de mesure d&apos;audience</span> — nous aident à
          comprendre comment le site est utilisé : pages les plus consultées, parcours de navigation, appareils
          employés, éventuelles erreurs rencontrées. Les données recueillies sont agrégées et servent uniquement à
          améliorer l&apos;ergonomie et les performances du site.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Cookies tiers</span> — certains contenus intégrés
          (cartes, vidéos, boutons de partage, outils de paiement) peuvent déposer leurs propres cookies, soumis à
          la politique de confidentialité de l&apos;éditeur concerné.
        </li>
      </ul>

      <h2 className="text-lg font-bold text-brand-navy">Durée de conservation</h2>
      <p>
        Les cookies de session sont automatiquement supprimés à la fermeture de votre navigateur. Les cookies
        persistants sont conservés pour une durée maximale de treize mois à compter de leur dépôt, conformément aux
        recommandations en matière de protection des données personnelles. À l&apos;expiration de ce délai, votre
        consentement vous est de nouveau demandé.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">Gérer ou désactiver les cookies</h2>
      <p>
        Vous pouvez à tout moment configurer votre navigateur pour accepter, refuser ou supprimer les cookies. Les
        réglages se trouvent généralement dans les menus suivants :
      </p>
      <ul className="list-disc pl-5 flex flex-col gap-1.5">
        <li>Google Chrome : Paramètres, puis Confidentialité et sécurité, puis Cookies et autres données des sites.</li>
        <li>Mozilla Firefox : Paramètres, puis Vie privée et sécurité, puis Cookies et données de sites.</li>
        <li>Microsoft Edge : Paramètres, puis Cookies et autorisations de site.</li>
        <li>Safari : Préférences, puis Confidentialité, puis Gérer les données de sites web.</li>
      </ul>
      <p>
        Sachez toutefois que le blocage de l&apos;ensemble des cookies empêche le bon fonctionnement de certaines
        fonctionnalités essentielles, notamment l&apos;ajout au panier, la connexion à votre compte client et la
        validation d&apos;une commande.
      </p>

      <h2 className="text-lg font-bold text-brand-navy">En savoir plus</h2>
      <p>
        Pour connaître l&apos;ensemble des traitements que nous effectuons sur vos données personnelles et les
        droits dont vous disposez, consultez notre{" "}
        <Link href="/politique-de-confidentialite" className="font-medium text-brand hover:underline">
          politique de confidentialité
        </Link>
        . Pour toute question relative aux cookies, vous pouvez nous écrire à {STORE.email} ou nous appeler
        au {STORE.phone}.
      </p>
    </StaticPage>
  );
}
