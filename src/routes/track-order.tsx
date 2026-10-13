import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Package, Truck, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduct, inr, type Product } from "@/lib/data";
import { Btn, PageHero, btnClass } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track-order")({
  validateSearch: (s: Record<string, unknown>): { id?: string } => (typeof s["id"] === "string" ? { id: s["id"] as string } : {}),
  head: () => ({
    meta: [
      { title: "Track Order — AURA VISION" },
      { name: "description", content: "Track your AURA VISION order from confirmation to doorstep delivery." },
      { property: "og:title", content: "Track Order — AURA VISION" },
      { property: "og:description", content: "Real-time order progress timeline." },
    ],
  }),
  component: TrackPage,
});

const stages = [
  { name: "Order Placed", time: "Day 1 · 10:14 AM", desc: "Order details verified & scheduled for optical assembly." },
  { name: "Optical Calibration", time: "Day 1 · 04:30 PM", desc: "Lenses edged and framed by master optician." },
  { name: "Quality Inspected", time: "Day 2 · 11:20 AM", desc: "Passed 42-point laser precision alignment & polish." },
  { name: "Shipped via Air", time: "Day 2 · 06:45 PM", desc: "Dispatched with BlueDart Apex Air tracking." },
  { name: "Out for Delivery", time: "Day 3 · 08:30 AM", desc: "With local courier agent for OTP delivery." },
  { name: "Delivered", time: "Expected by 07:00 PM", desc: "Safely received at your doorstep." },
];

type StoredOrder = {
  id: string;
  date: string;
  placedOn?: string;
  total: number;
  status: string;
  stage?: number;
  items?: string[];
  address?: { name: string; city: string; state: string; pin: string; address?: string };
  delivery?: string;
};

const defaultDemoOrders: Record<string, StoredOrder> = {
  AV482910: {
    id: "AV482910",
    date: "Delivered on 28 Sep 2026",
    placedOn: "25 Sep 2026",
    total: 5498,
    status: "Delivered",
    stage: 5,
    items: ["aura-vector", "aura-nova"],
    address: { name: "Ananya Sharma", city: "Jaipur", state: "Rajasthan", pin: "302006", address: "14 Civil Lines" },
    delivery: "Express Delivery",
  },
  AV510377: {
    id: "AV510377",
    date: "Expected in 2 days",
    placedOn: "9 Oct 2026",
    total: 3999,
    status: "Shipped",
    stage: 3,
    items: ["aura-edge"],
    address: { name: "Kabir Sen", city: "Mumbai", state: "Maharashtra", pin: "400050", address: "Linking Road, Bandra" },
    delivery: "Standard Delivery",
  },
};

