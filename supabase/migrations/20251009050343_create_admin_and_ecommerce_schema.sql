/*
  # Inside Reach Ministries - Admin Panel & E-commerce Schema

  ## Overview
  This migration creates a complete content management and e-commerce system for Inside Reach Ministries, 
  enabling admin users to manage content, pages, products, services, and process orders with payments.

  ## 1. New Tables

  ### Authentication & Users
  - `admin_users`
    - `id` (uuid, primary key) - Links to auth.users
    - `email` (text) - Admin email address
    - `full_name` (text) - Admin's full name
    - `role` (text) - Admin role (super_admin, content_editor, order_manager)
    - `created_at` (timestamptz) - Account creation timestamp
    - `last_login` (timestamptz) - Last login timestamp

  ### Content Management
  - `site_content`
    - `id` (uuid, primary key)
    - `section_key` (text, unique) - Identifier for content section (e.g., 'hero_title', 'about_text')
    - `content_type` (text) - Type of content (text, html, image_url, video_url)
    - `content_value` (text) - The actual content
    - `updated_at` (timestamptz)
    - `updated_by` (uuid) - References admin_users

  - `custom_pages`
    - `id` (uuid, primary key)
    - `slug` (text, unique) - URL-friendly page identifier
    - `title` (text) - Page title
    - `content` (text) - HTML content
    - `meta_description` (text) - SEO meta description
    - `is_published` (boolean) - Publication status
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
    - `created_by` (uuid) - References admin_users

  ### E-commerce
  - `products`
    - `id` (uuid, primary key)
    - `name` (text) - Product name
    - `description` (text) - Product description
    - `price` (decimal) - Price in dollars
    - `image_url` (text) - Product image URL
    - `category` (text) - Product category
    - `is_active` (boolean) - Active status
    - `inventory_count` (integer) - Stock quantity
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  - `services`
    - `id` (uuid, primary key)
    - `name` (text) - Service name
    - `description` (text) - Service description
    - `price` (decimal) - Price in dollars
    - `duration` (text) - Service duration (e.g., "1 hour", "3 months")
    - `image_url` (text) - Service image URL
    - `is_active` (boolean) - Active status
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  - `orders`
    - `id` (uuid, primary key)
    - `order_number` (text, unique) - Human-readable order number
    - `customer_email` (text) - Customer email
    - `customer_name` (text) - Customer name
    - `customer_phone` (text) - Customer phone
    - `total_amount` (decimal) - Order total
    - `status` (text) - Order status (pending, paid, processing, completed, cancelled)
    - `stripe_payment_id` (text) - Stripe payment intent ID
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  - `order_items`
    - `id` (uuid, primary key)
    - `order_id` (uuid) - References orders
    - `item_type` (text) - Type of item (product, service)
    - `item_id` (uuid) - References products or services
    - `item_name` (text) - Name at time of purchase
    - `quantity` (integer) - Quantity ordered
    - `unit_price` (decimal) - Price per unit at time of purchase
    - `subtotal` (decimal) - Line item total

  ## 2. Security
  - Enable RLS on all tables
  - Admin users can manage all content and orders
  - Public users can view published content, products, services
  - Public users can create orders (for checkout process)

  ## 3. Important Notes
  - All tables use timestamptz for proper timezone handling
  - Prices are stored as decimal(10,2) for accurate currency representation
  - RLS policies ensure data security while allowing necessary public access
  - Order numbers are generated for user-friendly order tracking
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'content_editor' CHECK (role IN ('super_admin', 'content_editor', 'order_manager')),
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can read own profile"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin users can update own profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('text', 'html', 'image_url', 'video_url')),
  content_value text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id)
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
  ON site_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated admins can insert site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can delete site content"
  ON site_content FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create custom_pages table
CREATE TABLE IF NOT EXISTS custom_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  meta_description text DEFAULT '',
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admin_users(id)
);

ALTER TABLE custom_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published pages"
  ON custom_pages FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated admins can view all pages"
  ON custom_pages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can insert pages"
  ON custom_pages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update pages"
  ON custom_pages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can delete pages"
  ON custom_pages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  image_url text DEFAULT '',
  category text DEFAULT 'general',
  is_active boolean DEFAULT true,
  inventory_count integer DEFAULT 0 CHECK (inventory_count >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated admins can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  duration text DEFAULT '',
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated admins can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text DEFAULT '',
  total_amount decimal(10,2) NOT NULL CHECK (total_amount >= 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'cancelled')),
  stripe_payment_id text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own orders"
  ON orders FOR SELECT
  TO public
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('product', 'service')),
  item_id uuid NOT NULL,
  item_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL CHECK (unit_price >= 0),
  subtotal decimal(10,2) NOT NULL CHECK (subtotal >= 0)
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own order items"
  ON order_items FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.customer_email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can view all order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  new_order_number text;
BEGIN
  new_order_number := 'IRM-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
  RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_order
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_custom_pages_slug ON custom_pages(slug);
CREATE INDEX IF NOT EXISTS idx_custom_pages_published ON custom_pages(is_published);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);