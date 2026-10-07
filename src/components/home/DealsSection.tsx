import Image from "next/image";
import { Clock, Tag } from "lucide-react";
import { deals, combos } from "@/data/deals";
import { site } from "@/data/site";
import { formatPKR } from "@/lib/utils";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { AddButton } from "@/components/menu/AddButton";

export function DealsSection() {
  const lunch = deals.find((d) => d.id === "lunch-20")!;
  const others = deals.filter((d) => d.id !== "lunch-20");

  return (
    <Section id="deals" tone="dark">
      <Container>
        <SectionHeading
          light
          eyebrow="Live Deals"
          title={
            <>
              Royal Taste, <span className="text-gold-gradient italic">Friendly Prices</span>
            </>
          }
          text="Straight from our latest posts — these offers are on right now."
        />

        {/* Lunch banner */}
        <div
          data-reveal="zoom"
          className="relative mb-6 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-r from-ink-muted to-ink shadow-gold"
        >
          <div className="grid md:grid-cols-[1fr_320px]">
            <div className="p-7 md:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                <Tag className="h-3.5 w-3.5" /> {lunch.badge}
              </span>
              <h3 className="mt-4 font-heading text-3xl font-semibold text-cream md:text-5xl">
                Flat <span className="text-gold-gradient">20% OFF</span>
                <br />
                the entire menu
              </h3>
              <p className="mt-3 max-w-md text-cream/70">{lunch.description}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-gold-light">
                <Clock className="h-4 w-4" /> {site.hours.lunchDeal}
              </p>
              <p className="mt-3 text-xs text-cream/65">{lunch.note}</p>
            </div>
            <div className="relative hidden md:block">
              <Image
                src={lunch.image!}
                alt="20% off lunch deal"
                fill
                sizes="320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink to-transparent" />
            </div>
          </div>
        </div>

        {/* Deal cards */}
        <div data-reveal-group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((d) => (
            <article
              key={d.id}
              data-reveal
              className="card-lift group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-soft hover:border-gold/40"
            >
              {d.image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  {d.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      {d.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-xl font-semibold text-cream">{d.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-cream/60">{d.description}</p>
                {d.price && (
                  <div className="mt-4 flex items-end gap-2">
                    {d.pricePrefix && <span className="mb-1 text-xs text-cream/65">{d.pricePrefix}</span>}
                    <span className="font-heading text-2xl font-semibold text-gold-light">{formatPKR(d.price)}</span>
                    {d.oldPrice && <span className="mb-1 text-sm text-cream/60 line-through">{formatPKR(d.oldPrice)}</span>}
                    {d.priceSuffix && <span className="mb-1 text-xs text-cream/65">{d.priceSuffix}</span>}
                  </div>
                )}
                {d.note && <p className="mt-1 text-[11px] text-cream/65">{d.note}</p>}
                {d.menuId && (
                  <div className="mt-4">
                    <AddButton id={d.menuId} size="sm" label="Add to order" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Combo board */}
        <div data-reveal className="mt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Deal Board</p>
              <h3 className="mt-1 font-heading text-2xl font-semibold text-cream md:text-3xl">Combos from Rs 399</h3>
            </div>
            <p className="text-sm text-cream/65">Fast food, pizza & Chinese combos — great for groups.</p>
          </div>
          <ul data-reveal-group className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {combos.map((c) => (
              <li
                key={c.id}
                data-reveal
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-gold/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold font-heading text-lg font-bold text-ink">
                  {c.number}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-cream">{c.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-cream/65">{c.items.join(" · ")}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-heading text-xl font-semibold text-gold-light">{formatPKR(c.price)}</span>
                    <AddButton id={c.menuId} size="sm" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
