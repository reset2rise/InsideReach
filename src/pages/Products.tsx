import React from 'react'
import { stripeProducts } from '../stripe-config'
import { ProductCard } from '../components/products/ProductCard'
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus'
import { useAuth } from '../hooks/useAuth'

export function Products() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products & Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your life with our comprehensive coaching programs, resources, and services designed to help you reach your full potential.
          </p>
        </div>

        {user && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Subscription</h2>
            <SubscriptionStatus />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}