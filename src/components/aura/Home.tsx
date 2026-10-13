import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, IMG, inr, products } from "@/lib/data";
import { btnClass, Magnetic, Reveal, SectionHead, Stars } from "./ui";
import { ProductCard, ProductCarousel } from "./ProductCard";
import { cn } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }), sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { yPercent: 110, duration: 1.2, stagger: 0.12, ease: "expo.out", delay: 0.2 });
      gsap.from(".hero-fade", { opacity: 0, y: 20, duration: 1, stagger: 0.08, ease: "power3.out", delay: 0.7 });
      gsap.from(".hero-mask", { clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "expo.inOut", delay: 0.1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX / r.width - 0.5) * 18); my.set((e.clientY / r.height - 0.5) * 12); }}
      className="bg-hero relative lg:min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-32"
    >
      <div className="animate-drift pointer-events-none absolute -right-40 top-10 size-[60vw] rounded-full bg-primary/10 blur-3xl" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_left,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="hero-fade label-tech text-primary">Aura Vision <span className="mx-2 text-gold">—</span> Atelier Collection 2026</p>
          <h1 className="headline mt-6 text-[clamp(3.5rem,17vw,5.5rem)] text-navy sm:text-[7rem] xl:text-[10rem]">
            <span className="block overflow-hidden"><span className="hero-line block">Frame</span></span>
            <span className="block overflow-hidden"><span className="hero-line block italic text-primary">your world.</span></span>
          </h1>
          <p className="hero-fade mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">Precision-crafted eyewear designed for modern vision, comfort and everyday expression.</p>
          <div className="hero-fade mt-10 flex flex-wrap gap-3">
            <Magnetic><Link to="/eyeglasses" className={btnClass("primary", "lg")}>Shop eyeglasses <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link></Magnetic>
            <Magnetic><Link to="/collections" className={btnClass("glass", "lg")}>Explore collection</Link></Magnetic>
          </div>
          <dl className="hero-fade mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {[["8+", "Years of design"], ["14.2K", "Frames delivered"], ["72 HRS", "Fast delivery"]].map(([a, b]) => (
              <div key={b}><dt className="font-display text-3xl text-navy">{a}</dt><dd className="label-tech mt-1 text-[0.58rem] text-muted-foreground">{b}</dd></div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <motion.div style={{ x: sx, y: sy }} className="hero-mask relative overflow-hidden rounded-[2rem] shadow-soft">
            <motion.img style={{ y: imgY }} src={IMG.hero} alt="Model wearing Aura titanium eyeglasses" width={1200} height={1504} className="aspect-[4/5] w-full scale-110 object-cover" />
          </motion.div>
          <motion.div style={{ x: useTransform(sx, (v) => -v * 1.4), y: useTransform(sy, (v) => -v * 1.4) }} className="absolute -bottom-6 left-3 hidden sm:block md:-left-14 md:bottom-10">
            <Link to="/product/$id" params={{ id: "aura-vector" }} className="hero-fade animate-floaty glass block w-60 rounded-2xl border border-ice p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <img src={IMG.pTitanium} alt="" className="size-14 rounded-xl object-cover" />
                <div>
                  <p className="font-display text-xl leading-none text-navy">Aura Vector</p>
                  <p className="label-tech mt-1 text-[0.56rem] text-muted-foreground">Titanium Frame</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3"><span className="font-mono text-sm">₹2,999</span><Stars rating={4.8} /></div>
            </Link>
          </motion.div>
          <span className="label-tech absolute right-4 top-4 rounded-full glass px-3 py-1.5 text-deep">SS · 26</span>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = ["Precision Optics", "Free Shipping", "7-Day Returns", "Virtual Try-On", "1-Year Warranty"];
  return (
    <div className="overflow-hidden bg-navy py-5 text-navy-foreground" aria-label="Our promises">
      <div className="animate-marquee flex w-max gap-14">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="label-tech flex items-center gap-14 text-sm">{t}<span className="size-1.5 rounded-full bg-cyan" /></span>
        ))}
      </div>
    </div>
  );
}

export function CategoryCard({ c, className, tall }: { c: (typeof categories)[number]; className?: string; tall?: boolean }) {
  return (
    <Link to={`/${c.slug}`} className={cn("group relative block overflow-hidden rounded-3xl border border-border transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow", className)}>
      <img src={c.img} alt={c.title} loading="lazy" className={cn("w-full object-cover transition duration-1000 ease-premium group-hover:scale-105", tall ? "h-[520px] md:h-full" : "h-[340px] md:h-full")} />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
      <span className="label-tech absolute left-5 top-5 text-navy-foreground">{c.n}</span>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-navy-foreground">
        <div>
          <h3 className="headline text-4xl md:text-5xl">{c.title}</h3>
          <p className="mt-2 max-w-xs text-sm text-navy-foreground/75">{c.desc}</p>
          <span className="label-tech mt-4 inline-block text-cyan">Explore</span>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ice text-primary transition duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="size-5" /></span>
      </div>
    </Link>
  );
}

