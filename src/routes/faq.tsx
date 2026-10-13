import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { PageHero, btnClass } from "@/components/aura/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — AURA VISION" },
      { name: "description", content: "Answers to questions on frame materials, prescription lenses, sizing, express shipping across India, returns and warranties." },
      { property: "og:title", content: "FAQs — AURA VISION" },
      { property: "og:description", content: "Everything you need to know about AURA VISION eyewear." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    cat: "Frames & Fit",
    q: "How do I choose the right frame size for my face?",
    a: "Every AURA VISION frame displays exact millimeter specifications (Lens Width, Bridge Width, and Temple Length). Use our Face Shape Finder on the homepage to find frames harmonized for oval, round, square, or heart face shapes.",
  },
  {
    cat: "Frames & Fit",
    q: "What makes Japanese beta-titanium superior?",
    a: "Beta-titanium has natural memory elasticity, meaning it flexes to your temple shape without bending permanently out of alignment. It is 100% hypoallergenic, rust-proof, and weighs less than half the weight of traditional stainless steel alloys.",
  },
  {
    cat: "Frames & Fit",
    q: "Can I adjust the nose pads and temple tips at home?",
    a: "Our titanium frames feature medical-grade soft silicone pads with micro-spring joints that can be gently adjusted with your fingertips. For temple curvature adjustments, you can visit any of our flagship studios or your local optician.",
  },
  {
    cat: "Prescription & Lenses",
    q: "Can I order prescription lenses with my frames?",
    a: "Yes! All AURA VISION optical frames support single-vision, bifocal, and progressive lenses. During order placement or via our concierge team, you can upload your prescription slip or enter sphere/cylinder values directly.",
  },
  {
    cat: "Prescription & Lenses",
    q: "What is the BluCut filtration coating?",
    a: "BluCut is our proprietary multi-layer lens coating that filters harmful 380–450nm blue light emitted by OLED/LED screens while maintaining 98% color fidelity so designers and editors see accurate hues without an aggressive yellow cast.",
  },
  {
    cat: "Prescription & Lenses",
    q: "Are the sunglasses 100% UV protected?",
    a: "All AURA VISION sunglasses feature UV400 lenses that block 100% of UVA and UVB rays. Our polarized models also feature anti-glare filters that cut reflections from wet roads, water, and glass surfaces.",
  },
  {
    cat: "Orders & Shipping",
    q: "How long does shipping take within India?",
    a: "Standard shipping is FREE on all orders and arrives within 3 to 5 business days. Express shipping (1 to 2 business days) is available at checkout for ₹199. Orders are dispatched within 24 to 48 hours from our optical lab.",
  },
  {
    cat: "Orders & Shipping",
    q: "How can I track my order status?",
    a: "You can track your order at any time using our dedicated Track Order page (/track-order) using your Order ID (e.g. AV482910) and your email or phone number. We also send automated WhatsApp and SMS updates at every milestone.",
  },
  {
    cat: "Returns & Warranty",
    q: "What is your return policy?",
    a: "We offer a 7-day hassle-free return and exchange window from the date of delivery. If you are not completely satisfied with the fit or style, initiate a return from your account and our courier partner will provide free doorstep pickup.",
  },
  {
    cat: "Returns & Warranty",
    q: "What does the 1-Year Warranty cover?",
    a: "Every AURA VISION frame comes with an automatic 1-year comprehensive warranty covering manufacturing defects, weld points, hinge integrity, and anti-reflective lens coating peel. Accidental drops and scratches are not covered, but repair service is available at nominal cost.",
  },
];

const categories = ["All", "Frames & Fit", "Prescription & Lenses", "Orders & Shipping", "Returns & Warranty"];

function FaqPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = cat === "All" || f.cat === cat;
    const matchQ = !q || f.q.toLowerCase().includes(q.toLowerCase()) || f.a.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <PageHero
        eyebrow="Help & Knowledge Base"
        title={<>Frequently asked <em className="text-primary italic">questions.</em></>}
        sub="Everything you need to know about our craft, prescription fittings, shipping timelines and guarantees."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1000px]">
          {/* Search Box */}
          <div className="relative mb-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by keyword (e.g. titanium, shipping, blue light, size)..."
              aria-label="Search FAQs"
              className="h-14 w-full rounded-full border border-border bg-ice pl-14 pr-6 text-sm outline-none transition focus:border-primary shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-4 mb-8" role="tablist">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  "label-tech shrink-0 rounded-full px-5 py-2.5 transition",
                  cat === c ? "bg-primary text-primary-foreground shadow-sm" : "border border-border bg-ice text-navy hover:border-primary"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="rounded-3xl border border-border bg-ice p-6 sm:p-10 shadow-soft">
            {filtered.length > 0 ? (
              <Accordion type="single" collapsible defaultValue={filtered[0]?.q} className="divide-y divide-border">
                {filtered.map((item, idx) => (
                  <AccordionItem key={idx} value={item.q} className="py-2 border-none">
                    <AccordionTrigger className="font-display text-xl sm:text-2xl text-navy hover:no-underline text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-2 pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="py-12 text-center">
                <p className="headline text-3xl text-navy">No results found.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try different search terms or explore all categories.</p>
                <button onClick={() => { setQ(""); setCat("All"); }} className="label-tech mt-6 text-primary underline">
                  Clear search filters
                </button>
              </div>
            )}
          </div>

          {/* Need More Assistance Banner */}
          <div className="mt-12 rounded-3xl border border-border bg-pale p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="font-display text-2xl text-navy">Still have questions?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Our optical specialists are happy to advise you directly.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className={btnClass("primary")}>Contact Concierge</Link>
              <Link to="/track-order" className={btnClass("glass")}>Track Order</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
