"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, CalendarDays, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
import { site } from "@/data/site";
import { quickOrderLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/FloatingWhatsApp";

/**
 * Splits a phrase into masked words so each slides up from behind its own clip.
 * The entrance is a pure CSS animation (see `.hero-word` in globals.css) so the headline paints
 * without waiting for JS — it is the LCP element on phones. `startAt` offsets the stagger (seconds).
 */
function Words({ text, className, startAt = 0 }: { text: string; className?: string; startAt?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.22em] -mb-[0.22em] pt-[0.1em] -mt-[0.1em]">
          <span
            className={`hero-word inline-block ${className ?? ""}`}
            style={{ animationDelay: `${startAt + i * 0.07}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </>
  );
}

/** Inline delay helper for the CSS entrance animations. */
const at = (s: number) => ({ animationDelay: `${s}s` });

const stats = [
  { label: "Cuisines", value: 6, suffix: "+" },
  { label: "Lunch deal", value: 20, suffix: "% off" },
  { label: "Events", value: null, text: "Hall" },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // The entrance itself is CSS-driven (no JS on the critical path). GSAP only adds the count-up,
      // and only if we hydrated before the stats strip becomes visible (~0.9s), so numbers never jump.
      if (performance.now() < 800) {
        gsap.utils.toArray<HTMLElement>(".hero-count").forEach((el) => {
          const target = Number(el.dataset.count ?? 0);
          const obj = { v: 0 };
          el.textContent = "0";
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            delay: Math.max(0, 0.9 - performance.now() / 1000),
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });
      }

      // Slow parallax + gentle zoom on scroll
      gsap.to(".hero-img", {
        yPercent: 14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -10,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Art-directed background: portrait crop for phones, wide crop for laptops & up.
  // The hero sits under dark gradients, so a lower encode quality is invisible but cuts ~40% of the bytes (LCP).
  const common = { alt: "", fill: true, sizes: "100vw", quality: 60, priority: true } as const;
  const { props: desktop } = getImageProps({ ...common, src: site.heroImage });
  const { props: mobile } = getImageProps({ ...common, src: site.heroImageMobile });

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-cream">
      {/* React hoists these into <head>; media queries make sure only the crop in use is preloaded (LCP). */}
      <link rel="preload" as="image" media="(max-width: 767px)" imageSrcSet={mobile.srcSet} imageSizes="100vw" fetchPriority="high" />
      <link rel="preload" as="image" media="(min-width: 768px)" imageSrcSet={desktop.srcSet} imageSizes="100vw" fetchPriority="high" />
      <div className="hero-zoom absolute inset-0 -z-10 overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
          {/* Plain <img> inside <picture> for art direction; srcSets come from next/image's getImageProps */}
          <img
            {...mobile}
            alt=""
            className="hero-img object-cover object-[50%_45%] will-change-transform md:object-[55%_50%] lg:object-[62%_50%]"
          />
        </picture>
        {/* Vignettes: keep the dish crisp, darken only where text sits */}
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-ink/90 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent lg:via-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent lg:via-ink/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="hero-content mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pb-32 lg:pt-36">
        <div className="max-w-2xl">
          <p style={at(0.1)} className="hero-in mb-2 font-heading text-[11px] uppercase tracking-[0.32em] text-gold sm:text-xs">
            Authentic Shinwari · Charcoal BBQ · Family Dining
          </p>
          <span
            style={at(0.2)}
            className="hero-rule mb-5 block h-px w-24 origin-left bg-gradient-to-r from-gold to-transparent"
            aria-hidden
          />

          <h1 className="font-heading text-[2.9rem] leading-[1.02] sm:text-[4.5rem] lg:text-[5.5rem]">
            <span className="block">
              <Words text="Every Bite," startAt={0.2} />
            </span>
            <span className="block">
              <Words text="A Royal Delight." className="text-gold-gradient italic" startAt={0.34} />
            </span>
          </h1>

          <p style={at(0.5)} className="hero-in mt-6 max-w-xl text-base font-light leading-relaxed text-cream/80 sm:text-lg">
            {site.tagline}
          </p>

          <div style={at(0.65)} className="hero-in mt-8 flex flex-wrap gap-3">
            <Button
              href={quickOrderLink}
              variant="whatsapp"
              size="lg"
              className="btn-shine"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Order on WhatsApp
            </Button>
            <Button
              href="/book"
              variant="gold"
              size="lg"
              className="btn-shine"
              icon={<CalendarDays className="h-5 w-5" />}
            >
              Book a Table
            </Button>
            <Button
              href={`tel:${site.phones[0].tel}`}
              variant="outline-light"
              size="lg"
              icon={<Phone className="h-5 w-5" />}
            >
              Call Now
            </Button>
          </div>

          <dl style={at(0.85)} className="hero-in mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-gold/20 pt-6 text-cream/80">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-cream/65">{s.label}</dt>
                <dd className="mt-1 font-heading text-2xl text-gold-light">
                  {s.value === null ? (
                    s.text
                  ) : (
                    <>
                      <span className="hero-count tabular-nums" data-count={s.value}>
                        {s.value}
                      </span>
                      {s.suffix}
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#highlights"
        style={at(1.3)}
        className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/65 transition hover:text-gold-light md:flex"
        aria-label="Scroll down"
      >
        Discover
        <span className="relative block h-8 w-px overflow-hidden bg-cream/15">
          <span className="scroll-hint absolute inset-x-0 top-0 h-3 bg-gold-light" />
        </span>
        <ChevronDown className="h-3.5 w-3.5" />
      </a>
    </section>
  );
}
