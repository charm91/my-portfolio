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
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: bgPage }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
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

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 md:pt-4"
      >
        <div className="mx-auto w-full max-w-xl">
          <div
            className="flex h-14 items-center justify-between rounded-full border border-gray-100/80 bg-white px-4"
            style={{
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Link
              to="/"
              className="shrink-0 transition-opacity hover:opacity-80"
            >
              <img src="/logo.svg" alt="Charm" className="w-20" />
            </Link>

            <Button
              asChild
              className="rounded-full bg-gray-100 px-5 py-2 h-9 text-sm font-medium hover:bg-gray-200! text-[#1f2937]! "
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="relative mx-auto max-w-2xl px-4 py-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <span
            className="mb-5 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium"
            style={{ color: textPrimary }}
          >
            Contact
          </span>

          <h1
            className="mb-4 text-3xl font-bold md:text-4xl"
            style={{ color: textPrimary }}
          >
            Get in <span className="font-serif font-normal italic">Touch</span>
          </h1>

          <p className="text-base md:text-lg" style={{ color: textSecondary }}>
            Open to conversations about product roles, <br />
            collaboration, and opportunities.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 md:p-8"
          style={{
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-semibold"
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
                  "w-full rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors",
                  "placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1f2937]/20",
                )}
                style={{ backgroundColor: inputBg, color: textPrimary }}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-semibold"
                style={{ color: textPrimary }}
              >
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="yourmail@mail.com"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors",
                  "placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1f2937]/20",
                )}
                style={{ backgroundColor: inputBg, color: textPrimary }}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="contact-message"
              className="mb-2 block text-sm font-semibold"
              style={{ color: textPrimary }}
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              className={cn(
                "min-h-[120px] w-full resize-y rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors",
                "placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1f2937]/20",
              )}
              style={{ backgroundColor: inputBg, color: textPrimary }}
            />
          </div>

          {status === "success" && (
            <p className="mb-4 text-center text-sm text-green-600">
              Thanks! Your message has been sent.
            </p>
          )}

          {status === "error" && (
            <p className="mb-4 text-center text-sm text-red-600">
              Something went wrong. Please try again later.
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="h-11 w-full rounded-full bg-[#1f2937] text-base font-medium text-white hover:bg-[#111827]"
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </Button>
        </motion.form>
      </main>
    </div>
  );
}
