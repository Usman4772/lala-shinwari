import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu — Shinwari Karahi, BBQ, Chinese, Pizza & Fast Food",
  description:
    "Browse the full Golden Fork menu: Shinwari karahi & handi, charcoal BBQ, Chinese, pizza & Italian, burgers & rolls, rice & fish, breads, high tea & buffet, drinks. Order on WhatsApp.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Menu"
        title={
          <>
            All Cuisines <span className="text-gold-gradient italic">Under One Roof</span>
          </>
        }
        text="Tap “Add” on anything you like, then send your order on WhatsApp. Prices in PKR."
        image="/images/ig_03_DdJsyRrjYo8.jpg"
      >
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/40 px-4 py-2 text-sm text-gold-light">
          Flat 20% off the entire menu · {site.hours.lunchDeal}
        </p>
      </PageHero>
      <Container className="pb-20">
        <MenuExplorer />
      </Container>
    </>
  );
}
