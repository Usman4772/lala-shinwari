import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Clock, Users, Sparkles } from "lucide-react";
import { BookingForm } from "@/components/forms/BookingForm";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Reserve a table at Golden Fork by Lala Shinwari on Ferozepur Road, Lahore. Family hall, birthdays, anniversaries — confirm instantly on WhatsApp.",
};

const perks = [
  { Icon: Users, title: "Family hall", text: "Spacious, air-conditioned seating for families and groups." },
  { Icon: Sparkles, title: "Celebrations", text: "Tell us the occasion — we’ll set the table and the mood." },
  { Icon: Clock, title: "Quick confirmation", text: "Reservations are confirmed on WhatsApp within minutes." },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title={
          <>
            Book a <span className="text-gold-gradient italic">Table</span>
          </>
        }
        text="Reserve your spot in seconds — we confirm on WhatsApp."
        image="/images/ig_19_DCTkzV4IPSs.jpg"
      />
      <Container className="-mt-6 pb-20 md:-mt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <aside data-reveal className="order-2 space-y-6 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/images/ig_02_DdL2yFcMp4f.jpg"
                alt="Dining at Golden Fork"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <ul className="space-y-4">
              {perks.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-gold-light">
                    <p.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-ink/60">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-ink/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/65">Prefer to call?</p>
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="mt-2 flex items-center gap-2 font-semibold hover:text-gold-deep">
                  <Phone className="h-4 w-4 text-gold-deep" /> {p.display}
                </a>
              ))}
              <p className="mt-3 text-xs text-ink/65">{site.hours.summary}</p>
            </div>
          </aside>
          <div data-reveal className="order-1 lg:order-2">
            <BookingForm />
          </div>
        </div>
      </Container>
    </>
  );
}
