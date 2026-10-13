import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/aura/ui";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AURA VISION" },
      { name: "description", content: "Our commitment to customer data privacy, prescription safeguarding, and digital security." },
      { property: "og:title", content: "Privacy Policy — AURA VISION" },
      { property: "og:description", content: "How AURA VISION safeguards your personal and optical information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Data Governance"
        title={<>Your privacy. <em className="text-primary italic">Respected.</em></>}
        sub="We treat your personal data and optical measurements with the same uncompromising integrity we apply to our eyewear."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1000px]">
          {/* Highlight Card: Prescription Data Privacy */}
          <div className="mb-12 rounded-3xl border border-primary/30 bg-pale p-8 sm:p-10 shadow-glow">
            <div className="flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Lock className="size-6" />
              </div>
              <div>
                <span className="label-tech text-primary">Special Optical Privacy Notice</span>
                <h2 className="headline mt-1 text-2xl sm:text-3xl text-navy">Prescription Data Stays Confidential</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Your optical prescriptions and vision screener responses are strictly confidential. We <strong className="text-navy">never</strong> sell, share, or broker your personal or optical health data to third-party advertisers. Prescription information is encrypted and used exclusively by certified optical specialists to craft your bespoke lenses.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Content Sections */}
          <div className="rounded-3xl border border-border bg-ice p-8 sm:p-12 space-y-10 text-sm leading-relaxed text-muted-foreground shadow-soft">
            <div>
              <p className="label-tech text-primary">01</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Information We Collect</h3>
              <p className="mt-3">
                To deliver optical products and tailored service, Aura Vision Optics Pvt. Ltd. may collect the following details provided during shopping and account management:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><strong className="text-navy">Contact & Delivery:</strong> Full name, telephone number, email address, physical postal address, and PIN code.</li>
                <li><strong className="text-navy">Optical Prescription Data:</strong> Spherical power, cylindrical power, axis, pupillary distance (PD), and optometrist slips voluntarily uploaded for custom lenses.</li>
                <li><strong className="text-navy">Transactional Records:</strong> Purchased frame SKUs, order histories, delivery choices, and tracking numbers. Note that payment credentials (credit card numbers, UPI PINs) are processed directly by PCI-DSS certified banking gateways and are never seen or stored by AURA VISION.</li>
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">02</p>
              <h3 className="font-display mt-1 text-2xl text-navy">How We Use Your Information</h3>
              <p className="mt-3">
                Your data is utilized solely for lawful purposes associated with your eyewear purchase:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li>Processing and fulfilling eyewear orders, custom lens edging, and shipping logistics.</li>
                <li>Transmitting real-time tracking updates via SMS, WhatsApp, and email.</li>
                <li>Administering our 7-day return policy and 1-year atelier warranty programs.</li>
                <li>Personalizing frame recommendations based on face shape and preferred style palettes.</li>
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">03</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Browser Storage & Local Preferences</h3>
              <p className="mt-3">
                We utilize lightweight client-side storage (<code className="font-mono text-xs text-primary">localStorage</code>) to persist your active shopping cart, wishlist selections, demo account preferences, and recent search queries across browser reloads. This guarantees seamless performance without requiring mandatory third-party tracking cookies.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">04</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Information Sharing & Third Parties</h3>
              <p className="mt-3">
                We uphold strict confidentiality. We <strong className="text-navy">never sell or rent</strong> customer databases to marketing aggregators. Information is shared strictly with verified logistics providers (BlueDart, Delhivery, DTDC) solely to accomplish physical doorstep delivery.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="label-tech text-primary">05</p>
              <h3 className="font-display mt-1 text-2xl text-navy">Your Rights & Inquiries</h3>
              <p className="mt-3">
                You have the full right to review, update, or request permanent deletion of your customer records at any time. For privacy inquiries or data removal, contact our dedicated compliance officer:
              </p>
              <div className="mt-4 rounded-2xl border border-border bg-pale p-5 text-xs text-navy">
                <p className="font-semibold">Aura Vision Optics Pvt. Ltd. — Data Protection Office</p>
                <p className="mt-1">C-Scheme, Ashok Marg, Jaipur, Rajasthan 302001, India</p>
                <p className="mt-1">Email: <a href="mailto:privacy@auravision.in" className="text-primary underline">privacy@auravision.in</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
