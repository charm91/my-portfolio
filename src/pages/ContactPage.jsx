import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const textPrimary = "#1f2937";
const textSecondary = "#6b7280";
const bgPage = "#F8F8F8";
const inputBg = "#f6f7f9";

export function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      console.warn("EmailJS env vars missing. Add VITE_EMAILJS_* to .env");
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey,
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: bgPage }}
    >
      {/* Subtle wavy + dotted background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 30%, rgba(255,255,255,0.9) 0%, transparent 40%),
            radial-gradient(circle at 85% 70%, rgba(255,255,255,0.8) 0%, transparent 45%),
            radial-gradient(circle 1px at 20% 20%, rgba(0,0,0,0.06) 0%, transparent 100%),
            radial-gradient(circle 1px at 60% 80%, rgba(0,0,0,0.05) 0%, transparent 100%),
            radial-gradient(circle 1px at 80% 30%, rgba(0,0,0,0.05) 0%, transparent 100%)
          `,
        }}
      />

      {/* Header */}
      <header className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-xl font-semibold"
          style={{ color: textPrimary, fontFamily: "Georgia, serif" }}
        >
          <img src="/logo.svg" alt="Charm" className="w-20" />
        </Link>
        <Button
          asChild
          className="rounded-xl bg-[#1f2937] hover:bg-[#111827] text-white font-medium px-5 py-2.5"
        >
          <Link to="/">Back To Home</Link>
        </Button>
      </header>

      {/* Main */}
      <main className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span
            className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-medium mb-5"
            style={{ color: textPrimary }}
          >
            Contact
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: textPrimary }}
          >
            Get in <span className="italic font-serif font-normal">Touch</span>
          </h1>
          <p className="text-base md:text-lg" style={{ color: textSecondary }}>
            Open to conversations about product roles, <br /> collaboration, and
            opportunities.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 md:p-8"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-semibold mb-2"
                style={{ color: textPrimary }}
              >
                Your Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-xl px-4 py-3 text-base border-0 outline-none transition-colors",
                  "placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1f2937]/20",
                )}
                style={{ backgroundColor: inputBg, color: textPrimary }}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-semibold mb-2"
                style={{ color: textPrimary }}
              >
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="Yourmail@mail.com"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-xl px-4 py-3 text-base border-0 outline-none transition-colors",
                  "placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1f2937]/20",
                )}
                style={{ backgroundColor: inputBg, color: textPrimary }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="contact-message"
              className="block text-sm font-semibold mb-2"
              style={{ color: textPrimary }}
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              className={cn(
                "w-full rounded-xl px-4 py-3 text-base border-0 outline-none resize-y min-h-[120px] transition-colors",
                "placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1f2937]/20",
              )}
              style={{ backgroundColor: inputBg, color: textPrimary }}
            />
          </div>
          {status === "success" && (
            <p className="text-center text-green-600 text-sm mb-4">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-600 text-sm mb-4">
              Something went wrong. You can email directly via the footer link.
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="rounded-full text-white font-medium h-11 text-base w-full"
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </Button>
        </motion.form>
      </main>
    </div>
  );
}
