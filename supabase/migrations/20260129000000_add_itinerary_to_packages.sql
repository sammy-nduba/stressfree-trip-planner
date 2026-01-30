-- Add missing columns to packages table
ALTER TABLE packages ADD COLUMN IF NOT EXISTS itinerary JSONB;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Documentation:
-- itinerary: Stores day-by-day journey information (JSON format).
-- is_featured: Flag to highlight packages on the home page.
