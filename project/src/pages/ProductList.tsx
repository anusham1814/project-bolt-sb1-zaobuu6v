import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ProductLoading, ProductError, ProductEmpty } from '@/components/ProductStates';
import type { Category } from '@/types';
import { useRouter } from '@/store/RouterContext';
import { useProducts } from '@/store/ProductsContext';

interface ProductListProps {
  title: string;
  subtitle: string;
  category: Category;
}

export default function ProductList({ title, subtitle, category }: ProductListProps) {
  const { navigate } = useRouter();
  const { products, loading, error, refetch } = useProducts();
  const [activeSport, setActiveSport] = useState<string>('All');
  const [sort, setSort] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const availableSports = useMemo(() => {
    const sports = products
      .filter((p) => p.category === category)
      .map((p) => p.sport);
    return Array.from(new Set(sports));
  }, [products, category]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.category === category);
    if (activeSport !== 'All') {
      list = list.filter((p) => p.sport === activeSport);
    }
    switch (sort) {
      case 'price-low':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [products, category, activeSport, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate({ name: 'home' })}
          className="mb-3 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
        >
          ← Back to Home
        </button>
        <h1 className="text-3xl font-black text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
      </div>

      {loading ? (
        <ProductLoading />
      ) : error ? (
        <ProductError message={error} onRetry={refetch} />
      ) : products.length === 0 ? (
        <ProductEmpty />
      ) : (
        <>
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#13131f] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <button
                onClick={() => setActiveSport('All')}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                  activeSport === 'All'
                    ? 'bg-emerald-500 text-[#0a0a0f]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                All
              </button>
              {availableSports.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSport(s)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                    activeSport === s
                      ? 'bg-emerald-500 text-[#0a0a0f]'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-lg border border-white/10 bg-[#0a0a0f] px-4 py-2 text-sm font-semibold text-white outline-none focus:border-emerald-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <ProductEmpty title="No products found for this filter." />
          )}
        </>
      )}
    </div>
  );
}
