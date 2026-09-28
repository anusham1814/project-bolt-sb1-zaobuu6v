import { createContext, useContext, useState, type ReactNode } from 'react';

type Route =
  | { name: 'home' }
  | { name: 'jerseys' }
  | { name: 'shoes' }
  | { name: 'product'; id: number }
  | { name: 'cart' }
  | { name: 'wishlist' }
  | { name: 'search' }
  | { name: 'login' }
  | { name: 'register' }
  | { name: 'orders' };

interface RouterContextValue {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: 'home' });

  function navigate(r: Route) {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export type { Route };
