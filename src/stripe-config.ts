export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_T7ht6LpVIvKjeZ',
    priceId: 'price_1SBSTsB72uePbUtowGtFP0HJ',
    name: "The Winner's Circle Mens Group",
    price: 70.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_SDOCmGp5MfY7rr',
    priceId: 'price_1RIxQMB72uePbUtoQVDGMKCr',
    name: 'Love, Business & Marriage',
    description: 'This anthology highlights the power that comes with navigating these three powerful aspects of life successfully.',
    price: 10.00,
    currency: 'usd',
    mode: 'payment'
  },
  {
    id: 'prod_Rx3bKBjNC5dMOq',
    priceId: 'price_1R39UPB72uePbUtoSEtXtvZl',
    name: 'Inside Reach "Little Man" Reset One on One Coaching (Gold)',
    description: 'Reach Inside and Unlock the secrets to success and addressing your "Little Man" by joining the Inside Reach Coaching Program',
    price: 497.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_Rx3ItjELyF2062',
    priceId: 'price_1R39ByB72uePbUtoWwRy03xC',
    name: 'Inside Reach "Little Man" Reset One on One Coaching (Standard)',
    description: 'Reach Inside and Unlock the secrets to success and addressing your "Little Man" by joining the Inside Reach Coaching Program (VIP)',
    price: 97.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_Rx2xsNcDgnxxPm',
    priceId: 'price_1R38rpB72uePbUtooHrIm9c9',
    name: 'Transformational Coaching',
    description: 'Transformational Coaching. Lock in on your personal growth and future goals right now!',
    price: 79.00,
    currency: 'usd',
    mode: 'payment'
  },
  {
    id: 'prod_Rx2fwd7oq3UWXp',
    priceId: 'price_1R38aUB72uePbUtoOEbCZnrH',
    name: 'Power of Play Master Class',
    price: 57.00,
    currency: 'usd',
    mode: 'payment'
  },
  {
    id: 'prod_Rx2HxoUPFmbRcU',
    priceId: 'price_1R38CjB72uePbUtoCvNHG1Gq',
    name: "Ask us anything! What's your $49 Question?",
    description: "Ask us any Marriage question. You get a real answer! We've been doing life together for 30 years!",
    price: 49.00,
    currency: 'usd',
    mode: 'payment'
  },
  {
    id: 'prod_RuiQXUWaOWGsHq',
    priceId: 'price_1R0szrB72uePbUtotZvORzbf',
    name: 'Play Date-Game Day/Night',
    description: 'Couples igniting the fire! You\'re joining an opportunity for next level intimacy and relationship, great connections, tasty treats, major fun, and as always giveaways...',
    price: 40.00,
    currency: 'usd',
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.id === id);
};

export const formatPrice = (price: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};