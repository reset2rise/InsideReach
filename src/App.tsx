import { useState } from 'react';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Products } from './pages/Products'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Success } from './pages/Success'
import { LogOut, User, ShoppingBag, Home } from 'lucide-react'

function App() {
import AdminDashboard from './components/admin/AdminDashboard';
import ShopPage from './components/shop/ShopPage';
import CheckoutPage from './components/shop/CheckoutPage';
import CartDrawer from './components/shop/CartDrawer';
import { ShoppingCart, LogIn } from 'lucide-react';
import { useCart } from './contexts/CartContext';
  const { user, loading, signOut } = useAuth()
type Page = 'home' | 'shop' | 'checkout' | 'admin';


  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  if (currentPage === 'admin') {
    return <AdminDashboard />;
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

  if (loading) {
    return (
      <Navigation
        onNavigate={setCurrentPage}
        onCartClick={() => setCartOpen(true)}
        cartCount={itemCount}
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCurrentPage('checkout');
        }}
      />
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
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

                <Link to="/" className="flex items-center space-x-2">
                  <img 
                    src="/Inside Reach Ministries logo.png" 
                    alt="Inside Reach Ministries" 
                    className="h-8 w-auto"
                  />
                  <span className="text-xl font-bold text-gray-900">Inside Reach Ministries</span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-6">
                  <Link
                    to="/"
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/products"
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Products</span>
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <button
                      onClick={signOut}
                      className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Life
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Unlock your potential with our comprehensive coaching programs, resources, and community support designed to help you reach new heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Our Programs
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Inside Reach Ministries?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support for your personal and professional growth journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Coaching</h3>
              <p className="text-gray-600">
                One-on-one coaching sessions tailored to your specific needs and goals.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Resources</h3>
              <p className="text-gray-600">
                Access to exclusive content, masterclasses, and transformational materials.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a supportive community of like-minded individuals on similar journeys.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of others who have already started their journey to success.
          </p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            View Our Programs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App