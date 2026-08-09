"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { categories } from "@/data/categories";

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "all") params.set("cat", category);
    router.push(`/recherche?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full overflow-hidden rounded-md border border-brand-border bg-white ${className}`}>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="hidden shrink-0 border-r border-brand-border bg-brand-gray px-2 text-sm text-brand-navy sm:block"
        aria-label="Catégorie"
      >
        <option value="all">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c.path} value={c.path}>{c.name}</option>
        ))}
      </select>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit..."
        className="w-full px-3 py-2 text-sm text-brand-navy outline-none"
      />
      <button type="submit" aria-label="Rechercher" className="flex shrink-0 items-center justify-center bg-brand px-4 text-white hover:bg-brand-dark">
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
