/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DoNu6l0o.mjs';
import { g as getDestinationsByCountry, a as getPackagesByCountry } from '../../chunks/api_BODyuqHj.mjs';
export { renderers } from '../../renderers.mjs';

const $$Uganda = createComponent(async ($$result, $$props, $$slots) => {
  const ugandaDestinations = await getDestinationsByCountry("Uganda");
  const ugandaPackages = await getPackagesByCountry("Uganda");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Uganda Destinations - Stress-Free Holiday Makers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="pt-24 pb-20 bg-gradient-to-b from-sky to-sand"> <!-- Hero Section --> <section class="px-6 py-16 bg-gradient-to-r from-ocean to-teal text-white"> <div class="max-w-6xl mx-auto text-center"> <h1 class="text-5xl md:text-6xl font-serif mb-4">
🇺🇬 Discover Uganda
</h1> <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto">
Explore the "Pearl of Africa," from gorilla trekking in Bwindi to the mighty Murchison Falls.
</p> </div> </section> <!-- Destinations Grid --> <section class="px-6 py-16"> <div class="max-w-6xl mx-auto"> <h2 class="text-4xl font-serif text-ocean text-center mb-12">
Top Destinations in Uganda
</h2> <div class="space-y-8"> ${ugandaDestinations.map((destination, index) => renderTemplate`<div class="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"> <div${addAttribute(`grid md:grid-cols-2 gap-6 ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`, "class")}> <!-- Image --> <div${addAttribute(`h-64 md:h-auto overflow-hidden ${index % 2 === 1 ? "md:col-start-2" : ""}`, "class")}> <img${addAttribute(destination.image, "src")}${addAttribute(destination.name, "alt")} class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy"> </div> <!-- Content --> <div class="p-8"> <h3 class="text-3xl font-serif text-ocean mb-3"> ${destination.name} </h3> <p class="text-ocean/80 mb-4 leading-relaxed"> ${destination.description} </p> <!-- Highlights --> <div class="mb-4"> <h4 class="font-bold text-teal mb-2">✨ Highlights:</h4> <div class="flex flex-wrap gap-2"> ${destination.highlights.map((highlight) => renderTemplate`<span class="px-3 py-1 bg-sand text-ocean text-sm rounded-full"> ${highlight} </span>`)} </div> </div> <!-- Best Time --> <div class="mb-4"> <h4 class="font-bold text-teal mb-1">📅 Best Time to Visit:</h4> <p class="text-ocean/70">${destination.bestTime}</p> </div> <!-- Activities --> <div> <h4 class="font-bold text-teal mb-2">🎯 Activities:</h4> <div class="flex flex-wrap gap-2"> ${destination.activities.map((activity) => renderTemplate`<span class="px-3 py-1 bg-teal/10 text-teal text-sm rounded-full"> ${activity} </span>`)} </div> </div> </div> </div> </div>`)} </div> </div> <!-- Popular Packages --> ${ugandaPackages && ugandaPackages.length > 0 && renderTemplate`<div class="mt-20"> <h2 class="text-4xl font-serif text-ocean text-center mb-12">
Popular Packages in Uganda
</h2> <div class="grid md:grid-cols-3 gap-8"> ${ugandaPackages.map((pkg) => renderTemplate`<div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"> <div class="h-48 overflow-hidden relative group"> <img${addAttribute(pkg.images?.[0] || pkg.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop", "src")}${addAttribute(pkg.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"> <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-teal shadow-sm"> ${pkg.duration} </div> </div> <div class="p-6 flex-1 flex flex-col"> <h3 class="text-xl font-bold text-ocean mb-2">${pkg.title}</h3> <p class="text-ocean/70 text-sm mb-4 line-clamp-2 flex-1">${pkg.description}</p> <div class="space-y-4 mt-auto"> <div class="flex flex-wrap gap-2"> ${pkg.highlights?.slice(0, 2).map((h) => renderTemplate`<span class="text-xs bg-sand text-ocean px-2 py-1 rounded-full">${h}</span>`)} </div> <div class="flex justify-between items-center pt-4 border-t border-gray-100"> <div> <span class="text-xs text-gray-500 block">Starting from</span> <span class="text-2xl font-bold text-teal">$${pkg.price}</span> </div> <a${addAttribute(`/packages/${pkg.id}/book`, "href")} class="px-6 py-2 bg-ocean text-white rounded-lg text-sm hover:bg-ocean/90 transition-colors">
View Details
</a> </div> </div> </div> </div>`)} </div> </div>`} <!-- CTA Section --> <div class="mt-16 text-center bg-white rounded-3xl shadow-lg p-12"> <h3 class="text-3xl font-serif text-ocean mb-4">
Ready to Explore Uganda?
</h3> <p class="text-ocean/70 mb-6 max-w-2xl mx-auto">
Start planning your Ugandan adventure today. Our planner will help you organize every detail.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/Planner" class="px-8 py-4 bg-teal text-white rounded-full hover:bg-coral hover:scale-105 transition-all duration-300 font-medium">
Start Planning Your Uganda Trip
</a> <a href="/Destinations" class="px-8 py-4 bg-sand text-ocean rounded-full hover:bg-ocean hover:text-white transition-all duration-300 font-medium">
View All Destinations
</a> </div> </div> </section> </main> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/destinations/Uganda.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/destinations/Uganda.astro";
const $$url = "/destinations/Uganda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Uganda,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
