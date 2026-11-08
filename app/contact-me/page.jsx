import ContactPageClient from "./ContactPageClient";
import { SITE } from "@/config/site";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata({
  title: `Contact ${SITE.name} (${SITE.displayName}) | Product Design`,
  description: `Contact ${SITE.name} (${SITE.displayName}) about senior product design roles, collaboration, and opportunities across Southeast Asia and remote teams.`,
  path: "/contact-me",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
