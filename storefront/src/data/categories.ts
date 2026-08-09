import type { Category } from "@/types";
import rawCategories from "@/data/generated/categories.json";
import { categoryImages } from "@/data/media";

interface RawCategory {
  name: string;
  slug: string;
  path: string;
  count: number;
  image: string | null;
  children: RawCategory[];
}

/** Title-cases the shouty ALL-CAPS names the live taxonomy uses for top levels. */
function prettyName(name: string): string {
  if (name !== name.toUpperCase()) return name;
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => (word.length > 2 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());
}

function toCategory(raw: RawCategory): Category {
  return {
    id: raw.path,
    name: prettyName(raw.name),
    slug: raw.slug,
    path: raw.path,
    productCount: raw.count,
    image: raw.image ?? categoryImages[raw.path] ?? undefined,
    children: raw.children.length ? raw.children.map(toCategory) : undefined,
  };
}

export const categories: Category[] = (rawCategories as RawCategory[]).map(toCategory);

export function flattenCategories(nodes: Category[] = categories): Category[] {
  return nodes.flatMap((node) => [node, ...(node.children ? flattenCategories(node.children) : [])]);
}

const categoryByPath = new Map(flattenCategories().map((c) => [c.path, c]));

export function findCategoryByPath(path: string): Category | undefined {
  return categoryByPath.get(path);
}

export function getCategoryBreadcrumb(path: string): Category[] {
  const trail: Category[] = [];
  let currentPath = "";
  for (const segment of path.split("/")) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    const found = categoryByPath.get(currentPath);
    if (found) trail.push(found);
  }
  return trail;
}

export function getDescendantPaths(path: string): string[] {
  const node = categoryByPath.get(path);
  if (!node) return [];
  return flattenCategories([node]).map((c) => c.path);
}
