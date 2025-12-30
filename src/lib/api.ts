import { supabase } from './supabase';

export interface Destination {
    id: number;
    name: string;
    country_id: number;
    description: string;
    image: string;
    highlights: string[];
    bestTime: string;
    activities: string[];
}

export async function getDestinationsByCountry(countryName: string) {
    // First get the country ID
    const { data: country } = await supabase
        .from('countries')
        .select('id')
        .eq('name', countryName)
        .single();

    if (!country) {
        console.error(`Country not found: ${countryName}`);
        return [];
    }

    // Then get destinations for that country
    const { data: destinations, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('country_id', country.id);

    if (error) {
        console.error(`Error fetching destinations for ${countryName}:`, error);
        return [];
    }

    // Map database fields to frontend expected format if needed
    // The schema has: id, country_id, name, description, image_url, highlights, best_time_to_visit, activities
    // The frontend expects: id, name, description, image, highlights, bestTime, activities

    return destinations.map(dest => ({
        id: dest.id,
        name: dest.name,
        country_id: dest.country_id,
        description: dest.description,
        image: dest.image_url, // Map image_url to image
        highlights: dest.highlights || [],
        bestTime: dest.best_time_to_visit, // Map best_time_to_visit to bestTime
        activities: dest.activities || []
    }));
}

export async function getPackagesByCountry(countryName: string) {
    const { data: country } = await supabase
        .from('countries')
        .select('id')
        .eq('name', countryName)
        .single();

    if (!country) return [];

    const { data: packages, error } = await supabase
        .from('packages')
        .select('*, destinations!inner(country_id)')
        .eq('destinations.country_id', country.id);

    if (error) {
        console.error(`Error fetching packages for ${countryName}:`, error);
        return [];
    }

    return packages;
}

export async function getFeaturedPackages(limit: number = 6) {
    const { data: packages, error } = await supabase
        .from('packages')
        .select(`
            *,
            destinations (
                name,
                country_id,
                countries (
                    name
                )
            )
        `)
        .order('is_featured', { ascending: false })
        .order('booking_count', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching featured packages:', error);
        return [];
    }

    return packages || [];
}
