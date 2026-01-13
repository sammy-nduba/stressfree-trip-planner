/* empty css                                       */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as renderScript } from '../../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_C_-UUSIl.mjs';
import { s as supabase } from '../../../chunks/supabase_CBNaP4JO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const { data: tripRequest, error } = await supabase.from("trip_requests").select("*").eq("id", id).single();
  if (error || !tripRequest) {
    return Astro2.redirect("/admin/trip-requests");
  }
  const statusOptions = [
    "pending",
    "reviewed",
    "contacted",
    "converted",
    "rejected"
  ];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Trip Request - ${tripRequest.contact_name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <div class="max-w-4xl mx-auto"> <!-- Header --> <div class="mb-8"> <a href="/admin/trip-requests" class="inline-flex items-center gap-2 text-[#26A69A] hover:text-[#006064] mb-4 font-medium">
← Back to All Requests
</a> <h1 class="text-4xl font-['Playfair_Display'] text-[#006064] mb-2">
Trip Request Details
</h1> <p class="text-[#006064]/70">Reference ID: #${tripRequest.id}</p> </div> <!-- Request Details Card --> <div class="bg-white rounded-xl shadow-lg p-8 mb-6"> <h2 class="text-2xl font-['Playfair_Display'] text-[#006064] mb-6">
Contact Information
</h2> <div class="grid md:grid-cols-2 gap-6 mb-8"> <div> <label class="text-sm text-[#006064]/70 font-medium">Full Name</label> <p class="text-[#006064] text-lg font-medium"> ${tripRequest.contact_name} </p> </div> <div> <label class="text-sm text-[#006064]/70 font-medium">Email Address</label> <p class="text-[#006064] text-lg"> <a${addAttribute(`mailto:${tripRequest.contact_email}`, "href")} class="text-[#26A69A] hover:underline"> ${tripRequest.contact_email} </a> </p> </div> ${tripRequest.contact_phone && renderTemplate`<div> <label class="text-sm text-[#006064]/70 font-medium">
Phone Number
</label> <p class="text-[#006064] text-lg"> <a${addAttribute(`tel:${tripRequest.contact_phone}`, "href")} class="text-[#26A69A] hover:underline"> ${tripRequest.contact_phone} </a> </p> </div>`} <div> <label class="text-sm text-[#006064]/70 font-medium">Submitted On</label> <p class="text-[#006064] text-lg"> ${new Date(tripRequest.created_at).toLocaleString()} </p> </div> </div> <hr class="my-8 border-[#E0F7FA]"> <h2 class="text-2xl font-['Playfair_Display'] text-[#006064] mb-6">
Trip Details
</h2> <div class="grid md:grid-cols-2 gap-6 mb-6"> <div> <label class="text-sm text-[#006064]/70 font-medium">Destination</label> <p class="text-[#006064] text-lg font-medium"> ${tripRequest.destination} </p> </div> <div> <label class="text-sm text-[#006064]/70 font-medium">Travel Dates</label> <p class="text-[#006064] text-lg"> ${new Date(
    tripRequest.start_date
  ).toLocaleDateString()} - ${new Date(
    tripRequest.end_date
  ).toLocaleDateString()} </p> </div> <div> <label class="text-sm text-[#006064]/70 font-medium">Number of Travelers</label> <p class="text-[#006064] text-lg"> ${tripRequest.adults} Adult${tripRequest.adults > 1 ? "s" : ""} ${tripRequest.children > 0 && `, ${tripRequest.children} Child${tripRequest.children > 1 ? "ren" : ""}`} </p> </div> ${tripRequest.budget && renderTemplate`<div> <label class="text-sm text-[#006064]/70 font-medium">
Budget Range
</label> <p class="text-[#006064] text-lg capitalize"> ${tripRequest.budget} </p> </div>`} ${tripRequest.travel_style && renderTemplate`<div> <label class="text-sm text-[#006064]/70 font-medium">
Travel Style
</label> <p class="text-[#006064] text-lg"> ${tripRequest.travel_style} </p> </div>`} ${tripRequest.interests && tripRequest.interests.length > 0 && renderTemplate`<div class="md:col-span-2"> <label class="text-sm text-[#006064]/70 font-medium">
Interests
</label> <div class="flex flex-wrap gap-2 mt-2"> ${tripRequest.interests.map(
    (interest) => renderTemplate`<span class="px-3 py-1 bg-[#E0F7FA] text-[#006064] rounded-full text-sm"> ${interest} </span>`
  )} </div> </div>`} </div> ${tripRequest.additional_notes && renderTemplate`<div class="mb-6"> <label class="text-sm text-[#006064]/70 font-medium">
Additional Notes
</label> <p class="text-[#006064] mt-2 p-4 bg-[#FFF8E1] rounded-lg"> ${tripRequest.additional_notes} </p> </div>`} </div> <!-- Admin Management Card --> <div class="bg-white rounded-xl shadow-lg p-8"> <h2 class="text-2xl font-['Playfair_Display'] text-[#006064] mb-6">
Admin Management
</h2> <form id="updateForm" class="space-y-6"> <input type="hidden" name="id"${addAttribute(tripRequest.id, "value")}> <div> <label for="status" class="block text-sm text-[#006064]/70 font-medium mb-2">
Request Status
</label> <select id="status" name="status" class="w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"> ${statusOptions.map((option) => renderTemplate`<option${addAttribute(option, "value")}${addAttribute(option === tripRequest.status, "selected")}> ${option.charAt(0).toUpperCase() + option.slice(1)} </option>`)} </select> </div> <div> <label for="admin_notes" class="block text-sm text-[#006064]/70 font-medium mb-2">
Admin Notes
</label> <textarea id="admin_notes" name="admin_notes" rows="5" class="w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]" placeholder="Add internal notes about this request...">${tripRequest.admin_notes || ""}</textarea> </div> <div id="message" class="hidden p-4 rounded-xl"></div> <button type="submit" class="w-full px-6 py-4 bg-[#26A69A] text-white rounded-full hover:bg-[#1F8B7F] transition-colors font-medium">
Update Request
</button> </form> </div> </div> </div> ${renderScript($$result2, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/trip-requests/[id].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/trip-requests/[id].astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/trip-requests/[id].astro";
const $$url = "/admin/trip-requests/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
