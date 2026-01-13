import { d as defineMiddleware, s as sequence } from './chunks/index_Ch_QnrE5.mjs';
import { c as createServerSupabaseClient } from './chunks/supabase_CBNaP4JO.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_DKkyjkGK.mjs';
import 'piccolore';
import './chunks/astro/server_C1SB2yiH.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/admin")) {
    console.log(`[Middleware] Checking access for: ${context.url.pathname}`);
    const cookieHeader = context.request.headers.get("cookie");
    console.log(`[Middleware] Cookies header present: ${cookieHeader ? "Yes" : "No"}`);
    const supabase = createServerSupabaseClient(context.cookies);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.log("[Middleware] No session found, redirecting to login");
      return context.redirect("/auth/login");
    }
    console.log(`[Middleware] Session found for user: ${session.user.id}`);
    let { data: profile, error } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
    if (error && error.code === "PGRST116") {
      console.log("[Middleware] Profile missing, attempting to create...");
      const { data: newProfile, error: createError } = await supabase.from("profiles").upsert({
        id: session.user.id,
        email: session.user.email,
        // Ensure email is included if column exists
        role: "user",
        // Default to user, but checking overwrite below
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).select().single();
      if (!createError) {
        profile = newProfile;
        console.log("[Middleware] Profile created successfully.");
      } else {
        console.error("[Middleware] Failed to create profile:", createError);
      }
    }
    if (error && error.code !== "PGRST116") {
      console.error("[Middleware] Error fetching profile:", error);
    }
    const SUPER_ADMIN_ID = "40edb8e5-85ec-498d-b871-74e27f442aa0";
    const isSuperAdmin = session.user.id === SUPER_ADMIN_ID;
    console.log(`[Middleware] User role: ${profile?.role} (Super Admin Override: ${isSuperAdmin})`);
    if (profile?.role !== "admin" && !isSuperAdmin) {
      console.log("[Middleware] User is not admin, redirecting to home");
      return context.redirect("/");
    }
    context.locals.user = session.user;
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
