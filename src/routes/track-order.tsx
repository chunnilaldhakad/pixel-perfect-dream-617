import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { Btn, PageHero } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track-order")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : undefined }),
  head: () => ({ meta: [{ title: "Track Order — Aura Vision" }, { name: "description", content: "Track your Aura Vision order from confirmation to delivery." }, { property: "og:title", content: "Track Order — Aura Vision" }, { property: "og:description", content: "Track your order." }] }),
  component: Track,
});

const stages = ["Order Placed", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

function Track() {
  const { id: initial } = Route.useSearch();
  const [id, setId] = useState(initial ?? "");
  const [contact, setContact] = useState("");
  const [shown, setShown] = useState<{ id: string; stage: number } | null>(initial ? { id: initial, stage: 3 } : null);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
    setShown({ id: id.toUpperCase(), stage: n % 6 });
  };
  return (
    <>
      <PageHero eyebrow="Order tracking" title="Where are my frames?" sub="Enter your order ID and phone or email. Try AV482910." />
      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input required value={id} onChange={(e) => setId(e.target.value)} placeholder="Order ID" aria-label="Order ID" className="h-12 rounded-full border border-border bg-ice px-5 outline-none focus:border-primary" />
            <input required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone or email" aria-label="Phone or email" className="h-12 rounded-full border border-border bg-ice px-5 outline-none focus:border-primary" />
            <Btn type="submit">Track</Btn>
          </form>
          {shown && (
            <div className="mt-12 rounded-3xl border border-border bg-ice p-6 md:p-10">
              <p className="label-tech text-muted-foreground">Order</p><p className="font-mono text-xl">{shown.id}</p>
              <ol className="relative mt-8 space-y-7 pl-10">
                <div className="absolute bottom-2 left-[15px] top-2 w-0.5 bg-border" />
                <motion.div className="absolute left-[15px] top-2 w-0.5 bg-primary" initial={{ height: 0 }} animate={{ height: `${(shown.stage / 5) * 94}%` }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
                {stages.map((s, i) => (
                  <motion.li key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="relative">
                    <span className={cn("absolute -left-10 grid size-8 place-items-center rounded-full border-2", i <= shown.stage ? "border-primary bg-primary text-primary-foreground" : "border-border bg-ice")}>{i <= shown.stage && <Check className="size-4" />}</span>
                    <p className={cn("font-display text-2xl", i <= shown.stage ? "text-navy" : "text-muted-foreground")}>{s}</p>
                    {i === shown.stage && <p className="label-tech text-primary">Current status</p>}
                  </motion.li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
