import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { formatPKR } from "@/lib/utils";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { AddButton } from "@/components/menu/AddButton";

export function SignatureDishes() {
  const [first, ...rest] = site.signatureDishes;

  return (
    <Section tone="cream">
      <Container>
        <SectionHeading
          eyebrow="Chef's Signatures"
          title={
            <>
              Dishes Worth the <span className="text-gold-gradient italic">Drive</span>
            </>
          }
          text="Cooked fresh in pure ghee and over real charcoal — the plates our regulars come back for."
        />

        <div data-reveal-group className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Featured */}
          <article
            data-reveal="clip"
            className="group relative overflow-hidden rounded-3xl bg-ink text-cream shadow-card md:col-span-2 md:row-span-2"
          >
            <div className="relative aspect-square overflow-hidden md:aspect-auto md:h-full md:min-h-[520px]">
              <Image
                src={first.image}
                alt={first.name}
                fill
                data-parallax="7"
                quality={60}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="scale-[1.18] object-cover object-[45%_55%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                Signature
              </span>
              <h3 className="font-heading text-3xl font-semibold md:text-4xl">{first.name}</h3>
              <p className="mt-2 max-w-md text-sm text-cream/75 md:text-base">{first.text}</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="font-heading text-2xl font-semibold text-gold-light">{formatPKR(first.price)}</span>
                <AddButton id={first.menuId} label="Add to order" />
              </div>
            </div>
          </article>

          {rest.map((d) => (
            <article
              key={d.menuId}
              data-reveal
              className="card-lift group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-xl font-semibold leading-tight">{d.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/60">{d.text}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-gold-deep">{formatPKR(d.price)}</span>
                  <AddButton id={d.menuId} size="sm" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-semibold text-ink underline-offset-4 hover:text-gold-deep hover:underline"
          >
            Explore the full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
