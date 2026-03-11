/*
  # Add public read access policy for projects table
  
  This migration adds a policy that allows public read access to all projects.
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public read access on projects" ON projects;

-- Create new public read policy
CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT
  TO public
  USING (true);