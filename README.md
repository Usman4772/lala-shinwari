# Golden Fork by Lala Shinwari — Website

> **Every Bite, A Royal Delight.**

A fast, mobile-first restaurant website for Golden Fork by Lala Shinwari (Main Ferozepur Road, Lahore).
No backend, no database, no payments — orders, bookings and event inquiries are sent as pre-filled
WhatsApp messages.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP (animations) · lucide-react (icons)

## Pages

| Route      | What it does                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| `/`        | Hero, highlights, signature dishes, live deals + combo board, events teaser, gallery, reviews, map     |
| `/menu`    | Tabbed / searchable menu with "Add" buttons                                                          |
| `/order`   | Full-page cart + WhatsApp checkout (the same checkout is also available in the slide-out cart drawer) |
| `/book`    | Table booking form → WhatsApp                                                                         |
| `/events`  | Weddings, birthdays, corporate, high tea & buffet packages, event gallery, inquiry form → WhatsApp    |
| `/gallery` | Masonry photo gallery with lightbox and category filters                                             |
| `/contact` | Map, address, phones (tap-to-call), WhatsApp, socials, hours                                          |

Also generated automatically: `/sitemap.xml`, `/robots.txt`, favicon / apple icon, Open Graph image,
and Restaurant JSON-LD structured data.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # eslint
```

## Editing content (no code knowledge needed)

Everything the restaurant might want to change lives in **`src/data/`**:

### `src/data/site.ts` — business details

- Name, slogan, tagline, description
- Address, coordinates for the map (`geo`), phone numbers, WhatsApp number
- Opening hours (`hours.summary` — currently a placeholder, and `hours.lunchDeal`)
- Facebook / Instagram links
- Home-page highlights, signature dishes, sample reviews, and the navigation menu
- `url` — set this to the live domain once deployed (used for SEO / Open Graph)

> **Reviews:** the three testimonials are clearly labelled **"Sample — replace with real reviews"** in the UI.
> Replace them with real Google/Facebook reviews and remove the label in
> `src/components/home/Reviews.tsx` when ready.

### `src/data/menu.ts` — the menu

- `menuCategories` — the tabs (order here = order on the page).
- `menuItems` — every dish. Each item has:

```ts
{
  id: "chicken-shinwari-karahi",   // unique, used by the cart — don't reuse
  category: "karahi",               // must match a category id
  name: "Chicken Shinwari Karahi",
  description: "…",
  price: 1699,                      // PKR
  oldPrice: 1900,                   // optional strike-through price
  image: "/images/your-photo.jpg",  // optional, put the file in /public/images
  tags: ["popular", "spicy"],       // optional: popular | spicy | new | deal | veg
  unit: "full",                     // optional: "full", "per person", "kg" …
}
```

Confirmed prices are used where known. Everything else is a realistic placeholder marked
`// TODO confirm price` — search the file for `TODO` before launch.

### `src/data/deals.ts` — deals & combos

- `deals` — the cards in the home-page **Live Deals** section (20% lunch offer, karahi offer, BBQ platter,
  high tea, dinner buffet). Set `menuId` to link a deal's "Add to order" button to a menu item.
- `combos` — the numbered deal-board combos (Rs 399 → 1,899). Prices are confirmed; contents are samples
  marked `// TODO confirm contents`. Each combo also exists as a menu item in the **Deals** tab.

### `src/data/gallery.ts` — photos

Add a photo to `/public/images`, then add an entry with its real pixel `width`/`height` and a
`category` (`food` | `events` | `ambience` | `deals`).

### Images

All photos live in `public/images/`. The logo is `goldenfork_logo_facebook_1024.jpg`. To change the
favicon or the social-share image replace `src/app/icon.png`, `src/app/apple-icon.png` and
`src/app/opengraph-image.jpg`.

### Printable menu (PDF)

The "Download Menu" button in the header serves `public/golden-fork-menu.pdf`. To update the menu,
replace that file (keep the same name) — or change `menuPdf` in `src/data/site.ts`.

## How the WhatsApp flows work

All forms build a formatted message and open
`https://wa.me/<number>?text=<encoded message>` in a new tab. The customer just taps **Send**.

- **Cart** — items are stored in `localStorage` (`goldenfork-cart-v1`), so the order survives page
  reloads. The checkout collects name, phone, delivery/takeaway, address and notes.
- **Book a Table** — name, phone, date, time, guests, occasion, notes.
- **Event inquiry** — event type, date, guests, budget, message.

Message templates are in `src/lib/whatsapp.ts`.

## Project structure

```
src/
  app/             routes (page.tsx per route), layout, metadata files, sitemap/robots
  components/
    cart/          CartProvider (state + localStorage), drawer, checkout, sticky button
    forms/         BookingForm, EventInquiryForm
    gallery/       GalleryGrid (masonry + lightbox)
    home/          Home-page sections
    layout/        Header, Footer, floating WhatsApp button, mobile action bar
    menu/          MenuExplorer (tabs + search), AddButton
    seo/           JSON-LD
    shared/        PageHero, MapEmbed
    ui/            Button, Section/Container/SectionHeading, Reveal (GSAP scroll animations), icons
  data/            ← all editable content
  lib/             helpers (price formatting, WhatsApp message builders)
public/images/     photos + logo
```

### Animations

Scroll-reveal animations are powered by GSAP + ScrollTrigger. Add `data-reveal` to any element to fade it
in on scroll; wrap several in a `data-reveal-group` to stagger them. Animations respect
`prefers-reduced-motion`.

## Deploy to Vercel

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Go to <https://vercel.com/new>, import the repository and click **Deploy** — no configuration needed
   (Next.js is detected automatically).
3. After the first deploy, set `url` in `src/data/site.ts` to your production domain and push again.
4. Optional: add a custom domain under **Project → Settings → Domains**.

Every push to the main branch redeploys automatically.

## Before going live — checklist

- [ ] Confirm all prices marked `TODO` in `src/data/menu.ts` and combo contents in `src/data/deals.ts`
- [ ] Replace sample reviews in `src/data/site.ts`
- [ ] Confirm opening hours (`hours.summary`)
- [ ] Set the production `url` in `src/data/site.ts`
- [ ] Test "Send Order on WhatsApp" on a real phone
