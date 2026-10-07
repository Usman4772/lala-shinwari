"use client";

import { Plus, Minus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export function AddButton({
  id,
  className,
  size = "md",
  label = "Add",
}: {
  id: string;
  className?: string;
  size?: "sm" | "md";
  label?: string;
}) {
  const { add, setQty, qtyOf } = useCart();
  const qty = qtyOf(id);
  const h = size === "sm" ? "h-9" : "h-10";

  if (qty > 0) {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-full bg-ink text-cream shadow-sm",
          h,
          className,
        )}
      >
        <button
          onClick={() => setQty(id, qty - 1)}
          className="grid h-full w-9 place-items-center rounded-full hover:bg-white/10"
          aria-label="Decrease quantity"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
        <button
          onClick={() => add(id)}
          className="grid h-full w-9 place-items-center rounded-full hover:bg-white/10"
          aria-label="Increase quantity"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => add(id)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-gold px-4 text-sm font-semibold text-ink shadow-sm transition hover:bg-gold-light active:scale-95",
        h,
        className,
      )}
    >
      <Plus className="h-4 w-4" strokeWidth={2.5} /> {label}
    </button>
  );
}
