import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { stripeProducts } from '../stripe-config';
import { supabase } from '../lib/supabase';

export const Products: React.FC = () => {
  const handlePurchase = async (priceId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: session?.user?.id,
          userEmail: session?.user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    }
  };

  // Separate products by type
  const subscriptionProducts = stripeProducts.filter(p => p.mode === 'subscription');
  const oneTimeProducts = stripeProducts.filter(p => p.mode === 'payment');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Life with Inside Reach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive programs and resources designed to help you unlock your potential 
            and create lasting change in your relationships and personal growth.
          </p>
        </div>

        {/* Subscription Products */}
        {subscriptionProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Ongoing Programs & Coaching
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subscriptionProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>
          </div>
        )}

        {/* One-time Products */}
        {oneTimeProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Books, Classes & Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {oneTimeProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};