import { BetterHRPage } from "@/views/BetterHRPage";

export const metadata = {
  title: "BetterHR Case Study — Charm Aung",
  description:
    "BetterHR Cloud-based HR Management Platform — a product design case study by Charm Aung.",
  openGraph: {
    title: "BetterHR Case Study — Charm Aung",
    description:
      "BetterHR Cloud-based HR Management Platform — a product design case study by Charm Aung.",
    url: "/betterhr",
    images: [
      {
        url: "/betterhr/thumbnail.png",
        width: 1488,
        height: 1050,
        alt: "BetterHR Case Study",
      },
    ],
  },
};

export default function Page() {
  return <BetterHRPage />;
}
