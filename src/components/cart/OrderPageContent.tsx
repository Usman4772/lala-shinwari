"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { CheckoutForm } from "./CheckoutForm";
import { formatPKR } from "@/lib/utils";

export function OrderPageContent() {
  const { entries, total, setQty, remove } = useCart();

  if (entries.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-ink/10 bg-white p-10 text-center shadow-card">
        <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-ink/20" />
        <h2 className="font-heading text-2xl font-semibold">Your order is empty</h2>
        <p className="mt-2 text-ink/60">Browse the menu and tap “Add” on anything you like.</p>
        <Link href="/menu" className="mt-6 inline-flex h-11 items-center rounded-full bg-gold px-6 font-semibold text-ink">
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-card md:p-6">
        <h2 className="mb-4 font-heading text-xl font-semibold">Items</h2>
        <ul className="divide-y divide-ink/10">
          {entries.map(({ item, qty }) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-ink/65">{formatPKR(item.price)}{item.unit ? ` / ${item.unit}` : ""}</p>
              </div>
              <div className="flex items-center rounded-full border border-ink/15">
                <button onClick={() => setQty(item.id, qty - 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Decrease">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-semibold tabular-nums">{qty}</span>
                <button onClick={() => setQty(item.id, qty + 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Increase">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="w-24 text-right font-semibold tabular-nums text-gold-deep">{formatPKR(item.price * qty)}</p>
              <button onClick={() => remove(item.id)} className="text-ink/65 hover:text-accent" aria-label={`Remove ${item.name}`}>
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="text-ink/60">Total</span>
          <span className="font-heading text-2xl font-semibold">{formatPKR(total)}</span>
        </div>
        <Link href="/menu" className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">
          + Add more items
        </Link>
      </div>
      <div>
        <CheckoutForm />
      </div>
    </div>
  );
}
