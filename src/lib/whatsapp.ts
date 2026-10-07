import { site } from "@/data/site";
import { formatPKR } from "@/lib/utils";

/** Build a wa.me link with a pre-filled, URL-encoded message. */
export function waLink(message?: string, number: string = site.whatsappNumber) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const quickOrderLink = waLink(
  `Assalam o Alaikum! I'd like to place an order at ${site.name}.`,
);

export type OrderLine = { name: string; qty: number; price: number };

export type OrderDetails = {
  name: string;
  phone: string;
  mode: "delivery" | "takeaway";
  address?: string;
  notes?: string;
};

export function buildOrderMessage(lines: OrderLine[], details: OrderDetails) {
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const itemsText = lines
    .map((l, i) => `${i + 1}. ${l.name} × ${l.qty} — ${formatPKR(l.qty * l.price)}`)
    .join("\n");

  return [
    `*New Order — ${site.shortName}*`,
    "",
    itemsText,
    "",
    `*Total: ${formatPKR(total)}*`,
    "",
    `*Name:* ${details.name}`,
    `*Phone:* ${details.phone}`,
    `*Type:* ${details.mode === "delivery" ? "Delivery" : "Takeaway"}`,
    details.mode === "delivery" && details.address ? `*Address:* ${details.address}` : null,
    details.notes ? `*Notes:* ${details.notes}` : null,
    "",
    "Sent from goldenfork website",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export type BookingDetails = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion?: string;
  notes?: string;
};

export function buildBookingMessage(b: BookingDetails) {
  return [
    `*Table Booking — ${site.shortName}*`,
    "",
    `*Name:* ${b.name}`,
    `*Phone:* ${b.phone}`,
    `*Date:* ${b.date}`,
    `*Time:* ${b.time}`,
    `*Guests:* ${b.guests}`,
    b.occasion ? `*Occasion:* ${b.occasion}` : null,
    b.notes ? `*Notes:* ${b.notes}` : null,
    "",
    "Please confirm my reservation. Thank you!",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export type EventInquiry = {
  name: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  budget?: string;
  message?: string;
};

export function buildEventMessage(e: EventInquiry) {
  return [
    `*Event Inquiry — ${site.shortName}*`,
    "",
    `*Name:* ${e.name}`,
    `*Phone:* ${e.phone}`,
    `*Event:* ${e.eventType}`,
    `*Date:* ${e.date}`,
    `*Guests:* ${e.guests}`,
    e.budget ? `*Budget:* ${e.budget}` : null,
    e.message ? `*Details:* ${e.message}` : null,
    "",
    "Please share packages and availability. Thank you!",
  ]
    .filter((l) => l !== null)
    .join("\n");
}
