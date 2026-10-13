import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { PageHero, btnClass } from "@/components/aura/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — AURA VISION Concierge" },
      { name: "description", content: "Get in touch with AURA VISION eyewear specialists. Styling consultations, prescription assistance, and order inquiries." },
      { property: "og:title", content: "Contact Us — AURA VISION" },
      { property: "og:description", content: "Reach our dedicated optical concierge team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "Order Inquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <>
      <PageHero
        eyebrow="Concierge & Support"
        title={<>How can we <em className="text-primary italic">assist you?</em></>}
        sub="Our optical specialists are available 7 days a week to advise on frame fittings, lens parameters, or order updates."
      />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_420px]">
          {/* Main Form */}
          <div className="rounded-3xl border border-border bg-ice p-6 sm:p-10 shadow-soft">
            {sent ? (
              <div className="py-16 text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="size-8" />
                </div>
                <h2 className="headline mt-6 text-4xl text-navy">Message Received.</h2>
                <p className="mt-3 max-w-md mx-auto text-sm text-muted-foreground leading-relaxed">
                  Thank you, <strong className="text-navy">{form.name}</strong>. An AURA VISION concierge specialist will review your request and reply to <strong className="text-navy">{form.email}</strong> within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", phone: "", reason: "Order Inquiry", message: "" });
                  }}
                  className="label-tech mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-primary-foreground hover:bg-ultra"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="headline text-3xl text-navy">Send an Inquiry</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Fill in your information and our concierge team will respond promptly.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="label-tech text-muted-foreground">Full Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Kabir Sen"
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                    />
                  </label>

                  <label className="block">
                    <span className="label-tech text-muted-foreground">Email Address *</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="kabir@example.in"
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="label-tech text-muted-foreground">Phone Number</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98290 00000"
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                    />
                  </label>

                  <label className="block">
                    <span className="label-tech text-muted-foreground">Subject / Topic</span>
                    <select
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                    >
                      <option>Order Inquiry</option>
                      <option>Prescription Lens Advice</option>
                      <option>Frame Size & Face Shape</option>
                      <option>Returns & Exchange</option>
                      <option>Warranty & Repair</option>
                      <option>Flagship Store Appointment</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="label-tech text-muted-foreground">Message *</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm outline-none transition focus:border-primary resize-none"
                  />
                </label>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-xs text-muted-foreground">We protect your privacy. No spam, ever.</p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="label-tech flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-glow transition hover:bg-ultra disabled:opacity-50"
                  >
                    {loading ? "Transmitting…" : "Send Message"} <Send className="size-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Contact & Studio Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-pale p-8">
              <h3 className="font-display text-2xl text-navy">Optical Concierge</h3>
              <p className="mt-2 text-sm text-muted-foreground">Direct lines to our dedicated customer support specialists.</p>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="size-5 shrink-0 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-navy">+91 141 400 2026</p>
                    <p className="text-xs text-muted-foreground">Mon–Sat: 10:00 AM – 8:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 shrink-0 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-navy">concierge@auravision.in</p>
                    <p className="text-xs text-muted-foreground">Typical response within 4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 shrink-0 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-navy">7 Days Delivery Support</p>
                    <p className="text-xs text-muted-foreground">Real-time SMS updates on dispatch</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-ice p-8">
              <h3 className="font-display text-2xl text-navy">Flagship Studios</h3>
              <p className="mt-2 text-sm text-muted-foreground">Experience frames in person with free digital optometrist consultations.</p>
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-between text-sm py-1 border-b border-border">
                  <span className="font-medium text-navy">Jaipur</span>
                  <span className="text-xs text-muted-foreground">C-Scheme, Ashok Marg</span>
                </div>
                <div className="flex items-center justify-between text-sm py-1 border-b border-border">
                  <span className="font-medium text-navy">New Delhi</span>
                  <span className="text-xs text-muted-foreground">Khan Market</span>
                </div>
                <div className="flex items-center justify-between text-sm py-1 border-b border-border">
                  <span className="font-medium text-navy">Mumbai</span>
                  <span className="text-xs text-muted-foreground">Linking Road, Bandra</span>
                </div>
                <div className="flex items-center justify-between text-sm py-1">
                  <span className="font-medium text-navy">Bengaluru</span>
                  <span className="text-xs text-muted-foreground">100 Ft Rd, Indiranagar</span>
                </div>
              </div>
              <Link to="/stores" className="label-tech mt-6 inline-flex items-center gap-1.5 text-primary hover:underline">
                View all store locations →
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-pale p-6 flex items-center justify-between">
              <div>
                <p className="font-medium text-navy text-sm">Need quick answers?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Explore our frequently asked questions.</p>
              </div>
              <Link to="/faq" className={btnClass("glass", "sm")}>View FAQs</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
