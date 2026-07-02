"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/config/site";

const textPrimary = "#1f2937";
const textSecondary = "#6b7280";
const bgPage = "#F8F8F8";
const inputBg = "#f6f7f9";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMIT_MS = 3000;
const RESUBMIT_COOLDOWN_MS = 30000;

export default function ContactPageClient() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);
  const formLoadTime = useRef(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Anti-spam: honeypot — bots fill hidden fields
    if (honeypot) return;

    // Anti-spam: reject submissions faster than a human can fill the form
    if (Date.now() - formLoadTime.current < MIN_SUBMIT_MS) return;

    // Anti-spam: cooldown between submissions
    if (!canSubmit) return;

    // Validation
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (name.length < 2) {
      setErrorMsg("Please enter your full name.");
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (message.length < 10) {
      setErrorMsg("Your message is too short. Please add more detail.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const publicKey = "cXgAIzNSkZVXYkXyE";
    const serviceId = "service_tgrxl4a";
    const templateId = "template_hbeyl4c";

    // Start cooldown only after we actually attempt the send
    setCanSubmit(false);
    setTimeout(() => setCanSubmit(true), RESUBMIT_COOLDOWN_MS);

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
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
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
              href="/"
              className="shrink-0 transition-opacity hover:opacity-80"
            >
              <img src="/logo.svg" alt={SITE.displayName} className="w-20" />
            </Link>

            <Button
              asChild
              className="rounded-full bg-gray-100 px-5 py-2 h-9 text-sm font-medium hover:bg-gray-200! text-[#1f2937]!"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </motion.header>

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
                name="name"
                type="text"
                required
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                disabled={isBusy}
                className={cn(
                  "w-full rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors",
                  "placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#1f2937]/60",
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
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isBusy}
                className={cn(
                  "w-full rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors",
                  "placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#1f2937]/60",
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
              name="message"
              required
              rows={5}
              placeholder="What's on your mind?"
              value={formData.message}
              onChange={handleChange}
              disabled={isBusy}
              className={cn(
                "min-h-[120px] w-full resize-y rounded-xl border-0 px-4 py-3 text-base outline-none transition-colors",
                "placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#1f2937]/60",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              )}
              style={{ backgroundColor: inputBg, color: textPrimary }}
            />
          </div>

          {status === "success" && (
            <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-center">
              <p className="text-sm font-medium text-green-700">
                Message received! I&apos;ll review it and get back to you soon.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center">
              <p className="text-sm font-medium text-red-700">
                {errorMsg || "Something went wrong. Please try again later."}
              </p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isDisabled}
            className="h-11 w-full rounded-full bg-[#1f2937] text-base font-medium text-white hover:bg-[#111827]"
          >
            {isBusy ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </motion.form>
      </main>
    </div>
  );
}
