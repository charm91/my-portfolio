import ContactPageClient from "./ContactPageClient";

export const metadata = {
  title: "Contact — Charm Aung",
  description:
    "Get in touch with Charm Aung for product roles, collaboration, and opportunities.",
  openGraph: {
    title: "Contact — Charm Aung",
    description:
      "Get in touch with Charm Aung for product roles, collaboration, and opportunities.",
    url: "/contact-me",
    images: [
      {
        url: "/profile-photo.png",
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
