import { SITE, SITE_URL, SOCIAL_LINKS } from "@/config/site";
import { PROFILE_IMAGE } from "@/config/assets";

export function getPageMetadata({ title, description, path = "/", image }) {
  const images = [image ?? {
    url: PROFILE_IMAGE,
    width: 1152,
    height: 832,
    alt: `${SITE.seoName}, ${SITE.jobTitle}`,
  }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: SITE.seoName,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map(({ url, alt }) => ({ url, alt })),
    },
  };
}

export function getProfileStructuredData() {
  const url = new URL("/", SITE_URL).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: SITE.seoName,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: SITE.name,
        alternateName: SITE.nickname,
        jobTitle: SITE.jobTitle,
        url,
        image: new URL(PROFILE_IMAGE, SITE_URL).href,
        sameAs: Object.values(SOCIAL_LINKS),
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: `${SITE.seoName} | ${SITE.jobTitle}`,
        isPartOf: { "@id": `${url}#website` },
        mainEntity: { "@id": `${url}#person` },
      },
    ],
  };
}
