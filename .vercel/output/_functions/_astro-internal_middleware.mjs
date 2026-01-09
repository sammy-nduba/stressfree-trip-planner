import { d as defineMiddleware, s as sequence } from './chunks/index_Ch_QnrE5.mjs';
import { c as createServerSupabaseClient } from './chunks/supabase_BNy4ncF3.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_DKkyjkGK.mjs';
import 'piccolore';
import './chunks/astro/server_C1SB2yiH.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/admin")) {
    console.log(`[Middleware] Checking access for: ${context.url.pathname}`);
    const supabase = createServerSupabaseClient(context.cookies);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.log("[Middleware] No session found, redirecting to login");
      return context.redirect("/auth/login");
    }
    console.log(`[Middleware] Session found for user: ${session.user.id}`);
    const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
    if (error) {
      console.error("[Middleware] Error fetching profile:", error);
    }
    console.log(`[Middleware] User role: ${profile?.role}`);
    if (profile?.role !== "admin") {
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
