import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;
}

export function MapEmbed({ className }: { className?: string }) {
  const { lat, lng } = site.geo;
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-ink/5 ring-1 ring-ink/10", className)}>
      <iframe
        title={`${site.name} on Google Maps`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
