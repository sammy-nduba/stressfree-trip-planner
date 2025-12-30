-- ============================================
-- COMPLETE DATABASE FIX SCRIPT
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. FIX STORAGE RLS POLICIES
-- ============================================

-- Drop existing storage policies (both old and new names)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Public can view packages" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload packages" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update packages" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete packages" ON storage.objects;

-- Create new storage policies with admin checks
CREATE POLICY "Public can view packages"
ON storage.objects FOR SELECT
USING ( bucket_id = 'packages' );

CREATE POLICY "Admins can upload packages"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( 
    bucket_id = 'packages' 
    AND is_admin()
);

CREATE POLICY "Admins can update packages"
ON storage.objects FOR UPDATE
TO authenticated
USING ( 
    bucket_id = 'packages' 
    AND is_admin()
);

CREATE POLICY "Admins can delete packages"
ON storage.objects FOR DELETE
TO authenticated
USING ( 
    bucket_id = 'packages' 
    AND is_admin()
);

-- ============================================
-- 2. FIX TRIP REQUESTS RLS POLICIES
-- ============================================

-- Drop all existing trip_requests policies (including potential duplicates)
DROP POLICY IF EXISTS "Anyone can submit trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Public can submit trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Admins can view trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Admins can update trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Admins can delete trip requests" ON trip_requests;

-- Ensure RLS is enabled
ALTER TABLE trip_requests ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (including anonymous users) to insert trip requests
CREATE POLICY "Public can submit trip requests" 
ON trip_requests 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view trip requests
CREATE POLICY "Admins can view trip requests" 
ON trip_requests
FOR SELECT 
TO authenticated
USING (
    is_admin()
);

-- Only admins can update trip requests
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

-- Only admins can delete trip requests
CREATE POLICY "Admins can delete trip requests" 
ON trip_requests
FOR DELETE 
TO authenticated
USING (
    is_admin()
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify storage policies
SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage'
ORDER BY policyname;

-- Verify trip_requests policies
SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'trip_requests'
ORDER BY policyname;
