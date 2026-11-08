"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { COLORS } from "@/config/theme";

const textPrimary = COLORS.textPrimary;
const textSecondary = COLORS.textSecondaryContact;
const bgPage = COLORS.bgPageContact;
const inputBg = COLORS.inputBg;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMIT_MS = 3000;
const RESUBMIT_COOLDOWN_MS = 30000;

export default function ContactPageClient() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [invalidField, setInvalidField] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [retrySeconds, setRetrySeconds] = useState(0);
  const canSubmit = retrySeconds === 0;
  const formLoadTime = useRef(null);
  const cooldownTimer = useRef(null);

  useEffect(() => {
    formLoadTime.current = Date.now();
    return () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Anti-spam: honeypot — bots fill hidden fields
    if (honeypot) return;

    // Anti-spam: reject submissions faster than a human can fill the form
    if (formLoadTime.current === null || Date.now() - formLoadTime.current < MIN_SUBMIT_MS) return;

    // Anti-spam: cooldown between submissions
    if (!canSubmit || status === "sending") return;

    // Validation
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    const showFieldError = (field, message) => {
      setInvalidField(field);
      setErrorMsg(message);
      setStatus("error");
      e.currentTarget.elements.namedItem(field)?.focus();
    };

    if (name.length < 2) {
      showFieldError("name", "Please enter your full name.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      showFieldError("email", "Please enter a valid email address.");
      return;
    }
    if (message.length < 10) {
      showFieldError("message", "Your message is too short. Please add more detail.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    setInvalidField(null);

    const publicKey = "cXgAIzNSkZVXYkXyE";
    const serviceId = "service_tgrxl4a";
    const templateId = "template_hbeyl4c";

    // Start cooldown only after we actually attempt the send
    const retryAt = Date.now() + RESUBMIT_COOLDOWN_MS;
    const updateCountdown = () => {
      const remaining = Math.max(0, retryAt - Date.now());
      setRetrySeconds(Math.ceil(remaining / 1000));
      if (remaining > 0) {
        cooldownTimer.current = setTimeout(updateCountdown, Math.min(1000, remaining));
      }
    };
    updateCountdown();

    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: name, from_email: email, message },
        publicKey,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Something went wrong. Please try again in a moment.");
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error feedback as the user corrects their input
    if (status === "error" && (!invalidField || invalidField === name)) {
      setStatus("idle");
      setErrorMsg("");
      setInvalidField(null);
    }
  };

  const isBusy = status === "sending";
  const isDisabled = isBusy || !canSubmit;

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

      <Header />

      <main id="main-content" className="relative mx-auto max-w-2xl px-4 py-28 sm:px-6 lg:px-8">
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
            Open to conversations about product design roles, <br />
            collaboration, and opportunities.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isBusy}
          className="rounded-3xl bg-white p-6 md:p-8"
          style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.06)" }}
        >
          {/* Honeypot — hidden from real users, attracts bots */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

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
                aria-invalid={invalidField === "name" || undefined}
                aria-describedby={invalidField === "name" ? "contact-form-error" : undefined}
                name="name"
                type="text"
                required
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                disabled={isBusy}
                className={cn(
                  "w-full rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors duration-150",
                  "placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#1f2937]/60",
                  "aria-invalid:ring-2 aria-invalid:ring-red-600",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
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
                aria-invalid={invalidField === "email" || undefined}
                aria-describedby={invalidField === "email" ? "contact-form-error" : undefined}
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isBusy}
                className={cn(
                  "w-full rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors duration-150",
                  "placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#1f2937]/60",
                  "aria-invalid:ring-2 aria-invalid:ring-red-600",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
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
              aria-invalid={invalidField === "message" || undefined}
              aria-describedby={invalidField === "message" ? "contact-form-error" : undefined}
              name="message"
              required
              rows={5}
              placeholder="What's on your mind?"
              value={formData.message}
              onChange={handleChange}
              disabled={isBusy}
              className={cn(
                "min-h-[120px] w-full resize-y rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors duration-150",
                "placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#1f2937]/60",
                "aria-invalid:ring-2 aria-invalid:ring-red-600",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              )}
              style={{ backgroundColor: inputBg, color: textPrimary }}
            />
          </div>

          <div role="status" aria-live="polite" aria-atomic="true">
            {status === "success" && (
              <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-center">
                <p className="text-sm font-medium text-green-700">
                  Thanks! Your message has been sent. I&apos;ll be in touch soon.
                </p>
              </div>
            )}
          </div>

          <div role="alert" aria-atomic="true">
            {status === "error" && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center">
                <p id="contact-form-error" className="text-sm font-medium text-red-700">
                  {errorMsg || "Something went wrong. Please try again later."}
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isDisabled}
            className="h-11 w-full rounded-full bg-[#1f2937] text-base font-medium text-white hover:bg-[#111827]"
          >
            {isBusy ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending...
              </span>
            ) : retrySeconds > 0 ? (
              `Try again in ${retrySeconds}s`
            ) : (
              "Send Message"
            )}
          </Button>
        </motion.form>
      </main>
    </div>
  );
}
