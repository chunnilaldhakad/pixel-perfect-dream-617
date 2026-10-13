import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Clock, ShieldCheck, Box, MapPin, ArrowRight } from "lucide-react";
import { PageHero, btnClass } from "@/components/aura/ui";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy — AURA VISION" },
      { name: "description", content: "Free insured express delivery across India. Delivery timeframes, dispatch schedules, and premium packaging details." },
      { property: "og:title", content: "Shipping Policy — AURA VISION" },
      { property: "og:description", content: "Pan-India delivery guidelines and logistics." },
    ],
  }),
  component: ShippingPage,
});

const tiers = [
  {
    name: "Standard Delivery",
    cost: "FREE",
    time: "3–5 Business Days",
    desc: "Available across all serviceable PIN codes in India. Full insurance and real-time SMS tracking included.",
  },
  {
    name: "Express Priority",
    cost: "₹199",
    time: "1–2 Business Days",
    desc: "Air-freighted via BlueDart Apex for metro cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata).",
  },
  {
    name: "Same-Day Studio Pickup",
    cost: "FREE",
    time: "Same Day (4 Hours)",
    desc: "Available at our flagship optical studios in Jaipur, Delhi, Mumbai, and Bengaluru for in-stock frames.",
  },
];

const inclusions = [
  { title: "Handmade Hard Case", desc: "Rigid magnetic closure case lined in anti-scratch microsuede." },
  { title: "Microfibre Polishing Cloth", desc: "High-density weave for crystal cleaning without smudges." },
  { title: "Precision Optical Tool", desc: "Compact stainless steel mini-screwdriver for minor hinge tuning." },
  { title: "Authenticity & Warranty Card", desc: "Numbered certificate linking your frame to its 1-year atelier warranty." },
];

function ShippingPage() {
  return (
    <>
      <PageHero
        eyebrow="Logistics & Delivery"
        title={<>Precision delivered to <em className="text-primary italic">your door.</em></>}
        sub="Every AURA VISION frame is inspected by certified opticians and dispatched in protective packaging with insured tracking."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1200px] space-y-16">
          {/* Tiers Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className="flex flex-col justify-between rounded-3xl border border-border bg-ice p-8 shadow-soft">
                <div>
                  <span className="label-tech text-primary">{t.time}</span>
                  <h3 className="font-display mt-3 text-3xl text-navy">{t.name}</h3>
                  <p className="font-mono mt-2 text-2xl font-semibold text-primary">{t.cost}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-border flex items-center gap-2 text-xs text-navy font-medium">
                  <ShieldCheck className="size-4 text-primary" /> 100% Insured Transit
                </div>
              </div>
            ))}
          </div>

          {/* Timeline & Dispatch Standards */}
          <div className="rounded-3xl border border-border bg-pale p-8 sm:p-12">
            <h2 className="headline text-3xl sm:text-4xl text-navy">Fulfillment Workflow</h2>
            <p className="mt-2 text-sm text-muted-foreground">What happens between order confirmation and your doorstep.</p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Lens Calibration", desc: "Custom optical cutting and 42-point laser inspection in our studio lab." },
                { step: "02", title: "Hand Ultrasonic Clean", desc: "Each frame is sanitized and polished before final packaging." },
                { step: "03", title: "Dispatched in 48h", desc: "Handed over to tier-1 air couriers with instant tracking generation." },
                { step: "04", title: "Doorstep Handover", desc: "Secure delivery with OTP verification and tamper-evident seal." },
              ].map((s) => (
                <div key={s.step} className="border-l-2 border-primary/30 pl-5">
                  <p className="label-tech text-primary">{s.step}</p>
                  <h3 className="font-display mt-2 text-xl text-navy">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's In The Box */}
          <div>
            <div className="text-center max-w-2xl mx-auto">
              <p className="label-tech text-primary">Unboxing Ritual</p>
              <h2 className="headline mt-3 text-3xl sm:text-5xl text-navy">What arrives in your package.</h2>
              <p className="mt-3 text-sm text-muted-foreground">Thoughtfully packaged to safeguard your frame for years of daily wear.</p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {inclusions.map((inc) => (
                <div key={inc.title} className="rounded-2xl border border-border bg-ice p-6 text-center">
                  <div className="mx-auto grid size-12 place-items-center rounded-xl bg-pale text-primary mb-4">
                    <Box className="size-6" />
                  </div>
                  <h4 className="font-display text-xl text-navy">{inc.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{inc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="rounded-3xl border border-border bg-ice p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Truck className="size-6" />
              </div>
              <div>
                <p className="font-display text-2xl text-navy">Already placed an order?</p>
                <p className="text-xs text-muted-foreground">Check real-time live milestone updates on your shipment.</p>
              </div>
            </div>
            <Link to="/track-order" className={btnClass("primary")}>
              Track Your Shipment <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
