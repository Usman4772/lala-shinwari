"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

const filters: { id: GalleryImage["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "events", label: "Events" },
  { id: "ambience", label: "Ambience" },
  { id: "deals", label: "Deals" },
];

export function GalleryGrid({ images, showFilters = true }: { images: GalleryImage[]; showFilters?: boolean }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [index, setIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = filter === "all" ? images : images.filter((g) => g.category === filter);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, prev, next]);

  // Animate tiles in whenever the visible set changes
  useEffect(() => {
    if (!gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = gridRef.current.querySelectorAll("[data-shot]");
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04, overwrite: true },
    );
  }, [filter]);

  const current = index !== null ? visible[index] : null;

  return (
    <div>
      {showFilters && (
        <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                setIndex(null);
              }}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                filter === f.id ? "bg-ink text-gold-light shadow" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="masonry" ref={gridRef}>
        {visible.map((g, i) => (
          <button
            key={g.src}
            data-shot
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl bg-ink/5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Open ${g.alt}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={g.width}
              height={g.height}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <span className="flex items-center gap-1.5 text-xs font-medium text-cream">
                <ZoomIn className="h-3.5 w-3.5" /> {g.alt}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20 md:left-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20 md:right-6"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
              priority
            />
            <figcaption className="mt-3 text-center text-sm text-cream/70">
              {current.alt} · {index! + 1} / {visible.length}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
