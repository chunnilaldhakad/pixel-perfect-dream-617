import { createFileRoute, notFound } from "@tanstack/react-router";
import { collections, getProduct, type Product } from "@/lib/data";
import { ProductGrid } from "@/components/aura/ProductCard";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const c = collections.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData && collections.find((x) => x.slug === loaderData.slug);
    if (!c) return { meta: [{ title: "Collection not found — Aura Vision" }, { name: "robots", content: "noindex" }] };
    return { meta: [{ title: `${c.title} Collection — Aura Vision` }, { name: "description", content: c.story }, { property: "og:title", content: `${c.title} — Aura Vision` }, { property: "og:description", content: c.story }] };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useLoaderData();
  const c = collections.find((x) => x.slug === slug)!;
  const items = c.ids.map(getProduct).filter(Boolean) as Product[];
  return (
    <>
      <section className="relative h-[70vh] min-h-[440px] overflow-hidden">
        <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-12 text-navy-foreground md:px-10">
          <p className="label-tech text-cyan">Collection</p>
          <h1 className="headline mt-4 text-6xl md:text-8xl">{c.title}</h1>
          <p className="mt-4 max-w-lg text-navy-foreground/80">{c.story}</p>
        </div>
      </section>
      <section className="px-5 py-16 md:px-10"><div className="mx-auto max-w-[1400px]"><ProductGrid items={items} /></div></section>
    </>
  );
}
