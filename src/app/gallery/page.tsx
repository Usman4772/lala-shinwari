import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Section";
import { gallery } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of Golden Fork by Lala Shinwari — Shinwari karahi, BBQ platters, our dining hall, weddings and celebrations in Lahore.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Moments & <span className="text-gold-gradient italic">Flavours</span>
          </>
        }
        text="Real photos from our kitchen, hall and celebrations. Tap any photo to view it full-size."
        image="/images/ig_11_DcGXIHqI3df.jpg"
      />
      <Container className="py-12 md:py-16">
        <GalleryGrid images={gallery} />
      </Container>
    </>
  );
}
