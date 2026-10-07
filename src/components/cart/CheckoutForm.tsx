"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { useCart } from "./CartProvider";
import { buildOrderMessage, waLink } from "@/lib/whatsapp";
import { formatPKR, cn } from "@/lib/utils";

export function CheckoutForm() {
  const { entries, total, clear, close } = useCart();
  const [mode, setMode] = useState<"delivery" | "takeaway">("delivery");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const msg = buildOrderMessage(
      entries.map((en) => ({ name: en.item.name, qty: en.qty, price: en.item.price })),
      {
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        mode,
        address: String(fd.get("address") ?? ""),
        notes: String(fd.get("notes") ?? ""),
      },
    );
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
          <MessageCircle className="h-7 w-7" />
        </span>
        <p className="font-heading text-xl">Order opened in WhatsApp</p>
        <p className="mt-2 text-sm text-ink/60">
          Tap <strong>Send</strong> in WhatsApp to place your order. We’ll confirm within minutes.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              clear();
              close();
            }}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream"
          >
            Done — clear cart
          </button>
          <button onClick={() => setSent(false)} className="rounded-full border border-ink/20 px-5 py-2.5 text-sm">
            Edit order
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Summary */}
      <div className="rounded-2xl border border-ink/10 bg-white p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/65">Order summary</p>
        <ul className="space-y-1 text-sm">
          {entries.map((en) => (
            <li key={en.id} className="flex justify-between gap-3">
              <span className="truncate">
                {en.item.name} <span className="text-ink/65">× {en.qty}</span>
              </span>
              <span className="shrink-0 tabular-nums">{formatPKR(en.item.price * en.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 font-semibold">
          <span>Total</span>
          <span className="text-gold-deep">{formatPKR(total)}</span>
        </div>
      </div>

      {/* Mode */}
      <div className="grid grid-cols-2 gap-2 rounded-full bg-ink/5 p-1">
        {(["delivery", "takeaway"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "h-10 rounded-full text-sm font-semibold capitalize transition",
              mode === m ? "bg-ink text-cream shadow" : "text-ink/60 hover:text-ink",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div>
        <label className="label" htmlFor="co-name">
          Your name
        </label>
        <input id="co-name" name="name" className="input" required placeholder="e.g. Ahmed Khan" autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="co-phone">
          Phone number
        </label>
        <input
          id="co-phone"
          name="phone"
          type="tel"
          className="input"
          required
          placeholder="03xx-xxxxxxx"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      {mode === "delivery" && (
        <div>
          <label className="label" htmlFor="co-address">
            Delivery address
          </label>
          <textarea
            id="co-address"
            name="address"
            className="input min-h-20"
            required
            placeholder="House, street, block, society…"
            autoComplete="street-address"
          />
        </div>
      )}
      <div>
        <label className="label" htmlFor="co-notes">
          Notes (optional)
        </label>
        <textarea id="co-notes" name="notes" className="input min-h-16" placeholder="Less spicy, extra raita, etc." />
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-ink transition hover:brightness-110"
      >
        <MessageCircle className="h-5 w-5" /> Send Order on WhatsApp
      </button>
      <p className="text-center text-xs text-ink/65">
        Opens WhatsApp with your order pre-filled. No payment is taken online.
      </p>
    </form>
  );
}
