import { Star, Quote } from "lucide-react";
import { site } from "@/data/site";
import { Container, Section, SectionHeading } from "@/components/ui/Section";

export function Reviews() {
  return (
    <Section tone="dark">
      <Container>
        <SectionHeading
          light
          eyebrow="Guest Love"
          title={
            <>
              What Families <span className="text-gold-gradient italic">Say</span>
            </>
          }
        />
        <div data-reveal-group className="grid gap-4 md:grid-cols-3">
          {site.reviews.map((r) => (
            <figure
              key={r.name}
              data-reveal
              className="relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="absolute -top-3 left-6 rounded-full border border-gold/40 bg-ink px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-light">
                Sample — replace with real reviews
              </span>
              <Quote className="mb-3 h-6 w-6 text-gold/50" />
              <div className="mb-3 flex gap-0.5" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-cream/20"}`}
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-cream/80">“{r.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-heading text-lg font-semibold text-ink">
                  {r.name[0]}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-cream">{r.name}</span>
                  <span className="block text-xs text-cream/65">{r.area}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
