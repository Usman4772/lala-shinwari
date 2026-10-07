import { Flame, Beef, Users, PartyPopper } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Section";

const icons = { flame: Flame, beef: Beef, users: Users, party: PartyPopper } as const;

export function Highlights() {
  return (
    <section id="highlights" className="relative z-10 -mt-10 pb-4 md:-mt-16">
      <Container>
        <h2 className="sr-only">Why families choose Golden Fork</h2>
        <ul
          data-reveal-group
          className="grid grid-cols-2 gap-3 rounded-3xl border border-gold/20 bg-white p-3 shadow-card md:gap-4 md:p-4 lg:grid-cols-4"
        >
          {site.highlights.map((h) => {
            const Icon = icons[h.icon];
            return (
              <li
                key={h.title}
                data-reveal
                className="group rounded-2xl bg-cream p-4 transition-colors duration-300 hover:bg-ink hover:text-cream md:p-5"
              >
                <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-light transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-base font-semibold leading-snug md:text-lg">{h.title}</h3>
                <p className="mt-1.5 hidden text-xs leading-relaxed text-ink/60 group-hover:text-cream/70 sm:block">
                  {h.text}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
