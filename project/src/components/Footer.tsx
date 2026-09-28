import { Heart } from 'lucide-react';
import { useRouter } from '@/store/RouterContext';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="border-t border-white/10 bg-[#0d0d14]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
                <span className="text-base font-black text-[#0a0a0f]">S</span>
              </div>
              <span className="text-lg font-black text-white">
                Sport<span className="text-emerald-400">Shopz</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Premium jerseys and performance shoes for athletes who refuse to settle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Shop</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <button onClick={() => navigate({ name: 'jerseys' })} className="text-gray-400 transition-colors hover:text-emerald-400">
                  Jerseys
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: 'shoes' })} className="text-gray-400 transition-colors hover:text-emerald-400">
                  Sports Shoes
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: 'wishlist' })} className="text-gray-400 transition-colors hover:text-emerald-400">
                  Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ name: 'cart' })} className="text-gray-400 transition-colors hover:text-emerald-400">
                  Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Support</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li>Shipping Info</li>
              <li>Returns &amp; Exchanges</li>
              <li>Size Guide</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Company</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">© 2026 SportShopz. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            Built with <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> for athletes
          </p>
        </div>
      </div>
    </footer>
  );
}
