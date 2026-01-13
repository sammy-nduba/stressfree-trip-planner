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
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
  },
  removeItem: (key) => {
    if (typeof document === "undefined") return;
    document.cookie = `${key}=; path=/; max-age=0`;
  }
};
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: browserCookieStorage
  }
});
function createServerSupabaseClient(cookies) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      persistSession: true,
      detectSessionInUrl: false,
      storage: {
        getItem: (key) => {
          const value = cookies.get(key)?.value;
          console.log(`[Supabase-Server] Reading cookie ${key}: ${value ? "Found" : "Not Found"}`);
          return value ? decodeURIComponent(value) : null;
        },
        setItem: (key, value) => {
          console.log(`[Supabase-Server] Skipping setKey ${key} (Read-Only)`);
        },
        removeItem: (key) => {
          console.log(`[Supabase-Server] Skipping removeKey ${key} (Read-Only)`);
        }
      }
    }
  });
}

export { createServerSupabaseClient as c, supabase as s };
