import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findCategoryByPath, getCategoryBreadcrumb, getDescendantPaths } from "@/data/categories";
import { getProductsByCategoryPaths } from "@/data/products";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CategoryListing from "@/components/category/CategoryListing";

export async function generateMetadata({
  params,
}: PageProps<"/product-category/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryByPath(slug.join("/"));

  if (!category) {
    return { title: "Catégorie introuvable | Karamtech" };
  }

  return {
    title: `${category.name} | Karamtech`,
    description: `Découvrez notre sélection ${category.name} chez Karamtech : produits neufs garantis, prix en DH et livraison partout au Maroc.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/product-category/[...slug]">) {
  const { slug } = await params;
  const path = slug.join("/");
  const category = findCategoryByPath(path);

  if (!category) notFound();

  const descendantPaths = getDescendantPaths(path);
  const products = getProductsByCategoryPaths(descendantPaths);
  const breadcrumb = getCategoryBreadcrumb(path);
  const children = category.children ?? [];

  return (
    <>
      <Breadcrumb
        items={breadcrumb.map((c, i) => ({
          label: c.name,
          href: i < breadcrumb.length - 1 ? `/product-category/${c.path}` : undefined,
        }))}
      />
      <div className="container-app py-8">
        <div className="mb-6 flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl font-bold text-brand-navy sm:text-3xl">{category.name}</h1>
          <span className="text-sm text-gray-500">{products.length} produit(s)</span>
        </div>

        {children.length > 0 && (
          <nav aria-label="Sous-catégories" className="-mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2 pb-1">
              {children.map((child) => (
                <li key={child.path}>
                  <Link
                    href={`/product-category/${child.path}`}
                    className="block whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 text-sm hover:border-brand hover:text-brand"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <CategoryListing products={products} />
      </div>
    </>
  );
}
