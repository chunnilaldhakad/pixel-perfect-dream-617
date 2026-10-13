import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, inr, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { PageHero, btnClass } from "@/components/aura/ui";
import { ProductGrid } from "@/components/aura/ProductCard";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Aura Vision" }, { name: "description", content: "Your Aura Vision profile, orders, wishlist and preferences." }, { property: "og:title", content: "My Account — Aura Vision" }, { property: "og:description", content: "Manage your Aura Vision account." }] }),
  component: Account,
});

const tabs = ["Profile", "Orders", "Wishlist", "Saved Addresses", "Preferences"] as const;
const orders = [
  { id: "AV482910", date: "28 Sep 2026", status: "Delivered", total: 5498, items: ["aura-vector", "aura-nova"] },
  { id: "AV510377", date: "9 Oct 2026", status: "Shipped", total: 3999, items: ["aura-edge"] },
];

function Account() {
  const [t, setT] = useState<(typeof tabs)[number]>("Profile");
  const { wishlist } = useStore();
  return (
    <>
      <PageHero eyebrow="Demo account" title="Hello, Ananya." />
      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[240px_1fr]">
          <nav className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col" aria-label="Account sections">
            {tabs.map((x) => <button key={x} onClick={() => setT(x)} aria-current={t === x} className={cn("label-tech shrink-0 rounded-full px-4 py-3 text-left transition", t === x ? "bg-primary text-primary-foreground" : "hover:bg-pale")}>{x}</button>)}
          </nav>
          <div className="rounded-3xl border border-border bg-ice p-6 md:p-10">
            {t === "Profile" && <dl className="grid gap-6 sm:grid-cols-2">{[["Name", "Ananya Sharma"], ["Email", "ananya@example.in"], ["Phone", "+91 98290 12345"], ["Member since", "March 2023"]].map(([k, v]) => <div key={k}><dt className="label-tech text-muted-foreground">{k}</dt><dd className="mt-1 font-display text-2xl">{v}</dd></div>)}</dl>}
            {t === "Orders" && <ul className="space-y-4">{orders.map((o) => <li key={o.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-5"><div className="flex -space-x-3">{o.items.map((i) => <img key={i} src={getProduct(i)?.images[0]} alt="" className="size-14 rounded-full border-2 border-ice object-cover" />)}</div><div><p className="font-mono">{o.id}</p><p className="text-sm text-muted-foreground">{o.date}</p></div><span className="label-tech rounded-full bg-pale px-3 py-1.5 text-primary">{o.status}</span><span className="font-mono">{inr(o.total)}</span><Link to="/track-order" search={{ id: o.id }} className={btnClass("glass", "sm")}>Track</Link></li>)}</ul>}
            {t === "Wishlist" && (wishlist.length ? <ProductGrid items={wishlist.map(getProduct).filter(Boolean) as Product[]} /> : <p className="text-muted-foreground">No saved frames yet.</p>)}
            {t === "Saved Addresses" && <div className="grid gap-4 sm:grid-cols-2">{["Home · 14 Civil Lines, Jaipur 302006", "Work · 3rd Floor, WeWork, Malviya Nagar, Jaipur 302017"].map((a) => <div key={a} className="rounded-2xl border border-border p-5 text-sm">{a}</div>)}</div>}
            {t === "Preferences" && <ul className="space-y-5">{["Order updates on WhatsApp", "New collection launches", "Eye-test reminders every 12 months"].map((p, i) => <li key={p} className="flex items-center justify-between"><span>{p}</span><Switch defaultChecked={i !== 1} aria-label={p} /></li>)}</ul>}
          </div>
        </div>
      </section>
    </>
  );
}
