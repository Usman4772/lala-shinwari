/**
 * Restaurant menu. All prices in PKR.
 *
 * HOW TO EDIT
 * - Add/remove categories in `menuCategories` (order = tab order).
 * - Add items to `menuItems`. `id` must be unique (used by the cart).
 * - `image` is optional; put files in /public/images.
 * - Prices marked `// TODO confirm price` are realistic placeholders.
 */

export type MenuCategoryId =
  | "karahi"
  | "bbq"
  | "chinese"
  | "pizza"
  | "fastfood"
  | "rice-fish"
  | "breads"
  | "hightea"
  | "drinks"
  | "deals";

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  description: string;
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image?: string;
  tags?: ("popular" | "spicy" | "new" | "deal" | "veg")[];
  /** e.g. "per person", "full", "half" */
  unit?: string;
};

export const menuCategories: MenuCategory[] = [
  { id: "karahi", label: "Shinwari Karahi & Handi", shortLabel: "Karahi", description: "Cooked fresh in pure ghee, the Shinwari way." },
  { id: "bbq", label: "BBQ & Grill", shortLabel: "BBQ", description: "Charcoal-grilled tikka, kebabs and platters." },
  { id: "chinese", label: "Chinese", shortLabel: "Chinese", description: "Cheesy, saucy, Lahori-style Chinese." },
  { id: "pizza", label: "Pizza & Italian", shortLabel: "Pizza", description: "Hand-stretched pizzas and creamy pastas." },
  { id: "fastfood", label: "Burgers, Rolls & Fast Food", shortLabel: "Fast Food", description: "Crispy, loaded and made to order." },
  { id: "rice-fish", label: "Rice & Fish", shortLabel: "Rice & Fish", description: "Biryani, pulao and fresh fish." },
  { id: "breads", label: "Breads", shortLabel: "Breads", description: "Fresh from the tandoor." },
  { id: "hightea", label: "High Tea & Buffet", shortLabel: "Buffet", description: "Unlimited spreads for the whole family." },
  { id: "drinks", label: "Drinks", shortLabel: "Drinks", description: "Cold drinks, lassi, tea and fresh juices." },
  { id: "deals", label: "Deal Combos", shortLabel: "Deals", description: "Combos from our deal board." },
];

