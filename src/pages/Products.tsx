import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { ShoppingBag, Sparkles } from 'lucide-react';

export const Products: React.FC = () => {
  const subscriptionProducts = STRIPE_PRODUCTS.filter(p => p.mode === 'subscription');
  const oneTimeProducts = STRIPE_PRODUCTS.filter(p => p.mode === 'payment');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Our Products & Services</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your life with our comprehensive coaching programs, resources, and experiences designed to help you reach your full potential.
          </p>
        </div>

        {/* Subscription Products */}
        {subscriptionProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Ongoing Programs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subscriptionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* One-time Products */}
        {oneTimeProducts.length > 0 && (
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">One-Time Purchases</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {oneTimeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};