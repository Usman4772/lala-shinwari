"use client";

import { useState, type FormEvent } from "react";
import { CalendarCheck } from "lucide-react";
import { buildBookingMessage, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/layout/FloatingWhatsApp";

const occasions = ["Family dinner", "Birthday", "Anniversary", "Business meal", "Friends get-together", "Other"];

export function BookingForm() {
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const msg = buildBookingMessage({
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      date: String(fd.get("date") ?? ""),
      time: String(fd.get("time") ?? ""),
      guests: String(fd.get("guests") ?? ""),
      occasion: String(fd.get("occasion") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    });
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-gold/30 bg-white p-8 text-center shadow-card">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold-deep">
          <CalendarCheck className="h-7 w-7" />
        </span>
        <h3 className="font-heading text-2xl font-semibold">Almost there!</h3>
        <p className="mt-2 text-ink/65">
          Your booking request has opened in WhatsApp. Tap <strong>Send</strong> and we’ll confirm your table shortly.
        </p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold underline underline-offset-4">
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="bk-name">Full name</label>
          <input id="bk-name" name="name" className="input" required placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="bk-phone">Phone</label>
          <input id="bk-phone" name="phone" type="tel" className="input" required placeholder="03xx-xxxxxxx" autoComplete="tel" inputMode="tel" />
        </div>
        <div>
          <label className="label" htmlFor="bk-date">Date</label>
          <input id="bk-date" name="date" type="date" className="input" required min={today} />
        </div>
        <div>
          <label className="label" htmlFor="bk-time">Time</label>
          <input id="bk-time" name="time" type="time" className="input" required defaultValue="20:00" />
        </div>
        <div>
          <label className="label" htmlFor="bk-guests">Guests</label>
          <select id="bk-guests" name="guests" className="input" required defaultValue="4">
            {Array.from({ length: 19 }, (_, i) => i + 2).map((n) => (
              <option key={n} value={n}>
                {n} guests
              </option>
            ))}
            <option value="20+">20+ guests (event)</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="bk-occasion">Occasion</label>
          <select id="bk-occasion" name="occasion" className="input" defaultValue="Family dinner">
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="bk-notes">Special requests (optional)</label>
          <textarea id="bk-notes" name="notes" className="input min-h-24" placeholder="High chair, cake, window seat, allergies…" />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-ink transition hover:brightness-110"
      >
        <WhatsAppIcon className="h-5 w-5" /> Confirm on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-ink/65">
        We’ll reply on WhatsApp to confirm availability. For groups of 20+, see Events & Catering.
      </p>
    </form>
  );
}
