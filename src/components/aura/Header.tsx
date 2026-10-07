import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, User, ShoppingBag, Menu, X, ArrowUpRight, Home, Grid2x2, ScanFace } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { IMG } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-baseline gap-1.5 font-display text-2xl font-semibold tracking-[0.12em]", light ? "text-navy-foreground" : "text-navy")} aria-label="Aura Vision home">
      AURA<span className="text-primary">·</span><span className="font-light">VISION</span>
    </Link>
  );
}

type NavKey = "eyeglasses" | "sunglasses" | "collections";
const nav: { label: string; to: string; mega?: NavKey }[] = [
  { label: "Eyeglasses", to: "/eyeglasses", mega: "eyeglasses" },
  { label: "Sunglasses", to: "/sunglasses", mega: "sunglasses" },
  { label: "Computer Glasses", to: "/computer-glasses" },
  { label: "Smart Glasses", to: "/smart-glasses" },
  { label: "Collections", to: "/collections", mega: "collections" },
];
const more = [
  { label: "Virtual Try-On", to: "/virtual-try-on" },
  { label: "Eye Test", to: "/eye-test" },
  { label: "Stores", to: "/stores" },
];

const megaCols = [
  { title: "Shop by Shape", items: ["Round", "Square", "Rectangle", "Cat-Eye", "Aviator"] },
  { title: "Shop by Material", items: ["Titanium", "Acetate", "Stainless Steel", "TR90"] },
  { title: "Shop by Style", items: ["Minimal", "Classic", "Bold", "Timeless"] },
];

