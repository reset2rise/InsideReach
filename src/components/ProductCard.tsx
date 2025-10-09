import React, { useState } from 'react';
import { ShoppingCart, Clock, CreditCard } from 'lucide-react';
import { StripeProduct, formatPrice } from '../stripe-config';

interface ProductCardProps {
  product: StripeProduct;
  onPurchase: (priceId: string) => Promise<void>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await onPurchase(product.priceId);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
          <div className="flex items-center space-x-2">
            {product.mode === 'subscription' ? (
              <Clock className="w-5 h-5 text-blue-600" />
            ) : (
              <CreditCard className="w-5 h-5 text-green-600" />
            )}
          </div>
        </div>
        
        {product.description && (
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.mode === 'subscription' && (
              <span className="text-sm text-gray-500">per month</span>
            )}
          </div>
          
          <button
            onClick={handlePurchase}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
            <span>{isLoading ? 'Processing...' : product.mode === 'subscription' ? 'Subscribe' : 'Buy Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};