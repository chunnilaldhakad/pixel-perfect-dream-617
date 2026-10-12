import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct, IMG, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { PageHero, btnClass } from "@/components/aura/ui";
import { ProductGrid } from "@/components/aura/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Aura Vision" }, { name: "description", content: "Your curated collection of saved Aura Vision frames." }, { property: "og:title", content: "Wishlist — Aura Vision" }, { property: "og:description", content: "Your curated collection." }] }),
  component: WishPage,
});

function WishPage() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean) as Product[];
  return (
    <>
      <PageHero eyebrow={`${items.length} saved`} title="Your curated collection." />
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {items.length ? <ProductGrid items={items} /> : (
            <div className="grid items-center gap-10 md:grid-cols-2">
              <img src={IMG.pCrystal} alt="Crystal frames" className="aspect-square w-full rounded-3xl object-cover" />
              <div><p className="headline text-5xl text-navy">Nothing saved yet.</p><p className="mt-4 text-muted-foreground">Tap the heart on any frame to keep it here — it will still be waiting after you leave.</p><Link to="/eyeglasses" className={`${btnClass("primary")} mt-8`}>Discover frames</Link></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
