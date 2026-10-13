import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./data";

export type CartItem = { id: string; color: string; size: string; qty: number };

type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, color?: string, size?: string, qty?: number) => void;
  setQty: (i: number, qty: number) => void;
  removeItem: (i: number) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  inWish: (id: string) => boolean;
  subtotal: number;
  count: number;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  wishOpen: boolean;
  setWishOpen: (b: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (b: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("aura-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("aura-wish") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("aura-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("aura-wish", JSON.stringify(wishlist)); }, [wishlist, ready]);

  const addToCart = (id: string, color?: string, size?: string, qty: number = 1) => {
    const prod = getProduct(id);
    if (!prod) return;
    const c = color ?? prod.colors[0]?.name ?? "";
    const s = size ?? prod.size;
    const addQty = Math.max(1, qty);
    setCart((prev) => {
      const i = prev.findIndex((x) => x.id === id && x.color === c && x.size === s);
      if (i >= 0) return prev.map((x, j) => (j === i ? { ...x, qty: x.qty + addQty } : x));
      return [...prev, { id, color: c, size: s, qty: addQty }];
    });
    setCartOpen(true);
  };

  const subtotal = cart.reduce((a, x) => a + (getProduct(x.id)?.price ?? 0) * x.qty, 0);
  const count = cart.reduce((a, x) => a + x.qty, 0);

  return (
    <StoreCtx.Provider
      value={{
        cart, wishlist, addToCart,
        setQty: (i, qty) => setCart((p) => p.map((x, j) => (j === i ? { ...x, qty: Math.max(1, qty) } : x))),
        removeItem: (i) => setCart((p) => p.filter((_, j) => j !== i)),
        clearCart: () => setCart([]),
        toggleWish: (id) => setWishlist((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
        inWish: (id) => wishlist.includes(id),
        subtotal, count, cartOpen, setCartOpen, wishOpen, setWishOpen, searchOpen, setSearchOpen, quickView, setQuickView,
      }}
    >
      {children}
    </StoreCtx.Provider>
  );
}

export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
};
