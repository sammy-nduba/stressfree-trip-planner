-- Fix for Trip Requests RLS Policy

-- 1. Ensure RLS is enabled
ALTER TABLE trip_requests ENABLE ROW LEVEL SECURITY;

-- 2. Grant permissions to anon and authenticated roles
-- This is critical for public users to be able to insert
GRANT ALL ON trip_requests TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE trip_requests_id_seq TO anon, authenticated;

-- 3. Drop existing insert policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Anyone can submit trip requests" ON trip_requests;

-- 4. Re-create the insert policy allowing everyone to insert
CREATE POLICY "Anyone can submit trip requests" ON trip_requests
    FOR INSERT WITH CHECK (true);
