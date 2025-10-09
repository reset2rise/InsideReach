import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, User } from 'lucide-react';
import { getProductByPriceId, formatPrice } from '../stripe-config';

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [productInfo, setProductInfo] = useState<any>(null);
  
  const sessionId = searchParams.get('session_id');
  const priceId = searchParams.get('price_id');

  useEffect(() => {
    if (priceId) {
      const product = getProductByPriceId(priceId);
      setProductInfo(product);
    }
  }, [priceId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          {productInfo && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {productInfo.name}
              </h3>
              <p className="text-2xl font-bold text-green-600 mb-2">
                {formatPrice(productInfo.price, productInfo.currency)}
              </p>
              {productInfo.mode === 'subscription' && (
                <p className="text-sm text-gray-500">Monthly subscription</p>
              )}
            </div>
          )}

          <div className="space-y-4">
            {productInfo?.mode === 'subscription' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  You now have access to your subscription. Check your account dashboard for details.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/account"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>View Account</span>
              </Link>
              
              <Link
                to="/"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Session ID: {sessionId}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You will receive a confirmation email shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};