import { useState } from 'react';
import { Mail, Lock, ArrowLeft, Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from '@/store/RouterContext';

export default function Login() {
  const { signIn } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    const { error: authError } = await signIn(email.trim(), password);
    setLoading(false);
    if (authError) {
      setError(authError);
      return;
    }
    navigate({ name: 'home' });
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ name: 'home' })}
        className="mb-8 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#13131f] to-[#0d0d14] p-8">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
            <LogIn className="h-7 w-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-400">Sign in to your SportShopz account</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-white">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-emerald-500">
              <Mail className="h-4 w-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-transparent py-3 text-sm text-white placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-white">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-emerald-500">
              <Lock className="h-4 w-4 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-transparent py-3 text-sm text-white placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => navigate({ name: 'register' })}
            className="font-bold text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
