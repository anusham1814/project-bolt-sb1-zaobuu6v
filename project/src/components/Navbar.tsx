import { useState } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, Home, Shirt, Footprints, User, LogOut, Package, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useRouter } from '@/store/RouterContext';
import { useAuth } from '@/store/AuthContext';

export default function Navbar() {
  const { cartCount, wishlist, search, setSearch } = useStore();
  const { route, navigate } = useRouter();
  const { user, fullName, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', route: { name: 'home' as const }, icon: Home },
    { label: 'Jerseys', route: { name: 'jerseys' as const }, icon: Shirt },
    { label: 'Sports Shoes', route: { name: 'shoes' as const }, icon: Footprints },
  ];

  const isActive = (name: string) => route.name === name;

  async function handleSignOut() {
    await signOut();
    setUserMenuOpen(false);
    setMobileOpen(false);
    navigate({ name: 'home' });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navigate({ name: 'home' })}
          className="flex shrink-0 items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/30">
            <span className="text-lg font-black text-[#0a0a0f]">S</span>
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Sport<span className="text-emerald-400">Shopz</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isActive(item.route.name)
                  ? 'bg-white/10 text-emerald-400'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={() => navigate({ name: 'wishlist' })}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate({ name: 'cart' })}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-[#0a0a0f]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth section */}
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20">
                  <span className="text-xs font-black text-emerald-400">
                    {(fullName ?? user.email ?? '?')[0].toUpperCase()}
                  </span>
                </div>
                <span className="max-w-24 truncate">{fullName ?? 'Account'}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#13131f] shadow-2xl">
                    <div className="border-b border-white/10 px-4 py-3">
                      <p className="truncate text-sm font-bold text-white">{fullName ?? 'User'}</p>
                      <p className="truncate text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { navigate({ name: 'orders' }); setUserMenuOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-rose-400"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={() => navigate({ name: 'login' })}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Login
              </button>
              <button
                onClick={() => navigate({ name: 'register' })}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#0d0d14] px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <Search className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate({ name: 'search' });
                  setSearchOpen(false);
                }
              }}
              placeholder="Search jerseys, shoes, sports..."
              className="w-full bg-transparent py-2 text-sm text-white placeholder-gray-500 outline-none"
            />
            <button
              onClick={() => {
                navigate({ name: 'search' });
                setSearchOpen(false);
              }}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-[#0a0a0f] transition-colors hover:bg-emerald-400"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0d0d14] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.route);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                  isActive(item.route.name)
                    ? 'bg-white/10 text-emerald-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}

            {user ? (
              <>
                <div className="my-2 border-t border-white/10" />
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                    <span className="text-sm font-black text-emerald-400">
                      {(fullName ?? user.email ?? '?')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{fullName ?? 'User'}</p>
                    <p className="truncate text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { navigate({ name: 'orders' }); setMobileOpen(false); }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  <Package className="h-5 w-5" />
                  My Orders
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-300 transition-all hover:bg-white/5 hover:text-rose-400"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="my-2 border-t border-white/10" />
                <button
                  onClick={() => { navigate({ name: 'login' }); setMobileOpen(false); }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  <User className="h-5 w-5" />
                  Login
                </button>
                <button
                  onClick={() => { navigate({ name: 'register' }); setMobileOpen(false); }}
                  className="flex items-center gap-3 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400"
                >
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
