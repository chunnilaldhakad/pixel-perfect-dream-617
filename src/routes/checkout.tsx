import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { getProduct, inr } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Btn, btnClass } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Aura Vision" }, { name: "description", content: "Secure checkout for your Aura Vision order." }, { property: "og:title", content: "Checkout — Aura Vision" }, { property: "og:description", content: "Complete your order." }] }),
  component: Checkout,
});

const steps = ["Address", "Delivery", "Payment", "Confirmation"];

export function CheckoutSteps({ step }: { step: number }) {
  return (
    <ol className="flex gap-2">
      {steps.map((s, i) => (
        <li key={s} className="flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-border"><motion.div className="h-full bg-primary" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5 }} /></div>
          <p className={cn("label-tech mt-3 text-[0.6rem]", i <= step ? "text-primary" : "text-muted-foreground")}>0{i + 1} <span className="hidden sm:inline">{s}</span></p>
        </li>
      ))}
    </ol>
  );
}

function Field({ label, value, set, type = "text", full }: { label: string; value: string; set: (v: string) => void; type?: string; full?: boolean }) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="label-tech text-muted-foreground">{label}</span>
      <input required type={type} value={value} onChange={(e) => set(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-ice px-4 outline-none focus:border-primary" />
    </label>
  );
}

function Checkout() {
  const { cart, subtotal, clearCart } = useStore();
  const [step, setStep] = useState(0);
  const [a, setA] = useState({ name: "", phone: "", address: "", city: "", state: "", pin: "" });
  const [delivery, setDelivery] = useState("Standard");
  const [pay, setPay] = useState("UPI");
  const [paying, setPaying] = useState(false);
  const [order, setOrder] = useState<{ id: string; date: string; total: number } | null>(null);
  const ship = delivery === "Express" ? 199 : 0;
  const total = subtotal + ship;

  const placeOrder = () => {
    setPaying(true);
    setTimeout(() => {
      const d = new Date(Date.now() + (delivery === "Express" ? 2 : 5) * 864e5);
      setOrder({ id: "AV" + Math.floor(100000 + Math.random() * 900000), date: d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }), total });
      clearCart();
      setPaying(false);
      setStep(3);
    }, 1600);
  };

  if (!cart.length && !order) {
    return <section className="px-5 pb-24 pt-40 text-center"><h1 className="headline text-6xl text-navy">Your cart is empty.</h1><Link to="/eyeglasses" className={cn(btnClass("primary"), "mt-8")}>Shop frames</Link></section>;
  }

  const opt = (cur: string, set: (s: string) => void, list: [string, string][]) => (
    <div className="grid gap-3" role="radiogroup">
      {list.map(([k, d]) => (
        <button type="button" key={k} role="radio" aria-checked={cur === k} onClick={() => set(k)} className={cn("flex items-center justify-between rounded-2xl border p-5 text-left transition", cur === k ? "border-primary bg-pale shadow-glow" : "border-border hover:border-primary/50")}>
          <span><span className="font-display text-2xl">{k}</span><span className="block text-sm text-muted-foreground">{d}</span></span>
          <span className={cn("grid size-6 place-items-center rounded-full border", cur === k && "border-primary bg-primary text-primary-foreground")}>{cur === k && <Check className="size-3.5" />}</span>
        </button>
      ))}
    </div>
  );

  return (
    <section className="px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="headline text-6xl text-navy">Checkout</h1>
          <div className="mt-8"><CheckoutSteps step={step} /></div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="mt-10">
              {step === 0 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" value={a.name} set={(v) => setA({ ...a, name: v })} />
                  <Field label="Phone" type="tel" value={a.phone} set={(v) => setA({ ...a, phone: v })} />
                  <Field label="Address" full value={a.address} set={(v) => setA({ ...a, address: v })} />
                  <Field label="City" value={a.city} set={(v) => setA({ ...a, city: v })} />
                  <Field label="State" value={a.state} set={(v) => setA({ ...a, state: v })} />
                  <Field label="PIN Code" value={a.pin} set={(v) => setA({ ...a, pin: v })} />
                  <div className="sm:col-span-2"><Btn size="lg" type="submit">Continue to delivery</Btn></div>
                </form>
              )}
              {step === 1 && (<>{opt(delivery, setDelivery, [["Standard", "Free · 3–5 business days"], ["Express", "₹199 · 1–2 business days"]])}<div className="mt-8 flex gap-3"><Btn v="glass" onClick={() => setStep(0)}>Back</Btn><Btn onClick={() => setStep(2)}>Continue to payment</Btn></div></>)}
              {step === 2 && (<>
                {opt(pay, setPay, [["UPI", "GPay, PhonePe, Paytm"], ["Card", "Visa, Mastercard, RuPay"], ["Net Banking", "All major Indian banks"], ["Cash on Delivery", "Pay when it arrives"]])}
                <p className="mt-4 text-xs text-muted-foreground">Demo store — no real payment is taken.</p>
                <div className="mt-8 flex gap-3"><Btn v="glass" onClick={() => setStep(1)}>Back</Btn><Btn onClick={placeOrder} disabled={paying}>{paying ? "Processing…" : `Pay ${inr(total)}`}</Btn></div>
              </>)}
              {step === 3 && order && (
                <div className="rounded-3xl border border-primary/30 bg-pale p-10 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mx-auto grid size-20 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-9" /></motion.div>
                  <h2 className="headline mt-6 text-5xl text-navy">Order confirmed.</h2>
                  <p className="label-tech mt-6 text-muted-foreground">Order ID</p><p className="font-mono text-xl">{order.id}</p>
                  <p className="label-tech mt-4 text-muted-foreground">Estimated delivery</p><p className="font-display text-2xl">{order.date}</p>
                  <div className="mt-8 flex justify-center gap-3"><Link to="/" className={btnClass("primary")}>Continue shopping</Link><Link to="/track-order" className={btnClass("glass")}>Track order</Link></div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {step < 3 && (
          <aside className="h-fit rounded-3xl border border-border bg-pale p-6">
            <p className="headline text-3xl">Your order</p>
            <ul className="mt-5 space-y-4">{cart.map((it, i) => { const p = getProduct(it.id)!; return <li key={i} className="flex gap-3"><img src={p.images[0]} alt="" className="size-14 rounded-lg object-cover" /><div className="flex-1 text-sm"><p className="font-display text-lg leading-none">{p.name}</p><p className="text-muted-foreground">×{it.qty}</p></div><span className="font-mono text-sm">{inr(p.price * it.qty)}</span></li>; })}</ul>
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm"><div className="flex justify-between"><span>Shipping</span><span className="font-mono">{ship ? inr(ship) : "FREE"}</span></div><div className="flex justify-between font-medium"><span>Total</span><span className="font-mono">{inr(total)}</span></div></div>
          </aside>
        )}
      </div>
    </section>
  );
}
