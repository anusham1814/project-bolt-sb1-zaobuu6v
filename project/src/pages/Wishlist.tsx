import { Heart, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useProducts } from '@/store/ProductsContext';
import { useRouter } from '@/store/RouterContext';
import ProductCard from '@/components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useStore();
  const { getById } = useProducts();
  const { navigate } = useRouter();

  const items = wishlist
    .map((id) => getById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-[#13131f] py-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
            <Heart className="h-10 w-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-black text-white">Your wishlist is empty</h1>
          <p className="mt-2 text-sm text-gray-400">Save your favorite items here for later.</p>
          <button
            onClick={() => navigate({ name: 'home' })}
            className="mt-6 rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ name: 'home' })}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <h1 className="mb-8 text-3xl font-black text-white">My Wishlist</h1>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
