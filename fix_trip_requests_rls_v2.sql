-- Fix Trip Requests RLS Policies to Allow Public Submissions

-- First, drop all existing policies on trip_requests
DROP POLICY IF EXISTS "Anyone can submit trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Admins can view trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Admins can update trip requests" ON trip_requests;

-- Ensure RLS is enabled
ALTER TABLE trip_requests ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow ANYONE (including anonymous users) to insert trip requests
-- This is critical for the public planner form to work
CREATE POLICY "Public can submit trip requests" 
ON trip_requests 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Only admins can view trip requests
CREATE POLICY "Admins can view trip requests" 
ON trip_requests
FOR SELECT 
TO authenticated
USING (
    is_admin()
);

-- Policy 3: Only admins can update trip requests
CREATE POLICY "Admins can update trip requests" 
ON trip_requests
FOR UPDATE 
TO authenticated
USING (
    is_admin()
)
WITH CHECK (
    is_admin()
);

-- Policy 4: Only admins can delete trip requests (optional, for completeness)
CREATE POLICY "Admins can delete trip requests" 
ON trip_requests
FOR DELETE 
TO authenticated
USING (
    is_admin()
);
