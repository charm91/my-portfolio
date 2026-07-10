"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function ScrollToSection() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");

  useEffect(() => {
    if (!scrollTo) return;

    const id = scrollTo.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollTo]);

  return null;
}
