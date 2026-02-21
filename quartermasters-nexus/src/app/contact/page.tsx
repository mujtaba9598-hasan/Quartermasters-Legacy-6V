"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";
import ClickSpark from "@/components/ui/ClickSpark";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      whatsapp: formData.get("whatsapp") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
      _honeypot: formData.get("_honeypot") as string,
    };

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "Unable to reach our servers. Please check your connection and try again, or contact us directly at ceocli@quartermasters.me."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.p variants={staggerItem} className="text-overline mb-4">
                Contact
              </motion.p>
              <motion.h1 variants={staggerItem} className="heading-1 mb-6">
                Request a Consultation.
                <br />
                <span style={{ color: "var(--text-muted)" }}>
                  We respond within 24 hours.
                </span>
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="max-w-2xl text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Whether you need advisory on banking services, human resources,
                management consulting, event management, or technology education — our team is ready to
                discuss your requirements.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Form + Info Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-12 lg:grid-cols-5"
            >
              {/* Form */}
              <motion.div variants={staggerItem} className="lg:col-span-3">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-xl p-12 text-center"
                    style={{
                      borderColor: "var(--color-gold)",
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                  >
                    <div
                      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(193, 90, 44, 0.1)",
                        color: "var(--color-gold)",
                      }}
                    >
                      <Send size={28} />
                    </div>
                    <h3 className="heading-3 mb-3">Message Received.</h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Our team will review your inquiry and respond within 24
                      business hours. For urgent matters, contact us directly.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="glass rounded-xl p-8 md:p-10"
                  >
                    {/* Honeypot field — hidden from real users, bots will fill it */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "-9999px",
                        opacity: 0,
                        height: 0,
                        width: 0,
                        overflow: "hidden",
                        tabIndex: -1,
                      } as React.CSSProperties}
                    >
                      <label htmlFor="_honeypot">Leave this empty</label>
                      <input
                        id="_honeypot"
                        name="_honeypot"
                        type="text"
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-xs font-medium uppercase tracking-widest"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--text-light)",
                          }}
                        >
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          maxLength={200}
                          disabled={submitting}
                          className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                          style={{
                            borderColor: "var(--glass-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-gold)")
                          }
                          onBlur={(e) =>
                          (e.target.style.borderColor =
                            "var(--glass-border)")
                          }
                          placeholder="Your name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-xs font-medium uppercase tracking-widest"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--text-light)",
                          }}
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={320}
                          disabled={submitting}
                          className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                          style={{
                            borderColor: "var(--glass-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-gold)")
                          }
                          onBlur={(e) =>
                          (e.target.style.borderColor =
                            "var(--glass-border)")
                          }
                          placeholder="you@company.com"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label
                          htmlFor="whatsapp"
                          className="mb-2 block text-xs font-medium uppercase tracking-widest"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--text-light)",
                          }}
                        >
                          WhatsApp (Optional)
                        </label>
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          maxLength={20}
                          disabled={submitting}
                          className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                          style={{
                            borderColor: "var(--glass-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-gold)")
                          }
                          onBlur={(e) =>
                          (e.target.style.borderColor =
                            "var(--glass-border)")
                          }
                          placeholder="+971 50 123 4567"
                        />
                      </div>

                      {/* Organization */}
                      <div>
                        <label
                          htmlFor="organization"
                          className="mb-2 block text-xs font-medium uppercase tracking-widest"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--text-light)",
                          }}
                        >
                          Organization
                        </label>
                        <input
                          id="organization"
                          name="organization"
                          type="text"
                          maxLength={300}
                          disabled={submitting}
                          className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                          style={{
                            borderColor: "var(--glass-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-gold)")
                          }
                          onBlur={(e) =>
                          (e.target.style.borderColor =
                            "var(--glass-border)")
                          }
                          placeholder="Company name"
                        />
                      </div>

                      {/* Service Interest */}
                      <div>
                        <label
                          htmlFor="service"
                          className="mb-2 block text-xs font-medium uppercase tracking-widest"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--text-light)",
                          }}
                        >
                          Service of Interest
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          disabled={submitting}
                          className="w-full appearance-none rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                          style={{
                            borderColor: "var(--glass-border)",
                            color: "var(--text-muted)",
                          }}
                          onFocus={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-gold)")
                          }
                          onBlur={(e) =>
                          (e.target.style.borderColor =
                            "var(--glass-border)")
                          }
                        >
                          <option value="">Select a service</option>
                          <option value="banking">
                            Banking Services Consultancy
                          </option>
                          <option value="hr">
                            Human Resources Consultancy
                          </option>
                          <option value="management">
                            Management Consultancies
                          </option>
                          <option value="events">
                            Organization & Event Management
                          </option>
                          <option value="tech">
                            Technology Education R&D
                          </option>
                          <option value="it">
                            IT Services
                          </option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mt-6">
                      <label
                        htmlFor="message"
                        className="mb-2 block text-xs font-medium uppercase tracking-widest"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-light)",
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        maxLength={5000}
                        disabled={submitting}
                        className="w-full resize-none rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                        style={{
                          borderColor: "var(--glass-border)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) =>
                        (e.target.style.borderColor =
                          "var(--color-gold)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--glass-border)")
                        }
                        placeholder="Describe your requirements..."
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 rounded-lg px-4 py-3 text-sm"
                        style={{
                          background: "rgba(220, 38, 38, 0.1)",
                          border: "1px solid rgba(220, 38, 38, 0.3)",
                          color: "#fca5a5",
                        }}
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <div className="mt-8">
                      <ClickSpark sparkColor="#C8872E">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-glow-line inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold"
                          style={{
                            fontFamily: "var(--font-heading)",
                            background: submitting
                              ? "var(--color-gold)"
                              : "var(--color-gold)",
                            color: "var(--color-white)",
                            letterSpacing: "0.02em",
                            opacity: submitting ? 0.7 : 1,
                            cursor: submitting ? "not-allowed" : "pointer",
                          }}
                        >
                          {submitting ? (
                            <>
                              Sending...
                              <Loader2 size={16} className="animate-spin" />
                            </>
                          ) : (
                            <>
                              Send Inquiry
                              <Send size={16} />
                            </>
                          )}
                        </button>
                      </ClickSpark>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col gap-6 lg:col-span-2"
              >
                {/* Email */}
                <div className="glass rounded-xl p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(193, 90, 44, 0.1)",
                        color: "var(--color-gold)",
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Email
                    </p>
                  </div>
                  <a
                    href="mailto:ceocli@quartermasters.me"
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--color-gold)" }}
                  >
                    ceocli@quartermasters.me
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
