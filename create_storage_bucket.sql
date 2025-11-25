-- Create the 'packages' storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('packages', 'packages', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the objects table (usually enabled by default, but good to ensure)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all files in the 'packages' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'packages' );

-- Policy: Allow authenticated users to upload files to the 'packages' bucket
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'packages' );

-- Policy: Allow authenticated users to update their own files (optional, but good for management)
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'packages' );

-- Policy: Allow authenticated users to delete their own files
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'packages' );
