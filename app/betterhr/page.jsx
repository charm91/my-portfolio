import { BetterHRPage } from "@/views/BetterHRPage";
import { SITE } from "@/config/site";

const title = `BetterHR Case Study — ${SITE.displayName}`;
const description = `BetterHR Cloud-based HR Management Platform — a product design case study by ${SITE.displayName}.`;

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
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
