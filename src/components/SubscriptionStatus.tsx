import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getProductByPriceId } from '../stripe-config';
import { Crown, Calendar, AlertCircle } from 'lucide-react';

interface SubscriptionData {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export const SubscriptionStatus: React.FC = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      if (data && data.subscription_status === 'active') {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !subscription) {
    return null;
  }

  const product = getProductByPriceId(subscription.price_id);
  const periodEnd = new Date(subscription.current_period_end * 1000);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-3">
        <Crown className="w-6 h-6 text-yellow-300" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">
            {product?.name || 'Active Subscription'}
          </h3>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Renews {periodEnd.toLocaleDateString()}</span>
            </div>
            {subscription.cancel_at_period_end && (
              <div className="flex items-center space-x-1 text-yellow-300">
                <AlertCircle className="w-4 h-4" />
                <span>Cancels at period end</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};