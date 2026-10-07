import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Eye, Plus } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { inr, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Stars } from "./ui";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { toggleWish, inWish, addToCart, setQuickView } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const wished = inWish(product.id);

  const tilt = (e: MouseEvent) => {
    if (!ref.current || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-4px)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");

  return (
    <div ref={ref} onMouseMove={tilt} onMouseLeave={reset} data-cursor="view" className={cn("group relative transition-transform duration-500 ease-premium", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-pale transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-glow">
        <Link to="/product/$id" params={{ id: product.id }} aria-label={`View ${product.name}`} className="absolute inset-0">
          <img src={product.images[0]} alt={`${product.name} ${product.type}`} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition-all duration-700 ease-premium group-hover:scale-105 group-hover:opacity-0" />
          <img src={product.images[1]} alt="" loading="lazy" width={800} height={1000} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 ease-premium group-hover:scale-100 group-hover:opacity-100" />
        </Link>
        {product.badge && <span className="label-tech absolute left-3 top-3 rounded-full glass px-3 py-1.5 text-deep">{product.badge}</span>}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWish(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full glass text-deep transition hover:text-primary"
        >
          <Heart className={cn("size-4 transition", wished && "fill-primary text-primary")} />
        </motion.button>
        <div className="absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-500 ease-premium md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button onClick={() => addToCart(product.id)} className="label-tech flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground transition hover:bg-ultra">
            <Plus className="size-3.5" /> Quick add
          </button>
          <button onClick={() => setQuickView(product)} aria-label="Quick view" className="grid size-10 place-items-center rounded-full glass text-deep hover:text-primary">
            <Eye className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to="/product/$id" params={{ id: product.id }} className="font-display text-2xl leading-none text-navy hover:text-primary">{product.name}</Link>
          <p className="label-tech mt-2 text-muted-foreground">{product.type}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm text-navy">{inr(product.price)}</p>
          {product.originalPrice && <p className="font-mono text-xs text-muted-foreground line-through">{inr(product.originalPrice)}</p>}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Stars rating={product.rating} />
        <div className="flex gap-1.5">
          {product.colors.map((c) => (
            <span key={c.name} title={c.name} className="size-3 rounded-full border border-border" style={{ background: c.swatch }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}>
          <ProductCard product={p} />
        </motion.div>
      ))}
    </div>
  );
}

export function ProductCarousel({ items }: { items: Product[] }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-10 md:gap-6 md:px-10">
      {items.map((p) => (
        <div key={p.id} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[30vw] lg:w-[23vw]">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
