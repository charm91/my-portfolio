import { KBZBankPage } from "@/views/KBZBankPage";

const title = "KBZ Bank Case Study — Charm Aung";
const description =
  "Building a Secure Authentication System for KBZ Bank's Self-Service Portal — a product design case study by Charm Aung.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/kbz-bank",
    images: [
      {
        url: "/kbz/thumbnail.png",
        width: 1492,
        height: 1028,
        alt: "KBZ Bank Case Study",
      },
    ],
  },
};

export default function Page() {
  return <KBZBankPage />;
}
