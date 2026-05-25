import { UniLinksPage } from "@/views/UniLinksPage";
import { SITE } from "@/config/site";

const title = `UniLinks Case Study — ${SITE.displayName}`;
const description = `UniLinks All-in-One Study Abroad Platform — a product design case study by ${SITE.displayName}.`;

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
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
