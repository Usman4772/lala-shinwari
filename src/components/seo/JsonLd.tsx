import { site } from "@/data/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    alternateName: site.shortName,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    image: `${site.url}${site.heroImage}`,
    logo: `${site.url}${site.logo}`,
    telephone: site.phones[0].tel,
    priceRange: "Rs",
    servesCuisine: ["Pakistani", "Shinwari", "BBQ", "Chinese", "Italian", "Fast Food"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.social.facebook, site.social.instagram],
    acceptsReservations: "True",
    hasMenu: `${site.url}/menu`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
