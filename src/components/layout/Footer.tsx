import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { FacebookIcon as Facebook, InstagramIcon as Instagram } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Section";

const quickLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Deals", href: "/#deals" },
  { label: "Book a Table", href: "/book" },
  { label: "Events & Catering", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={site.logo}
                alt={site.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full ring-2 ring-gold/60"
              />
              <span>
                <span className="block font-heading text-xl font-semibold">Golden Fork</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-light">by Lala Shinwari</span>
              </span>
            </Link>
            <p className="mt-5 font-heading text-lg italic text-gold-light">“{site.slogan}”</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">{site.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition hover:border-gold hover:text-gold-light"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition hover:border-gold hover:text-gold-light"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Quick links</p>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/70 transition hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Visit us</p>
            <p className="flex gap-3 text-sm leading-relaxed text-cream/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city} {site.address.postalCode}, {site.address.country}
              </span>
            </p>
            <p className="mt-4 flex gap-3 text-sm text-cream/70">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{site.hours.summary}</span>
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Call or WhatsApp</p>
            <ul className="space-y-3 text-sm">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="flex items-center gap-3 text-cream/80 transition hover:text-gold-light">
                    <Phone className="h-4 w-4 text-gold" />
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-cream/65">{p.label}</span>
                      <span className="text-base font-semibold">{p.display}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center rounded-full bg-whatsapp px-5 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/65 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Prices in PKR, subject to change. Menu prices exclude tax unless stated.</p>
        </div>
      </Container>
    </footer>
  );
}
