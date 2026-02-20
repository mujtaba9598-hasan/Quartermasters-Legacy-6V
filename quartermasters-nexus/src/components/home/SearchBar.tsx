"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X, Loader2 } from "lucide-react";
import { fadeInUp, scrollViewport } from "@/lib/animations";

const suggestions = [
  "How can you help with HR compliance?",
  "What banking advisory services do you offer?",
  "Tell me about event management capabilities",
  "What R&D consulting do you provide?",
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenModal = () => {
    if (!query.trim()) return;
    setFormData((prev) => ({ ...prev, message: query }));
    setIsModalOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOpenModal();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          message: formData.message,
          service: "general",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus("idle");
        setQuery("");
        setFormData({ name: "", email: "", whatsapp: "", message: "" });
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message.");
    }
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-overline mb-4">Intelligence</p>
          <h2 className="heading-2 mb-4">How Can We Help?</h2>
          <p
            className="mb-10 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Describe your challenge — we&apos;ll map it to the right capability.
          </p>

          {/* Search Input */}
          <div
            className="glass relative rounded-xl transition-all"
            style={{
              borderColor: focused
                ? "var(--color-gold)"
                : "var(--glass-border)",
              borderWidth: 1,
              borderStyle: "solid",
              boxShadow: focused
                ? "0 0 30px rgba(200, 135, 46, 0.12)"
                : "none",
            }}
          >
            <div className="flex items-center gap-3 px-5 py-4">
              <Search
                size={20}
                style={{
                  color: focused
                    ? "var(--color-gold)"
                    : "var(--text-light)",
                }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="How can we help your organization?"
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-body)",
                }}
              />
              <button
                aria-label="Submit search"
                onClick={handleOpenModal}
                disabled={!query.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-all"
                style={{
                  background: query.trim()
                    ? "var(--color-gold)"
                    : "transparent",
                  color: query.trim()
                    ? "var(--color-white)"
                    : "var(--text-light)",
                  cursor: query.trim() ? "pointer" : "default",
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="pill-tag transition-all"
                style={{ cursor: "pointer", fontSize: "0.75rem" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--text-body)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--glass-border)] p-8 shadow-2xl"
              style={{ background: "var(--bg-card)" }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h3 className="heading-3 mb-2">Complete Your Inquiry</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Please provide your details so we can respond to your request.
                </p>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <ArrowRight size={32} className="-rotate-45" />
                  </div>
                  <h4 className="heading-4 mb-2">Message Sent!</h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    We have received your inquiry. Our team will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-light)] mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                      placeholder="Your Full Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-light)] mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                      placeholder="email@company.com"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-light)] mb-1">
                      WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Message (Pre-filled) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-light)] mb-1">
                      Your Inquiry
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-400">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-glow-line flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold disabled:opacity-50"
                    style={{
                      background: "var(--color-gold)",
                      color: "var(--color-white)",
                    }}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Request <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
