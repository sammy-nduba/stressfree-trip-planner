-- FINAL PERMISSION FIX FOR TRIP REQUESTS
-- Run this script to fix the 42501 error once and for all

-- 1. Grant usage on public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Grant ALL permissions on the table to anon/authenticated
-- This is the base permission required before RLS even kicks in
GRANT ALL ON TABLE trip_requests TO anon, authenticated;

-- 3. Grant permissions on the ID sequence (critical for inserts)
GRANT USAGE, SELECT ON SEQUENCE trip_requests_id_seq TO anon, authenticated;

-- 4. Reset RLS on the table
ALTER TABLE trip_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE trip_requests ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can submit trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Anyone can submit trip requests" ON trip_requests;

-- 6. Create the definitive public insert policy
CREATE POLICY "Public can submit trip requests" 
ON trip_requests 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 7. Verify permissions (optional, for debugging)
-- SELECT grantee, privilege_type 
-- FROM information_schema.role_table_grants 
-- WHERE table_name = 'trip_requests';