function TrackPage() {
  const { id: initial } = Route.useSearch();
  const [queryId, setQueryId] = useState(initial ?? "");
  const [activeOrder, setActiveOrder] = useState<StoredOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const lookupOrder = (searchId: string) => {
    const clean = searchId.trim().toUpperCase();
    if (!clean) return;

    // Check localStorage
    try {
      const stored: StoredOrder[] = JSON.parse(localStorage.getItem("aura-orders") || "[]");
      const found = stored.find((o) => o.id.toUpperCase() === clean);
      if (found) {
        setActiveOrder({
          ...found,
          stage: found.stage ?? 2,
        });
        setSearched(true);
        return;
      }
    } catch {}

    // Check predefined sample demo orders
    if (defaultDemoOrders[clean]) {
      setActiveOrder(defaultDemoOrders[clean]);
      setSearched(true);
      return;
    }

    // Fallback simulated tracking for any valid ID format
    const hash = [...clean].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const stageIndex = hash % stages.length;
    setActiveOrder({
      id: clean,
      date: "Estimated 3–5 Business Days",
      placedOn: "Recently placed",
      total: 3499,
      status: stages[stageIndex]?.name ?? "In Transit",
      stage: stageIndex,
      items: ["aura-vector"],
      delivery: "Standard Courier Transit",
    });
    setSearched(true);
  };

  useEffect(() => {
    if (initial) {
      lookupOrder(initial);
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupOrder(queryId);
  };

  const currentStage = activeOrder ? (activeOrder.stage ?? 2) : 0;

  return (
    <>
      <PageHero
        eyebrow="Live Logistics"
        title={<>Track your <em className="text-primary italic">frames.</em></>}
        sub="Monitor every milestone from hand calibration in our optical lab to doorstep delivery. Try AV482910 or AV510377."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          {/* Tracking Search Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              required
              value={queryId}
              onChange={(e) => setQueryId(e.target.value)}
              placeholder="Enter Order ID (e.g. AV482910)"
              aria-label="Order ID input"
              className="h-14 flex-1 rounded-full border border-border bg-ice px-6 font-mono text-sm uppercase tracking-wider outline-none transition focus:border-primary shadow-sm"
            />
            <button
              type="submit"
              className="label-tech flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-glow transition hover:bg-ultra"
            >
              Track Order <ArrowRight className="size-4" />
            </button>
          </form>

          {/* Preset Buttons for Demo Convenience */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Quick sample lookups:</span>
            {["AV482910", "AV510377"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setQueryId(code);
                  lookupOrder(code);
                }}
                className="font-mono rounded-full border border-border bg-pale px-3 py-1 text-navy hover:border-primary"
              >
                {code}
              </button>
            ))}
          </div>

          {/* Tracking Result View */}
          {activeOrder && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12 rounded-3xl border border-border bg-ice p-6 sm:p-10 shadow-soft"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
                <div>
                  <span className="label-tech text-primary">Simulated Tracking Reference</span>
                  <h2 className="font-mono text-3xl font-semibold text-navy mt-1">{activeOrder.id}</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Placed: {activeOrder.placedOn ?? "Verified"} · {activeOrder.delivery ?? "Express"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="label-tech rounded-full bg-pale px-3 py-1.5 text-primary inline-block">
                    {stages[currentStage]?.name}
                  </span>
                  <p className="font-mono text-sm text-navy mt-2">{inr(activeOrder.total)}</p>
                </div>
              </div>

              {/* Items in this order */}
              {activeOrder.items && activeOrder.items.length > 0 && (
                <div className="py-6 border-b border-border">
                  <p className="label-tech text-muted-foreground mb-3">Shipment Contents</p>
                  <div className="flex flex-wrap gap-4">
                    {activeOrder.items.map((itemId, idx) => {
                      const prod = getProduct(itemId);
                      if (!prod) return null;
                      return (
                        <Link
                          key={idx}
                          to="/product/$id"
                          params={{ id: prod.id }}
                          className="flex items-center gap-3 rounded-2xl border border-border p-2.5 pr-4 hover:border-primary transition"
                        >
                          <img src={prod.images[0]} alt={prod.name} className="size-12 rounded-xl object-cover" />
                          <div>
                            <p className="font-display text-base text-navy leading-none">{prod.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{prod.type}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Delivery Address (if saved) */}
              {activeOrder.address && (
                <div className="py-4 border-b border-border text-xs text-muted-foreground flex items-center gap-2">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>
                    Destination: <strong className="text-navy">{activeOrder.address.name}</strong>, {activeOrder.address.address ? `${activeOrder.address.address}, ` : ""}{activeOrder.address.city}, {activeOrder.address.state} — {activeOrder.address.pin}
                  </span>
                </div>
              )}

              {/* Visual Timeline */}
              <div className="pt-8">
                <p className="label-tech text-primary mb-6">Milestone Progress</p>
                <ol className="relative space-y-8 pl-8 sm:pl-10">
                  {/* Progress Line */}
                  <div className="absolute bottom-3 left-[15px] sm:left-[19px] top-3 w-0.5 bg-border" />
                  <motion.div
                    className="absolute left-[15px] sm:left-[19px] top-3 w-0.5 bg-primary"
                    initial={{ height: 0 }}
                    animate={{ height: `${(currentStage / (stages.length - 1)) * 92}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {stages.map((st, idx) => {
                    const isDone = idx <= currentStage;
                    const isCurrent = idx === currentStage;
                    return (
                      <motion.li
                        key={st.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="relative"
                      >
                        <span
                          className={cn(
                            "absolute -left-8 sm:-left-10 grid size-7 sm:size-8 -translate-x-1/2 place-items-center rounded-full border-2 transition-colors",
                            isDone
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-border bg-ice text-muted-foreground"
                          )}
                        >
                          {isDone ? <Check className="size-3.5 sm:size-4" /> : <span className="size-2 rounded-full bg-border" />}
                        </span>

                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className={cn("font-display text-xl sm:text-2xl", isDone ? "text-navy" : "text-muted-foreground/60")}>
                            {st.name}
                          </p>
                          <span className="font-mono text-xs text-muted-foreground">{st.time}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground max-w-md">{st.desc}</p>
                        {isCurrent && (
                          <span className="label-tech mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.62rem] text-primary">
                            <Clock className="size-3" /> In Progress
                          </span>
                        )}
                      </motion.li>
                    );
                  })}
                </ol>
              </div>

              {/* Demo Notice */}
              <div className="mt-10 rounded-2xl bg-pale p-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Simulated status representation. Real deliveries include live courier tracking links.</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
