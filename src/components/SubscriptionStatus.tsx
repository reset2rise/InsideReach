import React, { useEffect, useState } from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getProductByPriceId, formatPrice } from '../stripe-config';

interface SubscriptionData {
  subscription_status: string;
  price_id: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  payment_method_brand: string;
  payment_method_last4: string;
}

export const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .eq('subscription_status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return null;
  }

  const product = getProductByPriceId(subscription.price_id);
  const periodEnd = new Date(subscription.current_period_end * 1000);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-200">
      <div className="flex items-center space-x-3 mb-4">
        <Crown className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Active Subscription</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-900">{product?.name || 'Unknown Plan'}</h4>
          <p className="text-sm text-gray-600">
            {product ? formatPrice(product.price, product.currency) : ''} per month
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {subscription.cancel_at_period_end 
              ? `Cancels on ${periodEnd.toLocaleDateString()}`
              : `Renews on ${periodEnd.toLocaleDateString()}`
            }
          </span>
        </div>
        
        {subscription.payment_method_brand && subscription.payment_method_last4 && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CreditCard className="w-4 h-4" />
            <span>
              {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
            </span>
          </div>
        )}
        
        {subscription.cancel_at_period_end && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              Your subscription will not renew automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};