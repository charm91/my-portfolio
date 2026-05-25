import ContactPageClient from "./ContactPageClient";
import { SITE } from "@/config/site";

const title = "Contact — Charm Aung";
const description =
  "Get in touch with Charm Aung for product roles, collaboration, and opportunities.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/contact-me",
    images: [
      {
        url: SITE.profileImage,
        width: 1152,
        height: 832,
        alt: "Contact Charm Aung",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
