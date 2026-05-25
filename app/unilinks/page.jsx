import { UniLinksPage } from "@/views/UniLinksPage";

export const metadata = {
  title: "UniLinks Case Study — Charm Aung",
  description:
    "UniLinks All-in-One Study Abroad Platform — a product design case study by Charm Aung.",
  openGraph: {
    title: "UniLinks Case Study — Charm Aung",
    description:
      "UniLinks All-in-One Study Abroad Platform — a product design case study by Charm Aung.",
    url: "/unilinks",
    images: [
      {
        url: "/unilinks/thumbnail.png",
        width: 1488,
        height: 1050,
        alt: "UniLinks Case Study",
      },
    ],
  },
};

export default function Page() {
  return <UniLinksPage />;
}
