import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';
import { Crown, Calendar, CreditCard } from 'lucide-react';

interface Subscription {
  subscription_status: string;
  price_id: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  payment_method_brand?: string;
  payment_method_last4?: string;
}

export const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
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
        throw error;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
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
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <Crown className="w-6 h-6 text-yellow-300" />
        <h3 className="text-lg font-semibold">Active Subscription</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-indigo-100 text-sm">Current Plan</p>
          <p className="text-xl font-bold">{product?.name || 'Unknown Plan'}</p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Renews {periodEnd.toLocaleDateString()}</span>
          </div>
          
          {subscription.payment_method_brand && subscription.payment_method_last4 && (
            <div className="flex items-center space-x-1">
              <CreditCard className="w-4 h-4" />
              <span>{subscription.payment_method_brand} •••• {subscription.payment_method_last4}</span>
            </div>
          )}
        </div>
        
        {subscription.cancel_at_period_end && (
          <div className="bg-yellow-500 bg-opacity-20 rounded-md p-3 mt-4">
            <p className="text-sm font-medium">
              Your subscription will cancel at the end of the current period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};