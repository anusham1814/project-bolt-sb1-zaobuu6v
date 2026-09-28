import { Search, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useProducts } from '@/store/ProductsContext';
import { useRouter } from '@/store/RouterContext';
import ProductCard from '@/components/ProductCard';
import { useMemo } from 'react';

export default function SearchPage() {
  const { search, setSearch } = useStore();
  const { products, loading } = useProducts();
  const { navigate } = useRouter();

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }, [search, products]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ name: 'home' })}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <h1 className="mb-6 text-3xl font-black text-white">Search</h1>

      {/* Search input */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#13131f] px-5 py-4">
        <Search className="h-5 w-5 shrink-0 text-gray-500" />
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jerseys, shoes, sports, brands..."
          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-sm font-semibold text-gray-400 transition-colors hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <p className="py-20 text-center text-gray-400">Loading products...</p>
      ) : search.trim() === '' ? (
        <div className="rounded-2xl border border-white/10 bg-[#13131f] py-20 text-center">
          <p className="text-gray-400">Type something to search for products.</p>
        </div>
      ) : results.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-gray-400">
            {results.length} result{results.length !== 1 && 's'} for "{search}"
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#13131f] py-20 text-center">
          <p className="text-lg font-bold text-white">No results found</p>
          <p className="mt-2 text-sm text-gray-400">
            Try searching for "jersey", "shoes", "football", "Nike", or "running".
          </p>
        </div>
      )}
    </div>
  );
}
