import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryBreadcrumb } from "@/data/categories";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartBox from "@/components/product/AddToCartBox";
import ProductTabs from "@/components/product/ProductTabs";
import ProductCard from "@/components/product/ProductCard";

// No generateStaticParams on purpose: the catalog has 1200+ products and
// prerendering every one of them would make production builds crawl. The route
// is rendered on demand instead.
export async function generateMetadata({ params }: PageProps<"/produit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable | Karamtech",
      description: "Ce produit n'est plus disponible dans le catalogue Karamtech.",
    };
  }

  const description =
    product.shortDescription?.trim() ||
    `${product.title} — ${product.brand}, disponible chez Karamtech avec garantie et livraison partout au Maroc.`;

  return {
    title: `${product.title} | Karamtech`,
    description,
    openGraph: {
      title: `${product.title} | Karamtech`,
      description,
      images: product.images.length ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/produit/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const breadcrumb = getCategoryBreadcrumb(product.categoryPath);
  const related = getRelatedProducts(product);

  return (
    <>
      <Breadcrumb
        items={[
          ...breadcrumb.map((c) => ({ label: c.name, href: `/product-category/${c.path}` })),
          { label: product.title },
        ]}
      />
      <div className="container-app py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} title={product.title} />
          <AddToCartBox product={product} />
        </div>

        <ProductTabs product={product} />

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-brand-navy">Produits similaires</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
