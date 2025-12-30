-- Add Tanzania destinations to complete the seed data
INSERT INTO destinations
(name, description, country_id, image, highlights, best_time_to_visit, activities)
VALUES
(
  'Serengeti National Park',
  'Famous for the Great Migration and vast savannas.',
  (SELECT id FROM countries WHERE name = 'Tanzania'),
  '/images/destinations/tanzania/serengeti.jpg',
  ARRAY['Great Migration', 'Big Five', 'Endless plains'],
  'June to September',
  ARRAY['Game drives', 'Hot air balloon safaris', 'Cultural visits']
),
(
  'Ngorongoro Crater',
  'A UNESCO World Heritage site with incredible wildlife concentration.',
  (SELECT id FROM countries WHERE name = 'Tanzania'),
  '/images/destinations/tanzania/ngorongoro.jpg',
  ARRAY['Crater wildlife', 'UNESCO site', 'Volcanic landscape'],
  'June to September',
  ARRAY['Game drives', 'Hiking', 'Photography']
),
(
  'Zanzibar',
  'Beautiful islands with pristine beaches and rich history.',
  (SELECT id FROM countries WHERE name = 'Tanzania'),
  '/images/destinations/tanzania/zanzibar.jpg',
  ARRAY['White sand beaches', 'Stone Town', 'Spice plantations'],
  'June to October',
  ARRAY['Beach relaxation', 'Historical tours', 'Diving']
);