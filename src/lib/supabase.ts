import { createClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    const errorMessage = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Missing Supabase Environment Variables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Required environment variables are missing:
${!supabaseUrl ? '  ❌ PUBLIC_SUPABASE_URL' : '  ✅ PUBLIC_SUPABASE_URL'}
${!supabaseAnonKey ? '  ❌ PUBLIC_SUPABASE_ANON_KEY' : '  ✅ PUBLIC_SUPABASE_ANON_KEY'}

📋 How to fix:

Local Development:
  1. Copy .env.example to .env
  2. Add your Supabase credentials to .env
  3. Restart the dev server

Vercel Deployment:
  1. Go to your Vercel project dashboard
  2. Navigate to Settings → Environment Variables
  3. Add the following variables:
     • PUBLIC_SUPABASE_URL (your Supabase project URL)
     • PUBLIC_SUPABASE_ANON_KEY (your Supabase anon key)
  4. Redeploy your project

📖 See VERCEL_ENV_SETUP.md for detailed instructions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    throw new Error(errorMessage);
}

// Browser-side cookie storage helper
const browserCookieStorage = {
    getItem: (key: string) => {
        if (typeof document === 'undefined') return null;
        const value = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${key}=`))
            ?.split('=')[1];
        return value ? decodeURIComponent(value) : null;
    },
    setItem: (key: string, value: string) => {
        if (typeof document === 'undefined') return;
        const maxAge = 60 * 60 * 24 * 365; // 1 year
        const secure = location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
    },
    removeItem: (key: string) => {
        if (typeof document === 'undefined') return;
        document.cookie = `${key}=; path=/; max-age=0`;
    },
};

// Client-side Supabase client (for browser usage) - uses cookies
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: browserCookieStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

// Server-side Supabase client with cookie support (for SSR)
export function createServerSupabaseClient(cookies: AstroCookies) {
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            flowType: 'pkce',
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
            storage: {
                getItem: (key) => {
                    return cookies.get(key)?.value ?? null;
                },
                setItem: (key, value) => {
                    cookies.set(key, value, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 365, // 1 year
                        sameSite: 'lax',
                        secure: import.meta.env.PROD,
                    });
                },
                removeItem: (key) => {
                    cookies.delete(key, { path: '/' });
                },
            },
        },
    });
}