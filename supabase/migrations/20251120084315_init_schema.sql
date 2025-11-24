CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE,
    image TEXT,
    highlights TEXT[],
    best_time_to_visit TEXT,
    activities TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    duration INTEGER,
    inclusions TEXT[],
    exclusions TEXT[],
    destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data for countries
INSERT INTO countries (name) VALUES ('Kenya'), ('Uganda'), ('Tanzania');

-- Seed data for Kenya destinations
INSERT INTO destinations 
(name, description, country_id, image, highlights, best_time_to_visit, activities) 
VALUES
(
  'Maasai Mara',
  'Famed for the Great Migration of wildebeest and zebra.',
  (SELECT id FROM countries WHERE name = 'Kenya'),
  '/images/destinations/kenya/mara.jpg',
  ARRAY['Great Migration', 'Big Five', 'Maasai culture'],
  'July to October',
  ARRAY['Game drives', 'Hot air balloon safaris', 'Cultural visits']
),
(
  'Amboseli National Park',
  'Known for its large elephant herds and views of Mount Kilimanjaro.',
  (SELECT id FROM countries WHERE name = 'Kenya'),
  '/images/destinations/kenya/amboseli.jpg',
  ARRAY['Large elephant herds', 'Views of Kilimanjaro', 'Observation Hill'],
  'June to October, January to February',
  ARRAY['Game drives', 'Bird watching', 'Photography']
),
(
  'Diani Beach',
  'A vibrant, intimate little paradise on the quiet shores of the Indian Ocean.',
  (SELECT id FROM countries WHERE name = 'Kenya'),
  '/images/destinations/kenya/diani.jpg',
  ARRAY['White sandy beaches', 'Coral reefs', 'Water sports'],
  'All year round',
  ARRAY['Snorkeling', 'Kite surfing', 'Relaxing on the beach']
);

-- Seed data for Uganda destinations
INSERT INTO destinations 
(name, description, country_id, image, highlights, best_time_to_visit, activities)
VALUES
(
  'Bwindi Impenetrable National Park',
  'Home to roughly half of the world''s mountain gorillas.',
  (SELECT id FROM countries WHERE name = 'Uganda'),
  '/images/destinations/uganda/bwindi.jpg',
  ARRAY['Gorilla trekking', 'Rich biodiversity', 'Batwa cultural experience'],
  'June to August, December to February',
  ARRAY['Gorilla trekking', 'Bird watching', 'Nature walks']
),
(
  'Murchison Falls National Park',
  'Features the powerful Murchison Falls and diverse wildlife.',
  (SELECT id FROM countries WHERE name = 'Uganda'),
  '/images/destinations/uganda/murchison.jpg',
  ARRAY['Murchison Falls', 'Nile River cruises', 'Diverse wildlife'],
  'December to February, June to September',
  ARRAY['Game drives', 'Boat cruises', 'Hiking']
),
(
  'Queen Elizabeth National Park',
  'Known for its tree-climbing lions and diverse ecosystems.',
  (SELECT id FROM countries WHERE name = 'Uganda'),
  '/images/destinations/uganda/queen-elizabeth.jpg',
  ARRAY['Tree-climbing lions', 'Kazinga Channel', 'Crater lakes'],
  'January to February, June to July',
  ARRAY['Game drives', 'Boat cruises', 'Chimpanzee tracking']
);

-- Create indexes for better query performance
CREATE INDEX idx_destinations_country_id ON destinations(country_id);
CREATE INDEX idx_packages_destination_id ON packages(destination_id);
CREATE INDEX idx_countries_name ON countries(name);

-- Enable Row Level Security (RLS)
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access (no authentication required)
-- Only authenticated users (admin) can insert, update, or delete

-- Countries policies
CREATE POLICY "Allow public read access to countries" ON countries
    FOR SELECT USING (true);

CREATE POLICY "Admin can manage countries" ON countries
    FOR ALL USING (auth.role() = 'authenticated');

-- Destinations policies
CREATE POLICY "Allow public read access to destinations" ON destinations
    FOR SELECT USING (true);

CREATE POLICY "Admin can manage destinations" ON destinations
    FOR ALL USING (auth.role() = 'authenticated');

-- Packages policies
CREATE POLICY "Allow public read access to packages" ON packages
    FOR SELECT USING (true);

CREATE POLICY "Admin can manage packages" ON packages
    FOR ALL USING (auth.role() = 'authenticated');
