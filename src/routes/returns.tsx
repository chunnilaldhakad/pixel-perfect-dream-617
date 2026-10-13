import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, CheckCircle2, ShieldAlert, ArrowRight, HelpCircle } from "lucide-react";
import { PageHero, btnClass } from "@/components/aura/ui";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchanges — AURA VISION" },
      { name: "description", content: "7-day hassle-free return and exchange policy. Free reverse doorstep pickup and 100% money-back guarantee." },
      { property: "og:title", content: "Returns Policy — AURA VISION" },
      { property: "og:description", content: "Our easy return and exchange guarantee." },
    ],
  }),
  component: ReturnsPage,
});

const steps = [
  {
    num: "01",
    title: "Initiate Request",
    desc: "Log into your account or contact our concierge within 7 days of delivery with your order ID.",
  },
  {
    num: "02",
    title: "Free Doorstep Pickup",
    desc: "Our courier partner collects the securely repacked frame directly from your address at no charge.",
  },
  {
    num: "03",
    title: "Swift Refund or Exchange",
    desc: "Once inspected, your replacement frame is dispatched or a 100% refund is initiated within 24 to 48 hours.",
  },
];

function ReturnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Satisfaction Guarantee"
        title={<>Confidence in <em className="text-primary italic">every frame.</em></>}
        sub="We want you to love how you see and how you look. If a frame isn't ideal for your face geometry, return or exchange it effortlessly."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1200px] space-y-16">
          {/* 3 Steps */}
          <div>
            <div className="text-center max-w-2xl mx-auto">
              <p className="label-tech text-primary">Simple & Transparent</p>
              <h2 className="headline mt-3 text-4xl sm:text-5xl text-navy">Our 3-Step Return Process</h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.num} className="rounded-3xl border border-border bg-ice p-8 shadow-soft text-center">
                  <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary font-mono text-xl font-bold">
                    {s.num}
                  </div>
                  <h3 className="font-display mt-6 text-2xl text-navy">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions & Guidelines */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-pale p-8 sm:p-10">
              <div className="flex items-center gap-3 text-navy font-display text-2xl mb-6">
                <CheckCircle2 className="size-6 text-primary" /> Eligible for Return
              </div>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Unworn frames with no structural bending or cosmetic scratches.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Returned within 7 calendar days from the tracked delivery date.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Original leatherette hard case, microfibre cloth, and warranty card included.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Custom prescription lenses are eligible for complimentary re-calibration if powers feel uncomfortable.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-ice p-8 sm:p-10">
              <div className="flex items-center gap-3 text-navy font-display text-2xl mb-6">
                <ShieldAlert className="size-6 text-amber-500" /> Non-Returnable Conditions
              </div>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Frames with accidental physical damage, crushing, or heat deformation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Requests initiated past the 7-day delivery threshold (covered under 1-Year Warranty instead).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Frames missing the original protective packaging.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Refund Timelines */}
          <div className="rounded-3xl border border-border bg-pale p-8">
            <h3 className="font-display text-2xl text-navy">Refund Settlement Schedules</h3>
            <p className="mt-2 text-sm text-muted-foreground">Refunds are released to your original payment method immediately upon inspection approval.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-2xl border border-border bg-ice p-5">
                <p className="label-tech text-primary">UPI & Wallets</p>
                <p className="font-display mt-2 text-xl text-navy">Instant to 4 Hours</p>
                <p className="text-xs text-muted-foreground mt-1">Direct to GPay / PhonePe / Paytm</p>
              </div>
              <div className="rounded-2xl border border-border bg-ice p-5">
                <p className="label-tech text-primary">Debit / Credit Cards</p>
                <p className="font-display mt-2 text-xl text-navy">2–5 Business Days</p>
                <p className="text-xs text-muted-foreground mt-1">Dependent on issuing bank</p>
              </div>
              <div className="rounded-2xl border border-border bg-ice p-5">
                <p className="label-tech text-primary">Cash on Delivery</p>
                <p className="font-display mt-2 text-xl text-navy">Direct NEFT Transfer</p>
                <p className="text-xs text-muted-foreground mt-1">To your verified bank account</p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="rounded-3xl border border-border bg-ice p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl text-navy">Need to exchange a size or style?</p>
              <p className="text-xs text-muted-foreground mt-1">Our concierge is happy to arrange an instant swap without return wait times.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className={btnClass("primary")}>Request Return / Swap</Link>
              <Link to="/account" className={btnClass("glass")}>View Your Orders</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
