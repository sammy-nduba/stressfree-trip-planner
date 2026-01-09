import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://boswztvpmobwgqjqajrs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvc3d6dHZwbW9id2dxanFhanJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NjQyOTMsImV4cCI6MjA3OTE0MDI5M30.fgE7zVw4I7XNZye_89-CDV3X9Ukdhue7sFfYmwcgwCw";
const browserCookieStorage = {
  getItem: (key) => {
    if (typeof document === "undefined") return null;
    const value = document.cookie.split("; ").find((row) => row.startsWith(`${key}=`))?.split("=")[1];
    return value ? decodeURIComponent(value) : null;
  },
  setItem: (key, value) => {
    if (typeof document === "undefined") return;
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  },
  removeItem: (key) => {
    if (typeof document === "undefined") return;
    document.cookie = `${key}=; path=/; max-age=0`;
  }
};
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: browserCookieStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
function createServerSupabaseClient(cookies) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key) => {
          return cookies.get(key)?.value ?? null;
        },
        setItem: (key, value) => {
          cookies.set(key, value, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
            // 1 year
            sameSite: "lax",
            secure: true
          });
        },
        removeItem: (key) => {
          cookies.delete(key, { path: "/" });
        }
      }
    }
  });
}

export { createServerSupabaseClient as c, supabase as s };
