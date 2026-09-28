import { Package, ArrowLeft, PackageX } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from '@/store/RouterContext';

export default function Orders() {
  const { user, fullName } = useAuth();
  const { navigate } = useRouter();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ name: 'home' })}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
          <Package className="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">My Orders</h1>
          <p className="text-sm text-gray-400">Welcome back, {fullName ?? user?.email}</p>
        </div>
      </div>

      <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#13131f] py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          <PackageX className="h-10 w-10 text-gray-500" />
        </div>
        <h2 className="text-xl font-black text-white">No orders yet</h2>
        <p className="mt-2 text-sm text-gray-400">
          When you place an order, it will appear here.
        </p>
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
