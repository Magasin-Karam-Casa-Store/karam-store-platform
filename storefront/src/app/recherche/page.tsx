import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { getLiveSearchProducts } from "@/lib/karamtech-api";
import { findCategoryByPath } from "@/data/categories";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CategoryListing from "@/components/category/CategoryListing";

export const metadata: Metadata = {
  title: "Recherche | Karamtech",
  description: "Recherchez parmi tout le catalogue Karamtech : informatique, sécurité, solaire, téléphonie et plus.",
};

function firstValue(value: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

export default async function SearchPage({ searchParams }: PageProps<"/recherche">) {
  const { q, cat } = await searchParams;
  const query = firstValue(q, "");
  const categoryPath = firstValue(cat, "all");

  const results = await getLiveSearchProducts(query, categoryPath);
  const category = categoryPath !== "all" ? findCategoryByPath(categoryPath) : undefined;

  const emptyMessage = [
    "Nous n'avons trouvé aucun produit",
    query ? `correspondant à « ${query} »` : null,
    category ? `dans la catégorie ${category.name}` : null,
  ]
    .filter(Boolean)
    .join(" ")
    .concat(".");

  return (
    <>
      <Breadcrumb items={[{ label: "Résultats de recherche" }]} />
      <div className="container-app py-8">
        <h1 className="text-2xl font-bold text-brand-navy sm:text-3xl">
          {query ? <>Résultats pour &laquo;&nbsp;{query}&nbsp;&raquo;</> : "Tous les produits"}
        </h1>
        <p className="mb-6 mt-2 text-sm text-gray-500">
          {results.length} produit(s) trouvé(s)
          {category && ` dans ${category.name}`}
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-brand-border bg-brand-gray px-6 py-16 text-center">
            <PackageSearch className="h-10 w-10 text-brand" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-brand-navy">Aucun produit trouvé</h2>
            <p className="max-w-md text-sm text-gray-500">
              {emptyMessage} Essayez un autre mot-clé ou parcourez nos catégories.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <CategoryListing products={results} />
        )}
      </div>
    </>
  );
}
