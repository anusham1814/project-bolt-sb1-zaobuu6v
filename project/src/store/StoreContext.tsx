import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '@/types';

interface StoreContextValue {
  cart: CartItem[];
  wishlist: number[];
  search: string;
  setSearch: (s: string) => void;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQty: (productId: number, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  cartCount: number;
  cartTotal: number;
  setProductsForCart: (products: Product[]) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [productsRef, setProductsRef] = useState<Record<number, Product>>({});

  function setProductsForCart(products: Product[]) {
    setProductsRef(Object.fromEntries(products.map((p) => [p.id, p])));
  }

  function addToCart(product: Product, size: string, color: string, qty = 1) {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === product.id && i.size === size && i.color === color,
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { productId: product.id, qty, size, color }];
    });
  }

  function removeFromCart(productId: number, size: string, color: string) {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.size === size && i.color === color),
      ),
    );
  }

  function updateQty(productId: number, size: string, color: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, qty }
          : i,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(productId: number) {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }

  function isInWishlist(productId: number) {
    return wishlist.includes(productId);
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => {
    return sum + i.qty * (productsRef[i.productId]?.price ?? 0);
  }, 0);

  const value: StoreContextValue = {
    cart,
    wishlist,
    search,
    setSearch,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isInWishlist,
    cartCount,
    cartTotal,
    setProductsForCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
