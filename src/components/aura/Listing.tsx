import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { categoryMeta, products, type Category, type Product } from "@/lib/data";
import { ProductGrid } from "./ProductCard";
import { PageHero, btnClass } from "./ui";
import { cn } from "@/lib/utils";

type F = Record<string, string[]>;
const groups: { k: keyof Product | "price"; label: string; opts: string[] }[] = [
  { k: "shape", label: "Frame Shape", opts: ["Round", "Square", "Rectangle", "Cat-Eye", "Aviator", "Wayfarer"] },
  { k: "frameType", label: "Frame Type", opts: ["Full Rim", "Half Rim", "Rimless"] },
  { k: "material", label: "Material", opts: ["Titanium", "Acetate", "Stainless Steel", "TR90"] },
  { k: "colors", label: "Color", opts: ["Midnight Blue", "Crystal", "Ice Grey", "Warm Gold", "Onyx", "Tortoise", "Olive"] },
  { k: "price", label: "Price", opts: ["Under ₹2,500", "₹2,500 – ₹3,999", "₹4,000+"] },
  { k: "gender", label: "Gender", opts: ["Men", "Women", "Unisex"] },
  { k: "size", label: "Size", opts: ["Small", "Medium", "Large"] },
  { k: "rating", label: "Rating", opts: ["4.5 & above", "4.0 & above"] },
];
const sorts = ["Recommended", "Best Selling", "Newest", "Price: Low → High", "Price: High → Low"];

export function applyFilters(list: Product[], f: F) {
  return list.filter((p) => groups.every((g) => {
    const sel = f[g.k as string];
    if (!sel?.length) return true;
    if (g.k === "colors") return p.colors.some((c) => sel.includes(c.name));
    if (g.k === "price") return sel.some((s) => (s.startsWith("Under") ? p.price < 2500 : s.endsWith("+") ? p.price >= 4000 : p.price >= 2500 && p.price < 4000));
    if (g.k === "rating") return sel.some((s) => p.rating >= parseFloat(s));
    return sel.includes(String(p[g.k as keyof Product]));
  }));
}

export function sortProducts(list: Product[], s: string) {
  const l = [...list];
  if (s === "Best Selling") l.sort((a, b) => b.reviews - a.reviews);
  if (s === "Newest") l.sort((a, b) => b.createdAt - a.createdAt);
  if (s.includes("Low →")) l.sort((a, b) => a.price - b.price);
  if (s.includes("High →")) l.sort((a, b) => b.price - a.price);
  return l;
}

function FilterPanel({ f, set }: { f: F; set: (f: F) => void }) {
  const toggle = (k: string, o: string) => {
    const cur = f[k] ?? [];
    set({ ...f, [k]: cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o] });
  };
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <fieldset key={g.label}>
          <legend className="label-tech mb-3 text-primary">{g.label}</legend>
          <div className="flex flex-wrap gap-2">
            {g.opts.map((o) => {
              const on = f[g.k as string]?.includes(o);
              return <button key={o} aria-pressed={!!on} onClick={() => toggle(g.k as string, o)} className={cn("rounded-full border px-3 py-1.5 text-xs transition", on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>{o}</button>;
            })}
          </div>
        </fieldset>
      ))}
      <fieldset><legend className="label-tech mb-3 text-primary">Brand</legend><span className="rounded-full border border-primary px-3 py-1.5 text-xs">Aura Vision</span></fieldset>
    </div>
  );
}

export function Listing({ category, initialQ }: { category: Category; initialQ?: string }) {
  const meta = categoryMeta[category];
  const [f, setF] = useState<F>(() => {
    if (!initialQ) return {};
    const g = groups.find((g) => g.opts.includes(initialQ));
    return g ? { [g.k as string]: [initialQ] } : {};
  });
  const [sort, setSort] = useState(sorts[0]!);
  const [open, setOpen] = useState(false);
  const base = products.filter((p) => p.category === category);
  const items = useMemo(() => sortProducts(applyFilters(base, f), sort), [f, sort, category]);
  const active = Object.values(f).flat().length;

  return (
    <>
      <PageHero eyebrow={`${base.length * 6 + 4} Products`} title={meta.title} sub={meta.desc} />
      <div className="sticky top-[76px] z-30 border-y border-border bg-background/90 px-5 py-3 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
          <button onClick={() => setOpen(true)} className="label-tech flex items-center gap-2 lg:hidden"><SlidersHorizontal className="size-4" /> Filter {active > 0 && `(${active})`}</button>
          <p className="label-tech hidden text-muted-foreground lg:block">Showing {items.length} frames</p>
          <label className="label-tech flex items-center gap-2">Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-background px-3 py-2 font-sans text-xs normal-case tracking-normal">
              {sorts.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>
      </div>
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block"><div className="sticky top-40"><FilterPanel f={f} set={setF} />{active > 0 && <button onClick={() => setF({})} className="label-tech mt-6 text-primary">Clear all</button>}</div></aside>
          <div>
            {items.length ? <ProductGrid items={items} /> : (
              <div className="py-24 text-center"><p className="headline text-4xl text-navy">No frames match.</p><button onClick={() => setF({})} className={cn(btnClass("glass"), "mt-6")}>Clear filters</button></div>
            )}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label="Filters" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[75] flex flex-col bg-background" data-lenis-prevent>
            <div className="flex items-center justify-between border-b border-border px-5 py-4"><p className="headline text-3xl">Filters</p><button onClick={() => setOpen(false)} aria-label="Close"><X /></button></div>
            <div className="flex-1 overflow-y-auto p-5"><FilterPanel f={f} set={setF} /></div>
            <div className="flex gap-3 border-t border-border p-4">
              <button onClick={() => setF({})} className={cn(btnClass("glass"), "flex-1")}>Clear</button>
              <button onClick={() => setOpen(false)} className={cn(btnClass("primary"), "flex-1")}>Show {items.length}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
