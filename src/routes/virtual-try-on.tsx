import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Upload, CameraOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IMG, inr, products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Btn, PageHero, btnClass } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/virtual-try-on")({
  validateSearch: (s: Record<string, unknown>): { frame?: string } => (typeof s["frame"] === "string" ? { frame: s["frame"] as string } : {}),
  head: () => ({ meta: [{ title: "Virtual Try-On — Aura Vision" }, { name: "description", content: "See yourself differently. Try Aura Vision frames on with your camera or a photo." }, { property: "og:title", content: "Virtual Try-On — Aura Vision" }, { property: "og:description", content: "Try frames on from home." }] }),
  component: TryOn,
});

function FrameOverlay({ shape }: { shape: string }) {
  const round = ["Round", "Aviator"].includes(shape);
  const cat = shape === "Cat-Eye";
  return (
    <svg viewBox="0 0 300 100" className="w-[58%] text-navy drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="5" aria-hidden>
      {round ? <><circle cx="80" cy="50" r="40" /><circle cx="220" cy="50" r="40" /></> : cat ? <><path d="M30 30 Q80 10 125 35 Q120 85 75 85 Q35 80 30 30Z" /><path d="M270 30 Q220 10 175 35 Q180 85 225 85 Q265 80 270 30Z" /></> : <><rect x="35" y="15" width="95" height="70" rx="14" /><rect x="170" y="15" width="95" height="70" rx="14" /></>}
      <path d="M128 45 q22 -14 44 0" /><path d="M35 40 L2 30 M265 40 L298 30" />
    </svg>
  );
}

export function VirtualTryOn() {
  const { frame } = Route.useSearch();
  const { addToCart } = useStore();
  const [sel, setSel] = useState(products.find((p) => p.id === frame) ?? products[0]!);
  const [mode, setMode] = useState<"demo" | "camera" | "photo">("demo");
  const [photo, setPhoto] = useState<string>("");
  const [err, setErr] = useState("");
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const stop = () => { stream.current?.getTracks().forEach((t) => t.stop()); stream.current = null; };
  useEffect(() => stop, []);

  const start = async () => {
    setErr("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      stream.current = s; setMode("camera");
      requestAnimationFrame(() => { if (video.current) { video.current.srcObject = s; video.current.play(); } });
    } catch { setErr("Camera unavailable — showing the studio preview instead."); }
  };

  return (
    <>
      <PageHero eyebrow="Virtual Try-On" title={<>See yourself <em className="text-primary">differently.</em></>} sub="Use your camera or upload a photo. Pick any frame below to preview it instantly." />
      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-navy shadow-soft md:aspect-video">
            {mode === "camera" ? <video ref={video} muted playsInline className="h-full w-full -scale-x-100 object-cover" /> : <img src={mode === "photo" && photo ? photo : IMG.catSun} alt="Try-on preview" className="h-full w-full object-cover" />}
            <div className="pointer-events-none absolute inset-0 grid place-items-center pb-[12%]"><FrameOverlay shape={sel.shape} /></div>
            <div className="pointer-events-none absolute inset-6 rounded-2xl border border-cyan/40" />
            <span className="label-tech absolute left-5 top-5 rounded-full glass px-3 py-1.5 text-deep">{mode === "camera" ? "● Live" : mode === "photo" ? "Photo" : "Studio preview"}</span>
            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3">
              <div className="rounded-2xl glass px-4 py-2"><p className="font-display text-xl leading-none">{sel.name}</p><p className="font-mono text-xs">{inr(sel.price)}</p></div>
              <Btn size="sm" onClick={() => addToCart(sel.id)}>Add to cart</Btn>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {mode === "camera" ? <Btn v="dark" onClick={() => { stop(); setMode("demo"); }}><CameraOff className="size-4" /> Stop camera</Btn> : <Btn onClick={start}><Camera className="size-4" /> Start camera</Btn>}
            <label className={cn(btnClass("glass"), "cursor-pointer")}><Upload className="size-4" /> Upload photo
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) { stop(); setPhoto(URL.createObjectURL(f)); setMode("photo"); } }} />
            </label>
            <Link to="/product/$id" params={{ id: sel.id }} className={btnClass("ghost")}>View frame</Link>
          </div>
          {err && <p className="mt-3 text-sm text-muted-foreground">{err}</p>}
          <p className="label-tech mb-4 mt-12 text-primary">Frame selector</p>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {products.map((p) => (
              <button key={p.id} onClick={() => setSel(p)} aria-pressed={sel.id === p.id} className={cn("w-32 shrink-0 rounded-2xl border p-2 text-left transition", sel.id === p.id ? "border-primary shadow-glow" : "border-border hover:border-primary/50")}>
                <img src={p.images[0]} alt="" loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
                <p className="mt-2 font-display text-lg leading-none">{p.name.replace("Aura ", "")}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TryOn() { return <VirtualTryOn />; }
