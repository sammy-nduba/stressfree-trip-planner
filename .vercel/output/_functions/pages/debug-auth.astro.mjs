/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DoNu6l0o.mjs';
import { c as createServerSupabaseClient } from '../chunks/supabase_BNy4ncF3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$DebugAuth = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DebugAuth;
  const supabase = createServerSupabaseClient(Astro2.cookies);
  const {
    data: { session }
  } = await supabase.auth.getSession();
  let profile = null;
  let profileError = null;
  if (session) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
    profile = data;
    profileError = error;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Auth Debug" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-100 py-12 px-6"> <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"> <h1 class="text-3xl font-bold text-gray-800 mb-6">
🔍 Authentication Debug
</h1> <div class="space-y-6"> <!-- Session Info --> <div class="border-b pb-4"> <h2 class="text-xl font-bold mb-2">Session Status</h2> ${session ? renderTemplate`<div class="bg-green-50 p-4 rounded"> <p class="text-green-800">
✅ You are logged in!
</p> <p class="text-sm mt-2"> <strong>User ID:</strong> ${session.user.id} </p> <p class="text-sm"> <strong>Email:</strong> ${session.user.email} </p> </div>` : renderTemplate`<div class="bg-red-50 p-4 rounded"> <p class="text-red-800">
❌ No active session found
</p> <p class="text-sm mt-2">
You need to log in first
</p> <a href="/auth/login" class="text-blue-600 hover:underline">
Go to Login
</a> </div>`} </div> <!-- Profile Info --> <div class="border-b pb-4"> <h2 class="text-xl font-bold mb-2">Profile Data</h2> ${profile ? renderTemplate`<div class="bg-green-50 p-4 rounded"> <p class="text-green-800">✅ Profile found!</p> <p class="text-sm mt-2"> <strong>Email:</strong> ${profile.email} </p> <p class="text-sm"> <strong>Role:</strong>${" "} <span class="font-bold text-lg"> ${profile.role} </span> </p> <p class="text-sm"> <strong>Is Admin:</strong>${" "} ${profile.role === "admin" ? "\u2705 YES" : "\u274C NO"} </p> </div>` : profileError ? renderTemplate`<div class="bg-red-50 p-4 rounded"> <p class="text-red-800">
❌ Error fetching profile
</p> <p class="text-sm mt-2"> ${profileError.message} </p> </div>` : renderTemplate`<div class="bg-yellow-50 p-4 rounded"> <p class="text-yellow-800">
⚠️ No profile found (you're not logged in)
</p> </div>`} </div> <!-- Admin Access Check --> <div> <h2 class="text-xl font-bold mb-2">Admin Access</h2> ${session && profile?.role === "admin" ? renderTemplate`<div class="bg-green-50 p-4 rounded"> <p class="text-green-800 font-bold">
✅ You should have admin access!
</p> <a href="/admin" class="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
Go to Admin Dashboard →
</a> </div>` : renderTemplate`<div class="bg-red-50 p-4 rounded"> <p class="text-red-800">
❌ Admin access denied
</p> <p class="text-sm mt-2"> ${!session && "You need to log in first"} ${session && profile?.role !== "admin" && 'Your role is not "admin"'} </p> </div>`} </div> <!-- Instructions --> <div class="bg-blue-50 p-4 rounded mt-6"> <h3 class="font-bold text-blue-900 mb-2">Steps to Fix:</h3> <ol class="list-decimal list-inside text-sm text-blue-800 space-y-1"> <li>Make sure you're logged in</li> <li>
Check your role is 'admin' in Supabase profiles
                            table
</li> <li>Log out and log back in to refresh your session</li> <li>Try accessing /admin again</li> </ol> </div> </div> </div> </div> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/debug-auth.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/debug-auth.astro";
const $$url = "/debug-auth";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$DebugAuth,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
