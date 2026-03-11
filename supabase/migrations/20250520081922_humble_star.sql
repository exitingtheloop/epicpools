/*
  # Portfolio and Testimonials Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text)
      - `location` (text) 
      - `description` (text)
      - `completion_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `project_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_at` (timestamp)

    - `project_category_mappings`
      - `project_id` (uuid, foreign key)
      - `category_id` (uuid, foreign key)
      - `created_at` (timestamp)

    - `project_assets`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `url` (text)
      - `type` (text) - 'image' or 'video'
      - `is_cover` (boolean)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `location` (text)
      - `rating` (integer)
      - `text` (text)
      - `avatar_url` (text)
      - `is_featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all data
    - Add policies for admin users to manage data
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  completion_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project categories table
CREATE TABLE IF NOT EXISTS project_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Project category mappings table
CREATE TABLE IF NOT EXISTS project_category_mappings (
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  category_id uuid REFERENCES project_categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (project_id, category_id)
);

-- Project assets table
CREATE TABLE IF NOT EXISTS project_assets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  is_cover boolean DEFAULT false,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  avatar_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on project categories"
  ON project_categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on project category mappings"
  ON project_category_mappings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on project assets"
  ON project_assets FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- Policies for authenticated users with admin role
CREATE POLICY "Allow admin users to manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin users to manage project categories"
  ON project_categories FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin users to manage project category mappings"
  ON project_category_mappings FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin users to manage project assets"
  ON project_assets FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin users to manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS projects_completion_date_idx ON projects(completion_date);
CREATE INDEX IF NOT EXISTS project_assets_project_id_idx ON project_assets(project_id);
CREATE INDEX IF NOT EXISTS project_assets_order_idx ON project_assets(project_id, "order");
CREATE INDEX IF NOT EXISTS testimonials_is_featured_idx ON testimonials(is_featured);