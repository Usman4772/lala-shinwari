import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Cake, Gem, Briefcase, Coffee, UtensilsCrossed, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EventInquiryForm } from "@/components/forms/EventInquiryForm";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { eventGallery } from "@/data/gallery";
import { site } from "@/data/site";
import { formatPKR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events & Catering — Weddings, Birthdays, Corporate, High Tea",
  description:
    "Host weddings, valimas, birthdays, anniversaries and corporate dinners at Golden Fork's event space on Ferozepur Road, Lahore. High tea and buffet packages. Inquire on WhatsApp.",
};

const eventTypes = [
  { Icon: Heart, title: "Weddings & Valima", text: "Elegant hall, stage & backdrop, live BBQ and karahi stations for 100–400 guests." },
  { Icon: Cake, title: "Birthdays", text: "Themed décor, cake table, balloon arches and kid-friendly menus." },
  { Icon: Gem, title: "Anniversaries", text: "Intimate candle-lit setups with a personalised menu." },
  { Icon: Briefcase, title: "Corporate", text: "Team dinners, launches and meetings with projector and sound." },
  { Icon: Coffee, title: "High Tea", text: "Unlimited high tea spreads for ladies' meetups and family gatherings." },
  { Icon: UtensilsCrossed, title: "Buffet Packages", text: "Premium dinner buffets with live stations and dessert bar." },
];

// Per-person package guides (editable). Marked TODO for confirmation with the restaurant.
const packages = [
  {
    name: "High Tea",
    price: 1999, // confirmed
    suffix: "per person",
    tag: "Most popular",
    items: ["Shinwari specialities", "Alfredo pasta & pizza slices", "Nihari & yakhni pulao", "Chicken chowmein", "Snacks & starters", "Desserts, tea & coffee"],
  },
  {
    name: "Premium Dinner Buffet",
    price: 2499, // confirmed
    suffix: "per person",
    tag: "Best value",
    items: ["Live charcoal BBQ", "Karahi station", "Chinese & Italian corner", "Biryani & pulao", "Fresh naan & salads", "Full dessert bar"],
  },
  {
    name: "Wedding & Corporate",
    price: 2999, // TODO confirm price
    suffix: "per person · from",
    tag: "Custom menu",
    items: ["Custom 3-course or buffet menu", "Stage, backdrop & décor", "Dedicated event manager", "Sound system & lighting", "Welcome drinks", "Minimum 100 guests"],
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events & Catering"
        title={
          <>
            Where Events Meet <span className="text-gold-gradient italic">Elegance</span>
          </>
        }
        text="Host your dream wedding, birthday or corporate event at The Golden Fork Event Space — with the food Lahore loves."
        image="/images/ig_04_DdEB7aGCOPq.jpg"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#inquiry" variant="gold" size="lg">
            Request a quote
          </Button>
          <Button href={`tel:${site.phones[0].tel}`} variant="outline-light" size="lg">
            Call {site.phones[0].display}
          </Button>
        </div>
      </PageHero>

      {/* Event types */}
      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="What we host"
            title={
              <>
                Every Occasion, <span className="text-gold-gradient italic">Perfectly Served</span>
              </>
            }
          />
          <ul data-reveal-group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map((e) => (
              <li
                key={e.title}
                data-reveal
                className="group rounded-3xl border border-ink/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-ink text-gold-light transition group-hover:bg-gold group-hover:text-ink">
                  <e.Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{e.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Packages */}
      <Section tone="dark">
        <Container>
          <SectionHeading
            light
            eyebrow="Packages"
            title={
              <>
                Simple, <span className="text-gold-gradient italic">Transparent</span> Pricing
              </>
            }
            text="Per-person guides to help you plan. Final quotes depend on menu, guest count and décor."
          />
          <div data-reveal-group className="grid gap-4 lg:grid-cols-3">
            {packages.map((p, i) => (
              <article
                key={p.name}
                data-reveal
                className={`relative flex flex-col rounded-3xl border p-7 ${
                  i === 1 ? "border-gold/60 bg-gradient-to-b from-ink-muted to-ink-soft shadow-gold" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-cream">{p.name}</h3>
                <p className="mt-3 flex items-end gap-2">
                  <span className="font-heading text-4xl font-semibold text-gold-light">{formatPKR(p.price)}</span>
                  <span className="mb-1.5 text-xs text-cream/65">{p.suffix}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-cream/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={3} /> {it}
                    </li>
                  ))}
                </ul>
                <Button href="#inquiry" variant={i === 1 ? "gold" : "outline-light"} className="mt-8 w-full">
                  Get a quote
                </Button>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-cream/65">Prices in PKR, excl. tax. Minimum guest counts apply.</p>
        </Container>
      </Section>

      {/* Gallery */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Event gallery"
            title={
              <>
                Celebrations <span className="text-gold-gradient italic">We&apos;ve Hosted</span>
              </>
            }
          />
          <GalleryGrid images={eventGallery} showFilters={false} />
        </Container>
      </Section>

      {/* Inquiry */}
      <Section tone="cream" id="inquiry">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div data-reveal>
              <SectionHeading
                align="left"
                eyebrow="Plan your event"
                title={
                  <>
                    Tell Us About <span className="text-gold-gradient italic">Your Day</span>
                  </>
                }
                text="Share a few details and our events team will reply on WhatsApp with packages, menus and availability."
              />
              <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-3xl shadow-card">
                <Image
                  src="/images/ig_20_DB9JHSIIKp0.jpg"
                  alt="Bridal shower décor at Golden Fork"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div data-reveal>
              <EventInquiryForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
