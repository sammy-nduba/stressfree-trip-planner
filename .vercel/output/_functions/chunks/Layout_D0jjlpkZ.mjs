import { e as createComponent, f as createAstro, m as maybeRenderHead, l as renderScript, r as renderTemplate, o as renderSlot, k as renderComponent, n as renderHead } from './astro/server_C1SB2yiH.mjs';
import 'piccolore';
import 'clsx';
import { c as createServerSupabaseClient } from './supabase_CBNaP4JO.mjs';
/* empty css                         */

const $$Astro$1 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const supabase = createServerSupabaseClient(Astro2.cookies);
  const { data: { session } } = await supabase.auth.getSession();
  session?.user;
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-sm"> <div class="max-w-7xl mx-auto px-6 py-4"> <div class="flex items-center justify-between"> <!-- Logo/Brand --> <a href="/" class="flex items-center gap-3 group"> <img src="/logo.png" alt="Stress-Free Holiday Makers Logo" class="w-12 h-12 object-contain group-hover:scale-110 transition-transform"> <div class="flex flex-col"> <span class="text-xl md:text-2xl font-serif text-ocean group-hover:text-teal transition-colors leading-tight">
Stress-Free
</span> <span class="text-xs md:text-sm text-teal font-medium tracking-wider uppercase">
Holiday Makers
</span> </div> </a> <!-- Desktop Navigation --> <div class="hidden md:flex items-center gap-8"> <a href="/" class="text-ocean hover:text-teal transition-colors font-medium">
Home
</a> <a href="/Destinations" class="text-ocean hover:text-teal transition-colors font-medium">
Destinations
</a> <a href="/packages" class="text-ocean hover:text-teal transition-colors font-medium">
Packages
</a> <a href="/Planner" class="text-ocean hover:text-teal transition-colors font-medium">
Planner
</a> <a href="/About" class="text-ocean hover:text-teal transition-colors font-medium">
About
</a> <a href="/Planner" class="px-6 py-2 bg-teal text-white rounded-full hover:bg-coral transition-all duration-300 hover:scale-105">
Start Planning
</a> </div> <!-- Mobile Menu Button --> <button id="mobile-menu-button" class="md:hidden text-ocean hover:text-teal transition-colors" aria-label="Toggle menu"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> <!-- Mobile Navigation --> <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-3"> <a href="/" class="block text-ocean hover:text-teal transition-colors font-medium py-2">
Home
</a> <a href="/Destinations" class="block text-ocean hover:text-teal transition-colors font-medium py-2">
Destinations
</a> <a href="/packages" class="block text-ocean hover:text-teal transition-colors font-medium py-2">
Packages
</a> <a href="/Planner" class="block text-ocean hover:text-teal transition-colors font-medium py-2">
Planner
</a> <a href="/About" class="block text-ocean hover:text-teal transition-colors font-medium py-2">
About
</a> <a href="/Planner" class="block text-center px-6 py-2 bg-teal text-white rounded-full hover:bg-coral transition-all duration-300">
Start Planning
</a> </div> </div> </nav> ${renderScript($$result, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/Navbar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', ' | Stress-Free Holiday Makers</title><link rel="icon" href="/favicon.svg"><!-- Schema.org --><script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "TravelAgency",\n        "name": "Stress-Free Holiday Makers",\n        "url": "https://stressfreeholidaymakers.com",\n        "logo": "/logo.png"\n      }\n    <\/script>', '</head> <body class="font-sans bg-white text-ocean"> ', " ", " </body></html>"])), title, renderHead(), renderComponent($$result, "Navbar", $$Navbar, {}), renderSlot($$result, $$slots["default"]));
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
