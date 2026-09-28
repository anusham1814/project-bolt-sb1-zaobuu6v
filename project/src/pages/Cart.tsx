import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useProducts } from '@/store/ProductsContext';
import { useRouter } from '@/store/RouterContext';

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, cartTotal } = useStore();
  const { getById } = useProducts();
  const { navigate } = useRouter();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-[#13131f] py-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
            <ShoppingCart className="h-10 w-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-black text-white">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-400">Browse our collection and find your next favorite gear.</p>
          <button
            onClick={() => navigate({ name: 'home' })}
            className="mt-6 rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ name: 'home' })}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </button>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black text-white">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm font-semibold text-gray-400 transition-colors hover:text-rose-400"
        >
          Clear All
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {cart.map((item) => {
            const product = getById(item.productId);
            if (!product) return null;
            return (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-2xl border border-white/10 bg-[#13131f] p-4"
              >
                <button
                  onClick={() => navigate({ name: 'product', id: product.id })}
                  className="shrink-0 overflow-hidden rounded-xl"
                >
                  <img src={product.image} alt={product.name} className="h-24 w-24 object-cover" />
                </button>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <button
                        onClick={() => navigate({ name: 'product', id: product.id })}
                        className="text-left text-sm font-bold text-white transition-colors hover:text-emerald-400"
                      >
                        {product.name}
                      </button>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size, item.color)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    {/* Qty */}
                    <div className="flex items-center rounded-lg border border-white/10 bg-white/5">
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.color, item.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center text-gray-400 transition-colors hover:text-white"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-white">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.color, item.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center text-gray-400 transition-colors hover:text-white"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="text-lg font-black text-white">
                      ${(product.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#13131f] p-6">
            <h2 className="text-lg font-black text-white">Order Summary</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="font-semibold text-white">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (8%)</span>
                <span className="font-semibold text-white">${tax.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
                  Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-white">Total</span>
                  <span className="text-xl font-black text-emerald-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30">
              Checkout
            </button>
            <p className="mt-3 text-center text-xs text-gray-500">Demo store — checkout is not active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
