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
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-primary will-change-transform" style={{ scaleX: scrollYProgress }} />;
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "hover" | "view">("");
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    let rafId: number | null = null;
    const move = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (dot.current) {
          dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
        const t = e.target as HTMLElement | null;
        if (!t) return;
        const nextMode = t.closest("[data-cursor=view]") ? "view" : t.closest("a,button,[role=button],input,select") ? "hover" : "";
        setMode((prev) => (prev !== nextMode ? nextMode : prev));
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  if (!on) return null;
  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120] will-change-transform">
      <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-primary grid place-items-center transition-all duration-200 ease-out ${mode === "view" ? "size-16 bg-primary/90" : mode === "hover" ? "size-9 bg-primary/10" : "size-3 bg-primary/60"}`}>
        {mode === "view" && <span className="label-tech text-primary-foreground">View</span>}
      </div>
    </div>
  );
}

export function LoadingScreen() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("aura-loaded")) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("aura-loaded", "1");
    }, 350);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="bg-navy-grad pointer-events-none fixed inset-0 z-[200] grid place-items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="text-center">
            <p className="font-display text-4xl tracking-[0.2em] text-navy-foreground md:text-6xl">
              AURA<span className="text-cyan">·</span>VISION
            </p>
            <div className="mx-auto mt-4 h-0.5 w-24 bg-cyan animate-pulse" />
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
