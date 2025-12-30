-- Alter packages table to match code expectations
-- Add images array column and image_url column for backward compatibility

ALTER TABLE packages ADD COLUMN IF NOT EXISTS images TEXT[];
ALTER TABLE packages ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Note: If you have an existing 'image' column, you may need to manually rename it to 'image_url'
-- or copy the data: UPDATE packages SET image_url = image WHERE image_url IS NULL;