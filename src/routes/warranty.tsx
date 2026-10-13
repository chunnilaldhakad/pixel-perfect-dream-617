import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Wrench, Sparkles, AlertCircle, ArrowRight, Check } from "lucide-react";
import { PageHero, btnClass } from "@/components/aura/ui";

export const Route = createFileRoute("/warranty")({
  head: () => ({
    meta: [
      { title: "1-Year Warranty & Atelier Care — AURA VISION" },
      { name: "description", content: "Comprehensive 365-day manufacturer warranty and lifetime optical care for every AURA VISION frame." },
      { property: "og:title", content: "Warranty — AURA VISION" },
      { property: "og:description", content: "Our quality assurance and repair commitment." },
    ],
  }),
  component: WarrantyPage,
});

const covered = [
  "Laser weld separation at titanium bridge or lug joints",
  "Internal spring-hinge tension failure or barrel detachment",
  "Spontaneous peeling or flaking of BluCut or anti-reflective coatings",
  "Discoloration or delamination of cellulose acetate layers",
  "Nose-pad arm solder fracture under standard daily wear",
];

const notCovered = [
  "Accidental dropping, stepped-on frames, or dog chew damage",
  "Surface scratches on lenses from rough cleaning textiles or keys",
  "Exposure to extreme solvent chemicals, perfumes, or excessive sauna heat",
  "Modifications or repairs performed by non-authorized third-party workshops",
];

function WarrantyPage() {
  return (
    <>
      <PageHero
        eyebrow="Craft Guarantee"
        title={<>Built to endure. <em className="text-primary italic">Guaranteed.</em></>}
        sub="We stand behind our materials and Japanese machining standards with an unconditional 365-day warranty against manufacturing flaws."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1200px] space-y-16">
          {/* Warranty Badge Banner */}
          <div className="rounded-3xl border border-primary/30 bg-pale p-8 sm:p-12 shadow-glow text-center">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-primary text-primary-foreground mb-6 shadow-soft">
              <ShieldCheck className="size-10" />
            </div>
            <p className="label-tech text-primary">Aura Vision Atelier Promise</p>
            <h2 className="headline mt-3 text-4xl sm:text-6xl text-navy">1-Year Comprehensive Warranty</h2>
            <p className="mt-4 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
              Every authentic AURA VISION frame is protected for 365 days from the date of purchase. If an unexpected manufacturing defect develops, we will repair or replace your frame free of charge.
            </p>
          </div>

          {/* Coverage Comparison */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-ice p-8 sm:p-10">
              <div className="flex items-center gap-3 text-navy font-display text-2xl mb-6">
                <ShieldCheck className="size-6 text-primary" /> What Is Covered
              </div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {covered.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary mt-0.5">
                      <Check className="size-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-pale p-8 sm:p-10">
              <div className="flex items-center gap-3 text-navy font-display text-2xl mb-6">
                <AlertCircle className="size-6 text-muted-foreground" /> What Is Excluded
              </div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {notCovered.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Complimentary Lifetime Care */}
          <div className="rounded-3xl border border-border bg-ice p-8 sm:p-12">
            <div className="max-w-2xl">
              <span className="label-tech text-primary">Beyond The Year</span>
              <h2 className="headline mt-2 text-3xl sm:text-4xl text-navy">Complimentary Lifetime Atelier Care</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Even long after your first year, visit any AURA VISION optical studio for walk-in maintenance at no cost:
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Ultrasonic Spa Bath", desc: "Deep ultrasonic frequency cleaning removing microscopic dirt from crevices." },
                { title: "Hinge Calibration", desc: "Re-torquing screws, replacing hinge washers, and realigning temple symmetry." },
                { title: "Silicone Pad Replacement", desc: "Fresh medical-grade hypoallergenic nose pads fitted anytime you visit." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-pale p-6">
                  <Wrench className="size-6 text-primary mb-3" />
                  <h4 className="font-display text-xl text-navy">{c.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Claim Action Row */}
          <div className="rounded-3xl border border-border bg-pale p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl text-navy">Need to file a warranty claim?</p>
              <p className="text-xs text-muted-foreground mt-1">Have your Order ID or phone number ready and our specialists will arrange inspection pickup.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className={btnClass("primary")}>
                Submit Claim <ArrowRight className="size-4" />
              </Link>
              <Link to="/stores" className={btnClass("glass")}>
                Find Nearest Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
