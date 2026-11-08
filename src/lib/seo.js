import { SITE, SITE_URL, SOCIAL_LINKS } from "@/config/site";

export function getPageMetadata({ title, description, path = "/", image }) {
  const images = [image ?? {
    url: SITE.profileImage,
    width: 1152,
    height: 832,
    alt: `${SITE.name} (${SITE.displayName}), ${SITE.jobTitle}`,
  }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: `${SITE.name} (${SITE.displayName})`,
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
        name: `${SITE.name} (${SITE.displayName})`,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: SITE.name,
        alternateName: SITE.displayName,
        jobTitle: SITE.jobTitle,
        url,
        image: new URL(SITE.profileImage, SITE_URL).href,
        sameAs: Object.values(SOCIAL_LINKS),
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: `${SITE.name} (${SITE.displayName}) | ${SITE.jobTitle}`,
        isPartOf: { "@id": `${url}#website` },
        mainEntity: { "@id": `${url}#person` },
      },
    ],
  };
}
