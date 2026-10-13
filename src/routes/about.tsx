import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Compass, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { IMG } from "@/lib/data";
import { PageHero, Reveal, btnClass } from "@/components/aura/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — AURA VISION Atelier" },
      { name: "description", content: "Precision-crafted luxury eyewear. Learn about our heritage, Japanese beta-titanium engineering, and Italian acetate craftsmanship." },
      { property: "og:title", content: "About Us — AURA VISION" },
      { property: "og:description", content: "The philosophy of architectural optics and modern luxury." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Compass,
    title: "Architectural Precision",
    desc: "Every bevel, chamfer, and curve is modeled with architectural rigor. Balanced to distribute frame weight within 0.1 gram tolerance across nose pads and temples.",
  },
  {
    icon: Layers,
    title: "Master Materials",
    desc: "Sourced from Sabae, Japan for aerospace-grade beta-titanium and Mazzucchelli 1849 in Varese, Italy for bio-cellulose acetates with organic depth.",
  },
  {
    icon: ShieldCheck,
    title: "Optical Purity",
    desc: "Lenses crafted with 7-layer anti-reflective coatings, 420nm high-energy blue-light filtration, and diamond-hard scratch resistance.",
  },
  {
    icon: Sparkles,
    title: "Atelier Legacy",
    desc: "Combining eight decades of ophthalmic science with contemporary silhouettes engineered for Indian sunlight, facial anatomy, and digital lifestyles.",
  },
];

const milestones = [
  { year: "2018", title: "The Studio Genesis", desc: "Founded in Jaipur with a single purpose: eliminating bulky, generic frames in favor of surgical-grade lightness." },
  { year: "2021", title: "BluCut Optics Launch", desc: "Developed proprietary high-transmittance blue-light filtering lenses for engineers, designers, and creators." },
  { year: "2024", title: "Atelier 2026 Collection", desc: "Introduced three-piece rimless titanium and magnetic audio smart frames crafted for the modern visionary." },
  { year: "2026", title: "Pan-India Presence", desc: "Four flagship experiential optical studios in Jaipur, Delhi, Mumbai, and Bangalore with doorstep delivery across all PIN codes." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Heritage & Philosophy"
        title={<>Frame your <em className="text-primary italic">vision.</em></>}
        sub="Born from the dialogue between classical optics and architectural minimalism. We build eyewear that feels weightless and looks unmistakable."
      />

      {/* Editorial Story Section */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-soft">
              <img
                src={IMG.hero}
                alt="Aura Vision craftsmanship"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              <span className="label-tech absolute bottom-5 left-5 rounded-full glass px-4 py-2 text-deep">
                Handcrafted Precision · 48 Hours per Frame
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="label-tech text-primary">The Aura Method</p>
            <h2 className="headline mt-4 text-4xl text-navy md:text-6xl">
              Where optics becomes art.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Most eyewear forces a compromise: heavy statement acetate that slides down your nose, or flimsy metal wire that loses shape in months. We rejected both.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Every AURA VISION frame begins with raw Japanese beta-titanium wire or cured Italian Mazzucchelli acetate blocks. Hand-shaped, tumbled in beechwood pegs for 72 hours, and individually calibrated with medical silicone pads for effortless all-day wear.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
              <div>
                <p className="font-display text-4xl text-navy">12.4g</p>
                <p className="label-tech mt-1 text-muted-foreground">Average frame weight</p>
              </div>
              <div>
                <p className="font-display text-4xl text-primary">100%</p>
                <p className="label-tech mt-1 text-muted-foreground">UV400 & Anti-Glare</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-pale px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <p className="label-tech text-primary">Core Tenets</p>
            <h2 className="headline mt-3 text-4xl text-navy md:text-5xl">Engineered without compromise.</h2>
            <p className="mt-4 text-muted-foreground">Four foundational pillars that govern every frame that leaves our studio.</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-border bg-ice p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl text-navy">{v.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <p className="label-tech text-primary">Trajectory</p>
            <h2 className="headline mt-3 text-4xl text-navy md:text-6xl">Our Evolution</h2>
          </div>

          <div className="relative mt-16 space-y-12 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/20 md:space-y-16 md:pl-16 md:before:left-6">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.1} className="relative">
                <span className="absolute -left-8 md:-left-16 top-1.5 grid size-6 md:size-8 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground font-mono text-xs">
                  <CheckCircle2 className="size-4" />
                </span>
                <span className="label-tech text-primary">{m.year}</span>
                <h3 className="font-display mt-1 text-2xl text-navy md:text-3xl">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-navy-grad px-5 py-20 text-navy-foreground md:px-10 md:py-24">
        <div className="mx-auto max-w-[1000px] text-center">
          <p className="label-tech text-cyan">Experience The Difference</p>
          <h2 className="headline mt-4 text-4xl md:text-6xl text-white">Find your signature frame.</h2>
          <p className="mt-4 mx-auto max-w-lg text-sm text-navy-foreground/75 leading-relaxed">
            Take our interactive 3-minute eye test, explore our curated collections, or visit one of our flagship boutiques.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/eyeglasses" className={btnClass("primary", "lg")}>
              Shop Eyeglasses <ArrowRight className="size-4" />
            </Link>
            <Link to="/eye-test" className={btnClass("outlineLight", "lg")}>
              Take 3-Min Eye Test
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
