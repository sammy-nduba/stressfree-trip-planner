import { createClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
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
        document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
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
            autoRefreshToken: false,
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