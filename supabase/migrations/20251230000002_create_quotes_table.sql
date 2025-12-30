-- Create quotes table for admin-generated quotes
DROP TABLE IF EXISTS quotes;
CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    trip_request_id INTEGER REFERENCES trip_requests(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    description TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    valid_until DATE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
    items JSONB, -- Array of quote items with descriptions and prices
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_quotes_trip_request_id ON quotes(trip_request_id);
CREATE INDEX idx_quotes_admin_id ON quotes(admin_id);
CREATE INDEX idx_quotes_status ON quotes(status);

-- RLS Policies
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Admins can manage all quotes
CREATE POLICY "Admins can manage quotes" ON quotes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Users can view quotes for their trip requests
CREATE POLICY "Users can view their quotes" ON quotes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM trip_requests tr
            WHERE tr.id = quotes.trip_request_id
            AND tr.contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Update trigger for updated_at
CREATE TRIGGER update_quotes_updated_at
    BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();