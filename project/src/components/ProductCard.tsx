import { Star, ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/StoreContext';
import { useRouter } from '@/store/RouterContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { navigate } = useRouter();

  const discount =
    product.discount > 0
      ? product.discount
      : Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100,
        );

  const outOfStock = product.stock <= 0;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#13131f] to-[#0d0d14] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
    >
      {/* Image */}
      <button
        onClick={() => navigate({ name: 'product', id: product.id })}
        className="relative aspect-square overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-[#0a0a0f]">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#0a0a0f]/90 px-4 py-2 text-sm font-black text-white">
            Out of Stock
          </span>
        )}
      </button>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 translate-y-8 items-center justify-center rounded-full bg-[#0a0a0f]/80 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        aria-label="Toggle wishlist"
      >
        <Heart
          className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
        />
      </button>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-400">{product.sport}</span>
          <span className="text-xs font-medium text-gray-500">{product.brand}</span>
        </div>
        <button
          onClick={() => navigate({ name: 'product', id: product.id })}
          className="mb-2 line-clamp-2 text-left text-sm font-bold text-white transition-colors hover:text-emerald-400"
        >
          {product.name}
        </button>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-300">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
          {product.stock > 0 && product.stock <= 10 && (
            <span className="ml-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-black text-white">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addToCart(product, product.sizes[0] ?? '', product.colors[0] ?? '')}
          disabled={outOfStock || product.sizes.length === 0}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:text-[#0a0a0f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:text-white"
        >
          <ShoppingCart className="h-4 w-4" />
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
