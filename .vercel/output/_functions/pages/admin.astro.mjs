/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_C_-UUSIl.mjs';
import { s as supabase } from '../chunks/supabase_BLkg8VXK.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const { user } = Astro2.locals;
  const { data: packagesData, count: packageCount } = await supabase.from("packages").select("*", { count: "exact", head: true });
  const { data: destinationsData, count: destinationCount } = await supabase.from("destinations").select("*", { count: "exact", head: true });
  const { data: tripRequestsData, count: tripRequestCount } = await supabase.from("trip_requests").select("*", { count: "exact", head: true });
  const { data: recentRequests } = await supabase.from("trip_requests").select("*").order("created_at", { ascending: false }).limit(10);
  const pendingRequests = recentRequests?.filter((r) => r.status === "pending").length || 0;
  recentRequests?.filter((r) => r.status === "converted").length || 0;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin Dashboard" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1> <p class="text-gray-600">
Welcome, ${user?.email}. Manage packages, bookings, and operations.
</p> </div>  <div class="grid md:grid-cols-4 gap-6 mb-8"> <div class="bg-white rounded-lg p-6 shadow"> <div class="text-3xl mb-2">📦</div> <div class="text-2xl font-bold text-gray-800">${packageCount || 0}</div> <div class="text-gray-600">Active Packages</div> </div> <div class="bg-white rounded-lg p-6 shadow"> <div class="text-3xl mb-2">🌍</div> <div class="text-2xl font-bold text-blue-600"> ${destinationCount || 0} </div> <div class="text-gray-600">Destinations</div> </div> <div class="bg-white rounded-lg p-6 shadow"> <div class="text-3xl mb-2">📋</div> <div class="text-2xl font-bold text-orange-600"> ${tripRequestCount || 0} </div> <div class="text-gray-600">Trip Requests</div> </div> <div class="bg-white rounded-lg p-6 shadow"> <div class="text-3xl mb-2">⏳</div> <div class="text-2xl font-bold text-yellow-600"> ${pendingRequests} </div> <div class="text-gray-600">Pending Requests</div> </div> </div>  <div class="grid md:grid-cols-3 gap-6 mb-8"> <a href="/admin/packages/new" class="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow group"> <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">
➕
</div> <h3 class="text-xl font-bold text-gray-800 mb-2">Create Package</h3> <p class="text-gray-600">Add new travel packages</p> </a> <a href="/admin/packages" class="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow group"> <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">
📝
</div> <h3 class="text-xl font-bold text-gray-800 mb-2">Manage Packages</h3> <p class="text-gray-600">Edit existing packages</p> </a> <a href="/admin/trip-requests" class="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow group"> <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">
💬
</div> <h3 class="text-xl font-bold text-gray-800 mb-2">Trip Requests</h3> <p class="text-gray-600">Manage customer inquiries</p> </a> </div>  <div class="bg-white rounded-lg shadow p-8"> <div class="flex justify-between items-center mb-6"> <h2 class="text-2xl font-bold text-gray-800">Recent Trip Requests</h2> <a href="/admin/trip-requests" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
View All
</a> </div> ${recentRequests && recentRequests.length > 0 ? renderTemplate`<div class="space-y-4"> ${recentRequests.map((request) => renderTemplate`<div class="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"> <div class="flex justify-between items-start mb-4"> <div> <h3 class="text-lg font-bold text-gray-800 mb-1"> ${request.contact_name} </h3> <p class="text-gray-600 text-sm">${request.destination}</p> </div> <div class="text-right"> <div${addAttribute(`px-3 py-1 rounded-full text-sm font-medium mb-2 ${request.status === "reviewed" ? "bg-blue-100 text-blue-800" : request.status === "pending" ? "bg-yellow-100 text-yellow-800" : request.status === "contacted" ? "bg-purple-100 text-purple-800" : request.status === "converted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, "class")}> ${request.status.charAt(0).toUpperCase() + request.status.slice(1)} </div> </div> </div> <div class="grid md:grid-cols-4 gap-4 text-sm text-gray-600"> <div> <span class="font-medium">Date:</span>${" "} ${new Date(request.created_at).toLocaleDateString()} </div> <div> <span class="font-medium">Travel:</span>${" "} ${new Date(request.start_date).toLocaleDateString()} </div> <div> <span class="font-medium">Travelers:</span> ${request.adults}${" "}
Adult${request.adults > 1 ? "s" : ""} ${request.children > 0 ? `, ${request.children} Child${request.children > 1 ? "ren" : ""}` : ""} </div> <div> <span class="font-medium">Contact:</span>${" "} ${request.contact_email} </div> </div> <div class="mt-4"> <a${addAttribute(`/admin/trip-requests/${request.id}`, "href")} class="text-blue-600 hover:text-blue-700 font-medium text-sm">
View Details →
</a> </div> </div>`)} </div>` : renderTemplate`<div class="text-center py-12"> <div class="text-4xl mb-4">📋</div> <p class="text-gray-600">No trip requests yet</p> </div>`} </div> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
