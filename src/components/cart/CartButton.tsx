"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { useCart } from "./CartProvider";
import { formatPKR } from "@/lib/utils";

/** Sticky cart pill — appears when the cart has items. */
export function CartButton() {
  const { count, total, open, lastAdded, isOpen } = useCart();
  const ref = useRef<HTMLButtonElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Bounce on add
  useEffect(() => {
    if (!lastAdded || !ref.current) return;
    gsap.fromTo(ref.current, { scale: 0.92 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    setToast("Added to order");
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [lastAdded]);

  if (count === 0 || isOpen) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 md:bottom-6 md:left-auto md:right-24 md:translate-x-0">
      {toast && (
        <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-medium text-gold-light shadow-lg">
          {toast}
        </div>
      )}
      <button
        ref={ref}
        onClick={open}
        aria-label={`Open cart, ${count} items`}
        className="flex items-center gap-3 rounded-full bg-ink py-2.5 pl-3 pr-5 text-cream shadow-gold ring-1 ring-gold/40 transition hover:ring-gold"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gold text-ink">
          <ShoppingBag className="h-4 w-4" strokeWidth={2.2} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
            {count}
          </span>
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[11px] uppercase tracking-wider text-cream/60">View order</span>
          <span className="block text-sm font-semibold">{formatPKR(total)}</span>
        </span>
      </button>
    </div>
  );
}
