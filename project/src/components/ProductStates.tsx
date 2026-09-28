import { PackageSearch, AlertCircle, PackageOpen, RefreshCw } from 'lucide-react';

export function ProductLoading() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#13131f] to-[#0d0d14]"
        >
          <div className="aspect-square w-full animate-pulse bg-white/5" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
            <div className="mt-2 h-6 w-24 animate-pulse rounded bg-white/5" />
            <div className="mt-3 h-10 w-full animate-pulse rounded-xl bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#13131f] py-20 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10">
        <AlertCircle className="h-10 w-10 text-rose-400" />
      </div>
      <h2 className="text-xl font-black text-white">Something went wrong</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-400">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}

export function ProductEmpty({ title = 'No products available' }: { title?: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#13131f] py-20 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
        {title.includes('No products found') ? (
          <PackageSearch className="h-10 w-10 text-gray-500" />
        ) : (
          <PackageOpen className="h-10 w-10 text-gray-500" />
        )}
      </div>
      <h2 className="text-xl font-black text-white">{title}</h2>
      <p className="mt-2 text-sm text-gray-400">Check back soon for new arrivals.</p>
    </div>
  );
}
