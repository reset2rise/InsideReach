/*
  # Add Stripe Price IDs to Products and Services

  1. Changes
    - Add `stripe_price_id` column to `products` table
    - Add `stripe_price_id` column to `services` table
    - Add `stripe_product_id` column to `products` table (optional, for reference)
    - Add `stripe_product_id` column to `services` table (optional, for reference)
  
  2. Purpose
    - Links database products/services to Stripe Price objects
    - Enables checkout using actual Stripe products
    - Allows syncing between Stripe and database
*/

-- Add Stripe columns to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'stripe_price_id'
  ) THEN
    ALTER TABLE products ADD COLUMN stripe_price_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'stripe_product_id'
  ) THEN
    ALTER TABLE products ADD COLUMN stripe_product_id text;
  END IF;
END $$;

-- Add Stripe columns to services table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'stripe_price_id'
  ) THEN
    ALTER TABLE services ADD COLUMN stripe_price_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'stripe_product_id'
  ) THEN
    ALTER TABLE services ADD COLUMN stripe_product_id text;
  END IF;
END $$;