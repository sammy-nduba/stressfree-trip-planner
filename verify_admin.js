
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY; // Using anon key might not be enough for all profiles if RLS is strict, but let's try. 
// Actually, for admin verification, we might need the service role key if RLS hides other users. 
// But usually users can see their own profile. 
// Let's try to just list all profiles if possible, or just check the specific admin email if we knew it.
// Since I don't have the service role key in .env.example, I'll rely on what I have.
// Wait, I can use the ADMIN_EMAIL from .env if it exists.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRoles() {
    console.log('Checking profiles...');

    // Try to fetch all profiles
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Error fetching profiles:', error);
        return;
    }

    console.log('Profiles found:', profiles.length);
    profiles.forEach(p => {
        console.log(`ID: ${p.id}, Role: ${p.role}, Updated: ${p.updated_at}`);
    });
}

checkRoles();
