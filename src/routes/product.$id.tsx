import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Truck, RotateCcw, ShieldCheck, Minus, Plus, Star, CheckCircle2 } from "lucide-react";
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
    if (!p) return { meta: [{ title: "Frame not found — AURA VISION" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} ${p.type} — AURA VISION` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — AURA VISION` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
      ],
    };
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
          <button
            key={j}
            onClick={() => setI(j)}
            aria-label={`Image ${j + 1}`}
            className={cn(
              "size-20 shrink-0 overflow-hidden rounded-xl border-2 transition",
              i === j ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
        className="relative aspect-square flex-1 overflow-hidden rounded-3xl bg-pale md:cursor-zoom-in"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={i}
            src={imgs[i]}
            alt={`${p.name} view ${i + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: zoom ? 1.8 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : {}}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

const sampleReviews = [
  {
    name: "Rohan Varma",
    location: "New Delhi",
    rating: 5,
    date: "Verified Buyer · 2 weeks ago",
    title: "Weightless on the nose bridge",
    comment: "The titanium frame is unbelievably light. I code 10 hours a day and usually get red indentations from glasses, but with the Vector I genuinely forget I'm wearing them.",
  },
  {
    name: "Pooja Hegde",
    location: "Bengaluru",
    rating: 5,
    date: "Verified Buyer · 1 month ago",
    title: "Exquisite craftsmanship and hinge balance",
    comment: "The hand-polished bevels reflect light beautifully. Packaging felt like luxury fine jewelry, complete with leatherette case and calibration tool.",
  },
  {
    name: "Arjun Nair",
    location: "Mumbai",
    rating: 4.8,
    date: "Verified Buyer · 3 weeks ago",
    title: "BluCut coating has zero noticeable yellow tint",
    comment: "As a product designer, color accuracy is paramount. The anti-glare filtration works wonders under bright studio lights without skewing colors.",
  },
];

function PDP() {
  const { id } = Route.useLoaderData();
  const p = getProduct(id)!;
  const { addToCart, toggleWish, inWish, setCartOpen } = useStore();
  const [color, setColor] = useState(p.colors[0]?.name ?? "");
  const [size, setSize] = useState<string>(p.size);
  const [qty, setQty] = useState(1);

  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 6);

  const info = [
    ["Product Details", p.description],
    ["Materials & Craft", `${p.material} chassis · ${p.frameType} · Hand-polished edges, medical silicone pads, anti-reflective multi-coat lenses with UV400 filtration.`],
    ["Frame Measurements", `Lens width: 50 mm · Bridge: 20 mm · Temple length: 145 mm · Frame weight: ~14.2g · Lens height: 42 mm.`],
    ["Shipping & Packaging", "Free insured delivery across India in 3–5 business days. Dispatched within 48 hours in luxury magnetic hard case with microfibre cloth."],
    ["7-Day Returns", "Hassle-free 7-day return and exchange window. Free doorstep courier pickup with 100% refund guarantee."],
    ["1-Year Atelier Warranty", "Covers hinge integrity, solder welds, and lens coating delamination for 365 days."],
  ];

  return (
    <>
      <section className="px-5 pb-20 pt-28 md:px-10 md:pt-32">
        <nav aria-label="Breadcrumb" className="label-tech mx-auto mb-8 max-w-[1400px] text-muted-foreground">
          <Link to="/" className="hover:text-primary transition">Home</Link> /{" "}
          <Link to={`/${p.category}`} className="hover:text-primary transition">{p.category.replace("-", " ")}</Link> /{" "}
          <span className="text-navy">{p.name}</span>
        </nav>

        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ProductGallery p={p} />

          <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <div>
              {p.badge && <span className="label-tech rounded-full bg-pale px-3 py-1.5 text-primary inline-block mb-3">{p.badge}</span>}
              <h1 className="headline text-5xl text-navy sm:text-6xl md:text-7xl">{p.name}</h1>
              <p className="label-tech mt-2 text-muted-foreground">{p.type} · {p.material}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="font-mono text-3xl text-navy font-semibold">{inr(p.price)}</span>
                {p.originalPrice && <span className="font-mono text-lg text-muted-foreground line-through">{inr(p.originalPrice)}</span>}
                <div className="flex items-center gap-1.5">
                  <Stars rating={p.rating} />
                  <span className="text-xs text-muted-foreground font-mono">({p.reviews} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Colors */}
            <Picker
              label="Frame Color"
              opts={p.colors.map((c) => c.name)}
              value={color}
              set={setColor}
            />

            {/* Size */}
            <Picker label="Frame Size" opts={["Small", "Medium", "Large"]} value={size} set={setSize} />

            {/* Quantity Selector */}
            <div className="pt-2">
              <span className="label-tech text-muted-foreground block mb-2">Quantity</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-border bg-pale px-2 py-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid size-8 place-items-center rounded-full hover:bg-ice text-navy"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="font-mono px-4 text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="grid size-8 place-items-center rounded-full hover:bg-ice text-navy"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">In stock · Ready to dispatch</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex gap-3">
              <Btn size="lg" className="flex-1" onClick={() => addToCart(p.id, color, size, qty)}>
                Add {qty > 1 ? `(${qty})` : ""} to cart · {inr(p.price * qty)}
              </Btn>
              <button
                onClick={() => toggleWish(p.id)}
                aria-label="Wishlist"
                aria-pressed={inWish(p.id)}
                className="grid size-14 shrink-0 place-items-center rounded-full border border-border hover:border-primary transition"
              >
                <Heart className={cn("size-5", inWish(p.id) && "fill-primary text-primary")} />
              </button>
            </div>

            <div>
              <Link
                to="/checkout"
                onClick={() => {
                  addToCart(p.id, color, size, qty);
                  setCartOpen(false);
                }}
                className={cn(btnClass("dark", "lg"), "w-full justify-center")}
              >
                Instant Checkout · {inr(p.price * qty)}
              </Link>
            </div>

            {/* Assurances */}
            <ul className="grid grid-cols-3 gap-2 border-y border-border py-4 text-center">
              {[
                [Truck, "Free Shipping"],
                [RotateCcw, "7-Day Returns"],
                [ShieldCheck, "1-Yr Warranty"],
              ].map(([I, t]) => {
                const Icon = I as typeof Truck;
                return (
                  <li key={t as string} className="flex flex-col items-center gap-1.5">
                    <Icon className="size-4 text-primary" />
                    <span className="label-tech text-[0.56rem] text-navy">{t as string}</span>
                  </li>
                );
              })}
            </ul>

            {/* Accordion Specs */}
            <Accordion type="single" collapsible defaultValue="Product Details" className="mt-4">
              {info.map(([t, d]) => (
                <AccordionItem key={t} value={t!} className="border-border">
                  <AccordionTrigger className="font-display text-xl text-navy hover:no-underline">
                    {t}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {d}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="border-t border-border bg-ice px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <p className="label-tech text-primary">Customer Experiences</p>
              <h2 className="headline mt-2 text-4xl sm:text-5xl text-navy">Ratings & Reviews</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-display text-4xl text-navy font-semibold">{p.rating.toFixed(1)} / 5</p>
                <p className="text-xs text-muted-foreground font-mono">Based on {p.reviews} verified orders</p>
              </div>
              <div className="size-12 rounded-2xl bg-pale grid place-items-center text-primary">
                <Star className="size-6 fill-current" />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {sampleReviews.map((rev) => (
              <div key={rev.name} className="rounded-3xl border border-border bg-pale p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Stars rating={rev.rating} />
                    <span className="label-tech text-[0.55rem] text-primary flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Verified
                    </span>
                  </div>
                  <h4 className="font-display mt-4 text-xl text-navy font-semibold">{rev.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">"{rev.comment}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-navy">{rev.name}</span>
                  <span>{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="bg-pale px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead eyebrow="You may also like" title="Pairs well with" />
          <div className="mt-10">
            <ProductCarousel items={related} />
          </div>
        </div>
      </section>

      {/* Mobile Sticky Purchase Bar (compact, doesn't obscure content) */}
      <aside aria-label="Quick Purchase" className="fixed inset-x-3 bottom-16 z-30 flex items-center justify-between rounded-2xl border border-border glass p-3 shadow-soft md:hidden">
        <div className="min-w-0 pr-3">
          <p className="font-display text-base font-semibold leading-none truncate text-navy">{p.name}</p>
          <p className="font-mono text-xs text-primary mt-0.5">{inr(p.price)}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Btn size="sm" onClick={() => addToCart(p.id, color, size, qty)}>Add to Cart</Btn>
          <Link
            to="/checkout"
            onClick={() => {
              addToCart(p.id, color, size, qty);
              setCartOpen(false);
            }}
            className={btnClass("dark", "sm")}
          >
            Buy Now
          </Link>
        </div>
      </aside>
    </>
  );
}
