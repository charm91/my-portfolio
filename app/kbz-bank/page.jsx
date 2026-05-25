import { KBZBankPage } from "@/views/KBZBankPage";
import { SITE } from "@/config/site";

const title = `KBZ Bank Case Study — ${SITE.displayName}`;
const description = `Building a Secure Authentication System for KBZ Bank's Self-Service Portal — a product design case study by ${SITE.displayName}.`;

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
