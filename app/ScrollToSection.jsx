"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getScrollBehavior } from "@/lib/utils";

export function ScrollToSection() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");

  useEffect(() => {
    if (!scrollTo) return;

    const id = scrollTo.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollTo]);

  return null;
}
