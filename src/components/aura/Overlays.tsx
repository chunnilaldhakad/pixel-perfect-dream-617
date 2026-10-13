import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search, Minus, Plus, Trash2, ArrowRight, Heart } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, inr, products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Btn, Stars, btnClass } from "./ui";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function useEsc(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const f = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", f);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", f); document.body.style.overflow = ""; };
  }, [open, close]);
}

function Drawer({ open, close, title, children, footer }: { open: boolean; close: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  useEsc(open, close);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-navy/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside role="dialog" aria-modal="true" aria-label={title} className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-background shadow-soft" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.55, ease }}>
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="headline text-3xl text-navy">{title}</h2>
              <button onClick={close} aria-label="Close" className="grid size-10 place-items-center rounded-full hover:bg-pale"><X className="size-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && <div className="border-t border-border px-6 py-5">{footer}</div>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeItem, subtotal, addToCart } = useStore();
  const close = () => setCartOpen(false);
  const recs = products.filter((p) => !cart.some((c) => c.id === p.id)).slice(0, 4);
  return (
    <Drawer open={cartOpen} close={close} title="Your Cart" footer={cart.length > 0 && (
      <div className="space-y-3">
        <Row k="Subtotal" v={inr(subtotal)} />
        <Row k="Shipping" v="FREE" accent />
        <Link to="/checkout" onClick={close} className={cn(btnClass("primary", "lg"), "w-full")}>Proceed to checkout <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link>
        <Link to="/cart" onClick={close} className="label-tech block text-center text-muted-foreground hover:text-primary">View full cart</Link>
      </div>
    )}>
      {cart.length === 0 ? (
        <Empty title="Your cart is clear" text="Frames you add will appear here." onClose={close} />
      ) : (
        <ul className="space-y-5">
          {cart.map((it, i) => {
            const p = getProduct(it.id);
            if (!p) return null;
            return (
              <motion.li layout key={`${it.id}-${it.color}-${it.size}`} className="flex gap-4">
                <img src={p.images[0]} alt={p.name} className="size-24 rounded-xl object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <p className="font-display text-xl text-navy">{p.name}</p>
                    <p className="font-mono text-sm">{inr(p.price * it.qty)}</p>
                  </div>
                  <p className="label-tech text-muted-foreground">{it.color} · {it.size}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <Qty value={it.qty} set={(q) => setQty(i, q)} />
                    <button onClick={() => removeItem(i)} aria-label="Remove" className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
      <p className="label-tech mb-4 mt-10 text-primary">Complete the look</p>
      <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6">
        {recs.map((p) => (
          <div key={p.id} className="w-36 shrink-0">
            <img src={p.images[0]} alt={p.name} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
            <p className="mt-2 font-display text-lg leading-none">{p.name}</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono text-xs">{inr(p.price)}</span>
              <button onClick={() => addToCart(p.id)} aria-label={`Add ${p.name}`} className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"><Plus className="size-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}

export function Qty({ value, set }: { value: number; set: (n: number) => void }) {
  return (
    <div className="flex items-center rounded-full border border-border">
      <button onClick={() => set(value - 1)} aria-label="Decrease" className="grid size-8 place-items-center hover:text-primary"><Minus className="size-3.5" /></button>
      <span className="w-6 text-center font-mono text-sm" aria-live="polite">{value}</span>
      <button onClick={() => set(value + 1)} aria-label="Increase" className="grid size-8 place-items-center hover:text-primary"><Plus className="size-3.5" /></button>
    </div>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return <div className="flex justify-between"><span className="label-tech text-muted-foreground">{k}</span><span className={cn("font-mono text-sm", accent && "text-primary")}>{v}</span></div>;
}

function Empty({ title, text, onClose }: { title: string; text: string; onClose: () => void }) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto grid size-24 place-items-center rounded-full bg-pale"><svg viewBox="0 0 80 30" className="w-14 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="20" cy="15" r="11" /><circle cx="60" cy="15" r="11" /><path d="M31 15c3-3 15-3 18 0" /></svg></div>
      <p className="headline mt-6 text-3xl text-navy">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <Link to="/eyeglasses" onClick={onClose} className={cn(btnClass("glass", "sm"), "mt-6")}>Explore frames</Link>
    </div>
  );
}

export function WishlistDrawer() {
  const { wishlist, wishOpen, setWishOpen, toggleWish, addToCart } = useStore();
  const close = () => setWishOpen(false);
  return (
    <Drawer open={wishOpen} close={close} title="Wishlist" footer={wishlist.length > 0 && <Link to="/wishlist" onClick={close} className={cn(btnClass("glass"), "w-full")}>View all saved</Link>}>
      {wishlist.length === 0 ? (
        <Empty title="Your curated collection" text="Tap the heart on any frame to save it here." onClose={close} />
      ) : (
        <ul className="space-y-5">
          {wishlist.map((id) => {
            const p = getProduct(id);
            if (!p) return null;
            return (
              <li key={id} className="flex gap-4">
                <img src={p.images[0]} alt={p.name} className="size-24 rounded-xl object-cover" />
                <div className="flex flex-1 flex-col">
                  <Link to="/product/$id" params={{ id }} onClick={close} className="font-display text-xl text-navy hover:text-primary">{p.name}</Link>
                  <p className="font-mono text-sm">{inr(p.price)}</p>
                  <div className="mt-auto flex gap-2">
                    <Btn size="sm" onClick={() => { addToCart(id); close(); }}>Add to cart</Btn>
                    <button onClick={() => toggleWish(id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}

export function QuickViewModal() {
  const { quickView: p, setQuickView, addToCart, toggleWish, inWish } = useStore();
  const close = () => setQuickView(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("Medium");
  useEffect(() => { if (p) { setColor(p.colors[0]?.name ?? ""); setSize(p.size); } }, [p]);
  useEsc(!!p, close);
  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-navy/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.5, ease }} className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-background md:grid-cols-2">
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full glass"><X className="size-5" /></button>
            <img src={p.images[0]} alt={p.name} className="aspect-square h-full w-full object-cover md:aspect-auto" />
            <div className="flex flex-col p-8">
              <p className="label-tech text-primary">{p.type}</p>
              <h2 className="headline mt-3 text-5xl text-navy">{p.name}</h2>
              <div className="mt-4 flex items-center gap-4"><span className="font-mono text-xl">{inr(p.price)}</span><Stars rating={p.rating} /></div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <Picker label="Colour" opts={p.colors.map((c) => c.name)} value={color} set={setColor} />
              <Picker label="Size" opts={["Small", "Medium", "Large"]} value={size} set={setSize} />
              <div className="mt-8 flex gap-3">
                <Btn className="flex-1" onClick={() => { addToCart(p.id, color, size); close(); }}>Add to cart</Btn>
                <button onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="grid size-12 place-items-center rounded-full border border-border hover:border-primary"><Heart className={cn("size-4", inWish(p.id) && "fill-primary text-primary")} /></button>
              </div>
              <Link to="/product/$id" params={{ id: p.id }} onClick={close} className="label-tech mt-5 inline-flex items-center gap-2 text-deep hover:text-primary">View full product <ArrowRight className="size-3.5" /></Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Picker({ label, opts, value, set }: { label: string; opts: string[]; value: string; set: (s: string) => void }) {
  return (
    <div className="mt-6">
      <p className="label-tech mb-3 text-muted-foreground">{label}: <span className="text-navy">{value}</span></p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {opts.map((o) => (
          <button key={o} role="radio" aria-checked={value === o} onClick={() => set(o)} className={cn("rounded-full border px-4 py-2 text-xs transition", value === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>{o}</button>
        ))}
      </div>
    </div>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const close = () => setSearchOpen(false);
  useEsc(searchOpen, close);
  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);
  const sugg = ["Round Frames", "Blue Light Glasses", "Titanium", "Best Sellers", "Sunglasses"];
  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[90] overflow-y-auto bg-background/95 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <div className="mx-auto max-w-5xl px-5 pb-20 pt-8 md:pt-16">
            <div className="flex justify-end"><button onClick={close} aria-label="Close search" className="grid size-11 place-items-center rounded-full border border-border hover:border-primary"><X className="size-5" /></button></div>
            <motion.form initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease }} onSubmit={(e) => { e.preventDefault(); close(); nav({ to: "/search", search: { q } }); }} className="mt-8 flex items-center gap-4 border-b-2 border-navy pb-4 focus-within:border-primary">
              <Search className="size-7 text-primary" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search AURA VISION" aria-label="Search products" className="headline w-full bg-transparent text-4xl text-navy outline-none placeholder:text-navy/25 md:text-6xl" />
            </motion.form>
            <div className="mt-8 flex flex-wrap gap-2">
              {sugg.map((s) => <button key={s} onClick={() => setQ(s)} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">{s}</button>)}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {results.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to="/product/$id" params={{ id: p.id }} onClick={close} className="group flex items-center gap-3 rounded-2xl border border-border p-3 hover:border-primary">
                    <img src={p.images[0]} alt="" className="size-16 rounded-lg object-cover" />
                    <div><p className="font-display text-xl leading-none group-hover:text-primary">{p.name}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{inr(p.price)}</p></div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {q && results.length === 0 && <p className="mt-12 text-muted-foreground">No frames match "{q}".</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function searchProducts(q: string) {
  const t = q.toLowerCase().replace("frames", "").replace("glasses", "").trim();
  if (!t) return products.filter((p) => p.featured);
  if (t.includes("best")) return products.filter((p) => p.tags.includes("bestseller"));
  if (t.includes("blue")) return products.filter((p) => p.category === "computer-glasses");
  return products.filter((p) => [p.name, p.type, p.material, p.shape, p.category, p.gender, ...p.colors.map((c) => c.name)].join(" ").toLowerCase().includes(t));
}
