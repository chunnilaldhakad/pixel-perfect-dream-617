import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data";
import { PageHero, Reveal, btnClass } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collections/")({
  head: () => ({ meta: [{ title: "Collections — Aura Vision" }, { name: "description", content: "Atelier 2026, Essentials, Signature, Urban Optics, Digital Comfort and Summer Light." }, { property: "og:title", content: "Collections — Aura Vision" }, { property: "og:description", content: "Editorial eyewear collections." }] }),
  component: Collections,
});

export function CollectionSection({ c, i }: { c: (typeof collections)[number]; i: number }) {
  return (
    <section className={cn("px-5 py-12 md:px-10 md:py-16", i % 2 && "bg-pale")}>
      <div className={cn("mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-2", i % 2 && "md:[&>*:first-child]:order-2")}>
        <Reveal><div className="overflow-hidden rounded-3xl"><img src={c.img} alt={c.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" /></div></Reveal>
        <Reveal delay={0.1}>
          <p className="label-tech text-primary">Collection {String(i + 1).padStart(2, "0")}</p>
          <h2 className="headline mt-4 text-5xl text-navy md:text-6xl">{c.title}</h2>
          <p className="mt-5 max-w-md text-muted-foreground">{c.story}</p>
          <Link to="/collections/$slug" params={{ slug: c.slug }} className={cn(btnClass("primary"), "mt-8")}>Explore collection <ArrowRight className="size-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <>
      <PageHero eyebrow="Collections" title={<>Stories in <em className="text-primary">light.</em></>} sub="Six editorial collections, each built around a mood, a material and a moment." />
      {collections.map((c, i) => <CollectionSection key={c.slug} c={c} i={i} />)}
    </>
  );
}
