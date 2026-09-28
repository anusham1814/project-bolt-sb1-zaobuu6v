import { StoreProvider } from '@/store/StoreContext';
import { ProductsProvider } from '@/store/ProductsContext';
import { AuthProvider } from '@/store/AuthContext';
import { RouterProvider, useRouter } from '@/store/RouterContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import ProductList from '@/pages/ProductList';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Wishlist from '@/pages/Wishlist';
import SearchPage from '@/pages/SearchPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Orders from '@/pages/Orders';

function Pages() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <Home />;
    case 'jerseys':
      return (
        <ProductList
          title="Jerseys"
          subtitle="Premium jerseys for every sport"
          category="jerseys"
        />
      );
    case 'shoes':
      return (
        <ProductList
          title="Sports Shoes"
          subtitle="Performance footwear built to win"
          category="shoes"
        />
      );
    case 'product':
      return <ProductDetail id={route.id} />;
    case 'search':
      return <SearchPage />;
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    case 'cart':
      return (
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      );
    case 'wishlist':
      return (
        <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      );
    case 'orders':
      return (
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      );
    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <StoreProvider>
          <RouterProvider>
            <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
              <Navbar />
              <main className="flex-1">
                <Pages />
              </main>
              <Footer />
            </div>
          </RouterProvider>
        </StoreProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
