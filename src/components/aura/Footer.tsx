import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Twitter, Facebook, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Header";

const shopLinks = [
  { label: "Eyeglasses", to: "/eyeglasses" },
  { label: "Sunglasses", to: "/sunglasses" },
  { label: "Computer Glasses", to: "/computer-glasses" },
  { label: "Smart Glasses", to: "/smart-glasses" },
];

const discoverLinks = [
  { label: "Collections", to: "/collections" },
  { label: "Catalog Search", to: "/search" },
  { label: "Eye Test", to: "/eye-test" },
  { label: "Stores", to: "/stores" },
];

const supportLinks = [
  { label: "Contact", to: "/contact" },
  { label: "Shipping", to: "/shipping" },
  { label: "Returns", to: "/returns" },
  { label: "Warranty", to: "/warranty" },
  { label: "Track Order", to: "/track-order" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "FAQs", to: "/faq" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-[#071A3D] text-[#F7FBFF] pb-24 md:pb-12 pt-14 border-t border-white/10">
      {/* Subtle electric blue ambient glow */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#0757D9]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -top-32 right-10 size-[350px] rounded-full bg-[#18C8FF]/10 blur-[90px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Top Section */}
        <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <Logo light />
            <p className="label-tech mt-3 tracking-[0.25em] text-[#18C8FF] font-medium">
              FRAME YOUR WORLD.
            </p>
            <p className="mt-3 max-w-md text-sm text-[#F7FBFF]/70 leading-relaxed">
              Precision-crafted eyewear for modern living. Engineered with Japanese titanium, hand-cut Italian acetate and advanced blue-light optics.
            </p>
          </div>

          <div className="lg:justify-self-end w-full max-w-md">
            <span className="label-tech text-[#18C8FF] block mb-2">Stay Connected</span>
            <p className="text-xs text-[#F7FBFF]/75 mb-3">Subscribe for bespoke drops, private previews and eyewear insights.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 backdrop-blur transition-colors focus-within:border-[#18C8FF]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Newsletter email address"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#F7FBFF] outline-none placeholder:text-[#F7FBFF]/40"
              />
              <button
                type="submit"
                className="label-tech flex h-10 items-center gap-1.5 rounded-full bg-[#0757D9] px-5 text-white shadow-sm transition hover:bg-[#0B6FFF]"
              >
                {done ? "Joined" : "Join"} <ArrowRight className="size-3.5" />
              </button>
            </form>
            {done && (
              <p className="mt-2 text-xs text-[#6FE7FF] flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Welcome to the AURA VISION inner circle.
              </p>
            )}
          </div>
        </div>

        {/* Middle Section: 4 Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 border-b border-white/10">
          <div>
            <p className="label-tech mb-4 text-[#18C8FF] font-semibold">SHOP</p>
            <ul className="space-y-2.5 text-sm">
              {shopLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#F7FBFF]/75 transition-colors duration-200 hover:text-white hover:translate-x-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-tech mb-4 text-[#18C8FF] font-semibold">DISCOVER</p>
            <ul className="space-y-2.5 text-sm">
              {discoverLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#F7FBFF]/75 transition-colors duration-200 hover:text-white hover:translate-x-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-tech mb-4 text-[#18C8FF] font-semibold">SUPPORT</p>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#F7FBFF]/75 transition-colors duration-200 hover:text-white hover:translate-x-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-tech mb-4 text-[#18C8FF] font-semibold">COMPANY</p>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#F7FBFF]/75 transition-colors duration-200 hover:text-white hover:translate-x-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Single-line responsive wordmark + legal */}
        <div className="pt-8">
          {/* Elegant, single-line responsive wordmark (never full-screen) */}
          <div className="text-center py-4 select-none opacity-85 hover:opacity-100 transition-opacity">
            <span className="font-display block text-[clamp(2rem,7vw,4.5rem)] font-light tracking-[0.25em] text-[#F7FBFF]/20 hover:text-[#F7FBFF]/35 transition-colors">
              AURA<span className="text-[#18C8FF]/50 mx-2">·</span>VISION
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center justify-between gap-4 pt-4 md:flex-row text-xs text-[#F7FBFF]/60 border-t border-white/5">
            <p className="font-mono tracking-wider text-center md:text-left">
              © 2026 AURA VISION. ALL RIGHTS RESERVED.
            </p>

            <div className="flex items-center gap-6 font-mono text-[0.7rem] uppercase tracking-wider">
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
              <span className="text-white/20">|</span>
              <Link to="/terms" className="hover:text-white transition">Terms</Link>
              <span className="text-white/20">|</span>
              <Link to="/shipping" className="hover:text-white transition">Shipping</Link>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-white/15 text-[#F7FBFF]/70 transition-all hover:border-[#18C8FF] hover:bg-[#0757D9]/20 hover:text-[#18C8FF]"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
