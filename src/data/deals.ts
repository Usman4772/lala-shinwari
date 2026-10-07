/**
 * Deals & offers shown on the home page "Live Deals" section.
 * Prices are in PKR. Items marked TODO need confirmation from the restaurant.
 */

export type Deal = {
  id: string;
  title: string;
  description: string;
  price?: number; // current price (PKR)
  oldPrice?: number; // strike-through price (PKR)
  priceSuffix?: string; // e.g. "per person", "from"
  pricePrefix?: string; // e.g. "from"
  badge?: string; // small label like "20% OFF"
  note?: string; // small print
  image?: string;
  featured?: boolean;
  /** If set, "Add to order" adds this menu item id to the cart. */
  menuId?: string;
};

export const deals: Deal[] = [
  {
    id: "lunch-20",
    title: "Flat 20% OFF — Entire Menu",
    description:
      "Every weekday lunch, everything on the menu is 20% off. Dine-in with family, friends or colleagues.",
    badge: "20% OFF",
    note: "Weekdays 12:00 PM – 4:00 PM. Dine-in only. T&Cs apply.",
    image: "/images/ig_01_DdatFoBlTgu.jpg",
    featured: true,
  },
  {
    id: "mutton-karahi-offer",
    title: "Mutton Shinwari Karahi",
    description:
      "Our signature karahi at a special price — full portion, cooked fresh to order in pure ghee.",
    price: 2299,
    oldPrice: 2900,
    badge: "Save Rs 601",
    note: "Excl. tax. Limited time.",
    image: "/images/ig_10_DcJ3G9jot36.jpg",
    featured: true,
    menuId: "mutton-shinwari-karahi",
  },
  {
    id: "bbq-platter",
    title: "BBQ Platter",
    description:
      "Chicken tikka, seekh kebab and green boti served on rice with raita and chutney.",
    price: 2200,
    pricePrefix: "from",
    image: "/images/ig_07_Dc2RWIqCJih.jpg",
    menuId: "bbq-platter",
  },
  {
    id: "high-tea",
    title: "Unlimited High Tea",
    description:
      "Shinwari specialities, continental classics, Pakistani favourites, Chinese and desserts — unlimited.",
    price: 1999,
    priceSuffix: "per person",
    image: "/images/ig_05_Dc6jMSKoJq4.jpg",
    menuId: "unlimited-high-tea",
  },
  {
    id: "dinner-buffet",
    title: "Premium Dinner Buffet",
    description:
      "Live BBQ, karahi station, Chinese, pizza corner, salads and a full dessert bar.",
    price: 2499,
    priceSuffix: "per person",
    image: "/images/ig_19_DCTkzV4IPSs.jpg",
    menuId: "premium-dinner-buffet",
  },
];

/**
 * Deal board combos (from the in-store deals board).
 * Prices are confirmed; contents are sample combinations.
 */
export type Combo = {
  id: string;
  number: number;
  name: string;
  items: string[];
  price: number;
  menuId: string;
};

export const combos: Combo[] = [
  // TODO confirm contents
  {
    id: "combo-1",
    number: 1,
    name: "Roll Combo",
    items: ["Chicken Cheese Roll", "Regular Soft Drink"],
    price: 399,
    menuId: "deal-1-roll-combo",
  },
  // TODO confirm contents
  {
    id: "combo-2",
    number: 2,
    name: "Burger Combo",
    items: ["Zinger Burger", "Fries", "Regular Soft Drink"],
    price: 599,
    menuId: "deal-2-burger-combo",
  },
  // TODO confirm contents
  {
    id: "combo-3",
    number: 3,
    name: "Double Roll Combo",
    items: ["2 Chicken Cheese Rolls", "Fries", "Regular Soft Drink"],
    price: 699,
    menuId: "deal-3-double-roll-combo",
  },
  // TODO confirm contents
  {
    id: "combo-4",
    number: 4,
    name: "Chinese Combo",
    items: ["Chicken Chowmein", "Chicken Manchurian", "Egg Fried Rice", "2 Soft Drinks"],
    price: 1199,
    menuId: "deal-4-chinese-combo",
  },
  // TODO confirm contents
  {
    id: "combo-5",
    number: 5,
    name: "Pizza Combo",
    items: ["Medium Chicken Tikka Pizza", "Garlic Bread", "2 Soft Drinks"],
    price: 1499,
    menuId: "deal-5-pizza-combo",
  },
  // TODO confirm contents
  {
    id: "combo-6",
    number: 6,
    name: "Family Fast Food Combo",
    items: ["2 Zinger Burgers", "2 Chicken Rolls", "Large Fries", "4 Soft Drinks"],
    price: 1699,
    menuId: "deal-6-family-fast-food-combo",
  },
  // TODO confirm contents
  {
    id: "combo-7",
    number: 7,
    name: "Large Pizza Party Combo",
    items: ["Large Special Pizza", "Chicken Wings (6)", "Fries", "1.5L Soft Drink"],
    price: 1899,
    menuId: "deal-7-large-pizza-party-combo",
  },
];
