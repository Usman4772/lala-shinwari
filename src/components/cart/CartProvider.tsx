"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { menuItemById, type MenuItem } from "@/data/menu";

export type CartLine = { id: string; qty: number };

type State = { lines: CartLine[] };

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; id: string; qty?: number }
  | { type: "set"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

const STORAGE_KEY = "goldenfork-cart-v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.id === action.id);
      if (existing) {
        return {
          lines: state.lines.map((l) => (l.id === action.id ? { ...l, qty: l.qty + qty } : l)),
        };
      }
      return { lines: [...state.lines, { id: action.id, qty }] };
    }
    case "set":
      if (action.qty <= 0) return { lines: state.lines.filter((l) => l.id !== action.id) };
      return { lines: state.lines.map((l) => (l.id === action.id ? { ...l, qty: action.qty } : l)) };
    case "remove":
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case "clear":
      return { lines: [] };
  }
}

export type CartEntry = CartLine & { item: MenuItem };

type CartContextValue = {
  entries: CartEntry[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
  /** Increments when an item is added — used for the "added" toast. */
  lastAdded: { id: string; at: number } | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const hydrated = useRef(false);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ id: string; at: number } | null>(null);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          dispatch({
            type: "hydrate",
            lines: parsed.filter((l) => l && typeof l.id === "string" && l.qty > 0 && menuItemById(l.id)),
          });
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist (skip the very first run so we never overwrite storage with an empty cart)
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage full or disabled */
    }
  }, [state.lines]);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const entries = useMemo<CartEntry[]>(
    () =>
      state.lines
        .map((l) => {
          const item = menuItemById(l.id);
          return item ? { ...l, item } : null;
        })
        .filter((e): e is CartEntry => e !== null),
    [state.lines],
  );

  const count = useMemo(() => entries.reduce((s, e) => s + e.qty, 0), [entries]);
  const total = useMemo(() => entries.reduce((s, e) => s + e.qty * e.item.price, 0), [entries]);

  const add = useCallback((id: string, qty?: number) => {
    dispatch({ type: "add", id, qty });
    setLastAdded({ id, at: Date.now() });
  }, []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: "set", id, qty }), []);
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const qtyOf = useCallback(
    (id: string) => state.lines.find((l) => l.id === id)?.qty ?? 0,
    [state.lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({ entries, count, total, isOpen, open, close, add, setQty, remove, clear, qtyOf, lastAdded }),
    [entries, count, total, isOpen, open, close, add, setQty, remove, clear, qtyOf, lastAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