export const menuItems: MenuItem[] = [
  // ─── Shinwari Karahi & Handi ─────────────────────────────────────────────
  {
    id: "mutton-shinwari-karahi",
    category: "karahi",
    name: "Mutton Shinwari Karahi",
    description: "Tender mutton cooked in pure ghee with tomatoes, black pepper and green chillies. Full (approx. 1 kg).",
    price: 2299, // confirmed (offer price, excl. tax)
    oldPrice: 2900,
    image: "/images/hero-karahi.jpg",
    tags: ["popular", "deal"],
    unit: "full",
  },
  {
    id: "chicken-shinwari-karahi",
    category: "karahi",
    name: "Chicken Shinwari Karahi",
    description: "Classic Shinwari chicken karahi — tomatoes, ghee, salt and pepper. Nothing else needed. Full.",
    price: 1699, // TODO confirm price
    tags: ["popular"],
    unit: "full",
  },
  {
    id: "butter-chicken-karahi",
    category: "karahi",
    name: "Butter Chicken Karahi",
    description: "Golden Fork special — rich, buttery gravy finished with cream, ginger and coriander. Full.",
    price: 1899, // TODO confirm price
    image: "/images/ig_16_DDthVZQoI6V.jpg",
    tags: ["popular"],
    unit: "full",
  },
  {
    id: "chicken-white-karahi",
    category: "karahi",
    name: "Chicken White Karahi",
    description: "Mild, creamy yoghurt-based karahi with green chillies and black pepper. Full.",
    price: 1799, // TODO confirm price
    unit: "full",
  },
  {
    id: "chicken-green-karahi",
    category: "karahi",
    name: "Chicken Green Karahi",
    description: "Fresh coriander, mint and green chilli paste karahi. Full.",
    price: 1799, // TODO confirm price
    tags: ["spicy"],
    unit: "full",
  },
  {
    id: "mutton-namkeen-handi",
    category: "karahi",
    name: "Mutton Namkeen Handi",
    description: "Peshawari-style salted mutton slow-cooked in its own juices with fat and black pepper.",
    price: 2499, // TODO confirm price
    unit: "full",
  },
  {
    id: "chicken-boneless-handi",
    category: "karahi",
    name: "Chicken Boneless Handi",
    description: "Creamy boneless chicken handi with a hint of kasuri methi.",
    price: 1599, // TODO confirm price
    unit: "full",
  },
  {
    id: "mutton-rosh",
    category: "karahi",
    name: "Mutton Rosh",
    description: "Traditional Balochi-style slow-cooked mutton with whole spices.",
    price: 2399, // TODO confirm price
    unit: "full",
  },
  {
    id: "daal-mash-fry",
    category: "karahi",
    name: "Daal Mash Fry",
    description: "Dry-fried white lentils with ginger, green chilli and ghee tarka.",
    price: 499, // TODO confirm price
    tags: ["veg"],
  },

  // ─── BBQ & Grill ─────────────────────────────────────────────────────────
  {
    id: "bbq-platter",
    category: "bbq",
    name: "BBQ Platter",
    description: "Chicken tikka, seekh kebab and green boti served on rice with raita, chutney and salad. Serves 2–3.",
    price: 2200, // confirmed (from)
    image: "/images/ig_07_Dc2RWIqCJih.jpg",
    tags: ["popular", "deal"],
  },
  {
    id: "chicken-tikka",
    category: "bbq",
    name: "Chicken Tikka (Leg / Chest)",
    description: "Charcoal-grilled chicken tikka marinated overnight in yoghurt and spices.",
    price: 450, // TODO confirm price
    tags: ["popular"],
    unit: "piece",
  },
  {
    id: "chicken-seekh-kebab",
    category: "bbq",
    name: "Chicken Seekh Kebab",
    description: "Hand-rolled minced chicken skewers with fresh herbs. 4 pcs.",
    price: 599, // TODO confirm price
  },
  {
    id: "beef-seekh-kebab",
    category: "bbq",
    name: "Beef Seekh Kebab",
    description: "Juicy beef skewers with onion, coriander and roasted spices. 4 pcs.",
    price: 699, // TODO confirm price
  },
  {
    id: "malai-boti",
    category: "bbq",
    name: "Chicken Malai Boti",
    description: "Cream-marinated boneless chicken, mild and melt-in-the-mouth. 8 pcs.",
    price: 799, // TODO confirm price
    tags: ["popular"],
  },
  {
    id: "green-boti",
    category: "bbq",
    name: "Chicken Green Boti",
    description: "Boneless chicken in a spicy green herb marinade. 8 pcs.",
    price: 799, // TODO confirm price
    tags: ["spicy"],
  },
  {
    id: "mutton-chops",
    category: "bbq",
    name: "Mutton Chops",
    description: "Charcoal-grilled lamb chops with a peppery Shinwari rub. 4 pcs.",
    price: 1499, // TODO confirm price
    image: "/images/ig_11_DcGXIHqI3df.jpg",
  },
  {
    id: "chicken-wings-bbq",
    category: "bbq",
    name: "Grilled Chicken Wings",
    description: "Smoky wings brushed with our house BBQ glaze. 8 pcs.",
    price: 649, // TODO confirm price
  },
  {
    id: "family-bbq-platter",
    category: "bbq",
    name: "Family BBQ Platter",
    description: "Tikka, seekh kebab, malai boti, green boti and mutton chops with rice, naan and dips. Serves 4–5.",
    price: 3999, // TODO confirm price
    image: "/images/ig_03_DdJsyRrjYo8.jpg",
  },

  // ─── Chinese ─────────────────────────────────────────────────────────────
  {
    id: "chicken-chowmein",
    category: "chinese",
    name: "Chicken Chowmein",
    description: "Stir-fried noodles with chicken, cabbage, carrot and spring onion.",
    price: 799, // TODO confirm price
    tags: ["popular"],
  },
  {
    id: "chicken-manchurian",
    category: "chinese",
    name: "Chicken Manchurian",
    description: "Crispy chicken in sweet-and-tangy Manchurian sauce.",
    price: 899, // TODO confirm price
  },
  {
    id: "chicken-shashlik",
    category: "chinese",
    name: "Chicken Shashlik with Rice",
    description: "Skewered chicken and peppers in a rich tomato-based sauce, served with egg fried rice.",
    price: 999, // TODO confirm price
  },
  {
    id: "egg-fried-rice",
    category: "chinese",
    name: "Egg Fried Rice",
    description: "Classic wok-tossed rice with egg and vegetables.",
    price: 549, // TODO confirm price
  },
  {
    id: "chicken-fried-rice",
    category: "chinese",
    name: "Chicken Fried Rice",
    description: "Wok-fried rice with chicken, egg and vegetables.",
    price: 649, // TODO confirm price
  },
  {
    id: "hot-sour-soup",
    category: "chinese",
    name: "Hot & Sour Soup",
    description: "Peppery chicken soup with vegetables and egg ribbons.",
    price: 449, // TODO confirm price
  },
  {
    id: "chicken-corn-soup",
    category: "chinese",
    name: "Chicken Corn Soup",
    description: "Silky sweet-corn soup with shredded chicken.",
    price: 449, // TODO confirm price
  },
  {
    id: "cheesy-chicken-chowmein",
    category: "chinese",
    name: "Cheesy Chicken Chowmein",
    description: "Our famous cheesy Chinese — chowmein baked under melted mozzarella.",
    price: 949, // TODO confirm price
    tags: ["new", "popular"],
  },

  // ─── Pizza & Italian ─────────────────────────────────────────────────────
  {
    id: "golden-fork-special-pizza",
    category: "pizza",
    name: "Golden Fork Special Pizza",
    description: "Chicken, sweet corn, capsicum, olives and double cheese. Large 12\".",
    price: 1499, // TODO confirm price
    image: "/images/ig_15_DDxUqYHzSiV.jpg",
    tags: ["popular"],
  },
  {
    id: "chicken-tikka-pizza",
    category: "pizza",
    name: "Chicken Tikka Pizza",
    description: "Tandoori chicken tikka, onion and green chilli. Large 12\".",
    price: 1399, // TODO confirm price
  },
  {
    id: "chicken-fajita-pizza",
    category: "pizza",
    name: "Chicken Fajita Pizza",
    description: "Fajita chicken, peppers, onion and jalapeños. Large 12\".",
    price: 1399, // TODO confirm price
  },
  {
    id: "malai-boti-pizza",
    category: "pizza",
    name: "Malai Boti Pizza",
    description: "Creamy malai boti chicken with a garlic-mayo drizzle. Large 12\".",
    price: 1499, // TODO confirm price
    tags: ["new"],
  },
  {
    id: "chicken-alfredo-pasta",
    category: "pizza",
    name: "Chicken Alfredo Pasta",
    description: "Fettuccine in a creamy parmesan sauce with grilled chicken.",
    price: 999, // TODO confirm price
  },
  {
    id: "chicken-lasagna",
    category: "pizza",
    name: "Chicken Lasagna",
    description: "Layers of pasta, spiced chicken, béchamel and cheese.",
    price: 1099, // TODO confirm price
  },
  {
    id: "garlic-bread",
    category: "pizza",
    name: "Cheesy Garlic Bread",
    description: "Toasted bread with garlic butter and melted cheese. 6 pcs.",
    price: 399, // TODO confirm price
    tags: ["veg"],
  },

  // ─── Burgers, Rolls & Fast Food ──────────────────────────────────────────
  {
    id: "zinger-burger",
    category: "fastfood",
    name: "Zinger Burger",
    description: "Crispy fried chicken fillet, lettuce and mayo in a toasted bun.",
    price: 449, // TODO confirm price
    tags: ["popular"],
  },
  {
    id: "grilled-chicken-burger",
    category: "fastfood",
    name: "Grilled Chicken Burger",
    description: "Char-grilled chicken breast with cheese and smoky sauce.",
    price: 499, // TODO confirm price
  },
  {
    id: "beef-smash-burger",
    category: "fastfood",
    name: "Beef Smash Burger",
    description: "Double smashed beef patties, cheddar, pickles and house sauce.",
    price: 699, // TODO confirm price
    tags: ["new"],
  },
  {
    id: "chicken-cheese-roll",
    category: "fastfood",
    name: "Chicken Cheese Roll",
    description: "Paratha roll with chicken tikka chunks, cheese and mint chutney.",
    price: 349, // TODO confirm price
    tags: ["popular"],
  },
  {
    id: "chicken-tikka-roll",
    category: "fastfood",
    name: "Chicken Tikka Roll",
    description: "Classic Lahori paratha roll with charcoal chicken tikka.",
    price: 299, // TODO confirm price
  },
  {
    id: "chicken-shawarma",
    category: "fastfood",
    name: "Chicken Shawarma",
    description: "Garlic-sauce chicken shawarma wrapped in fresh pita.",
    price: 299, // TODO confirm price
  },
  {
    id: "loaded-fries",
    category: "fastfood",
    name: "Loaded Fries",
    description: "Fries topped with chicken, cheese sauce and jalapeños.",
    price: 499, // TODO confirm price
  },
  {
    id: "fries",
    category: "fastfood",
    name: "French Fries",
    description: "Crispy golden fries with ketchup.",
    price: 249, // TODO confirm price
    tags: ["veg"],
  },
  {
    id: "chicken-wings-fried",
    category: "fastfood",
    name: "Crispy Chicken Wings",
    description: "Buffalo-style fried wings with ranch dip. 6 pcs.",
    price: 549, // TODO confirm price
  },

  // ─── Rice & Fish ─────────────────────────────────────────────────────────
  {
    id: "grilled-fish-rice",
    category: "rice-fish",
    name: "Grilled Fish & Rice",
    description: "Whole marinated fish, charcoal-grilled and served on flavoured rice with tamarind chutney.",
    price: 3000, // confirmed (from Instagram)
    image: "/images/ig_14_DDz4VHBopW0.jpg",
    tags: ["popular"],
  },
  {
    id: "lahori-fried-fish",
    category: "rice-fish",
    name: "Lahori Fried Fish",
    description: "Besan-crusted fish fry with chaat masala. Per kg.",
    price: 2499, // TODO confirm price
    unit: "kg",
  },
  {
    id: "chicken-biryani",
    category: "rice-fish",
    name: "Chicken Biryani",
    description: "Aromatic basmati layered with spiced chicken, served with raita.",
    price: 549, // TODO confirm price
    tags: ["popular"],
  },
  {
    id: "mutton-biryani",
    category: "rice-fish",
    name: "Mutton Biryani",
    description: "Slow-cooked mutton biryani with saffron and fried onions.",
    price: 799, // TODO confirm price
  },
  {
    id: "yakhni-pulao",
    category: "rice-fish",
    name: "Beef Yakhni Pulao",
    description: "Fragrant rice cooked in beef stock with whole spices and tender beef.",
    price: 699, // TODO confirm price
  },
  {
    id: "kabuli-pulao",
    category: "rice-fish",
    name: "Kabuli Pulao",
    description: "Afghan-style pulao with mutton, carrots, raisins and almonds.",
    price: 899, // TODO confirm price
  },

  // ─── Breads ──────────────────────────────────────────────────────────────
  { id: "roti", category: "breads", name: "Tandoori Roti", description: "Whole-wheat tandoor bread.", price: 40, tags: ["veg"] }, // TODO confirm price
  { id: "naan", category: "breads", name: "Plain Naan", description: "Soft leavened tandoor naan.", price: 60, tags: ["veg"] }, // TODO confirm price
  { id: "roghni-naan", category: "breads", name: "Roghni Naan", description: "Sesame-topped naan brushed with ghee.", price: 90, tags: ["veg"] }, // TODO confirm price
  { id: "garlic-naan", category: "breads", name: "Garlic Naan", description: "Naan with garlic butter and coriander.", price: 120, tags: ["veg"] }, // TODO confirm price
  { id: "kandahari-naan", category: "breads", name: "Kandahari Naan", description: "Large Afghan naan, perfect for sharing with karahi.", price: 150, tags: ["veg"] }, // TODO confirm price
  { id: "paratha", category: "breads", name: "Lachha Paratha", description: "Flaky layered paratha.", price: 120, tags: ["veg"] }, // TODO confirm price

  // ─── High Tea & Buffet ───────────────────────────────────────────────────
  {
    id: "unlimited-high-tea",
    category: "hightea",
    name: "Unlimited High Tea",
    description: "Shinwari specialities, Alfredo pasta, pizza slices, nihari, yakhni pulao, chowmein, snacks and desserts.",
    price: 1999, // confirmed
    image: "/images/ig_05_Dc6jMSKoJq4.jpg",
    tags: ["popular", "deal"],
    unit: "per person",
  },
  {
    id: "premium-dinner-buffet",
    category: "hightea",
    name: "Premium Dinner Buffet",
    description: "Live BBQ, karahi station, Chinese, pizza corner, salads and a full dessert bar.",
    price: 2499, // confirmed
    image: "/images/ig_19_DCTkzV4IPSs.jpg",
    tags: ["deal"],
    unit: "per person",
  },
  {
    id: "kids-buffet",
    category: "hightea",
    name: "Kids Buffet (under 10)",
    description: "Half-price buffet access for children under 10.",
    price: 1249, // TODO confirm price
    unit: "per child",
  },

  // ─── Drinks ──────────────────────────────────────────────────────────────
  { id: "soft-drink", category: "drinks", name: "Soft Drink (Regular)", description: "Pepsi, 7Up, Mirinda or Mountain Dew.", price: 120 }, // TODO confirm price
  { id: "soft-drink-1-5l", category: "drinks", name: "Soft Drink (1.5 L)", description: "Family-size bottle.", price: 250 }, // TODO confirm price
  { id: "mineral-water", category: "drinks", name: "Mineral Water", description: "500 ml bottle.", price: 80 }, // TODO confirm price
  { id: "sweet-lassi", category: "drinks", name: "Sweet Lassi", description: "Thick, chilled yoghurt lassi.", price: 250 }, // TODO confirm price
  { id: "mint-margarita", category: "drinks", name: "Mint Margarita", description: "Fresh mint, lime and soda.", price: 299 }, // TODO confirm price
  { id: "fresh-lime", category: "drinks", name: "Fresh Lime (Soda / Water)", description: "Lemon, salt and sugar — your way.", price: 199 }, // TODO confirm price
  { id: "kashmiri-chai", category: "drinks", name: "Kashmiri Chai", description: "Pink tea with crushed pistachios.", price: 250 }, // TODO confirm price
  { id: "doodh-patti", category: "drinks", name: "Doodh Patti", description: "Strong, milky Pakistani tea.", price: 150 }, // TODO confirm price
  { id: "green-tea", category: "drinks", name: "Green Tea (Kahwa)", description: "Peshawari kahwa with cardamom.", price: 150 }, // TODO confirm price

  // ─── Deal Combos (prices confirmed from deal board; contents TODO) ───────
  { id: "deal-1-roll-combo", category: "deals", name: "Deal #1 — Roll Combo", description: "Chicken Cheese Roll + Regular Soft Drink.", price: 399, tags: ["deal"] }, // TODO confirm contents
  { id: "deal-2-burger-combo", category: "deals", name: "Deal #2 — Burger Combo", description: "Zinger Burger + Fries + Regular Soft Drink.", price: 599, tags: ["deal", "popular"] }, // TODO confirm contents
  { id: "deal-3-double-roll-combo", category: "deals", name: "Deal #3 — Double Roll Combo", description: "2 Chicken Cheese Rolls + Fries + Regular Soft Drink.", price: 699, tags: ["deal"] }, // TODO confirm contents
  { id: "deal-4-chinese-combo", category: "deals", name: "Deal #4 — Chinese Combo", description: "Chicken Chowmein + Chicken Manchurian + Egg Fried Rice + 2 Soft Drinks.", price: 1199, tags: ["deal"] }, // TODO confirm contents
  { id: "deal-5-pizza-combo", category: "deals", name: "Deal #5 — Pizza Combo", description: "Medium Chicken Tikka Pizza + Garlic Bread + 2 Soft Drinks.", price: 1499, tags: ["deal"] }, // TODO confirm contents
  { id: "deal-6-family-fast-food-combo", category: "deals", name: "Deal #6 — Family Fast Food Combo", description: "2 Zinger Burgers + 2 Chicken Rolls + Large Fries + 4 Soft Drinks.", price: 1699, tags: ["deal"] }, // TODO confirm contents
  { id: "deal-7-large-pizza-party-combo", category: "deals", name: "Deal #7 — Large Pizza Party Combo", description: "Large Special Pizza + 6 Chicken Wings + Fries + 1.5 L Soft Drink.", price: 1899, tags: ["deal"] }, // TODO confirm contents
];

export const menuItemById = (id: string) => menuItems.find((m) => m.id === id);
