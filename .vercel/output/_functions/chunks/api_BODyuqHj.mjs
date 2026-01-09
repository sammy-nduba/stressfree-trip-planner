import { s as supabase } from './supabase_BNy4ncF3.mjs';

async function getDestinationsByCountry(countryName) {
  const { data: country } = await supabase.from("countries").select("id").eq("name", countryName).single();
  if (!country) {
    console.error(`Country not found: ${countryName}`);
    return [];
  }
  const { data: destinations, error } = await supabase.from("destinations").select("*").eq("country_id", country.id);
  if (error) {
    console.error(`Error fetching destinations for ${countryName}:`, error);
    return [];
  }
  return destinations.map((dest) => ({
    id: dest.id,
    name: dest.name,
    country_id: dest.country_id,
    description: dest.description,
    image: dest.image_url,
    // Map image_url to image
    highlights: dest.highlights || [],
    bestTime: dest.best_time_to_visit,
    // Map best_time_to_visit to bestTime
    activities: dest.activities || []
  }));
}
async function getPackagesByCountry(countryName) {
  const { data: country } = await supabase.from("countries").select("id").eq("name", countryName).single();
  if (!country) return [];
  const { data: packages, error } = await supabase.from("packages").select("*, destinations!inner(country_id)").eq("destinations.country_id", country.id);
  if (error) {
    console.error(`Error fetching packages for ${countryName}:`, error);
    return [];
  }
  return packages;
}
async function getFeaturedPackages(limit = 6) {
  const { data: packages, error } = await supabase.from("packages").select(`
            *,
            destinations (
                name,
                country_id,
                countries (
                    name
                )
            )
        `).order("is_featured", { ascending: false }).order("booking_count", { ascending: false }).order("created_at", { ascending: false }).limit(limit);
  if (error) {
    console.error("Error fetching featured packages:", error);
    return [];
  }
  return packages || [];
}

export { getPackagesByCountry as a, getFeaturedPackages as b, getDestinationsByCountry as g };
