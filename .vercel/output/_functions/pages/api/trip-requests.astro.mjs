import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const supabaseUrl = "https://boswztvpmobwgqjqajrs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvc3d6dHZwbW9id2dxanFhanJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NjQyOTMsImV4cCI6MjA3OTE0MDI5M30.fgE7zVw4I7XNZye_89-CDV3X9Ukdhue7sFfYmwcgwCw";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  global: {
    fetch: (url, options) => {
      return fetch(url, {
        ...options,
        // @ts-ignore
        timeout: 2e4,
        // 20 second timeout
        headers: {
          ...options?.headers,
          "Connection": "keep-alive",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`
        }
      });
    }
  }
});
const POST = async ({ request }) => {
  try {
    const data = await request.json();
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
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { data: tripRequest, error } = await supabase.from("trip_requests").insert([{
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
      status: "pending"
    }]).select().single();
    if (error) {
      console.error("Error creating trip request:", error);
      return new Response(
        JSON.stringify({ error: "Failed to submit trip request" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Trip request submitted successfully",
        id: tripRequest.id
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error processing trip request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
