"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShoppingBag, Download } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-ink/95 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-gradient-to-b from-ink/80 to-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={site.logo}
            alt=""
            width={44}
            height={44}
            className="h-10 w-10 rounded-full ring-2 ring-gold/70 lg:h-11 lg:w-11"
            priority
          />
          <span className="leading-tight">
            <span className="block font-heading text-lg font-semibold text-cream lg:text-xl">Golden Fork</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-light">by Lala Shinwari</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {site.nav.map((n) => {
            const active = n.href === pathname || (n.href !== "/" && !n.href.includes("#") && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active ? "text-gold-light" : "text-cream/80 hover:text-cream",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phones[0].tel}`}
            className="hidden h-10 items-center gap-2 rounded-full border border-cream/20 px-4 text-sm text-cream/90 transition hover:border-gold hover:text-gold-light xl:flex"
          >
            <Phone className="h-4 w-4" /> {site.phones[0].display}
          </a>
          <a
            href={site.menuPdf}
            download="Golden-Fork-Menu.pdf"
            className="hidden h-10 items-center gap-2 rounded-full border border-gold/50 px-4 text-sm text-gold-light transition hover:bg-gold hover:text-ink md:flex"
          >
            <Download className="h-4 w-4" /> Download Menu
          </a>
          <button
            onClick={openCart}
            className="relative grid h-10 w-10 place-items-center rounded-full text-cream transition hover:bg-white/10 lg:hidden"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/menu"
            className="hidden h-10 items-center rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 text-sm font-semibold text-ink shadow-gold transition hover:brightness-110 sm:flex"
          >
            Order Now
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-cream transition hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden bg-ink transition-[max-height,opacity] duration-300",
          open ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 pb-6 pt-2" aria-label="Mobile">
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3.5 font-heading text-xl text-cream hover:text-gold-light"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="border-b border-white/5 py-3.5 font-heading text-xl text-cream hover:text-gold-light"
          >
            Book a Table
          </Link>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="flex h-11 items-center justify-center rounded-full bg-gold text-sm font-semibold text-ink"
            >
              Order Now
            </Link>
            <a
              href={`tel:${site.phones[0].tel}`}
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-cream/20 text-sm text-cream"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={site.menuPdf}
              download="Golden-Fork-Menu.pdf"
              onClick={() => setOpen(false)}
              className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-full border border-gold/50 text-sm text-gold-light"
            >
              <Download className="h-4 w-4" /> Download Menu (PDF)
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
