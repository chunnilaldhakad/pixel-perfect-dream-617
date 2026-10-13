import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Truck, RotateCcw, ShieldCheck, ScanFace } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { getProduct, inr, products, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Btn, Stars, btnClass, SectionHead } from "@/components/aura/ui";
import { Picker } from "@/components/aura/Overlays";
import { ProductCarousel } from "@/components/aura/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { id: p.id };
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProduct(loaderData.id);
    if (!p) return { meta: [{ title: "Frame not found — Aura Vision" }, { name: "robots", content: "noindex" }] };
    return { meta: [
      { title: `${p.name} ${p.type} — Aura Vision` },
      { name: "description", content: p.description },
      { property: "og:title", content: `${p.name} — Aura Vision` },
      { property: "og:description", content: p.description },
      { property: "og:type", content: "product" },
    ] };
  },
  component: PDP,
});

function ProductGallery({ p }: { p: Product }) {
  const imgs = [...p.images, p.images[0]!, p.images[1]!];
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      <div className="no-scrollbar flex gap-3 overflow-x-auto md:flex-col">
        {imgs.map((src, j) => (
          <button key={j} onClick={() => setI(j)} aria-label={`Image ${j + 1}`} className={cn("size-20 shrink-0 overflow-hidden rounded-xl border-2 transition", i === j ? "border-primary" : "border-transparent opacity-60 hover:opacity-100")}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div onMouseMove={onMove} onMouseLeave={() => setZoom(null)} className="relative aspect-square flex-1 overflow-hidden rounded-3xl bg-pale md:cursor-zoom-in">
        <AnimatePresence mode="wait">
          <motion.img key={i} src={imgs[i]} alt={`${p.name} view ${i + 1}`} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: zoom ? 1.8 : 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : {}} className="h-full w-full object-cover" />
        </AnimatePresence>
      </div>
    </div>
  );
}

function PDP() {
  const { id } = Route.useLoaderData();
  const p = getProduct(id)!;
  const { addToCart, toggleWish, inWish, setCartOpen } = useStore();
  const [color, setColor] = useState(p.colors[0]?.name ?? "");
  const [size, setSize] = useState<string>(p.size);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id);
  const info = [
    ["Product Details", p.description],
    ["Materials", `${p.material} frame · ${p.frameType} · Anti-reflective, scratch-resistant lenses with UV400 protection.`],
    ["Frame Measurements", "Lens width 50 mm · Bridge 20 mm · Temple 145 mm · Lens height 42 mm."],
    ["Shipping", "Free express delivery across India in 3–5 days. Dispatched within 72 hours."],
    ["Returns", "Changed your mind? Return within 7 days for a full refund, no questions asked."],
    ["Care Instructions", "Clean with the included microfibre cloth. Store in the case. Avoid leaving in hot cars."],
  ];
  return (
    <>
      <section className="px-5 pb-20 pt-28 md:px-10 md:pt-32">
        <nav aria-label="Breadcrumb" className="label-tech mx-auto mb-8 max-w-[1400px] text-muted-foreground"><Link to="/">Home</Link> / <Link to={`/${p.category}`}>{p.category.replace("-", " ")}</Link> / <span className="text-navy">{p.name}</span></nav>
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ProductGallery p={p} />
          <div className="lg:sticky lg:top-28 lg:self-start">
            {p.badge && <span className="label-tech rounded-full bg-pale px-3 py-1.5 text-primary">{p.badge}</span>}
            <h1 className="headline mt-5 text-6xl text-navy md:text-7xl">{p.name}</h1>
            <p className="label-tech mt-3 text-muted-foreground">{p.type}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="font-mono text-2xl text-navy">{inr(p.price)}</span>
              {p.originalPrice && <span className="font-mono text-muted-foreground line-through">{inr(p.originalPrice)}</span>}
              <Stars rating={p.rating} /><span className="text-xs text-muted-foreground">{p.reviews} Reviews</span>
            </div>
            <Picker label="Colour" opts={["Midnight Blue", "Crystal", "Ice Grey", "Warm Gold"].filter((c) => p.colors.some((x) => x.name === c)).concat(p.colors.map((c) => c.name).filter((c) => !["Midnight Blue", "Crystal", "Ice Grey", "Warm Gold"].includes(c)))} value={color} set={setColor} />
            <Picker label="Size" opts={["Small", "Medium", "Large"]} value={size} set={setSize} />
            <div className="mt-8 flex gap-3">
              <Btn size="lg" className="flex-1" onClick={() => addToCart(p.id, color, size)}>Add to cart</Btn>
              <button onClick={() => toggleWish(p.id)} aria-label="Wishlist" aria-pressed={inWish(p.id)} className="grid size-14 place-items-center rounded-full border border-border hover:border-primary"><Heart className={cn("size-5", inWish(p.id) && "fill-primary text-primary")} /></button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link to="/checkout" onClick={() => { addToCart(p.id, color, size); setCartOpen(false); }} className={btnClass("dark", "lg")}>Buy now</Link>
              <Link to="/virtual-try-on" search={{ frame: p.id }} className={btnClass("glass", "lg")}><ScanFace className="size-4" /> Try-on</Link>
            </div>
            <ul className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-5">
              {[[Truck, "Free Shipping"], [RotateCcw, "7-Day Returns"], [ShieldCheck, "1-Year Warranty"]].map(([I, t]) => {
                const Icon = I as typeof Truck;
                return <li key={t as string} className="flex flex-col items-center gap-2 text-center"><Icon className="size-5 text-primary" /><span className="label-tech text-[0.58rem]">{t as string}</span></li>;
              })}
            </ul>
            <Accordion type="single" collapsible defaultValue="Product Details" className="mt-4">
              {info.map(([t, d]) => (
                <AccordionItem key={t} value={t!}><AccordionTrigger className="font-display text-xl hover:no-underline">{t}</AccordionTrigger><AccordionContent className="text-muted-foreground">{d}</AccordionContent></AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <section className="bg-pale px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1400px]"><SectionHead eyebrow="You may also like" title="Pairs well with" /><div className="mt-10"><ProductCarousel items={related} /></div></div>
      </section>
    </>
  );
}
