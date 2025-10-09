import React, { useState } from 'react'
import { StripeProduct, formatPrice } from '../../stripe-config'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { ShoppingCart, Clock, CreditCard } from 'lucide-react'

interface ProductCardProps {
  product: StripeProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handlePurchase = async () => {
    if (!user) {
      setMessage({ type: 'error', text: 'Please sign in to make a purchase' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { data: session } = await supabase.auth.getSession()
      
      if (!session.session?.access_token) {
        setMessage({ type: 'error', text: 'Authentication required' })
        return
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/products`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to start checkout process' })
    } finally {
      setLoading(false)
    }
  }

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
          <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.mode === 'subscription' && (
              <span className="text-gray-500 ml-2">/month</span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {product.mode === 'subscription' ? 'Subscription' : 'One-time payment'}
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === 'error' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>{product.mode === 'subscription' ? 'Subscribe Now' : 'Buy Now'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}