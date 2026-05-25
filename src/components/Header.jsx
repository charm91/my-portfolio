"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "What I Do", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const sectionIds = navItems.map(({ href }) => href.slice(1));

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const visibleSections = useRef(new Set());
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    visibleSections.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        // Update the live set of visible sections from all batched entries
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.current.add(entry.target.id);
          } else {
            visibleSections.current.delete(entry.target.id);
          }
        });

        // The active section is the last one in document order that is visible —
        // i.e. the furthest section the user has scrolled into the trigger zone.
        const active = [...sectionIds]
          .reverse()
          .find((id) => visibleSections.current.has(id));
        if (active) setActiveHref(`#${active}`);
      },
      // Trigger zone: top 60% of viewport.
      // Generous enough for short sections (FAQ); excludes sections merely peeking from bottom.
      { rootMargin: "0px 0px -40% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleNavClick = (item) => {
    if (isHome) {
      scrollToSection(item.href);
    } else {
      // Navigate to home with a query param; home page reads it and scrolls
      const id = item.href.replace(/^#/, "");
      router.push(`/?scrollTo=${id}`);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e) => {
      if (
        !e.target.closest(".menu-trigger") &&
        !e.target.closest(".menu-panel")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 md:pt-4 max-w-xl mx-auto"
    >
      {/* Pill-shaped nav bar: white, rounded, shadow */}
      <div
        className={cn(
          "flex items-center justify-between w-full max-w-4xl h-14 px-4 rounded-full bg-white shadow-md",
          "border border-gray-100/80",
        )}
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Link
          href="/"
          className="text-lg font-semibold text-[#1f2937] hover:opacity-80 transition-opacity shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/logo.svg" alt="Charm" className="w-20" />
        </Link>

        <div className="relative menu-trigger">
          {isHome ? (
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                "bg-gray-100 hover:bg-gray-200 text-[#1f2937] cursor-pointer",
              )}
            >
              Menu
            </button>
          ) : (
            <Button
              asChild
              className={cn(
                "rounded-full px-5 py-2 h-9 text-sm font-medium transition-colors",
                "bg-gray-100! hover:bg-gray-200! text-[#1f2937]! cursor-pointer",
              )}
            >
              <Link href="/">Back to Home</Link>
            </Button>
          )}

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="menu-panel absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white p-3 shadow-lg border border-gray-100"
                style={{
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <nav className="flex flex-col gap-0.5">
                  {navItems.map((item) => {
                    const isActive = isHome && activeHref === item.href;
                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleNavClick(item)}
                        className={cn(
                          "w-full rounded-full py-2.5 px-4 text-left text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#1f2937] text-white"
                            : "text-[#1f2937] hover:bg-[#f3f4f6]",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
                <Button
                  className="w-full justify-start rounded-full py-5 px-4 text-sm font-medium bg-white text-[#1f2937]! hover:bg-[#f3f4f6]!"
                  size="sm"
                  asChild
                >
                  <Link
                    href="/contact-me"
                    className="block w-full text-left"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact Me
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
