import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/ui/SocialIcons";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { Container, Section, SectionHeading } from "@/components/ui/Section";

export function GalleryPreview() {
  const shots = gallery.filter((g) => g.category === "food" || g.category === "ambience").slice(0, 6);

  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title={
            <>
              Where Delicious <span className="text-gold-gradient italic">Moments</span> Are Made
            </>
          }
          text="Real photos from our kitchen, hall and celebrations."
        />
        <div data-reveal-group className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {shots.map((g) => (
            <Link
              key={g.src}
              href="/gallery"
              data-reveal="clip"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
            </Link>
          ))}
        </div>
        <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/gallery" className="inline-flex items-center gap-2 font-semibold hover:text-gold-deep">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="hidden text-ink/20 sm:inline">|</span>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-gold-deep"
          >
            <Instagram className="h-4 w-4" /> @goldenfork.pk
          </a>
        </div>
      </Container>
    </Section>
  );
}
