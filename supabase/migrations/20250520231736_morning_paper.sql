/*
  # Update projects table schema
  
  1. Changes
    - Change id column from text to uuid
    - Add new slug column
    - Update foreign key relationships
    - Preserve existing data
  
  2. Security
    - Temporarily disable RLS during migration
    - Re-enable RLS after changes
    - Recreate indexes
*/

-- Temporarily disable RLS
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_category_mappings DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_assets DISABLE ROW LEVEL SECURITY;

-- Create temporary table with new schema
CREATE TABLE temp_projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  completion_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Copy data to temporary table with new UUIDs and slugs
INSERT INTO temp_projects (id, slug, title, type, location, description, completion_date, created_at, updated_at)
SELECT 
  uuid_generate_v4(),
  id as slug,
  title,
  type,
  location,
  description,
  completion_date,
  created_at,
  updated_at
FROM projects;

-- Create mapping table for old and new IDs
CREATE TEMPORARY TABLE id_mapping AS
SELECT p.id as old_id, tp.id as new_id
FROM projects p
JOIN temp_projects tp ON tp.slug = p.id;

-- Create temporary columns in related tables
ALTER TABLE project_category_mappings ADD COLUMN temp_project_id uuid;
ALTER TABLE project_assets ADD COLUMN temp_project_id uuid;

-- Update temporary columns with new UUIDs using the mapping table
UPDATE project_category_mappings
SET temp_project_id = m.new_id
FROM id_mapping m
WHERE project_id = m.old_id;

UPDATE project_assets
SET temp_project_id = m.new_id
FROM id_mapping m
WHERE project_id = m.old_id;

-- Drop existing foreign key constraints
ALTER TABLE project_category_mappings DROP CONSTRAINT IF EXISTS project_category_mappings_project_id_fkey;
ALTER TABLE project_assets DROP CONSTRAINT IF EXISTS project_assets_project_id_fkey;

-- Drop original table and rename temp table
DROP TABLE projects CASCADE;
ALTER TABLE temp_projects RENAME TO projects;

-- Update project_category_mappings
ALTER TABLE project_category_mappings DROP COLUMN project_id;
ALTER TABLE project_category_mappings ALTER COLUMN temp_project_id SET NOT NULL;
ALTER TABLE project_category_mappings RENAME COLUMN temp_project_id TO project_id;

-- Update project_assets
ALTER TABLE project_assets DROP COLUMN project_id;
ALTER TABLE project_assets ALTER COLUMN temp_project_id SET NOT NULL;
ALTER TABLE project_assets RENAME COLUMN temp_project_id TO project_id;

-- Add foreign key constraints
ALTER TABLE project_category_mappings 
  ADD CONSTRAINT project_category_mappings_project_id_fkey 
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_assets 
  ADD CONSTRAINT project_assets_project_id_fkey 
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

-- Drop temporary mapping table
DROP TABLE id_mapping;

-- Re-enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assets ENABLE ROW LEVEL SECURITY;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS projects_completion_date_idx ON projects(completion_date);
CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);