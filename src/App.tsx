import { useState } from 'react';
import Hero from './components/Hero';
import MissionVision from './components/MissionVision';
import Programs from './components/Programs';
import WinnersCircle from './components/WinnersCircle';
import MarriageEnrichment from './components/MarriageEnrichment';
import BridgeBuilders from './components/BridgeBuilders';
import About from './components/About';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import ShopPage from './components/shop/ShopPage';
import CheckoutPage from './components/shop/CheckoutPage';
import CartDrawer from './components/shop/CartDrawer';
import { ShoppingCart, LogIn } from 'lucide-react';
import { useCart } from './contexts/CartContext';

type Page = 'home' | 'shop' | 'checkout' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  if (currentPage === 'admin') {
    return <AdminDashboard onBackToWebsite={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'checkout') {
    return <CheckoutPage onBack={() => setCurrentPage('shop')} />;
  }

  if (currentPage === 'shop') {
    return (
      <>
        <ShopPage />
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCurrentPage('checkout');
          }}
        />
        <Navigation
          onNavigate={setCurrentPage}
          onCartClick={() => setCartOpen(true)}
          cartCount={itemCount}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        onNavigate={setCurrentPage}
        onCartClick={() => setCartOpen(true)}
        cartCount={itemCount}
      />
      <Hero />
      <MissionVision />
      <Programs />
      <WinnersCircle />
      <MarriageEnrichment />
      <BridgeBuilders />
      <About />
      <CallToAction />
      <Contact />
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCurrentPage('checkout');
        }}
      />
    </div>
  );
}

function Navigation({
  onNavigate,
  onCartClick,
  cartCount,
}: {
  onNavigate: (page: Page) => void;
  onCartClick: () => void;
  cartCount: number;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="text-xl font-bold text-gray-900 hover:text-orange-600 transition"
          >
            Inside Reach Ministries
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('shop')}
              className="text-gray-700 hover:text-orange-600 font-medium transition"
            >
              Shop
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-orange-600 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default App;
