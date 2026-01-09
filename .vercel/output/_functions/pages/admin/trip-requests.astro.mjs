/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_C_-UUSIl.mjs';
import { s as supabase } from '../../chunks/supabase_BNy4ncF3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: tripRequests, error } = await supabase.from("trip_requests").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching trip requests:", error);
  }
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    contacted: "bg-purple-100 text-purple-800",
    converted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Trip Requests" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <div class="max-w-7xl mx-auto"> <!-- Header --> <div class="mb-8"> <h1 class="text-4xl font-['Playfair_Display'] text-[#006064] mb-2">
Trip Requests
</h1> <p class="text-[#006064]/70">
Manage customer inquiries and trip requests
</p> </div> <!-- Back to Admin Dashboard --> <a href="/admin" class="inline-flex items-center gap-2 text-[#26A69A] hover:text-[#006064] mb-6 font-medium">
← Back to Admin Dashboard
</a> <!-- Stats Cards --> <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"> <div class="bg-white rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-all filter-card ring-2 ring-transparent" data-status="all"> <p class="text-sm text-[#006064]/70">Total Requests</p> <p class="text-2xl font-bold text-[#006064]"> ${tripRequests?.length || 0} </p> </div> <div class="bg-yellow-50 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-all filter-card ring-2 ring-transparent" data-status="pending"> <p class="text-sm text-yellow-800">Pending</p> <p class="text-2xl font-bold text-yellow-800"> ${tripRequests?.filter((r) => r.status === "pending").length || 0} </p> </div> <div class="bg-blue-50 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-all filter-card ring-2 ring-transparent" data-status="reviewed"> <p class="text-sm text-blue-800">Reviewed</p> <p class="text-2xl font-bold text-blue-800"> ${tripRequests?.filter((r) => r.status === "reviewed").length || 0} </p> </div> <div class="bg-purple-50 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-all filter-card ring-2 ring-transparent" data-status="contacted"> <p class="text-sm text-purple-800">Contacted</p> <p class="text-2xl font-bold text-purple-800"> ${tripRequests?.filter(
    (r) => r.status === "contacted"
  ).length || 0} </p> </div> <div class="bg-green-50 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition-all filter-card ring-2 ring-transparent" data-status="converted"> <p class="text-sm text-green-800">Converted</p> <p class="text-2xl font-bold text-green-800"> ${tripRequests?.filter(
    (r) => r.status === "converted"
  ).length || 0} </p> </div> </div> <!-- Trip Requests Table --> <div class="bg-white rounded-xl shadow-lg overflow-hidden"> ${tripRequests && tripRequests.length > 0 ? renderTemplate`<div class="overflow-x-auto"> <table class="w-full" id="requestsTable"> <thead class="bg-[#26A69A] text-white"> <tr> <th class="px-6 py-4 text-left text-sm font-medium">
Date
</th> <th class="px-6 py-4 text-left text-sm font-medium">
Contact
</th> <th class="px-6 py-4 text-left text-sm font-medium">
Destination
</th> <th class="px-6 py-4 text-left text-sm font-medium">
Dates
</th> <th class="px-6 py-4 text-left text-sm font-medium">
Travelers
</th> <th class="px-6 py-4 text-left text-sm font-medium">
Status
</th> <th class="px-6 py-4 text-left text-sm font-medium">
Actions
</th> </tr> </thead> <tbody class="divide-y divide-gray-200"> ${tripRequests.map((request) => renderTemplate`<tr class="hover:bg-[#E0F7FA]/30 transition-colors request-row"${addAttribute(request.status, "data-status")}> <td class="px-6 py-4 text-sm text-[#006064]"> ${new Date(
    request.created_at
  ).toLocaleDateString()} </td> <td class="px-6 py-4"> <div class="text-sm"> <p class="font-medium text-[#006064]"> ${request.contact_name} </p> <p class="text-[#006064]/70"> ${request.contact_email} </p> ${request.contact_phone && renderTemplate`<p class="text-[#006064]/70"> ${request.contact_phone} </p>`} </div> </td> <td class="px-6 py-4 text-sm text-[#006064] font-medium"> ${request.destination} </td> <td class="px-6 py-4 text-sm text-[#006064]"> <div> <p> ${new Date(
    request.start_date
  ).toLocaleDateString()} </p> <p class="text-[#006064]/70">
to
</p> <p> ${new Date(
    request.end_date
  ).toLocaleDateString()} </p> </div> </td> <td class="px-6 py-4 text-sm text-[#006064]"> ${request.adults} Adult
${request.adults > 1 ? "s" : ""} ${request.children > 0 && renderTemplate`<span>
, ${request.children}${" "}
Child
${request.children > 1 ? "ren" : ""} </span>`} </td> <td class="px-6 py-4"> <span${addAttribute(`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`, "class")}> ${request.status.charAt(0).toUpperCase() + request.status.slice(1)} </span> </td> <td class="px-6 py-4"> <a${addAttribute(`/admin/trip-requests/${request.id}`, "href")} class="text-[#26A69A] hover:text-[#1F8B7F] font-medium text-sm">
View Details →
</a> </td> </tr>`)} </tbody> </table> </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-[#006064]/50 text-lg">
No trip requests yet
</p> <p class="text-[#006064]/40 text-sm mt-2">
Requests will appear here when customers submit
                                trip inquiries
</p> </div>`} </div> </div> </div> ${renderScript($$result2, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/trip-requests/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/trip-requests/index.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/trip-requests/index.astro";
const $$url = "/admin/trip-requests";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
