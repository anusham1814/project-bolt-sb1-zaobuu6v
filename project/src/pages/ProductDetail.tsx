import { useState } from 'react';
import { Star, Heart, ShoppingCart, ArrowLeft, Check, Truck, RotateCcw, Shield, Loader2, PackageX } from 'lucide-react';
import { useProducts } from '@/store/ProductsContext';
import { useStore } from '@/store/StoreContext';
import { useRouter } from '@/store/RouterContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail({ id }: { id: number }) {
  const { products, loading, getById } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { navigate } = useRouter();

  const product = getById(id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          <PackageX className="h-10 w-10 text-gray-500" />
        </div>
        <p className="text-lg font-bold text-white">Product not found</p>
        <button
          onClick={() => navigate({ name: 'home' })}
          className="mt-4 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-[#0a0a0f]"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const discount =
    product.discount > 0
      ? product.discount
      : Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const outOfStock = product.stock <= 0;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAdd() {
    if (!product) return;
    addToCart(product, selectedSize || product.sizes[0] || '', selectedColor || product.colors[0] || '', qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const galleryImages = product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ name: product.category === 'jerseys' ? 'jerseys' : 'shoes' })}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {product.category === 'jerseys' ? 'Jerseys' : 'Shoes'}
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-[#13131f]">
            <img
              src={galleryImages[activeImg]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          {galleryImages.length > 1 && (
            <div className="flex gap-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden rounded-xl border-2 transition-all ${
                    activeImg === i ? 'border-emerald-500' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt="" className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              {product.sport}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
              {product.brand}
            </span>
            {product.badge && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                {product.badge}
              </span>
            )}
            {outOfStock ? (
              <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-400">
                Out of Stock
              </span>
            ) : product.stock <= 10 ? (
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
                Only {product.stock} left
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                In Stock
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-4 w-4 ${
                    n <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-300">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-black text-white">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {discount > 0 && (
              <span className="rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-gray-400">{product.description}</p>

          {/* Available sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold text-white">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-all ${
                      (selectedSize || product.sizes[0]) === s
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          {product.colors.length > 0 && (
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-white">
                Color: <span className="font-normal text-gray-400">{selectedColor || product.colors[0]}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                      (selectedColor || product.colors[0]) === c
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Actions */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-lg font-bold text-white transition-colors hover:text-emerald-400"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-bold text-white">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                className="flex h-11 w-11 items-center justify-center text-lg font-bold text-white transition-colors hover:text-emerald-400"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-500 text-[#0a0a0f] hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30'
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-rose-500/50"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
              />
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-[#13131f] p-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-gray-400">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RotateCcw className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-gray-400">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-gray-400">Authentic Gear</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-black text-white">You Might Also Like</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
