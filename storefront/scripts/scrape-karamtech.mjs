/**
 * Pulls the live Karamtech catalog (WooCommerce Store API) and generates the
 * local data modules used by the app:
 *   src/data/generated/categories.json
 *   src/data/generated/products.json
 *
 * Run with: node scripts/scrape-karamtech.mjs
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://karamtech.ma/wp-json/wc/store/v1";
const OUT_DIR = path.join(process.cwd(), "src", "data", "generated");

/** Max products pulled per leaf category — keeps the bundle a sane size. */
const PER_CATEGORY = 8;
/** Categories with fewer products than this are skipped as noise. */
const MIN_COUNT = 1;

async function getJSON(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
}

async function fetchAllCategories() {
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await getJSON(`${BASE}/products/categories?per_page=100&page=${page}`);
    if (!batch.length) break;
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

/** Money in the Store API is an integer in minor units (e.g. 372614 -> 3726.14). */
function toAmount(value, minorUnit) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return n / 10 ** (minorUnit ?? 2);
}

const NAMED_ENTITIES = {
  nbsp: " ", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">",
  rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”",
  eacute: "é", egrave: "è", ecirc: "ê", agrave: "à", acirc: "â",
  ccedil: "ç", ugrave: "ù", ucirc: "û", icirc: "î", iuml: "ï",
  ouml: "ö", uuml: "ü", deg: "°", hellip: "…", ndash: "–",
  mdash: "—", times: "×", euro: "€", trade: "™", reg: "®", copy: "©",
  prime: "′", Prime: "″", laquo: "«", raquo: "»", middot: "·", bull: "•",
  frac12: "½", frac14: "¼", sup2: "²", sup3: "³", micro: "µ", plusmn: "±",
};

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

