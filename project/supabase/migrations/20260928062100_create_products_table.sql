/*
# Create products table for SportShopz store

1. New Tables
- `products`
  - `id` (serial, primary key) — unique product identifier
  - `name` (text, not null) — product name
  - `category` (text, not null) — 'jerseys' or 'shoes'
  - `sport` (text, not null) — sport type e.g. Football, Basketball, Running, Tennis, Training
  - `brand` (text, not null) — brand/manufacturer name
  - `price` (numeric, not null) — current sale price
  - `original_price` (numeric, not null) — list price before discount
  - `discount` (integer, default 0) — discount percentage
  - `rating` (numeric, default 0) — average star rating 0-5
  - `reviews` (integer, default 0) — number of reviews
  - `stock` (integer, not null, default 0) — units in stock
  - `image` (text, not null) — main product image URL
  - `gallery` (text[], default '{}') — array of additional image URLs
  - `description` (text, not null) — product description
  - `sizes` (text[], default '{}') — available size options
  - `colors` (text[], default '{}') — available color options
  - `badge` (text, nullable) — optional badge label e.g. 'Bestseller', 'New', 'Sale'
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `products`.
- Allow anon + authenticated SELECT (public catalog, no sign-in needed for browsing).
- No INSERT/UPDATE/DELETE policies (admin panel not implemented yet).

3. Data
- Seeds 12 sample products (6 jerseys, 6 shoes) matching the existing sample data
  so the store looks identical on first load.
*/

CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('jerseys', 'shoes')),
  sport text NOT NULL,
  brand text NOT NULL,
  price numeric(10,2) NOT NULL,
  original_price numeric(10,2) NOT NULL,
  discount integer NOT NULL DEFAULT 0,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  image text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  sizes text[] NOT NULL DEFAULT '{}',
  colors text[] NOT NULL DEFAULT '{}',
  badge text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Seed sample products (idempotent: only insert if table is empty)
