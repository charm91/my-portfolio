import { WctPage } from "@/views/WctPage";

const title = "WCT Pay Case Study — Charm Aung";
const description =
  "WCT Pay Crypto–Fiat Payment Dashboard — a product design case study by Charm Aung.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
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
