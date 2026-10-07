import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef, type ReactNode, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-ultra shadow-glow",
  glass: "glass border border-primary/40 text-deep hover:border-primary hover:bg-ice",
  dark: "bg-navy text-navy-foreground hover:bg-deep",
  outlineLight: "border border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10",
  ghost: "text-deep hover:bg-pale",
};

export function btnClass(v: keyof typeof variants = "primary", size: "md" | "lg" | "sm" = "md") {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-mono uppercase tracking-[0.18em] transition-all duration-300 ease-premium active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
    size === "lg" && "h-14 px-8 text-[0.72rem]",
    size === "md" && "h-12 px-6 text-[0.68rem]",
    size === "sm" && "h-9 px-4 text-[0.62rem]",
    variants[v],
  );
}

export function Btn({ v = "primary", size = "md", className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { v?: keyof typeof variants; size?: "md" | "lg" | "sm" }) {
  return <button className={cn(btnClass(v, size), className)} {...rest} />;
}

export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const move = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const leave = () => ref.current && (ref.current.style.transform = "");
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={leave} className="inline-block transition-transform duration-300 ease-premium">
      {children}
    </span>
  );
}

export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-primary", className)} aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={cn("size-3", i < Math.round(rating) ? "fill-current" : "opacity-30")} />
      ))}
      <span className="ml-1.5 font-mono text-[0.68rem] text-foreground">{rating.toFixed(1)}</span>
    </span>
  );
}

export function SectionHead({ eyebrow, title, sub, className, light }: { eyebrow?: string; title: ReactNode; sub?: string; className?: string; light?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      {eyebrow && <p className={cn("label-tech mb-5", light ? "text-cyan" : "text-primary")}>{eyebrow}</p>}
      <h2 className={cn("headline text-5xl md:text-7xl", light ? "text-navy-foreground" : "text-navy")}>{title}</h2>
      {sub && <p className={cn("mt-5 max-w-xl text-base leading-relaxed", light ? "text-navy-foreground/70" : "text-muted-foreground")}>{sub}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <section className="bg-hero relative overflow-hidden px-5 pb-14 pt-36 md:px-10 md:pb-20 md:pt-44">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      </div>
    </section>
  );
}