INSERT INTO products (name, category, sport, brand, price, original_price, discount, rating, reviews, stock, image, gallery, description, sizes, colors, badge)
SELECT * FROM (VALUES
  -- Jerseys
  ('Thunder FC Home Jersey', 'jerseys', 'Football', 'Nike', 59.99, 89.99, 33, 4.8, 214, 45,
   'https://images.pexels.com/photos/27565819/pexels-photo-27565819.png?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/27565819/pexels-photo-27565819.png?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/15986812/pexels-photo-15986812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/8303862/pexels-photo-8303862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Premium moisture-wicking fabric keeps you cool on the pitch. Lightweight athletic fit with breathable mesh panels for maximum comfort during intense matches.',
   ARRAY['S','M','L','XL','XXL'], ARRAY['Red','White','Black'], 'Bestseller'),

  ('Court Kings Basketball Jersey', 'jerseys', 'Basketball', 'Adidas', 64.99, 94.99, 32, 4.7, 156, 30,
   'https://images.pexels.com/photos/7157062/pexels-photo-7157062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/7157062/pexels-photo-7157062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/5785714/pexels-photo-5785714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/7157039/pexels-photo-7157039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Loose-fit basketball jersey with durable stretch mesh. Designed for unrestricted movement on the court with sweat-resistant Dri-Fit technology.',
   ARRAY['S','M','L','XL','XXL'], ARRAY['Black','Gold','Navy'], 'New'),

  ('Les Bleus Home Kit', 'jerseys', 'Football', 'Puma', 74.99, 109.99, 32, 4.9, 342, 18,
   'https://images.pexels.com/photos/15986812/pexels-photo-15986812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/15986812/pexels-photo-15986812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/27565819/pexels-photo-27565819.png?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/13311682/pexels-photo-13311682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Official-style home kit with embroidered crest and premium breathable knit. Engineered for competitive play and everyday fan wear alike.',
   ARRAY['S','M','L','XL'], ARRAY['Blue','White'], 'Premium'),

  ('Street Ball Jersey', 'jerseys', 'Basketball', 'Under Armour', 49.99, 69.99, 29, 4.5, 89, 52,
   'https://images.pexels.com/photos/20355174/pexels-photo-20355174.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/20355174/pexels-photo-20355174.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/7157062/pexels-photo-7157062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Street-style basketball jersey with bold graphics. Soft lightweight fabric perfect for pickup games and casual wear.',
   ARRAY['M','L','XL','XXL'], ARRAY['Teal','Black'], NULL),

  ('Pro Striker Training Jersey', 'jerseys', 'Training', 'Nike', 39.99, 54.99, 27, 4.4, 67, 68,
   'https://images.pexels.com/photos/13311682/pexels-photo-13311682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/13311682/pexels-photo-13311682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/16387520/pexels-photo-16387520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Versatile training jersey with anti-odor treatment. Four-way stretch fabric moves with your body through any workout.',
   ARRAY['S','M','L','XL'], ARRAY['Grey','Black','Green'], NULL),

  ('All-Star Forward Jersey', 'jerseys', 'Basketball', 'Reebok', 69.99, 99.99, 30, 4.6, 123, 25,
   'https://images.pexels.com/photos/32885654/pexels-photo-32885654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/32885654/pexels-photo-32885654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/7157039/pexels-photo-7157039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Pro-level basketball jersey with reinforced shoulder seams. Built to withstand aggressive play while keeping you cool.',
   ARRAY['M','L','XL','XXL'], ARRAY['Navy','Red'], 'Sale'),

  -- Shoes
  ('Velocity Pro Running Shoes', 'shoes', 'Running', 'Nike', 119.99, 159.99, 25, 4.9, 487, 35,
   'https://images.pexels.com/photos/29342144/pexels-photo-29342144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/29342144/pexels-photo-29342144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/29342147/pexels-photo-29342147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/19577864/pexels-photo-19577864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Responsive cushioning meets featherlight design. Engineered mesh upper with energy-return foam sole for explosive speed on every run.',
   ARRAY['7','8','9','10','11','12'], ARRAY['Blue','White'], 'Bestseller'),

  ('Super Striker Cleats', 'shoes', 'Football', 'Adidas', 134.99, 179.99, 25, 4.7, 203, 22,
   'https://images.pexels.com/photos/29342147/pexels-photo-29342147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/29342147/pexels-photo-29342147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/29342144/pexels-photo-29342144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Lightweight football cleats with precision stud configuration for explosive acceleration and superior traction on firm ground.',
   ARRAY['7','8','9','10','11','12'], ARRAY['Multicolor','Black'], 'New'),

  ('Cloud Glide Sneakers', 'shoes', 'Running', 'New Balance', 89.99, 129.99, 31, 4.6, 178, 41,
   'https://images.pexels.com/photos/24702077/pexels-photo-24702077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/24702077/pexels-photo-24702077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/19577862/pexels-photo-19577862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Everyday runners with plush foam midsole and breathable knit upper. Clean white-and-blue design that goes from gym to street.',
   ARRAY['6','7','8','9','10','11'], ARRAY['White','Blue'], NULL),

  ('Court Storm Basketball Shoes', 'shoes', 'Basketball', 'Nike', 149.99, 199.99, 25, 4.8, 291, 15,
   'https://images.pexels.com/photos/19577864/pexels-photo-19577864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/19577864/pexels-photo-19577864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/19577862/pexels-photo-19577862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'High-top basketball shoes with ankle support cage and impact-absorbing heel. Zigzag traction pattern grips the court on every cut.',
   ARRAY['8','9','10','11','12','13'], ARRAY['Navy','Orange'], 'Premium'),

  ('Ace Tennis Pro', 'shoes', 'Tennis', 'Asics', 99.99, 139.99, 29, 4.5, 112, 33,
   'https://images.pexels.com/photos/29699313/pexels-photo-29699313.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/29699313/pexels-photo-29699313.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/24702077/pexels-photo-24702077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Tennis-specific lateral support with durable herringbone outsole. Designed for quick court movement and stability on all surfaces.',
   ARRAY['7','8','9','10','11'], ARRAY['White','Orange'], NULL),

  ('Stealth Trainer Shoes', 'shoes', 'Training', 'Reebok', 79.99, 109.99, 27, 4.4, 95, 48,
   'https://images.pexels.com/photos/19577862/pexels-photo-19577862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   ARRAY['https://images.pexels.com/photos/19577862/pexels-photo-19577862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940','https://images.pexels.com/photos/19577864/pexels-photo-19577864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
   'Versatile cross-training shoes with flat stable sole for lifting and flexible forefoot for agility drills. Your all-in-one gym companion.',
   ARRAY['7','8','9','10','11','12'], ARRAY['Black','Grey'], 'Sale')
) AS t(name, category, sport, brand, price, original_price, discount, rating, reviews, stock, image, gallery, description, sizes, colors, badge)
WHERE NOT EXISTS (SELECT 1 FROM products);
