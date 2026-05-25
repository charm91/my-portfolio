import { WctPage } from "@/views/WctPage";

export const metadata = {
  title: "WCT Pay Case Study — Charm Aung",
  description:
    "WCT Pay Crypto–Fiat Payment Dashboard — a product design case study by Charm Aung.",
  openGraph: {
    title: "WCT Pay Case Study — Charm Aung",
    description:
      "WCT Pay Crypto–Fiat Payment Dashboard — a product design case study by Charm Aung.",
    url: "/wct",
    images: [
      {
        url: "/wct/thumbnail.png",
        width: 1488,
        height: 1050,
        alt: "WCT Pay Case Study",
      },
    ],
  },
};

export default function Page() {
  return <WctPage />;
}
