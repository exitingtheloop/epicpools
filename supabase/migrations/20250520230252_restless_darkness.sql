/*
  # Change project IDs to slugs
  
  This migration changes the project ID format from UUID to text-based slugs
  while maintaining all relationships and constraints.
*/

-- Temporarily disable RLS
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_category_mappings DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_assets DISABLE ROW LEVEL SECURITY;

-- Create temporary columns
ALTER TABLE project_category_mappings ADD COLUMN temp_project_id text;
ALTER TABLE project_assets ADD COLUMN temp_project_id text;

-- Update temporary columns with new IDs
UPDATE project_category_mappings pcm
SET temp_project_id = CASE 
  WHEN p.title = 'Modern Oasis' THEN 'modern-oasis'
  WHEN p.title = 'Coastal Retreat' THEN 'coastal-retreat'
  WHEN p.title = 'Mountain Escape' THEN 'mountain-escape'
  WHEN p.title = 'Mediterranean Villa' THEN 'mediterranean-villa'
  WHEN p.title = 'Urban Sanctuary' THEN 'urban-sanctuary'
  WHEN p.title = 'Tropical Lagoon' THEN 'tropical-lagoon'
END
FROM projects p
WHERE pcm.project_id = p.id;

UPDATE project_assets pa
SET temp_project_id = CASE 
  WHEN p.title = 'Modern Oasis' THEN 'modern-oasis'
  WHEN p.title = 'Coastal Retreat' THEN 'coastal-retreat'
  WHEN p.title = 'Mountain Escape' THEN 'mountain-escape'
  WHEN p.title = 'Mediterranean Villa' THEN 'mediterranean-villa'
  WHEN p.title = 'Urban Sanctuary' THEN 'urban-sanctuary'
  WHEN p.title = 'Tropical Lagoon' THEN 'tropical-lagoon'
END
FROM projects p
WHERE pa.project_id = p.id;

-- Drop existing foreign key constraints
ALTER TABLE project_category_mappings DROP CONSTRAINT project_category_mappings_project_id_fkey;
ALTER TABLE project_assets DROP CONSTRAINT project_assets_project_id_fkey;

-- Create temporary table for projects
CREATE TABLE temp_projects AS SELECT * FROM projects;
ALTER TABLE temp_projects ALTER COLUMN id TYPE text;

-- Update project IDs in temporary table
UPDATE temp_projects 
SET id = CASE 
  WHEN title = 'Modern Oasis' THEN 'modern-oasis'
  WHEN title = 'Coastal Retreat' THEN 'coastal-retreat'
  WHEN title = 'Mountain Escape' THEN 'mountain-escape'
  WHEN title = 'Mediterranean Villa' THEN 'mediterranean-villa'
  WHEN title = 'Urban Sanctuary' THEN 'urban-sanctuary'
  WHEN title = 'Tropical Lagoon' THEN 'tropical-lagoon'
END;

-- Drop original table and rename temp table
DROP TABLE projects CASCADE;
ALTER TABLE temp_projects RENAME TO projects;

-- Update project_category_mappings
ALTER TABLE project_category_mappings DROP COLUMN project_id;
ALTER TABLE project_category_mappings ALTER COLUMN temp_project_id SET NOT NULL;
ALTER TABLE project_category_mappings RENAME temp_project_id TO project_id;

-- Update project_assets
ALTER TABLE project_assets DROP COLUMN project_id;
ALTER TABLE project_assets ALTER COLUMN temp_project_id SET NOT NULL;
ALTER TABLE project_assets RENAME temp_project_id TO project_id;

-- Add primary key constraint
ALTER TABLE projects ADD PRIMARY KEY (id);

-- Add foreign key constraints
ALTER TABLE project_category_mappings 
  ADD CONSTRAINT project_category_mappings_project_id_fkey 
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_assets 
  ADD CONSTRAINT project_assets_project_id_fkey 
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

-- Re-enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assets ENABLE ROW LEVEL SECURITY;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS projects_completion_date_idx ON projects(completion_date);
CREATE INDEX IF NOT EXISTS project_assets_project_id_idx ON project_assets(project_id);
CREATE INDEX IF NOT EXISTS project_assets_order_idx ON project_assets(project_id, "order");