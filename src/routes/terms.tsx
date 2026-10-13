import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, FileCheck, AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/aura/ui";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AURA VISION" },
      { name: "description", content: "Official terms of service, purchasing conditions, prescription guidelines, and warranties for AURA VISION eyewear." },
      { property: "og:title", content: "Terms & Conditions — AURA VISION" },
      { property: "og:description", content: "Conditions of purchase and usage." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal Agreement"
        title={<>Terms & <em className="text-primary italic">Conditions.</em></>}
        sub="Please review the operational terms governing your access to AURA VISION and the purchase of our eyewear products."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1000px]">
          {/* Medical Notice Box */}
          <div className="mb-12 rounded-3xl border border-primary/30 bg-pale p-8 sm:p-10 shadow-glow">
            <div className="flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <AlertTriangle className="size-6" />
              </div>
              <div>
                <span className="label-tech text-primary">Important Health & Optical Disclaimer</span>
                <h2 className="headline mt-1 text-2xl sm:text-3xl text-navy">Interactive Screening Notice</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The online visual screener (/eye-test) provided on this website is designed strictly for preliminary lifestyle guidance. It <strong className="text-navy">does not constitute clinical diagnostic medical advice</strong> or a substitute for a comprehensive clinical examination by a certified optometrist or ophthalmologist.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Clauses */}
          <div className="rounded-3xl border border-border bg-ice p-8 sm:p-12 space-y-10 text-sm leading-relaxed text-muted-foreground shadow-soft">
            <div>
              <p className="label-tech text-primary">01</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Acceptance & Scope</h3>
              <p className="mt-3">
                By browsing, accessing, or placing orders via the AURA VISION website, you agree to be bound by these Terms and Conditions. These terms apply to all transactions between the buyer and Aura Vision Optics Pvt. Ltd., headquartered in Jaipur, Rajasthan, India.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">02</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Products, Pricing & Accuracy</h3>
              <p className="mt-3">
                All prices are stated in Indian Rupees (INR, ₹) and include applicable Goods and Services Tax (GST). We endeavor to present frame dimensions, colors, and textures with photographic accuracy; however, minor display color variations may occur depending on screen calibration.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">03</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Customer Prescription Responsibility</h3>
              <p className="mt-3">
                When ordering prescription optical lenses, the customer warrants that the uploaded or entered prescription values are current (valid within the past 24 months) and prescribed by a licensed practitioner. AURA VISION manufactures lenses precisely to the specified numerical values and accepts no liability for discomfort arising from outdated prescriptions.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">04</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Fulfillment, Shipping & Risk of Loss</h3>
              <p className="mt-3">
                Standard orders are dispatched within 24 to 48 hours following prescription verification. Risk of transit loss passes to the customer upon delivery confirmation by our insured logistics partners. In the event of transit damage, customers must notify our concierge team within 48 hours with photographic evidence.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">05</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Returns, Exchanges & 1-Year Warranty</h3>
              <p className="mt-3">
                All purchases are governed by our <Link to="/returns" className="text-primary underline">7-Day Returns Policy</Link> and our <Link to="/warranty" className="text-primary underline">1-Year Comprehensive Warranty</Link>. Returned merchandise must be unworn, undamaged, and complete with all original accessories and packaging.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">06</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Intellectual Property</h3>
              <p className="mt-3">
                All trademarks, brand logos, CAD frame geometries, bespoke typography, and website designs are the exclusive intellectual property of Aura Vision Optics Pvt. Ltd. Unauthorized reproduction, commercial exploitation, or scraping is strictly prohibited.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">07</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Jurisdiction & Dispute Resolution</h3>
              <p className="mt-3">
                These terms are governed by the laws of the Republic of India. Any legal dispute, arbitration, or proceedings arising out of transactions with AURA VISION shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
