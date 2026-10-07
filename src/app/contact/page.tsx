import type { Metadata } from "next";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { FacebookIcon as Facebook, InstagramIcon as Instagram } from "@/components/ui/SocialIcons";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MapEmbed, mapsDirectionsUrl } from "@/components/shared/MapEmbed";
import { WhatsAppIcon } from "@/components/layout/FloatingWhatsApp";
import { site } from "@/data/site";
import { quickOrderLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Contact Golden Fork by Lala Shinwari — ${site.address.full}. Call ${site.phones[0].display} or WhatsApp us.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            We&apos;d Love to <span className="text-gold-gradient italic">Hear From You</span>
          </>
        }
        text="Call, WhatsApp or drop by — we’re right beside the Venus Housing Society main gate on Ferozepur Road."
        image="/images/ig_08_DcSVYoNs7MQ.jpg"
      />

      <Container className="-mt-6 pb-20 md:-mt-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div data-reveal-group className="space-y-4">
            {/* Phones */}
            <div data-reveal className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-light">
                  <Phone className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-xl font-semibold">Call us</h2>
              </div>
              <ul className="space-y-3">
                {site.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="group flex items-center justify-between rounded-2xl bg-cream px-4 py-3 transition hover:bg-ink hover:text-cream">
                      <span>
                        <span className="block text-[11px] uppercase tracking-wider text-ink/65 group-hover:text-cream/60">{p.label}</span>
                        <span className="text-lg font-semibold">{p.display}</span>
                      </span>
                      <Phone className="h-4 w-4 text-gold-deep group-hover:text-gold-light" />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={quickOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-ink transition hover:brightness-110"
              >
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>

            {/* Address */}
            <div data-reveal className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-light">
                  <MapPin className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-xl font-semibold">Address</h2>
              </div>
              <address className="not-italic leading-relaxed text-ink/80">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city} {site.address.postalCode}, {site.address.country}
              </address>
              <Button href={mapsDirectionsUrl()} variant="dark" className="mt-5" icon={<Navigation className="h-4 w-4" />}>
                Get directions
              </Button>
            </div>

            {/* Hours & social */}
            <div data-reveal className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-light">
                  <Clock className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-xl font-semibold">Hours</h2>
              </div>
              <p className="text-ink/80">{site.hours.summary}</p>
              <p className="mt-1 text-sm text-ink/65">Lunch deal: {site.hours.lunchDeal}</p>
              <div className="mt-5 flex gap-3">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-medium transition hover:border-gold hover:text-gold-deep"
                >
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-medium transition hover:border-gold hover:text-gold-deep"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </div>
            </div>
          </div>

          <div data-reveal>
            <MapEmbed className="h-[360px] w-full shadow-card lg:h-full lg:min-h-[640px]" />
          </div>
        </div>
      </Container>
    </>
  );
}
