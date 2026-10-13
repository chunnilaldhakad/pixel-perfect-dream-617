import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { useState } from "react";
import { stores } from "@/lib/data";
import { PageHero } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stores")({
  head: () => ({ meta: [{ title: "Store Locator — Aura Vision" }, { name: "description", content: "Find an Aura Vision store in Jaipur, Delhi, Mumbai or Bangalore." }, { property: "og:title", content: "Find a Store — Aura Vision" }, { property: "og:description", content: "Visit an Aura Vision store near you." }] }),
  component: StoreLocator,
});

function StoreLocator() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(stores[0]!.id);
  const list = stores.filter((s) => !q || s.pins.some((p) => p.includes(q.toLowerCase().trim())) || s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero eyebrow="Stores" title="Find a store near you." />
      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[420px_1fr]">
          <div>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Enter city or PIN code" aria-label="Search stores" className="h-14 w-full rounded-full border border-border bg-ice px-6 outline-none focus:border-primary" />
            <ul className="mt-6 space-y-3">
              {list.map((s) => (
                <li key={s.id}>
                  <button onClick={() => setActive(s.id)} className={cn("w-full rounded-2xl border p-5 text-left transition", active === s.id ? "border-primary bg-pale shadow-glow" : "border-border hover:border-primary/50")}>
                    <p className="font-display text-2xl text-navy">{s.name}</p>
                    <p className="mt-3 flex gap-2 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0 text-primary" />{s.address}</p>
                    <p className="mt-1.5 flex gap-2 text-sm text-muted-foreground"><Clock className="size-4 text-primary" />{s.hours}</p>
                    <p className="mt-1.5 flex gap-2 text-sm text-muted-foreground"><Phone className="size-4 text-primary" />{s.phone}</p>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="label-tech mt-4 inline-flex items-center gap-2 text-primary"><Navigation className="size-3.5" /> Get directions</a>
                  </button>
                </li>
              ))}
              {!list.length && <p className="text-sm text-muted-foreground">No store found. Try Jaipur, Delhi, Mumbai or Bangalore.</p>}
            </ul>
          </div>
          <div className="grid-lines relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-pale">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-primary/15" fill="currentColor" aria-hidden><path d="M35 5 L55 8 L62 20 L75 30 L70 45 L60 55 L52 75 L45 95 L38 80 L28 62 L22 45 L25 30 Z" /></svg>
            {stores.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} aria-label={s.name} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                {active === s.id && <span className="absolute left-1/2 top-full size-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/30" />}
                <MapPin className={cn("relative size-9 transition", active === s.id ? "fill-primary text-ice" : "fill-deep/70 text-ice")} />
                <span className="label-tech absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-navy">{s.name.replace("Aura Vision ", "")}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
