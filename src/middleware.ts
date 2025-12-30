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
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('[Middleware] Error fetching profile:', error);
    }

    console.log(`[Middleware] User role: ${profile?.role}`);

    // Redirect to home if the user is not an admin
    if (profile?.role !== 'admin') {
      console.log('[Middleware] User is not admin, redirecting to home');
      return context.redirect('/');
    }

    // User is an authenticated admin, store user data for page access
    context.locals.user = session.user;
  }

  // Continue to the next middleware or page
  return next();
});