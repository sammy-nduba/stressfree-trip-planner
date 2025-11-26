-- Fix Storage RLS Policies for Admin Package Uploads

-- Drop existing policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Policy: Allow public read access to all files in the 'packages' bucket
CREATE POLICY "Public can view packages"
ON storage.objects FOR SELECT
USING ( bucket_id = 'packages' );

-- Policy: Allow admins to upload files to the 'packages' bucket
CREATE POLICY "Admins can upload packages"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( 
    bucket_id = 'packages' 
    AND is_admin()
);

-- Policy: Allow admins to update files in the 'packages' bucket
CREATE POLICY "Admins can update packages"
ON storage.objects FOR UPDATE
TO authenticated
USING ( 
    bucket_id = 'packages' 
    AND is_admin()
);

-- Policy: Allow admins to delete files from the 'packages' bucket
CREATE POLICY "Admins can delete packages"
ON storage.objects FOR DELETE
TO authenticated
USING ( 
    bucket_id = 'packages' 
    AND is_admin()
);
