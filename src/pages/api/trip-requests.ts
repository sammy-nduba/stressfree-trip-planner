import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Create a server-side client for API routes (allows anonymous inserts)
// Add custom fetch with timeout to handle slow connections
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
    },
    global: {
        fetch: (url, options) => {
            return fetch(url, {
                ...options,
                // @ts-ignore
                timeout: 20000, // 20 second timeout
                headers: {
                    ...options?.headers,
                    'Connection': 'keep-alive',
                    'apikey': supabaseAnonKey,
                    'Authorization': `Bearer ${supabaseAnonKey}`
                }
            });
        }
    }
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // Validate required fields
        const {
            destination,
            start_date,
            end_date,
            adults,
            contact_name,
            contact_email
        } = data;

        if (!destination || !start_date || !end_date || !adults || !contact_name || !contact_email) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact_email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Insert trip request into database
        const { data: tripRequest, error } = await supabase
            .from('trip_requests')
            .insert([{
                destination,
                start_date,
                end_date,
                adults: parseInt(adults),
                children: parseInt(data.children || 0),
                budget: data.budget || null,
                travel_style: data.travel_style || null,
                interests: data.interests || [],
                contact_name,
                contact_email,
                contact_phone: data.contact_phone || null,
                additional_notes: data.additional_notes || null,
                status: 'pending'
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating trip request:', error);
            return new Response(
                JSON.stringify({ error: 'Failed to submit trip request' }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Trip request submitted successfully',
                id: tripRequest.id
            }),
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error processing trip request:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};
