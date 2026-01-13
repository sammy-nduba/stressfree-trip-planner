/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D0jjlpkZ.mjs';
import { c as createServerSupabaseClient } from '../chunks/supabase_CBNaP4JO.mjs';
import { i as isAdmin } from '../chunks/auth_BvXsYW-w.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const supabase = createServerSupabaseClient(Astro2.cookies);
  const admin = await isAdmin(Astro2.cookies);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/auth/login");
  }
  if (admin) {
    return Astro2.redirect("/admin");
  }
  const { data: userRequests } = await supabase.from("trip_requests").select("*").eq("contact_email", user.email).order("created_at", { ascending: false });
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    contacted: "bg-purple-100 text-purple-800",
    converted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "My Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-20 px-6 min-h-screen bg-gradient-to-b from-sky to-white"> <div class="max-w-6xl mx-auto"> <!-- Header --> <div class="mb-8"> <h1 class="text-4xl font-serif text-ocean mb-2">My Trip Requests</h1> <p class="text-ocean/70">Track your travel inquiries and plan your next adventure</p> </div> <!-- Quick Actions --> <div class="grid md:grid-cols-3 gap-6 mb-8"> <a href="/planner" class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"> <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">🗺️</div> <h3 class="text-xl font-bold text-ocean mb-2">Plan New Trip</h3> <p class="text-ocean/70">Start planning your next adventure</p> </a> <a href="/destinations" class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"> <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">🌍</div> <h3 class="text-xl font-bold text-ocean mb-2">Browse Destinations</h3> <p class="text-ocean/70">Explore amazing places to visit</p> </a> <a href="/packages" class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"> <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">📦</div> <h3 class="text-xl font-bold text-ocean mb-2">View Packages</h3> <p class="text-ocean/70">Check out curated travel packages</p> </a> </div> <!-- Trip Requests --> <div class="bg-white rounded-xl shadow-lg p-8"> <h2 class="text-2xl font-serif text-ocean mb-6">Your Requests</h2> ${userRequests && userRequests.length > 0 ? renderTemplate`<div class="space-y-6"> ${userRequests.map((request) => renderTemplate`<div class="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"> <div class="flex justify-between items-start mb-4"> <div> <h3 class="text-lg font-bold text-ocean mb-1">${request.destination}</h3> <p class="text-ocean/70 text-sm">
Submitted ${new Date(request.created_at).toLocaleDateString()} </p> </div> <span${addAttribute(`px-3 py-1 rounded-full text-sm font-medium ${statusColors[request.status] || "bg-gray-100 text-gray-800"}`, "class")}> ${request.status.charAt(0).toUpperCase() + request.status.slice(1)} </span> </div> <div class="grid md:grid-cols-3 gap-4 text-sm text-ocean/70"> <div> <span class="font-medium">Travel Dates:</span><br> ${new Date(request.start_date).toLocaleDateString()} - ${new Date(request.end_date).toLocaleDateString()} </div> <div> <span class="font-medium">Travelers:</span><br> ${request.adults} Adult${request.adults > 1 ? "s" : ""} ${request.children > 0 ? `, ${request.children} Child${request.children > 1 ? "ren" : ""}` : ""} </div> <div> <span class="font-medium">Reference:</span><br>
#${request.id} </div> </div> ${request.status === "converted" && renderTemplate`<div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"> <p class="text-green-800 text-sm">
🎉 Your trip request has been converted to a booking!
                      Check your email for payment and confirmation details.
</p> </div>`} ${request.status === "rejected" && renderTemplate`<div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"> <p class="text-red-800 text-sm">
We're sorry, but this request could not be accommodated.
                      Please contact us for alternative options.
</p> </div>`} </div>`)} </div>` : renderTemplate`<div class="text-center py-12"> <div class="text-6xl mb-4">🗺️</div> <h3 class="text-xl font-bold text-ocean mb-2">No trip requests yet</h3> <p class="text-ocean/70 mb-6">Start planning your dream trip!</p> <a href="/planner" class="inline-block px-6 py-3 bg-teal text-white rounded-full hover:bg-teal/90 transition-colors">
Plan Your Trip
</a> </div>`} </div> </div> </div> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/dashboard.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
