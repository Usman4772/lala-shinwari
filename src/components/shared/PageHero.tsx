import Image from "next/image";
import type { ReactNode } from "react";
import { Container, GoldDivider } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-royal pb-14 pt-28 text-cream md:pb-20 md:pt-36">
      {image && (
        <div className="absolute inset-0 -z-10">
          {/* Decorative, heavily dimmed backdrop — low quality keeps it light for LCP */}
          <Image
            src={image}
            alt=""
            fill
            priority
            quality={45}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        </div>
      )}
      <Container className="text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h1 className="font-heading text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">{title}</h1>
        <GoldDivider className="my-5" light />
        {text && <p className="mx-auto max-w-2xl text-cream/70 md:text-lg">{text}</p>}
        {children}
      </Container>
    </section>
  );
}
