import Link from "next/link";
import { Phone, CalendarDays } from "lucide-react";
import { site } from "@/data/site";
import { quickOrderLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./FloatingWhatsApp";

/** Sticky bottom bar on mobile: Call · WhatsApp · Book */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-ink/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={`tel:${site.phones[0].tel}`}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-cream/90 active:bg-white/5"
        >
          <Phone className="h-5 w-5 text-gold-light" />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <a
          href={quickOrderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-cream/90 active:bg-white/5"
        >
          <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
        <Link
          href="/book"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-cream/90 active:bg-white/5"
        >
          <CalendarDays className="h-5 w-5 text-gold-light" />
          <span className="text-[11px] font-medium">Book</span>
        </Link>
      </div>
    </div>
  );
}
