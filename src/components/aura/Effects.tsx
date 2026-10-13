import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

// Native scrolling: fast and responsive. Only resets scroll position on route change.
export function SmoothScroll() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-primary" style={{ scaleX: x }} />;
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "hover" | "view">("");
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const move = (e: MouseEvent) => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const t = e.target as HTMLElement;
      setMode(t.closest("[data-cursor=view]") ? "view" : t.closest("a,button,[role=button],input,select") ? "hover" : "");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  if (!on) return null;
  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120] transition-transform duration-100 ease-out">
      <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-primary grid place-items-center transition-all duration-300 ease-premium ${mode === "view" ? "size-16 bg-primary/90" : mode === "hover" ? "size-9 bg-primary/10" : "size-3 bg-primary/60"}`}>
        {mode === "view" && <span className="label-tech text-primary-foreground">View</span>}
      </div>
    </div>
  );
}

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("aura-loaded")) { setShow(false); return; }
    const t = setTimeout(() => { setShow(false); sessionStorage.setItem("aura-loaded", "1"); }, 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="bg-navy-grad fixed inset-0 z-[200] grid place-items-center" exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <div className="overflow-hidden text-center">
            <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="font-display text-5xl tracking-[0.2em] text-navy-foreground md:text-7xl">AURA<span className="text-cyan">·</span>VISION</motion.p>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} className="mx-auto mt-6 h-px w-40 origin-left bg-cyan" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.div key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
