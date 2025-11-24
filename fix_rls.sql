-- Fix for Infinite Recursion in RLS Policies

-- 1. Drop the problematic policy that causes recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- 2. Create a secure function to check admin status
-- SECURITY DEFINER means this function runs with the privileges of the database owner,
-- bypassing RLS checks on the tables it queries. This breaks the recursion loop.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Re-create the policy using the secure function
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        is_admin()
    );

-- 4. Also update the trip_requests policies to use the new function for consistency and performance
DROP POLICY IF EXISTS "Admins can view trip requests" ON trip_requests;
DROP POLICY IF EXISTS "Admins can update trip requests" ON trip_requests;

CREATE POLICY "Admins can view trip requests" ON trip_requests
    FOR SELECT USING (
        is_admin()
    );

CREATE POLICY "Admins can update trip requests" ON trip_requests
    FOR UPDATE USING (
        is_admin()
    );