export function ShopByCategory() {
  const [a, b, c, d] = categories;
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6"><SectionHead eyebrow="01 — Categories" title="Find your frame." /></div>
        <div className="mt-14 grid gap-4 md:h-[860px] md:grid-cols-12 md:grid-rows-2">
          <Reveal className="md:col-span-7 md:row-span-2">{a && <CategoryCard c={a} tall className="h-full" />}</Reveal>
          <Reveal delay={0.1} className="md:col-span-5">{b && <CategoryCard c={b} className="h-full" />}</Reveal>
          <Reveal delay={0.15} className="md:col-span-2">{c && <CategoryCard c={{ ...c, title: "Computer", desc: "" }} className="h-full" />}</Reveal>
          <Reveal delay={0.2} className="md:col-span-3">{d && <CategoryCard c={d} className="h-full" />}</Reveal>
        </div>
      </div>
    </section>
  );
}

const moods = [
  { k: "Minimal", d: "Barely-there titanium for a quiet, precise presence.", img: IMG.pTitanium, to: "/eyeglasses" },
  { k: "Classic", d: "Tortoise acetate and honest proportions.", img: IMG.pTortoise, to: "/eyeglasses" },
  { k: "Bold", d: "Architectural black frames with nerve.", img: IMG.pSun, to: "/sunglasses" },
  { k: "Timeless", d: "Crystal and gold — lines that never date.", img: IMG.pCrystal, to: "/collections" },
];

