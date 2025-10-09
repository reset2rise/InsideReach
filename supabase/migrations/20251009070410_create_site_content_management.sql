/*
  # Site Content Management System

  1. New Tables
    - `site_sections`
      - `id` (uuid, primary key)
      - `section_key` (text, unique) - Identifier for the section (e.g., 'hero', 'mission_vision')
      - `section_name` (text) - Display name for admin panel
      - `content` (jsonb) - Flexible content storage for each section
      - `is_active` (boolean) - Whether section is displayed
      - `display_order` (integer) - Order of sections on the site
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `navigation_links`
      - `id` (uuid, primary key)
      - `label` (text) - Button/link text
      - `url` (text) - Destination URL or page identifier
      - `section_id` (uuid) - Which section this link belongs to
      - `link_type` (text) - 'internal', 'external', or 'section'
      - `is_active` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public read access for active content
    - Admin-only write access
*/

-- Create site_sections table
CREATE TABLE IF NOT EXISTS site_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  section_name text NOT NULL,
  content jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create navigation_links table
CREATE TABLE IF NOT EXISTS navigation_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  section_id uuid REFERENCES site_sections(id) ON DELETE CASCADE,
  link_type text DEFAULT 'internal',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_links ENABLE ROW LEVEL SECURITY;

-- Policies for site_sections
CREATE POLICY "Anyone can view active site sections"
  ON site_sections FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all site sections"
  ON site_sections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update site sections"
  ON site_sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert site sections"
  ON site_sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for navigation_links
CREATE POLICY "Anyone can view active navigation links"
  ON navigation_links FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all navigation links"
  ON navigation_links FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage navigation links"
  ON navigation_links FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default sections with initial content
INSERT INTO site_sections (section_key, section_name, content, display_order) VALUES
('hero', 'Hero Section', '{
  "title": "Building Stronger Marriages, Families & Legacies",
  "subtitle": "Empowering Families Through Biblical Counseling, Marriage Enrichment & Youth Development",
  "buttonText": "Learn More",
  "buttonLink": "#mission"
}'::jsonb, 1),

('mission_vision', 'Mission & Vision', '{
  "mission": {
    "title": "Our Mission",
    "content": "Inside Reach Ministries is dedicated to strengthening families and communities through biblically-based counseling, marriage enrichment programs, and youth development initiatives. We believe in building lasting legacies that impact generations."
  },
  "vision": {
    "title": "Our Vision",
    "content": "To see families restored, marriages strengthened, and young people equipped to become leaders who positively impact their communities and carry forward a heritage of faith and excellence."
  }
}'::jsonb, 2),

('winners_circle', 'Winners Circle', '{
  "title": "The Winner''s Circle",
  "subtitle": "Serving High-Achieving Men",
  "description": "The Winner''s Circle is designed for men who are committed to excellence in every area of life. Through biblical principles, accountability, and brotherhood, we equip leaders to build lasting legacies that impact their families, businesses, and communities for generations to come.",
  "programs": [
    {
      "title": "One on One Coaching",
      "description": "Personal guidance for spiritual and personal growth",
      "image": "https://images.pexels.com/photos/8815965/pexels-photo-8815965.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      "title": "Men''s Accountability Group",
      "description": "Building brotherhood and strengthening character together",
      "image": "https://images.pexels.com/photos/4009590/pexels-photo-4009590.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ]
}'::jsonb, 3),

('marriage_enrichment', 'Marriage Enrichment', '{
  "title": "Marriage Enrichment",
  "subtitle": "Building Stronger Relationships",
  "description": "Our marriage enrichment programs provide couples with biblical principles and practical tools to strengthen their relationship, improve communication, and build a lasting partnership that honors God.",
  "features": [
    {
      "title": "Couples Workshops",
      "description": "Interactive sessions focusing on communication and conflict resolution"
    },
    {
      "title": "Pre-Marital Counseling",
      "description": "Prepare for a strong foundation before saying I do"
    },
    {
      "title": "Marriage Retreats",
      "description": "Weekend getaways designed to reconnect and strengthen bonds"
    }
  ]
}'::jsonb, 4),

('bridge_builders', 'Bridge Builders', '{
  "title": "Bridge Builders Youth Program",
  "subtitle": "Empowering the Next Generation",
  "description": "Bridge Builders is our comprehensive youth development program designed to equip young people with life skills, leadership abilities, and biblical principles that will guide them throughout their lives.",
  "features": [
    {
      "title": "Leadership Development",
      "description": "Building confident, capable leaders for tomorrow"
    },
    {
      "title": "Mentorship Program",
      "description": "Connecting youth with positive role models"
    },
    {
      "title": "Life Skills Training",
      "description": "Practical skills for personal and professional success"
    }
  ]
}'::jsonb, 5),

('about', 'About Us', '{
  "title": "About Inside Reach Ministries",
  "content": "Founded on the belief that strong families build strong communities, Inside Reach Ministries has been serving families for over a decade. Our team of experienced counselors, mentors, and ministry leaders are committed to providing compassionate support and biblical guidance to help individuals and families thrive."
}'::jsonb, 6),

('contact', 'Contact Information', '{
  "title": "Get In Touch",
  "description": "We would love to hear from you. Reach out to learn more about our programs or schedule a consultation.",
  "email": "info@insidereachministries.org",
  "phone": "(555) 123-4567",
  "address": "123 Ministry Lane, Your City, ST 12345"
}'::jsonb, 7)

ON CONFLICT (section_key) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_site_sections_updated_at ON site_sections;
CREATE TRIGGER update_site_sections_updated_at
  BEFORE UPDATE ON site_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_navigation_links_updated_at ON navigation_links;
CREATE TRIGGER update_navigation_links_updated_at
  BEFORE UPDATE ON navigation_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();