function MegaMenu({ k, close }: { k: NavKey; close: () => void }) {
  const base = k === "collections" ? "/eyeglasses" : `/${k}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full mt-3 overflow-hidden rounded-2xl border border-border glass shadow-soft"
    >
      <div className="grid grid-cols-5 gap-8 p-8">
        {megaCols.map((c) => (
          <div key={c.title}>
            <p className="label-tech mb-4 text-primary">{c.title}</p>
            <ul className="space-y-2.5">
              {c.items.map((i) => (
                <li key={i}><Link to={base} search={{ q: i } as never} onClick={close} className="text-sm text-navy/80 transition hover:text-primary">{i}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="label-tech mb-4 text-primary">Discover</p>
          <ul className="space-y-2.5">
            <li><Link to={base} onClick={close} className="text-sm text-navy/80 hover:text-primary">Best Sellers</Link></li>
            <li><Link to={base} onClick={close} className="text-sm text-navy/80 hover:text-primary">New Arrivals</Link></li>
            <li><Link to="/collections" onClick={close} className="text-sm text-navy/80 hover:text-primary">All Collections</Link></li>
          </ul>
        </div>
        <Link to="/collections/$slug" params={{ slug: "atelier-2026" }} onClick={close} className="group relative overflow-hidden rounded-xl">
          <img src={IMG.hero} alt="Atelier 2026 collection" loading="lazy" className="h-48 w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          <p className="absolute bottom-3 left-3 font-display text-xl text-navy-foreground">Atelier 2026 <ArrowUpRight className="inline size-4" /></p>
        </Link>
      </div>
    </motion.div>
  );
}

export function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen, setWishOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<NavKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { setMobile(false); setMega(null); }, [path]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4" onMouseLeave={() => setMega(null)}>
        <div className={cn("relative mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full px-4 transition-all duration-500 ease-premium md:h-16 md:px-6", scrolled ? "glass border border-border shadow-soft" : "border border-transparent")}>
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            {nav.map((n) => (
              <Link
                key={n.to} to={n.to}
                onMouseEnter={() => setMega(n.mega ?? null)}
                onFocus={() => setMega(n.mega ?? null)}
                className="relative px-3 py-2 text-[0.8rem] font-medium text-navy/80 transition hover:text-primary"
                activeProps={{ className: "!text-primary after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <span className="mx-2 h-4 w-px bg-border" />
            {more.map((n) => (
              <Link key={n.to} to={n.to} onMouseEnter={() => setMega(null)} className="px-2.5 py-2 text-[0.8rem] text-muted-foreground transition hover:text-primary" activeProps={{ className: "!text-primary" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-0.5">
            <IconBtn label="Search" onClick={() => setSearchOpen(true)}><Search className="size-[18px]" /></IconBtn>
            <IconBtn label="Wishlist" onClick={() => setWishOpen(true)} badge={wishlist.length} className="hidden md:grid"><Heart className="size-[18px]" /></IconBtn>
            <Link to="/account" aria-label="Account" className="hidden size-10 place-items-center rounded-full text-navy transition hover:bg-pale hover:text-primary md:grid"><User className="size-[18px]" /></Link>
            <IconBtn label="Cart" onClick={() => setCartOpen(true)} badge={count}><ShoppingBag className="size-[18px]" /></IconBtn>
            <IconBtn label="Menu" onClick={() => setMobile(true)} className="xl:hidden"><Menu className="size-5" /></IconBtn>
          </div>
          <AnimatePresence>{mega && <MegaMenu k={mega} close={() => setMega(null)} />}</AnimatePresence>
        </div>
      </header>
      <AnimatePresence>{mobile && <MobileMenu close={() => setMobile(false)} />}</AnimatePresence>
      <MobileBottomNav />
    </>
  );
}

function IconBtn({ children, label, onClick, badge, className }: { children: React.ReactNode; label: string; onClick: () => void; badge?: number; className?: string }) {
  return (
    <button onClick={onClick} aria-label={label} className={cn("relative grid size-10 place-items-center rounded-full text-navy transition hover:bg-pale hover:text-primary", className)}>
      {children}
      {!!badge && (
        <motion.span key={badge} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 font-mono text-[0.58rem] leading-4 text-primary-foreground">{badge}</motion.span>
      )}
    </button>
  );
}

function MobileMenu({ close }: { close: () => void }) {
  const links = [...nav, ...more, { label: "Track Order", to: "/track-order" }, { label: "Account", to: "/account" }];
  return (
    <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} className="bg-navy-grad fixed inset-0 z-[60] flex flex-col overflow-y-auto px-6 pb-10 pt-6" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex items-center justify-between">
        <Logo light />
        <button onClick={close} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-navy-foreground/20 text-navy-foreground"><X className="size-5" /></button>
      </div>
      <ul className="mt-12 space-y-1">
        {links.map((l, i) => (
          <motion.li key={l.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <Link to={l.to} onClick={close} className="flex items-baseline justify-between border-b border-navy-foreground/10 py-3.5 font-display text-3xl text-navy-foreground">
              {l.label}<span className="label-tech text-cyan">{String(i + 1).padStart(2, "0")}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 grid grid-cols-2 gap-3">
        {[IMG.catSun, IMG.catComputer].map((s, i) => <img key={i} src={s} alt="" className="h-36 w-full rounded-xl object-cover" />)}
      </motion.div>
    </motion.div>
  );
}

function MobileBottomNav() {
  const { count, wishlist, setCartOpen, setWishOpen } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { label: "Home", icon: Home, to: "/" },
    { label: "Shop", icon: Grid2x2, to: "/eyeglasses" },
    { label: "Try-On", icon: ScanFace, to: "/virtual-try-on" },
  ];
  return (
    <nav aria-label="Mobile" className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-2xl border border-border glass p-1.5 shadow-soft md:hidden">
      {items.map((it) => {
        const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
        return (
          <Link key={it.label} to={it.to} className={cn("relative flex flex-col items-center gap-1 rounded-xl py-2 text-[0.6rem] font-mono uppercase tracking-wider", active ? "text-primary-foreground" : "text-navy/70")}>
            {active && <motion.span layoutId="bnav" className="absolute inset-0 rounded-xl bg-primary" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <it.icon className="relative size-[18px]" /><span className="relative">{it.label}</span>
          </Link>
        );
      })}
      <button onClick={() => setWishOpen(true)} className="relative flex flex-col items-center gap-1 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-navy/70">
        <Heart className="size-[18px]" />Wishlist
        {!!wishlist.length && <span className="absolute right-3 top-1 rounded-full bg-primary px-1 text-[0.55rem] text-primary-foreground">{wishlist.length}</span>}
      </button>
      <button onClick={() => setCartOpen(true)} className="relative flex flex-col items-center gap-1 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-navy/70">
        <ShoppingBag className="size-[18px]" />Cart
        {!!count && <span className="absolute right-4 top-1 rounded-full bg-primary px-1 text-[0.55rem] text-primary-foreground">{count}</span>}
      </button>
    </nav>
  );
}
