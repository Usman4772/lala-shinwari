import { quickOrderLink } from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-1.9c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.9S23.2 3 16 3zm0 23.5c-2.1 0-4.1-.6-5.9-1.6l-.4-.3-3.8 1.1 1.1-3.6-.3-.4a10.4 10.4 0 0 1-1.7-5.8C5 9.9 9.9 5.2 16 5.2s11 4.7 11 10.6-4.9 10.7-11 10.7zm6-7.9c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2s-.8 1.1-1 1.3c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  );
}

export { WhatsAppIcon };

export function FloatingWhatsApp() {
  return (
    <a
      href={quickOrderLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-ink shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105 md:bottom-6 md:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.5s]" />
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
