import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { getProduct, inr } from "@/lib/data";
import { useStore } from "@/lib/store";
import { PageHero, btnClass } from "@/components/aura/ui";
import { Qty } from "@/components/aura/Overlays";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Aura Vision" }, { name: "description", content: "Review your selected Aura Vision frames." }, { property: "og:title", content: "Your Cart — Aura Vision" }, { property: "og:description", content: "Review your selected frames." }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeItem, subtotal } = useStore();
  return (
    <>
      <PageHero eyebrow={`${cart.length} items`} title="Your cart." />
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_380px]">
          <ul className="divide-y divide-border">
            {cart.length === 0 && <li className="py-10"><p className="text-muted-foreground">Your cart is empty.</p><Link to="/eyeglasses" className={cn(btnClass("primary"), "mt-6")}>Shop frames</Link></li>}
            {cart.map((it, i) => {
              const p = getProduct(it.id);
              if (!p) return null;
              return (
                <li key={i} className="flex gap-5 py-6">
                  <img src={p.images[0]} alt={p.name} className="size-28 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between"><Link to="/product/$id" params={{ id: p.id }} className="font-display text-2xl">{p.name}</Link><span className="font-mono">{inr(p.price * it.qty)}</span></div>
                    <p className="label-tech text-muted-foreground">{it.color} · {it.size}</p>
                    <div className="mt-auto flex items-center justify-between"><Qty value={it.qty} set={(q) => setQty(i, q)} /><button onClick={() => removeItem(i)} aria-label="Remove" className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button></div>
                  </div>
                </li>
              );
            })}
          </ul>
          <aside className="h-fit rounded-3xl border border-border bg-pale p-6">
            <p className="headline text-3xl">Summary</p>
            <div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span className="font-mono">{inr(subtotal)}</span></div><div className="flex justify-between"><span>Shipping</span><span className="font-mono text-primary">FREE</span></div></div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 font-medium"><span>Total</span><span className="font-mono">{inr(subtotal)}</span></div>
            <Link to="/checkout" className={cn(btnClass("primary", "lg"), "mt-6 w-full", !cart.length && "pointer-events-none opacity-50")}>Proceed to checkout</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
