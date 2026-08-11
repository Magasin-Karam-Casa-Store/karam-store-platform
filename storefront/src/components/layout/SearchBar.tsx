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
    <form
      onSubmit={handleSubmit}
      className={`flex h-[50px] items-stretch overflow-hidden rounded-2xl border border-brand-border bg-surface-muted ${className}`}
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Catégorie"
        className="hidden shrink-0 cursor-pointer appearance-none border-r border-brand-border bg-[#eef3f9] px-4 text-[13px] font-bold text-body outline-none sm:block"
      >
        <option value="all">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c.path} value={c.path}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit, une référence, une marque…"
        className="min-w-0 flex-1 bg-transparent px-4 text-[14.5px] text-heading outline-none placeholder:text-muted"
      />

      <button
        type="submit"
        className="flex shrink-0 items-center gap-2 px-5 font-heading text-[13.5px] font-bold text-white transition-[filter] hover:brightness-110 sm:px-6"
        style={{ background: "linear-gradient(135deg,#1a8fe3,#0b5fa5)" }}
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">Chercher</span>
      </button>
    </form>
  );
}
