import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Btn, btnClass } from "@/components/aura/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/eye-test")({
  head: () => ({ meta: [{ title: "Eye Test — Aura Vision" }, { name: "description", content: "Your vision, our priority. Take a quick interactive vision check and get frame recommendations." }, { property: "og:title", content: "Eye Test — Aura Vision" }, { property: "og:description", content: "A quick interactive vision check." }] }),
  component: EyeTest,
});

const qs: { q: string; opts: string[]; visual?: "letters" | "contrast" | "astig" }[] = [
  { q: "How many hours a day do you spend on screens?", opts: ["Under 2", "2–5", "5–8", "8+"] },
  { q: "Can you read the smallest line comfortably?", opts: ["Easily", "With effort", "Blurry", "Not at all"], visual: "letters" },
  { q: "Which square looks most distinct?", opts: ["Left", "Middle", "Right", "All the same"], visual: "contrast" },
  { q: "Do any lines in the wheel look darker?", opts: ["No, all even", "Some look darker", "Not sure"], visual: "astig" },
  { q: "Do your eyes feel tired by evening?", opts: ["Rarely", "Sometimes", "Often", "Always"] },
  { q: "Do you notice glare from headlights at night?", opts: ["No", "A little", "Yes, a lot"] },
  { q: "Do you currently wear glasses or lenses?", opts: ["Glasses", "Contact lenses", "Both", "Neither"] },
  { q: "Which frame weight do you prefer?", opts: ["Featherlight", "Balanced", "Substantial"] },
];

function Visual({ v }: { v?: string }) {
  if (v === "letters") return <div className="space-y-2 text-center font-mono text-navy">{["E", "F P", "T O Z", "L P E D", "P E C F D"].map((l, i) => <p key={i} style={{ fontSize: `${48 - i * 9}px` }} className="tracking-[0.4em]">{l}</p>)}</div>;
  if (v === "contrast") return <div className="flex justify-center gap-4">{["bg-navy", "bg-deep/60", "bg-primary/25"].map((c) => <div key={c} className={cn("size-20 rounded-xl", c)} />)}</div>;
  if (v === "astig") return <svg viewBox="0 0 200 200" className="mx-auto w-44 text-navy" stroke="currentColor" strokeWidth="2">{Array.from({ length: 12 }).map((_, i) => { const a = (i * Math.PI) / 12; return <line key={i} x1={100 - 90 * Math.cos(a)} y1={100 - 90 * Math.sin(a)} x2={100 + 90 * Math.cos(a)} y2={100 + 90 * Math.sin(a)} />; })}</svg>;
  return null;
}

function EyeTest() {
  const [i, setI] = useState(-1);
  const [ans, setAns] = useState<string[]>([]);
  const done = i >= qs.length;
  const cur = qs[i];
  const heavyScreen = ["5–8", "8+"].includes(ans[0] ?? "");
  const recs = [heavyScreen ? "Computer Glasses" : "Everyday Eyeglasses", ans[5] && ans[5] !== "No" ? "Anti-Glare Lens" : "Blue-Light Lens", ans[7] === "Substantial" ? "Acetate Frames" : "Lightweight Frames"];

  return (
    <section className="bg-hero min-h-[80vh] px-5 pb-20 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {i === -1 && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="label-tech text-primary">Eye Test · 3 minutes</p>
              <h1 className="headline mt-5 text-6xl text-navy md:text-8xl">Your vision.<br /><em className="text-primary">Our priority.</em></h1>
              <p className="mt-6 max-w-lg text-muted-foreground">Eight short questions about your eyes and habits. We'll build your vision profile and suggest the right lens and frame.</p>
              <Btn size="lg" className="mt-10" onClick={() => setI(0)}>Begin test</Btn>
            </motion.div>
          )}
          {cur && (
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} className="rounded-3xl border border-border bg-ice p-6 shadow-soft md:p-10">
              <div className="flex items-center justify-between"><p className="label-tech text-primary">{String(i + 1).padStart(2, "0")} / 08</p><div className="h-1 w-40 overflow-hidden rounded-full bg-border"><div className="h-full bg-primary transition-all" style={{ width: `${((i + 1) / 8) * 100}%` }} /></div></div>
              <h2 className="headline mt-6 text-4xl text-navy md:text-5xl">{cur.q}</h2>
              {cur.visual && <div className="my-8 rounded-2xl bg-pale p-6"><Visual v={cur.visual} /></div>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup">
                {cur.opts.map((o) => <button key={o} role="radio" aria-checked={ans[i] === o} onClick={() => { const n = [...ans]; n[i] = o; setAns(n); }} className={cn("rounded-2xl border p-4 text-left transition", ans[i] === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>{o}</button>)}
              </div>
              <div className="mt-8 flex justify-between"><Btn v="glass" onClick={() => setI(i - 1)}>Back</Btn><Btn disabled={!ans[i]} onClick={() => setI(i + 1)}>Continue</Btn></div>
            </motion.div>
          )}
          {done && (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="label-tech text-primary">Complete</p>
              <h1 className="headline mt-5 text-6xl text-navy md:text-7xl">Your vision profile</h1>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">{recs.map((r, j) => <div key={r} className="rounded-2xl border border-border bg-ice p-6"><p className="label-tech text-muted-foreground">0{j + 1}</p><p className="font-display mt-3 text-3xl text-navy">{r}</p></div>)}</div>
              <div className="mt-10 flex flex-wrap gap-3"><Link to={heavyScreen ? "/computer-glasses" : "/eyeglasses"} className={btnClass("primary", "lg")}>Shop recommendations</Link><Btn v="glass" size="lg" onClick={() => { setAns([]); setI(-1); }}>Retake</Btn></div>
              <p className="mt-10 max-w-xl text-xs text-muted-foreground">This experience is for informational purposes and does not replace a professional eye examination.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
