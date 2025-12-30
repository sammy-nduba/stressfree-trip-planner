-- Add custom destination support to packages
ALTER TABLE packages ADD COLUMN IF NOT EXISTS custom_destination TEXT;

-- Make destination_id optional
ALTER TABLE packages ALTER COLUMN destination_id DROP NOT NULL;