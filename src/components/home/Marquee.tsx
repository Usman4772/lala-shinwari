const items = [
  "Shinwari Karahi",
  "Charcoal BBQ",
  "Cheesy Chinese",
  "Wood-fired Pizza",
  "Fast Food",
  "High Tea",
  "Dinner Buffet",
  "Events & Catering",
];

/** Slow-scrolling gold ribbon listing the cuisines. Pure CSS animation; pauses on hover. */
export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden border-y border-gold/25 bg-ink py-4 text-cream" aria-hidden>
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track">
        {row.map((label, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-heading text-sm uppercase tracking-[0.3em] text-cream/80 sm:text-base">
            {label}
            <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
