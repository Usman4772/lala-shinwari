import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, GoldDivider } from "@/components/ui/Section";

const points = [
  "Weddings, mehndi & valima",
  "Birthdays & bridal showers",
  "Corporate dinners & meetings",
  "High tea & buffet packages",
];

export function EventsTeaser() {
  return (
    <Section tone="cream" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal-group className="relative">
            <div data-reveal="clip" className="relative aspect-square overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/images/ig_04_DdEB7aGCOPq.jpg"
                alt="Golden Fork event space for weddings"
                fill
                data-parallax="6"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="scale-[1.15] object-cover"
              />
            </div>
            <div
              data-reveal="zoom"
              className="absolute -bottom-6 -right-2 w-36 overflow-hidden rounded-2xl border-4 border-cream shadow-card sm:-right-6 sm:w-48"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/ig_20_DB9JHSIIKp0.jpg"
                  alt="Birthday celebration decor"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              data-reveal="left"
              className="absolute -left-2 top-6 rounded-2xl bg-ink px-4 py-3 text-cream shadow-card sm:-left-6"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-light">Where events</p>
              <p className="font-heading text-lg font-semibold">meet elegance</p>
            </div>
          </div>

          <div data-reveal="right" className="lg:pl-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Events & Catering</p>
            <h2 className="font-heading text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              Host Your Dream <span className="text-gold-gradient italic">Wedding & Event</span>
            </h2>
            <GoldDivider className="mx-0 my-5" />
            <p className="text-ink/70 md:text-lg">
              A private, elegantly decorated hall with live BBQ, karahi stations and full-service catering. From
              intimate birthdays to grand valimas — we take care of the food, décor and service.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-medium">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/20 text-gold-deep">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/events" variant="dark">
                View packages
              </Button>
              <Button href="/events#inquiry" variant="outline">
                Request a quote
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
