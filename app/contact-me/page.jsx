import ContactPageClient from "./ContactPageClient";
import { SITE } from "@/config/site";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata({
  title: `Contact ${SITE.seoName} | Product Design`,
  description: `Contact ${SITE.seoName} about senior product design roles, collaboration, and opportunities across Southeast Asia and remote teams.`,
  path: "/contact-me",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
