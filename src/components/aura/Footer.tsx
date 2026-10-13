import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Twitter, Facebook, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Header";

const cols: { t: string; l: [string, string][] }[] = [
  { t: "Shop", l: [["Eyeglasses", "/eyeglasses"], ["Sunglasses", "/sunglasses"], ["Computer Glasses", "/computer-glasses"], ["Smart Glasses", "/smart-glasses"]] },
  { t: "Discover", l: [["Collections", "/collections"], ["Virtual Try-On", "/virtual-try-on"], ["Eye Test", "/eye-test"], ["Stores", "/stores"]] },
  { t: "Support", l: [["Contact", "/stores"], ["Track Order", "/track-order"], ["Shipping", "/track-order"], ["Returns", "/account"], ["Warranty", "/account"], ["About Us", "/collections"], ["Privacy Policy", "/account"], ["Terms & Conditions", "/account"], ["FAQs", "/stores"]] },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-navy-grad relative overflow-hidden px-5 pb-24 pt-16 text-navy-foreground md:px-10 md:pb-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo light />
            <p className="label-tech mt-3 text-cyan">Frame your world.</p>
            <h3 className="headline mt-8 text-4xl">See what's next.</h3>
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }} className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-navy-foreground/20 p-1.5 focus-within:border-cyan">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" aria-label="Email" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-navy-foreground/40" />
              <button className="label-tech flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-primary-foreground hover:bg-ultra">{done ? "Joined" : "Join"} <ArrowRight className="size-3.5" /></button>
            </form>
            {done && <p className="mt-3 text-sm text-aqua">Welcome to the inner circle.</p>}
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.t}>
                <p className="label-tech mb-5 text-cyan">{c.t}</p>
                <ul className="space-y-3">{c.l.map(([n, to]) => <li key={n}><Link to={to} className="text-sm text-navy-foreground/70 transition hover:text-navy-foreground">{n}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-navy-foreground/10 pt-6 md:flex-row">
          <p className="label-tech text-navy-foreground/50">© 2026 Aura Vision Optics Pvt. Ltd. · Privacy · Terms</p>
          <div className="flex gap-2">
            {[Instagram, Youtube, Twitter, Facebook].map((I, i) => <a key={i} href="#" aria-label="Social link" className="grid size-10 place-items-center rounded-full border border-navy-foreground/15 hover:border-cyan hover:text-cyan"><I className="size-4" /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
