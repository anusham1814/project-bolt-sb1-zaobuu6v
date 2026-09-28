import { ArrowRight, Trophy, Dribbble, Footprints, Target, Dumbbell, Zap } from 'lucide-react';
import { useRouter } from '@/store/RouterContext';
import type { Route } from '@/store/RouterContext';
import { useProducts } from '@/store/ProductsContext';
import { useStore } from '@/store/StoreContext';
import ProductCard from '@/components/ProductCard';
import { ProductLoading, ProductError, ProductEmpty } from '@/components/ProductStates';

const iconMap: Record<string, typeof Trophy> = {
  Trophy,
  Dribbble,
  Footprints,
  Target,
  Dumbbell,
};

const categories = [
  { name: 'Football', icon: 'Trophy' },
  { name: 'Basketball', icon: 'Dribbble' },
  { name: 'Running', icon: 'Footprints' },
  { name: 'Tennis', icon: 'Target' },
  { name: 'Training', icon: 'Dumbbell' },
];

export default function Home() {
  const { navigate } = useRouter();
  const { products, loading, error, refetch } = useProducts();
  const { setProductsForCart } = useStore();

  setProductsForCart(products);

  if (loading) {
    return (
      <div>
        <Hero navigate={navigate} />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-white sm:text-3xl">Featured Jerseys</h2>
          </div>
          <ProductLoading />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Hero navigate={navigate} />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ProductError message={error} onRetry={refetch} />
        </section>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <Hero navigate={navigate} />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ProductEmpty />
        </section>
      </div>
    );
  }

  return (
    <div>
      <Hero navigate={navigate} />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Shop by Sport</h2>
          <p className="mt-2 text-sm text-gray-400">Find gear built for your game</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Zap;
            return (
              <button
                key={cat.name}
                onClick={() => navigate({ name: 'jerseys' })}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-[#13131f] to-[#0d0d14] p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-emerald-500/20">
                  <Icon className="h-7 w-7 text-emerald-400" />
                </div>
                <span className="text-sm font-bold text-white">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Jerseys */}
      <FeaturedSection
        title="Featured Jerseys"
        subtitle="Rep your team in style"
        category="jerseys"
        viewAllRoute={{ name: 'jerseys' }}
        products={products}
        navigate={navigate}
      />

      {/* Featured Shoes */}
      <FeaturedSection
        title="Featured Shoes"
        subtitle="Step up your performance"
        category="shoes"
        viewAllRoute={{ name: 'shoes' }}
        products={products}
        navigate={navigate}
      />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-[#13131f] to-cyan-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-black text-white sm:text-3xl">Ready to Dominate?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
            Join thousands of athletes who trust SportShopz for their game-day gear.
          </p>
          <button
            onClick={() => navigate({ name: 'jerseys' })}
            className="mt-6 rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Start Shopping
          </button>
        </div>
      </section>
    </div>
  );
}

function Hero({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/32190700/pexels-photo-32190700.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <span className="mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
          Premium Sports Gear
        </span>
        <h1 className="max-w-2xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
          Upgrade <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Your Game</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-gray-400 sm:text-lg">
          Shop premium jerseys and performance shoes engineered for athletes. From the pitch to the court, gear up with the best.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate({ name: 'jerseys' })}
            className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold text-[#0a0a0f] transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Shop Jerseys
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => navigate({ name: 'shoes' })}
            className="group flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:border-emerald-500/50 hover:bg-white/10"
          >
            Shop Shoes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturedSection({
  title,
  subtitle,
  category,
  viewAllRoute,
  products,
  navigate,
}: {
  title: string;
  subtitle: string;
  category: 'jerseys' | 'shoes';
  viewAllRoute: Route;
  products: ReturnType<typeof useProducts>['products'];
  navigate: (r: Route) => void;
}) {
  const items = products.filter((p) => p.category === category).slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
        </div>
        <button
          onClick={() => navigate(viewAllRoute)}
          className="group flex items-center gap-1.5 text-sm font-bold text-emerald-400 transition-colors hover:text-emerald-300"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