function stripHTML(html = "") {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function buildTree(flat) {
  const byId = new Map();
  for (const c of flat) {
    byId.set(c.id, {
      id: c.id,
      name: stripHTML(c.name),
      slug: c.slug,
      parent: c.parent || 0,
      count: c.count ?? 0,
      image: c.image?.src ?? null,
      children: [],
    });
  }
  const roots = [];
  for (const node of byId.values()) {
    const parent = node.parent ? byId.get(node.parent) : null;
    if (parent) parent.children.push(node);
    else roots.push(node);
  }
  // Compute the full URL path for each node (e.g. informatique/peripheriques).
  const assignPaths = (nodes, prefix = "") => {
    for (const n of nodes) {
      n.path = prefix ? `${prefix}/${n.slug}` : n.slug;
      assignPaths(n.children, n.path);
    }
  };
  assignPaths(roots);
  return { roots };
}

function flatten(nodes) {
  return nodes.flatMap((n) => [n, ...flatten(n.children)]);
}

async function main() {
  console.log("Fetching category taxonomy...");
  const flatCats = await fetchAllCategories();
  console.log(`  ${flatCats.length} categories`);

  const { roots } = buildTree(flatCats);
  const allNodes = flatten(roots);

  // Only fetch products for leaf-ish categories that actually have stock listed.
  const targets = allNodes.filter((n) => n.count >= MIN_COUNT && n.children.length === 0);
  console.log(`Fetching products for ${targets.length} leaf categories...`);

  const productsById = new Map();
  let done = 0;

  // Small concurrency pool to stay polite to the origin.
  const queue = [...targets];
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const cat = queue.shift();
      if (!cat) break;
      try {
        const batch = await getJSON(
          `${BASE}/products?per_page=${PER_CATEGORY}&category=${cat.id}&orderby=popularity`
        );
        for (const p of batch) {
          if (productsById.has(p.id)) continue;
          const minor = p.prices?.currency_minor_unit ?? 2;
          const price = toAmount(p.prices?.price, minor);
          if (!price) continue; // skip products with no usable price

          const regular = toAmount(p.prices?.regular_price, minor);
          const images = (p.images ?? []).map((i) => i.src).filter(Boolean);
          if (!images.length) continue;

          productsById.set(p.id, {
            id: p.id,
            name: stripHTML(p.name),
            slug: p.slug,
            permalink: p.permalink,
            sku: p.sku || `KT-${p.id}`,
            categoryPath: cat.path,
            categoryName: cat.name,
            price,
            regularPrice: regular && regular > price ? regular : null,
            onSale: !!p.on_sale,
            inStock: !!p.is_in_stock,
            rating: Number(p.average_rating) || 0,
            reviewCount: p.review_count ?? 0,
            images: images.slice(0, 4),
            shortDescription: stripHTML(p.short_description).slice(0, 300),
            description: stripHTML(p.description).slice(0, 1200),
          });
        }
      } catch (err) {
        console.warn(`  ! ${cat.path}: ${err.message}`);
      }
      done++;
      if (done % 25 === 0) console.log(`  ${done}/${targets.length} categories, ${productsById.size} products`);
    }
  });
  await Promise.all(workers);

  let products = [...productsById.values()];
  console.log(`Collected ${products.length} products.`);

  // The live taxonomy carries legacy/duplicate English branches alongside the
  // seven French categories that actually appear in the site navigation. Keep
  // only those trees, and re-home orphaned products into the closest match by
  // slug so nothing from the catalog is lost.
  const MAIN_ROOTS = [
    "informatique",
    "securite",
    "imageetsonorisation",
    "telephonieetauto",
    "bureautiqueetfourniture",
    "solaire",
  ];

  const mainNodes = allNodes.filter((n) => MAIN_ROOTS.includes(n.path.split("/")[0]));
  const bySlug = new Map();
  for (const n of mainNodes) {
    if (!bySlug.has(n.slug)) bySlug.set(n.slug, n);
  }
  // Strip WooCommerce's "-2"/"-3" disambiguation suffixes when matching.
  const baseSlug = (s) => s.replace(/-\d+$/, "");
  const byBaseSlug = new Map();
  for (const n of mainNodes) {
    const b = baseSlug(n.slug);
    if (!byBaseSlug.has(b)) byBaseSlug.set(b, n);
  }

  let rehomed = 0;
  let dropped = 0;
  products = products
    .map((p) => {
      const root = p.categoryPath.split("/")[0];
      if (MAIN_ROOTS.includes(root)) return p;

      const leafSlug = p.categoryPath.split("/").pop();
      const match = bySlug.get(leafSlug) ?? byBaseSlug.get(baseSlug(leafSlug));
      if (match) {
        rehomed++;
        return { ...p, categoryPath: match.path, categoryName: match.name };
      }
      dropped++;
      return null;
    })
    .filter(Boolean);

  console.log(`  re-homed ${rehomed} orphaned products, dropped ${dropped} unmatched.`);
  console.log(`Final catalog: ${products.length} products.`);

  // Restrict the exported tree to the real navigation roots.
  roots.length = 0;
  roots.push(...MAIN_ROOTS.map((slug) => allNodes.find((n) => n.path === slug)).filter(Boolean));

  // Drop categories that ended up with no products so the UI never shows empties.
  const populated = new Set(products.map((p) => p.categoryPath));
  const prune = (nodes) =>
    nodes
      .map((n) => ({ ...n, children: prune(n.children) }))
      .filter((n) => n.children.length > 0 || populated.has(n.path));

  const tree = prune(roots).map(function clean(n) {
    return {
      name: n.name,
      slug: n.slug,
      path: n.path,
      count: n.count,
      image: n.image,
      children: n.children.map(clean),
    };
  });

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, "categories.json"), JSON.stringify(tree, null, 1));
  await writeFile(path.join(OUT_DIR, "products.json"), JSON.stringify(products, null, 1));

  console.log(`\nWrote ${tree.length} root categories and ${products.length} products to src/data/generated/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
