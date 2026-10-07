import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { Marquee } from "@/components/home/Marquee";
import { SignatureDishes } from "@/components/home/SignatureDishes";
import { DealsSection } from "@/components/home/DealsSection";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Reviews } from "@/components/home/Reviews";
import { LocationSection } from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <SignatureDishes />
      <Marquee />
      <DealsSection />
      <EventsTeaser />
      <GalleryPreview />
      <Reviews />
      <LocationSection />
    </>
  );
}
