/**
 * Global site content — edit everything about the restaurant here.
 * Nothing in this file is technical; change text, numbers and links freely.
 */

export const site = {
  name: "Golden Fork by Lala Shinwari",
  shortName: "Golden Fork",
  slogan: "Every Bite, A Royal Delight.",
  tagline:
    "Traditional, Italian & Cheesy Chinese, Fast Food — All Cuisines Under One Roof.",
  description:
    "Golden Fork by Lala Shinwari is a family restaurant on Main Ferozepur Road, Lahore, serving authentic Shinwari karahi, charcoal BBQ, Chinese, pizza, fast food, high tea and dinner buffet. Order on WhatsApp, book a table or host your event with us.",

  // Set this to the production URL once deployed (used for Open Graph & JSON-LD).
  url: "https://goldenfork.pk",

  logo: "/images/goldenfork_logo_facebook_1024.jpg",
  /** HD hero artwork (1920×1080) + a portrait crop used on phones. */
  heroImage: "/images/hero-karahi.jpg",
  heroImageMobile: "/images/hero-karahi-mobile.jpg",

  /** Printable menu — replace public/golden-fork-menu.pdf to update it. */
  menuPdf: "/golden-fork-menu.pdf",

  address: {
    line1: "Beside Main Gate, Venus Housing Society",
    line2: "17 km Main Ferozepur Road",
    city: "Lahore",
    postalCode: "54900",
    country: "Pakistan",
    full: "Beside Main Gate, Venus Housing Society, 17 km Main Ferozepur Road, Lahore 54900, Pakistan",
  },

  geo: { lat: 31.43717, lng: 74.3555 },

  phones: [
    { label: "Phone / WhatsApp", display: "+92 326 5111055", tel: "+923265111055" },
    { label: "Second line", display: "0326-5111056", tel: "+923265111056" },
  ],

  /** International number without "+" — used for wa.me links. */
  whatsappNumber: "923265111055",

  hours: {
    summary: "Open daily — call to confirm timings", // TODO confirm hours
    lunchDeal: "Weekdays 12:00 PM – 4:00 PM",
  },

  social: {
    facebook: "https://www.facebook.com/goldenforkbylalashinwari/",
    instagram: "https://www.instagram.com/goldenfork.pk/",
  },

  highlights: [
    {
      title: "Authentic Shinwari Karahi",
      text: "Slow-cooked in pure ghee with tomatoes, green chillies and Lala's secret spice mix.",
      icon: "flame",
    },
    {
      title: "Charcoal BBQ",
      text: "Tikka, seekh kebab and green boti grilled fresh over real charcoal.",
      icon: "beef",
    },
    {
      title: "Family Dining",
      text: "Spacious, air-conditioned family hall with a warm, royal ambience.",
      icon: "users",
    },
    {
      title: "Events & Catering",
      text: "Weddings, birthdays, corporate dinners, high tea and buffet packages.",
      icon: "party",
    },
  ] as const,

  signatureDishes: [
    {
      name: "Mutton Shinwari Karahi",
      text: "The signature — tender mutton, tomatoes, black pepper and pure ghee.",
      image: "/images/hero-karahi.jpg",
      price: 2299,
      menuId: "mutton-shinwari-karahi",
    },
    {
      name: "Butter Chicken Karahi",
      text: "Creamy, buttery chicken karahi finished with ginger and fresh coriander.",
      image: "/images/ig_16_DDthVZQoI6V.jpg",
      price: 1899,
      menuId: "butter-chicken-karahi",
    },
    {
      name: "BBQ Platter",
      text: "Chicken tikka, seekh kebab and green boti on a bed of fragrant rice.",
      image: "/images/ig_07_Dc2RWIqCJih.jpg",
      price: 2200,
      menuId: "bbq-platter",
    },
    {
      name: "Grilled Fish & Rice",
      text: "Whole marinated fish, charcoal-grilled and served on flavoured rice.",
      image: "/images/ig_14_DDz4VHBopW0.jpg",
      price: 3000,
      menuId: "grilled-fish-rice",
    },
    {
      name: "Golden Fork Special Pizza",
      text: "Loaded with chicken, sweet corn and a generous blanket of cheese.",
      image: "/images/ig_15_DDxUqYHzSiV.jpg",
      price: 1499,
      menuId: "golden-fork-special-pizza",
    },
  ],

  /**
   * SAMPLE testimonials. Replace with real Google/Facebook reviews before launch.
   * The UI clearly labels these as samples.
   */
  reviews: [
    {
      name: "Ahmed R.",
      area: "Venus Housing Society",
      rating: 5,
      text: "Best Shinwari karahi on Ferozepur Road. The mutton was melt-in-the-mouth and the family hall is spotless.",
    },
    {
      name: "Sana K.",
      area: "DHA Phase 6",
      rating: 5,
      text: "Hosted my daughter's birthday here — decor, cake table, BBQ platters, everything handled. Highly recommended.",
    },
    {
      name: "Bilal M.",
      area: "Johar Town",
      rating: 4,
      text: "Great value lunch deal. 20% off on the full menu and the Chinese was surprisingly good too.",
    },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Deals", href: "/#deals" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof site;
