import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Section";
import { OrderPageContent } from "@/components/cart/OrderPageContent";

export const metadata: Metadata = {
  title: "Your Order — WhatsApp Checkout",
  description: "Review your Golden Fork order and send it on WhatsApp for delivery or takeaway.",
};

export default function OrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={
          <>
            Your <span className="text-gold-gradient italic">Order</span>
          </>
        }
        text="Review your items, add your details and send the order on WhatsApp."
      />
      <Container className="-mt-6 pb-20 md:-mt-10">
        <OrderPageContent />
      </Container>
    </>
  );
}
