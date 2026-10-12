import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/aura/ui";
import { ProductGrid } from "@/components/aura/ProductCard";
import { searchProducts } from "@/components/aura/Overlays";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({ meta: [{ title: "Search — Aura Vision" }, { name: "description", content: "Search Aura Vision eyewear by shape, material and style." }, { property: "og:title", content: "Search — Aura Vision" }, { property: "og:description", content: "Search Aura Vision eyewear." }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [v, setV] = useState(q);
  const nav = useNavigate();
  const items = searchProducts(q);
  return (
    <>
      <PageHero eyebrow={`${items.length} results`} title={q ? <>“{q}”</> : "Search"} />
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/search", search: { q: v } }); }} className="mb-12 flex max-w-xl items-center gap-3 border-b-2 border-navy pb-3 focus-within:border-primary">
            <Search className="text-primary" /><input value={v} onChange={(e) => setV(e.target.value)} placeholder="Search AURA VISION" aria-label="Search" className="w-full bg-transparent font-display text-3xl outline-none" />
          </form>
          {items.length ? <ProductGrid items={items} /> : <p className="text-muted-foreground">No frames found. Try “titanium” or “round”.</p>}
        </div>
      </section>
    </>
  );
}
