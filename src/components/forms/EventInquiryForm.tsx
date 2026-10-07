"use client";

import { useState, type FormEvent } from "react";
import { PartyPopper } from "lucide-react";
import { buildEventMessage, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/layout/FloatingWhatsApp";

const eventTypes = ["Wedding / Valima", "Mehndi / Mayun", "Birthday", "Bridal shower", "Anniversary", "Corporate dinner", "High tea", "Buffet", "Other"];
const budgets = ["Under Rs 50,000", "Rs 50,000 – 100,000", "Rs 100,000 – 250,000", "Rs 250,000 – 500,000", "Rs 500,000+", "Not sure yet"];

export function EventInquiryForm({ defaultType }: { defaultType?: string }) {
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const msg = buildEventMessage({
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      eventType: String(fd.get("eventType") ?? ""),
      date: String(fd.get("date") ?? ""),
      guests: String(fd.get("guests") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-gold/30 bg-white p-8 text-center shadow-card">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold-deep">
          <PartyPopper className="h-7 w-7" />
        </span>
        <h3 className="font-heading text-2xl font-semibold">Inquiry ready to send</h3>
        <p className="mt-2 text-ink/65">
          Tap <strong>Send</strong> in WhatsApp and our events team will share packages and availability.
        </p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold underline underline-offset-4">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="ev-name">Full name</label>
          <input id="ev-name" name="name" className="input" required placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="ev-phone">Phone</label>
          <input id="ev-phone" name="phone" type="tel" className="input" required placeholder="03xx-xxxxxxx" autoComplete="tel" inputMode="tel" />
        </div>
        <div>
          <label className="label" htmlFor="ev-type">Event type</label>
          <select id="ev-type" name="eventType" className="input" required defaultValue={defaultType ?? eventTypes[0]}>
            {eventTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="ev-date">Preferred date</label>
          <input id="ev-date" name="date" type="date" className="input" required min={today} />
        </div>
        <div>
          <label className="label" htmlFor="ev-guests">Number of guests</label>
          <input id="ev-guests" name="guests" type="number" className="input" required min={10} placeholder="e.g. 150" inputMode="numeric" />
        </div>
        <div>
          <label className="label" htmlFor="ev-budget">Budget (approx.)</label>
          <select id="ev-budget" name="budget" className="input" defaultValue="Not sure yet">
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="ev-message">Tell us about your event</label>
          <textarea id="ev-message" name="message" className="input min-h-28" placeholder="Menu preferences, décor theme, timing, stage/backdrop, sound…" />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-ink transition hover:brightness-110"
      >
        <WhatsAppIcon className="h-5 w-5" /> Send Inquiry on WhatsApp
      </button>
    </form>
  );
}
