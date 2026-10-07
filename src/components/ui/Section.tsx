import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "cream" | "dark" | "white";
}) {
  const tones = {
    cream: "bg-cream text-ink",
    white: "bg-white text-ink",
    dark: "bg-royal text-cream",
  };
  return (
    <section id={id} className={cn("py-16 md:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

export function GoldDivider({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div className={cn("gold-divider mx-auto w-40", className)} aria-hidden>
      <span className={cn("block h-1.5 w-1.5 rotate-45", light ? "bg-gold-light" : "bg-gold")} />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">{eyebrow}</p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl",
          light ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      <GoldDivider className={cn("my-5", align === "left" && "mx-0")} light={light} />
      {text && (
        <p className={cn("text-base leading-relaxed md:text-lg", light ? "text-cream/70" : "text-ink/70")}>
          {text}
        </p>
      )}
    </div>
  );
}
