import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Package } from 'lucide-react';

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // In a real implementation, you might fetch order details using the session_id
    // For now, we'll show a generic success message
    if (sessionId) {
      setOrderDetails({ sessionId });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-24 h-24 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been processed successfully.
          </p>

          {sessionId && (
            <div className="bg-white rounded-lg p-6 shadow-md mb-8">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Session ID
              </h3>
              <p className="text-sm font-mono text-gray-900 break-all">
                {sessionId}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              You will receive a confirmation email shortly with your order details.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <Package className="w-5 h-5 mr-2" />
                View More Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};