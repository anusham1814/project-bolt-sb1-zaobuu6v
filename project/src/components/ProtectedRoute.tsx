import type { ReactNode } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from '@/store/RouterContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { navigate } = useRouter();

  if (loading) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#13131f] py-16 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
            <Lock className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Sign in required</h1>
          <p className="mt-2 max-w-xs text-sm text-gray-400">
            Please sign in to access this page and manage your cart, wishlist, and orders.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate({ name: 'login' })}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400"
            >
              Login
            </button>
            <button
              onClick={() => navigate({ name: 'register' })}
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
              Create Account
            </button>
          </div>
          <button
            onClick={() => navigate({ name: 'home' })}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
