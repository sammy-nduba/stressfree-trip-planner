/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_FBggr8Xt.mjs';
import { s as supabase } from '../chunks/supabase_BLkg8VXK.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: packages, error } = await supabase.from("packages").select(
    `
    *,
    destinations (
      name,
      country_id,
      countries (
        name
      )
    )
  `
  ).order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching packages:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Travel Packages - Stress-Free Holiday Makers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="pt-24 pb-20 bg-gradient-to-b from-sky to-white min-h-screen"> <div class="max-w-7xl mx-auto px-6"> <!-- Header --> <div class="text-center mb-16"> <h1 class="text-5xl md:text-6xl font-serif text-ocean mb-4">
Our Travel Packages
</h1> <p class="text-xl text-ocean/70 max-w-2xl mx-auto">
Discover our curated collection of stress-free travel
                    experiences across East Africa
</p> </div> <!-- Packages Grid --> ${packages && packages.length > 0 ? renderTemplate`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${packages.map((pkg) => renderTemplate`<a${addAttribute(`/packages/${pkg.id}`, "href")} class="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">  <div class="aspect-video overflow-hidden"> ${pkg.images?.[0] || pkg.image_url ? renderTemplate`<img${addAttribute(
    pkg.images?.[0] || pkg.image_url,
    "src"
  )}${addAttribute(pkg.name, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-teal to-coral flex items-center justify-center"> <span class="text-white text-6xl">
📦
</span> </div>`} </div>  <div class="p-6"> <h3 class="text-2xl font-serif text-ocean mb-2 group-hover:text-teal transition-colors"> ${pkg.title || pkg.name} </h3>  <div class="flex items-center gap-2 text-ocean/60 mb-3"> <span class="text-lg">📍</span> <span> ${pkg.custom_destination || (pkg.destinations ? `${pkg.destinations.name}, ${pkg.destinations.countries?.name}` : "Custom Location")} </span> </div>  <p class="text-ocean/70 mb-4 line-clamp-3"> ${pkg.description} </p>  <div class="flex items-center justify-between pt-4 border-t border-ocean/10"> <div> ${pkg.duration && renderTemplate`<div class="flex items-center gap-2 text-ocean/60 text-sm"> <span>📅</span> <span>${pkg.duration}</span> </div>`} </div> <div class="text-right"> <div class="text-2xl font-bold text-teal">
$${pkg.price} </div> <div class="text-xs text-ocean/60">
per person
</div> </div> </div>  <div class="mt-4"> <span class="inline-flex items-center gap-2 text-teal font-medium group-hover:gap-4 transition-all">
View Details
<span>→</span> </span> </div> </div> </a>`)} </div>` : renderTemplate`<div class="text-center py-20"> <div class="text-6xl mb-6">📦</div> <h3 class="text-2xl font-serif text-ocean mb-2">
No Packages Available Yet
</h3> <p class="text-ocean/70 mb-8">
We're currently curating amazing travel experiences
                            for you. Check back soon!
</p> <a href="/Planner" class="inline-block px-8 py-4 bg-teal text-white rounded-full hover:bg-coral transition-colors font-medium">
Plan a Custom Trip
</a> </div>`} <!-- CTA Section --> ${packages && packages.length > 0 && renderTemplate`<div class="mt-20 text-center bg-white rounded-3xl shadow-lg p-12"> <h2 class="text-3xl font-serif text-ocean mb-4">
Can't Find What You're Looking For?
</h2> <p class="text-ocean/70 mb-8 max-w-2xl mx-auto">
Let us create a custom package tailored to your
                            preferences and budget.
</p> <a href="/Planner" class="inline-block px-8 py-4 bg-teal text-white rounded-full hover:bg-coral transition-all duration-300 hover:scale-105 font-medium">
Request Custom Quote
</a> </div>`} </div> </section> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/index.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/index.astro";
const $$url = "/packages";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
