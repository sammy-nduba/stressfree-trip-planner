/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_C_-UUSIl.mjs';
import { s as supabase } from '../../chunks/supabase_BLkg8VXK.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: packages, error } = await supabase.from("packages").select(`
  *,
  destinations (
    name,
    countries (name)
  )
`);
  if (error) {
    console.error("Error fetching packages:", error);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Packages" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-8"> <h1 class="text-3xl font-bold text-gray-800">Manage Packages</h1> <a href="/admin/packages/new" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
Add New Package
</a> </div> <div class="bg-white rounded-lg shadow overflow-x-auto"> <table class="w-full text-left"> <thead class="border-b border-gray-200"> <tr> <th class="p-4 font-medium text-gray-600">Name</th> <th class="p-4 font-medium text-gray-600">Price</th> <th class="p-4 font-medium text-gray-600">Destination</th> <th class="p-4 font-medium text-gray-600">Country</th> <th class="p-4 font-medium text-gray-600">Actions</th> </tr> </thead> <tbody> ${packages && packages.map((pkg) => renderTemplate`<tr class="border-b border-gray-200 last:border-b-0"> <td class="p-4 text-gray-800">${pkg.name}</td> <td class="p-4 text-gray-800">$${pkg.price}</td> <td class="p-4 text-gray-800">${pkg.custom_destination || pkg.destinations?.name || "Custom Location"}</td> <td class="p-4 text-gray-800">${pkg.destinations?.countries?.name || "N/A"}</td> <td class="p-4"> <a${addAttribute(`/admin/packages/${pkg.id}/edit`, "href")} class="text-blue-600 hover:underline">Edit</a> </td> </tr>`)} </tbody> </table> ${(!packages || packages.length === 0) && renderTemplate`<p class="p-8 text-center text-gray-600">No packages found. Add one to get started!</p>`} </div> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/packages/index.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/packages/index.astro";
const $$url = "/admin/packages";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
