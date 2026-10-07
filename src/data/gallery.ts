/**
 * Real photos from the restaurant's Instagram/Facebook.
 * Files live in /public/images. Width/height are the real pixel sizes
 * (used to lay out the masonry grid without layout shift).
 */

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: "food" | "events" | "ambience" | "deals";
};

export const gallery: GalleryImage[] = [
  { src: "/images/ig_06_Dc5w35FnBlg.jpg", alt: "Mutton Shinwari karahi in a traditional pan", width: 615, height: 614, category: "food" },
  { src: "/images/ig_03_DdJsyRrjYo8.jpg", alt: "BBQ platter with tikka, kebab and salad", width: 553, height: 553, category: "food" },
  { src: "/images/ig_14_DDz4VHBopW0.jpg", alt: "Charcoal-grilled fish served on rice", width: 360, height: 640, category: "food" },
  { src: "/images/ig_16_DDthVZQoI6V.jpg", alt: "Butter chicken karahi", width: 640, height: 640, category: "food" },
  { src: "/images/ig_04_DdEB7aGCOPq.jpg", alt: "Golden Fork event space for weddings", width: 506, height: 505, category: "events" },
  { src: "/images/ig_15_DDxUqYHzSiV.jpg", alt: "Golden Fork special cheesy pizza", width: 640, height: 640, category: "food" },
  { src: "/images/ig_20_DB9JHSIIKp0.jpg", alt: "Birthday and bridal shower decor", width: 360, height: 640, category: "events" },
  { src: "/images/ig_07_Dc2RWIqCJih.jpg", alt: "BBQ platter served on rice", width: 615, height: 614, category: "food" },
  { src: "/images/ig_19_DCTkzV4IPSs.jpg", alt: "Warm, elegant dining room interior", width: 640, height: 640, category: "ambience" },
  { src: "/images/ig_02_DdL2yFcMp4f.jpg", alt: "Fine dining at Golden Fork Lahore", width: 361, height: 640, category: "ambience" },
  { src: "/images/ig_08_DcSVYoNs7MQ.jpg", alt: "Golden Fork storefront and neon sign", width: 361, height: 640, category: "ambience" },
  { src: "/images/ig_17_DDhYoqKITkO.jpg", alt: "Grand opening of new branch", width: 640, height: 640, category: "events" },
  { src: "/images/ig_05_Dc6jMSKoJq4.jpg", alt: "Unlimited high tea menu", width: 506, height: 505, category: "deals" },
  { src: "/images/ig_10_DcJ3G9jot36.jpg", alt: "Mutton Shinwari karahi special offer", width: 640, height: 640, category: "deals" },
  { src: "/images/ig_11_DcGXIHqI3df.jpg", alt: "Authentic flavours, royal experience", width: 640, height: 640, category: "food" },
  { src: "/images/ig_09_DcOhAsEosMk.jpg", alt: "Golden Fork special deals board", width: 640, height: 640, category: "deals" },
];

/** Images used for the Events & Catering page gallery. */
export const eventGallery = gallery.filter(
  (g) => g.category === "events" || g.category === "ambience",
);
