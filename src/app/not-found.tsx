import Link from "next/link";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="bg-royal pb-24 pt-40 text-cream">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">404</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold md:text-5xl">This plate is empty</h1>
        <p className="mt-4 text-cream/70">The page you’re looking for doesn’t exist. Let’s get you back to the good stuff.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="rounded-full bg-gold px-6 py-3 font-semibold text-ink">
            Home
          </Link>
          <Link href="/menu" className="rounded-full border border-gold/60 px-6 py-3 font-semibold text-cream">
            View menu
          </Link>
        </div>
      </Container>
    </section>
  );
}
