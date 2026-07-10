import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id) {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
}
