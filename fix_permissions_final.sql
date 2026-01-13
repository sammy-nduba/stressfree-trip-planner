
-- 1. Ensure the is_admin function exists and is secure (re-run to be safe)
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

-- 2. Allow users to insert their OWN profile if it doesn't exist
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT 
    WITH CHECK ( auth.uid() = id );

-- 3. Allow users to update their OWN profile
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE
    USING ( auth.uid() = id );

-- 4. Allow users to view their OWN profile
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT
    USING ( auth.uid() = id );

-- 5. Keep the Admin View All policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING ( is_admin() );

-- 6. Fix Storage Permissions - Allow Insert/Update/Delete for Admins
DROP POLICY IF EXISTS "Admins can upload packages" ON storage.objects;
CREATE POLICY "Admins can upload packages"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'packages' AND is_admin() );

DROP POLICY IF EXISTS "Admins can update packages" ON storage.objects;
CREATE POLICY "Admins can update packages"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'packages' AND is_admin() );

DROP POLICY IF EXISTS "Admins can delete packages" ON storage.objects;
CREATE POLICY "Admins can delete packages"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'packages' AND is_admin() );

-- 7. Allow public read access (essential for images)
DROP POLICY IF EXISTS "Public can view packages" ON storage.objects;
CREATE POLICY "Public can view packages"
ON storage.objects FOR SELECT
USING ( bucket_id = 'packages' );

-- 8. EMERGENCY BYPASS FOR SPECIFIC USER (Use cautiously)
-- This ensures YOUR user ID can always insert/update storage regardless of the is_admin check failing
-- because the profile might not exist yet or role isn't set.
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Hardcoded ID for 40edb8e5-85ec-498d-b871-74e27f442aa0
  RETURN auth.uid()::text = '40edb8e5-85ec-498d-b871-74e27f442aa0';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Super Admin Storage Bypass"
ON storage.objects FOR ALL
TO authenticated
USING ( is_super_admin() )
WITH CHECK ( is_super_admin() );

CREATE POLICY "Super Admin Profile Bypass"
ON profiles FOR ALL
TO authenticated
USING ( is_super_admin() )
WITH CHECK ( is_super_admin() );
