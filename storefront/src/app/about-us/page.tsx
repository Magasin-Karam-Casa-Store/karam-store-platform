import StaticPage from "@/components/layout/StaticPage";
import { STORE } from "@/lib/config";

export default function AboutUsPage() {
  return (
    <StaticPage title="À propos de Karamtech Casablanca">
      <p className="font-semibold text-brand">
        Ce site représente le Magasin Karamtech Casablanca, filiale officielle du {STORE.parentCompany}.
      </p>
      <p>
        Karamtech Casablanca est un distributeur spécialisé dans l&apos;informatique, l&apos;impression, la
        bureautique, la sécurité électronique, l&apos;énergie solaire, la téléphonie et l&apos;image &amp;
        sonorisation.
      </p>
      <p>
        Depuis notre création, nous accompagnons les particuliers, les entreprises et les administrations dans
        leurs projets technologiques, avec un large catalogue de produits neufs et reconditionnés, un service
        après-vente réactif et une livraison partout au Maroc.
      </p>
    </StaticPage>
  );
}
