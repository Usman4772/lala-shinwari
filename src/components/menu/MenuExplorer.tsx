"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Search, X, Flame, Star, Sparkles, Leaf, Tag } from "lucide-react";
import gsap from "gsap";
import { menuCategories, menuItems, type MenuCategoryId, type MenuItem } from "@/data/menu";
import { formatPKR, cn } from "@/lib/utils";
import { AddButton } from "./AddButton";

const tagMeta = {
  popular: { label: "Popular", Icon: Star, cls: "bg-gold/20 text-gold-deep" },
  spicy: { label: "Spicy", Icon: Flame, cls: "bg-accent/10 text-accent" },
  new: { label: "New", Icon: Sparkles, cls: "bg-ink/10 text-ink" },
  deal: { label: "Deal", Icon: Tag, cls: "bg-accent/10 text-accent" },
  veg: { label: "Veg", Icon: Leaf, cls: "bg-green-100 text-green-700" },
} as const;

export function MenuExplorer() {
  const [active, setActive] = useState<MenuCategoryId | "all">("karahi");
  const [query, setQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const visible = useMemo(() => {
    if (searching) {
      return menuItems.filter(
        (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q),
      );
    }
    if (active === "all") return menuItems;
    return menuItems.filter((m) => m.category === active);
  }, [q, active, searching]);

  // Animate cards when the list changes
  useEffect(() => {
    if (!gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.03, overwrite: true },
    );
  }, [visible]);

  // Keep active tab scrolled into view on mobile
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const category = menuCategories.find((c) => c.id === active);

  // Group for "all" & search views
  const grouped = useMemo(() => {
    if (!searching && active !== "all") return null;
    return menuCategories
      .map((c) => ({ cat: c, items: visible.filter((m) => m.category === c.id) }))
      .filter((g) => g.items.length > 0);
  }, [visible, searching, active]);

  return (
    <div>
      {/* Sticky tabs + search */}
      <div className="sticky top-16 z-30 -mx-4 border-b border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-20 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center">
          <div ref={tabsRef} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-1">
            <TabButton active={active === "all" && !searching} onClick={() => { setActive("all"); setQuery(""); }} data-tab="all">
              All
            </TabButton>
            {menuCategories.map((c) => (
              <TabButton
                key={c.id}
                data-tab={c.id}
                active={active === c.id && !searching}
                onClick={() => {
                  setActive(c.id);
                  setQuery("");
                }}
              >
                {c.shortLabel}
              </TabButton>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/65" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search karahi, pizza, roll…"
              className="input h-11 pl-10 pr-9"
              aria-label="Search menu"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-ink/5"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>
      </div>

      {/* Heading */}
      <div className="mt-8 mb-6">
        {searching ? (
          <>
            <h2 className="font-heading text-2xl font-semibold md:text-3xl">
              {visible.length} result{visible.length === 1 ? "" : "s"} for “{query}”
            </h2>
          </>
        ) : active === "all" ? (
          <h2 className="font-heading text-2xl font-semibold md:text-3xl">Full Menu</h2>
        ) : (
          <>
            <h2 className="font-heading text-2xl font-semibold md:text-3xl">{category?.label}</h2>
            <p className="mt-1 text-ink/60">{category?.description}</p>
          </>
        )}
      </div>

      <div ref={gridRef}>
        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink/15 p-10 text-center">
            <p className="font-heading text-xl">Nothing matched “{query}”</p>
            <p className="mt-2 text-sm text-ink/60">Try “karahi”, “tikka”, “pizza” or “chowmein”.</p>
          </div>
        ) : grouped ? (
          <div className="space-y-12">
            {grouped.map(({ cat, items }) => (
              <div key={cat.id}>
                <h3 className="mb-4 flex items-center gap-3 font-heading text-xl font-semibold">
                  {cat.label}
                  <span className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
                </h3>
                <ItemGrid items={items} />
              </div>
            ))}
          </div>
        ) : (
          <ItemGrid items={visible} />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  children,
  ...rest
}: { active: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
        active ? "bg-ink text-gold-light shadow" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function ItemGrid({ items }: { items: MenuItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((m) => (
        <li key={m.id} data-card>
          <MenuCard item={m} />
        </li>
      ))}
    </ul>
  );
}

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex h-full gap-4 rounded-2xl border border-ink/5 bg-white p-3 shadow-sm transition hover:shadow-card">
      {item.image && (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
          <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug">{item.name}</h3>
          <div className="shrink-0 text-right">
            <p className="font-semibold text-gold-deep">{formatPKR(item.price)}</p>
            {item.oldPrice && <p className="text-xs text-ink/65 line-through">{formatPKR(item.oldPrice)}</p>}
          </div>
        </div>
        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-ink/60 sm:text-sm">{item.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {item.unit && (
              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink/60">{item.unit}</span>
            )}
            {item.tags?.map((t) => {
              const meta = tagMeta[t];
              return (
                <span
                  key={t}
                  className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", meta.cls)}
                >
                  <meta.Icon className="h-3 w-3" /> {meta.label}
                </span>
              );
            })}
          </div>
          <AddButton id={item.id} size="sm" />
        </div>
      </div>
    </article>
  );
}
