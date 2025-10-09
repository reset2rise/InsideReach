import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  inventory_count: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image_url: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const { addItem } = useCart();

  useEffect(() => {
    loadShopItems();
  }, []);

  const loadShopItems = async () => {
    try {
      const [productsResult, servicesResult] = await Promise.all([
        supabase.from('products').select('*').eq('is_active', true),
        supabase.from('services').select('*').eq('is_active', true),
      ]);

      if (productsResult.data) setProducts(productsResult.data);
      if (servicesResult.data) setServices(servicesResult.data);
    } catch (error) {
      console.error('Error loading shop items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: Product | Service, type: 'product' | 'service') => {
    addItem({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      type,
      image_url: item.image_url,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Shop</h1>
          <p className="text-xl text-gray-600">Support our ministry through products and services</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'services'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Services ({services.length})
          </button>
        </div>

        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-600">
                No products available at this time.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-orange-600">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      {product.inventory_count > 0 && (
                        <span className="text-sm text-gray-600">
                          {product.inventory_count} in stock
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product, 'product')}
                      disabled={product.inventory_count === 0}
                      className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5" />
                      {product.inventory_count === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-600">
                No services available at this time.
              </div>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {service.image_url && (
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-orange-600">
                        ${Number(service.price).toFixed(2)}
                      </span>
                      {service.duration && (
                        <span className="text-sm text-gray-600">{service.duration}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(service, 'service')}
                      className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
