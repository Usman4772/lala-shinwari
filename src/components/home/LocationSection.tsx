import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { site } from "@/data/site";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MapEmbed, mapsDirectionsUrl } from "@/components/shared/MapEmbed";

export function LocationSection() {
  return (
    <Section tone="cream" id="location">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Find Us"
              title={
                <>
                  On Main <span className="text-gold-gradient italic">Ferozepur Road</span>
                </>
              }
              text="Easy to reach, with plenty of parking beside the Venus Housing Society main gate."
            />
            <ul data-reveal-group className="space-y-5">
              <li data-reveal className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-gold-light">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/65">Address</p>
                  <p className="mt-1 font-medium leading-relaxed">{site.address.full}</p>
                </div>
              </li>
              <li data-reveal className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-gold-light">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/65">Phone</p>
                  {site.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="mt-1 block font-medium hover:text-gold-deep">
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>
              <li data-reveal className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-gold-light">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/65">Hours</p>
                  <p className="mt-1 font-medium">{site.hours.summary}</p>
                </div>
              </li>
            </ul>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <Button href={mapsDirectionsUrl()} variant="dark" icon={<Navigation className="h-4 w-4" />}>
                Get directions
              </Button>
              <Button href="/contact" variant="outline">
                Contact page
              </Button>
            </div>
          </div>
          <div data-reveal>
            <MapEmbed className="aspect-[4/3] w-full shadow-card lg:aspect-[5/4]" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
