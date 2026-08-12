export interface Category {
  id: string;
  name: string;
  slug: string; // segment only, e.g. "peripheriques"
  path: string; // full path used in URL, e.g. "informatique/peripheriques"
  icon?: string; // lucide-react icon name
  image?: string;
  productCount?: number;
  children?: Category[];
}

export type StockStatus = "instock" | "outofstock" | "onbackorder";
export type ProductCondition = "neuf" | "reconditionne";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryPath: string; // full category path this product belongs to
  categoryName: string; // display name of the leaf category
  brand: string;
  price: number;
  oldPrice?: number;
  currency: "MAD";
  stock: StockStatus;
  condition: ProductCondition;
  sku: string;
  images: string[];
  description: string;
  shortDescription: string;
  specs: ProductSpec[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt: string; // ISO date, used for "new arrivals" sorting
}
