import React from 'react'
import { useSubscription } from '../../hooks/useSubscription'
import { formatPrice } from '../../stripe-config'
import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react'

export function SubscriptionStatus() {
  const { subscription, loading, error, hasActiveSubscription, isTrialing, isPastDue } = useSubscription()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <XCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      </div>
    )
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-gray-600 mr-2" />
          <span className="text-gray-700">No active subscription</span>
        </div>
      </div>
    )
  }

  const getStatusIcon = () => {
    if (hasActiveSubscription) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (isTrialing) return <Clock className="w-5 h-5 text-blue-600" />
    if (isPastDue) return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    return <XCircle className="w-5 h-5 text-red-600" />
  }

  const getStatusColor = () => {
    if (hasActiveSubscription) return 'bg-green-50 border-green-200 text-green-700'
    if (isTrialing) return 'bg-blue-50 border-blue-200 text-blue-700'
    if (isPastDue) return 'bg-yellow-50 border-yellow-200 text-yellow-700'
    return 'bg-red-50 border-red-200 text-red-700'
  }

  const getStatusText = () => {
    switch (subscription.subscription_status) {
      case 'active': return 'Active'
      case 'trialing': return 'Trial Period'
      case 'past_due': return 'Past Due'
      case 'canceled': return 'Canceled'
      case 'unpaid': return 'Unpaid'
      case 'paused': return 'Paused'
      case 'incomplete': return 'Incomplete'
      case 'incomplete_expired': return 'Incomplete (Expired)'
      default: return 'Unknown'
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getStatusIcon()}
          <div className="ml-3">
            <h3 className="font-medium">{subscription.product_name || 'Subscription'}</h3>
            <p className="text-sm opacity-75">Status: {getStatusText()}</p>
          </div>
        </div>
        {subscription.current_period_end && (
          <div className="text-right text-sm">
            <p>Next billing:</p>
            <p className="font-medium">
              {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      
      {subscription.payment_method_brand && subscription.payment_method_last4 && (
        <div className="mt-3 pt-3 border-t border-current border-opacity-20">
          <p className="text-sm">
            Payment method: {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
          </p>
        </div>
      )}
    </div>
  )
}