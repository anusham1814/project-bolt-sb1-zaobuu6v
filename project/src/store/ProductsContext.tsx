import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, ProductRow } from '@/types';
import { mapRowToProduct } from '@/types';

interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  getById: (id: number) => Product | undefined;
  refetch: () => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (queryError) {
        throw queryError;
      }

      if (!data || data.length === 0) {
        setProducts([]);
      } else {
        setProducts((data as ProductRow[]).map(mapRowToProduct));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load products.';
      setError(message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function getById(id: number): Product | undefined {
    return products.find((p) => p.id === id);
  }

  const value: ProductsContextValue = {
    products,
    loading,
    error,
    getById,
    refetch: fetchProducts,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
