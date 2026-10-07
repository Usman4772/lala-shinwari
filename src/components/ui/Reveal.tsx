"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Wraps the app's <main>. Any descendant with `data-reveal` fades & slides up
 * when it scrolls into view. Elements inside a `data-reveal-group` are staggered.
 * Re-runs on every route change.
 *
 * Tweens are fired from `onEnter` callbacks (not bound to the trigger) so a
 * ScrollTrigger refresh/resize never reverts already-revealed content.
 */
export function RevealScope({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const all = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      all.forEach((el) => (el.style.opacity = "1"));
      return;
    }

    /**
     * Variants via the attribute value: data-reveal="up" (default) | "left" | "right" | "zoom" | "clip".
     * "clip" wipes an image/card in from the bottom, the others slide + fade.
     */
    const variants: Record<string, [gsap.TweenVars, gsap.TweenVars]> = {
      up: [{ y: 32 }, { y: 0 }],
      left: [{ x: -40 }, { x: 0 }],
      right: [{ x: 40 }, { x: 0 }],
      zoom: [{ scale: 0.92 }, { scale: 1 }],
      clip: [{ clipPath: "inset(100% 0% 0% 0%)", y: 24 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0 }],
    };

    const reveal = (targets: HTMLElement[], stagger = 0) => {
      targets.forEach((el, i) => {
        const key = el.dataset.reveal && el.dataset.reveal in variants ? el.dataset.reveal : "up";
        const [fromVars, toVars] = variants[key];
        gsap.fromTo(
          el,
          { opacity: 0, ...fromVars },
          {
            opacity: 1,
            ...toVars,
            duration: key === "clip" ? 1.1 : 0.9,
            ease: key === "clip" ? "power4.inOut" : "power3.out",
            delay: i * stagger,
            overwrite: true,
            clearProps: "transform,clipPath",
          },
        );
      });
    };

    const ctx = gsap.context(() => {
      // Subtle scroll-linked parallax for images marked data-parallax (inside overflow-hidden wrappers)
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 10);
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Staggered groups
      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"));
        if (!items.length) return;
        ScrollTrigger.create({
          trigger: group,
          start: "top 88%",
          once: true,
          onEnter: () => reveal(items, 0.08),
        });
      });

      // Singles (not inside a group)
      all
        .filter((el) => !el.closest("[data-reveal-group]"))
        .forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => reveal([el]),
          });
        });
    }, root);

    // Recalculate after images/fonts settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div ref={ref} className="flex-1">
      {children}
    </div>
  );
}
