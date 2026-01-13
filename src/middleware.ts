import { defineMiddleware } from "astro:middleware";
import { createServerSupabaseClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  // Protect all routes under /admin
  if (context.url.pathname.startsWith('/admin')) {
    console.log(`[Middleware] Checking access for: ${context.url.pathname}`);


    // Create Supabase client with cookie access
    const supabase = createServerSupabaseClient(context.cookies);

    const { data: { session } } = await supabase.auth.getSession();

    // Redirect to login if there's no active session
    if (!session) {
      console.log('[Middleware] No session found, redirecting to login');
      return context.redirect('/auth/login');
    }

    console.log(`[Middleware] Session found for user: ${session.user.id}`);

    // Check if the user has the 'admin' role
    let { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    // If profile is missing, try to create it (self-registration)
    if (error && error.code === 'PGRST116') {
      console.log('[Middleware] Profile missing, attempting to create...');
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          email: session.user.email, // Ensure email is included if column exists
          role: 'user', // Default to user, but checking overwrite below
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (!createError) {
        profile = newProfile;
        console.log('[Middleware] Profile created successfully.');
      } else {
        console.error('[Middleware] Failed to create profile:', createError);
      }
    }

    if (error && error.code !== 'PGRST116') {
      console.error('[Middleware] Error fetching profile:', error);
    }

    const SUPER_ADMIN_ID = '40edb8e5-85ec-498d-b871-74e27f442aa0';
    const isSuperAdmin = session.user.id === SUPER_ADMIN_ID;

    console.log(`[Middleware] User role: ${profile?.role} (Super Admin Override: ${isSuperAdmin})`);

    // Redirect to home if the user is not an admin AND not the super admin
    if (profile?.role !== 'admin' && !isSuperAdmin) {
      console.log('[Middleware] User is not admin, redirecting to home');
      return context.redirect('/');
    }

    // User is an authenticated admin, store user data for page access
    context.locals.user = session.user;
  }

  // Continue to the next middleware or page
  return next();
});