export function ChooseMood() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-pale px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead eyebrow="02 — Expression" title="Choose your mood." sub="Different expressions of form, weight and light designed to match your personal style." />
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {moods.map((m, i) => {
            const on = active === i;
            return (
              <Reveal key={m.k} delay={i * 0.07}>
                <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={on} className={cn("group w-full overflow-hidden rounded-3xl border p-3 text-left transition-all duration-500 ease-premium hover:-translate-y-1", on ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-border bg-ice text-navy hover:border-primary/50")}>
                  <div className="overflow-hidden rounded-2xl"><img src={m.img} alt={`${m.k} style eyewear`} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" /></div>
                  <div className="p-3 pt-5">
                    <p className="label-tech opacity-70">0{i + 1}</p>
                    <h3 className="headline mt-2 text-4xl">{m.k}</h3>
                    <p className={cn("mt-2 text-sm transition-all duration-500", on ? "max-h-20 opacity-90" : "max-h-0 opacity-0 md:max-h-0")}>{m.d}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 text-center"><Link to={moods[active]?.to ?? "/"} className={btnClass("primary")}>Shop {moods[active]?.k} <ArrowRight className="size-4" /></Link></div>
      </div>
    </section>
  );
}

const shapes = {
  Round: { name: "The Heritage Round", d: "Soft geometry and balanced proportions designed for naturally rounded facial structures.", w: 48, b: 21, t: 145, id: "aura-heritage" },
  Square: { name: "The Arc Square", d: "Strong, clean lines that soften angular jaws and add quiet structure.", w: 52, b: 19, t: 145, id: "aura-arc" },
  Oval: { name: "The Vector Balance", d: "Oval faces wear nearly anything — we recommend the light geometry of titanium.", w: 50, b: 20, t: 140, id: "aura-vector" },
  Heart: { name: "The Form Cat-Eye", d: "Lifted outer edges balance a wider brow and a delicate chin.", w: 51, b: 18, t: 140, id: "aura-form" },
  Diamond: { name: "The Luma Rimless", d: "Rimless curves highlight cheekbones without competing with them.", w: 49, b: 19, t: 140, id: "aura-luma" },
  Rectangle: { name: "The Craft Square", d: "Deeper acetate frames add balance to longer facial proportions.", w: 53, b: 20, t: 150, id: "aura-craft" },
} as const;
type Shape = keyof typeof shapes;

export function FaceShapeFinder() {
  const [s, setS] = useState<Shape>("Round");
  const d = shapes[s];
  const round = s === "Round" || s === "Oval" || s === "Diamond";
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="03 — Geometry" title="Find your signature shape." sub="Discover frames designed around your face geometry." />
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Face shapes">
            {(Object.keys(shapes) as Shape[]).map((k) => (
              <button key={k} role="tab" aria-selected={s === k} onClick={() => setS(k)} className={cn("label-tech rounded-full border px-5 py-3 transition", s === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary hover:text-primary")}>{k}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={s} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="mt-12">
              <h3 className="headline text-5xl text-navy">{d.name}</h3>
              <p className="mt-4 max-w-md text-muted-foreground">{d.d}</p>
              <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
                {[[d.w, "Frame width"], [d.b, "Bridge"], [d.t, "Temple"]].map(([v, l]) => (
                  <div key={l} className="rounded-2xl border border-border p-4"><dt className="font-display text-4xl text-primary">{v}<span className="ml-1 font-mono text-xs">MM</span></dt><dd className="label-tech mt-1 text-[0.58rem] text-muted-foreground">{l}</dd></div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/virtual-try-on" className={btnClass("primary")}>Try on now</Link>
                <Link to="/product/$id" params={{ id: d.id }} className={btnClass("glass")}>Explore styles</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid-lines relative grid place-items-center overflow-hidden rounded-3xl border border-border bg-pale p-8">
          <svg viewBox="0 0 400 260" className="w-full max-w-lg text-primary" fill="none" stroke="currentColor" aria-label={`${d.name} technical diagram`}>
            <motion.g key={s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2 }}>
              {round ? (
                <>
                  <motion.circle cx="120" cy="130" r="62" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }} />
                  <motion.circle cx="280" cy="130" r="62" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }} />
                </>
              ) : (
                <>
                  <motion.rect x="56" y="78" width="128" height="104" rx={s === "Heart" ? 40 : 18} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }} />
                  <motion.rect x="216" y="78" width="128" height="104" rx={s === "Heart" ? 40 : 18} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }} />
                </>
              )}
              <path d="M182 120c10-12 26-12 36 0" strokeWidth="3" />
              <path d="M58 110 L10 100 M342 110 L390 100" strokeWidth="3" />
            </motion.g>
            <g strokeWidth="1" strokeDasharray="4 4" opacity="0.5">
              <path d="M56 222 H184" /><path d="M182 40 H218" /><path d="M10 240 H390" />
            </g>
            <g fill="currentColor" stroke="none" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2">
              <text x="92" y="215">{d.w} MM</text><text x="182" y="32">{d.b} MM</text><text x="168" y="255">{d.t} MM TEMPLE</text>
            </g>
          </svg>
          <span className="label-tech absolute left-5 top-5 text-primary">Fig. {Object.keys(shapes).indexOf(s) + 1} — {s}</span>
        </div>
      </div>
    </section>
  );
}

export function AuraCollection() {
  const tabs = [["All", ""], ["Bestsellers", "bestseller"], ["Signature", "signature"], ["New Arrivals", "new"]] as const;
  const [t, setT] = useState<string>("");
  const names = ["aura-vector", "aura-craft", "aura-olive", "aura-edge", "aura-nova", "aura-classic", "aura-form", "aura-heritage"];
  const base = names.map((n) => products.find((p) => p.id === n)!).filter(Boolean);
  const items = t ? products.filter((p) => p.tags.includes(t as never)).slice(0, 8) : base;
  return (
    <section className="bg-pale px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead eyebrow="04 — Products" title={<>The Aura <em className="text-primary">Collection</em></>} />
          <div className="flex flex-wrap gap-2" role="tablist">
            {tabs.map(([l, v]) => (
              <button key={l} role="tab" aria-selected={t === v} onClick={() => setT(v)} className={cn("label-tech relative rounded-full px-4 py-2.5 transition", t === v ? "text-primary-foreground" : "text-navy hover:text-primary")}>
                {t === v && <motion.span layoutId="ctab" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-14 hidden grid-cols-3 gap-x-6 gap-y-12 md:grid xl:grid-cols-4">
          {items.map((p, i) => <Reveal key={p.id + t} delay={(i % 4) * 0.06}><ProductCard product={p} /></Reveal>)}
        </div>
        <div className="mt-10 md:hidden"><ProductCarousel items={items} /></div>
        <div className="mt-12 text-center"><Link to="/eyeglasses" className={btnClass("glass")}>View all frames <ArrowRight className="size-4" /></Link></div>
      </div>
    </section>
  );
}

export function EditorialBand() {
  return (
    <section className="bg-navy-grad relative overflow-hidden px-5 py-24 text-navy-foreground md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
        <Reveal><img src={IMG.catComputer} alt="Woman wearing Aura computer glasses" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" /></Reveal>
        <div>
          <SectionHead light eyebrow="05 — Technology" title={<>See yourself <em className="text-cyan">differently.</em></>} sub="Try every frame from home with our virtual mirror, then take a 3-minute vision check designed by optometrists." />
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/virtual-try-on" className={btnClass("primary", "lg")}>Virtual try-on</Link>
            <Link to="/eye-test" className={btnClass("outlineLight", "lg")}>Take eye test</Link>
          </div>
          <p className="label-tech mt-12 text-navy-foreground/50">From {inr(1999)} · Free home delivery across India</p>
        </div>
      </div>
    </section>
  );
}
