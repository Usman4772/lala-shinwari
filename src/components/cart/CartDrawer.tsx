"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { useCart } from "./CartProvider";
import { CheckoutForm } from "./CheckoutForm";
import { formatPKR } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, close, entries, total, setQty, remove, count } = useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mount + reset to the cart step whenever the drawer opens (derived during render)
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setMounted(true);
      setStep("cart");
    }
  }

  // Animate open/close
  useEffect(() => {
    if (!mounted || !panelRef.current || !backdropRef.current) return;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (isOpen) {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: "power3.out" });
    } else {
      gsap.to(backdrop, { opacity: 0, duration: 0.2 });
      gsap.to(panel, {
        xPercent: 100,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => setMounted(false),
      });
    }
  }, [isOpen, mounted]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your order">
      <div ref={backdropRef} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 bg-ink px-5 py-4 text-cream">
          <div className="flex items-center gap-3">
            {step === "checkout" ? (
              <button
                onClick={() => setStep("cart")}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                aria-label="Back to cart"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink">
                <ShoppingBag className="h-4 w-4" />
              </span>
            )}
            <div>
              <h2 className="font-heading text-lg font-semibold leading-none">
                {step === "cart" ? "Your Order" : "Checkout"}
              </h2>
              <p className="mt-1 text-xs text-cream/60">
                {count} item{count === 1 ? "" : "s"} · {formatPKR(total)}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "cart" ? (
            entries.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="mb-4 h-12 w-12 text-ink/20" />
                <p className="font-heading text-xl">Your order is empty</p>
                <p className="mt-2 text-sm text-ink/60">Browse the menu and tap “Add” on anything you like.</p>
                <Link
                  href="/menu"
                  onClick={close}
                  className="mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink"
                >
                  Browse menu
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {entries.map(({ item, qty }) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-3 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{item.name}</p>
                      <p className="mt-0.5 text-xs text-ink/65">
                        {formatPKR(item.price)}
                        {item.unit ? ` / ${item.unit}` : ""}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gold-deep">{formatPKR(item.price * qty)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          onClick={() => setQty(item.id, qty - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
                        <button
                          onClick={() => setQty(item.id, qty + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                          aria-label={`Increase ${item.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="flex items-center gap-1 text-xs text-ink/65 hover:text-accent"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <CheckoutForm />
          )}
        </div>

        {/* Footer */}
        {step === "cart" && entries.length > 0 && (
          <div className="border-t border-ink/10 bg-white px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-ink/60">Subtotal</span>
              <span className="font-heading text-xl font-semibold">{formatPKR(total)}</span>
            </div>
            <p className="mb-3 text-xs text-ink/65">
              Delivery charges (if any) and taxes will be confirmed on WhatsApp.
            </p>
            <button
              onClick={() => setStep("checkout")}
              className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light font-semibold text-ink shadow-gold transition hover:brightness-110"
            >
              Continue to checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
