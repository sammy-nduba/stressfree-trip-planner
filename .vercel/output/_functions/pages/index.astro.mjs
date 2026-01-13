/* empty css                                 */
import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, h as addAttribute, k as renderComponent } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_FBggr8Xt.mjs';
import 'clsx';
import { b as getFeaturedPackages } from '../chunks/api_CtmOJJYz.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-teal/10 to-white"> <!-- Video background --> <video autoplay muted loop playsinline preload="auto" disablepictureinpicture class="absolute inset-0 w-full h-full object-cover opacity-90"> <source src="/waves.mp4" type="video/mp4">
Your browser does not support the video tag.
</video> <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-teal/5"></div> <div class="relative text-center px-6 max-w-4xl mx-auto"> <!-- Logo Icon --> <div class="flex justify-center mb-6"> <img src="/logo.png" alt="Stress-Free Holiday Makers" class="w-24 h-24 object-contain shadow-2xl rounded-full animate-pulse"> </div> <h1 class="text-5xl md:text-7xl font-serif text-ocean leading-tight mb-2"> <span class="block bg-gradient-to-r from-ocean via-teal to-coral bg-clip-text text-transparent">
Stress-Free
</span> <span class="block text-4xl md:text-5xl text-teal font-light tracking-wide mt-2">
Holiday Makers
</span> </h1> <p class="mt-6 text-xl md:text-2xl text-ocean font-light italic">
✨ Chill or thrill, the choice is yours, Stress-Free Holiday Makers opens
      doors. ✨
</p> <a href="#start" class="mt-8 inline-block px-8 py-4 bg-teal text-white rounded-full hover:bg-coral hover:scale-105 hover:shadow-xl transition-all duration-500 ease-in-out transform">
Build My Calm Trip
</a> </div> </section> ${renderScript($$result, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/Hero.astro", void 0);

const $$Process = createComponent(($$result, $$props, $$slots) => {
  const steps = [
    {
      icon: "\u{1F305}",
      title: "Dream",
      desc: "Pick your vibe \u2014 beach, mountain, city escape."
    },
    {
      icon: "\u{1F4CB}",
      title: "Plan",
      desc: "Get a personalized checklist in 60 seconds."
    },
    {
      icon: "\u2708\uFE0F",
      title: "Go",
      desc: "Download your itinerary. Just show up."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="absolute top-[90%] left-0 right-0 px-6 z-10"> <div class="max-w-6xl mx-auto"> <div class="grid md:grid-cols-3 gap-8"> ${steps.map((step) => renderTemplate`<div class="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition transform text-center"> <div class="text-5xl mb-4">${step.icon}</div> <h3 class="text-2xl font-serif text-ocean mb-2">${step.title}</h3> <p class="text-teal">${step.desc}</p> </div>`)} </div> </div> </section>`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/Process.astro", void 0);

const $$Destinations = createComponent(async ($$result, $$props, $$slots) => {
  const featuredPackages = await getFeaturedPackages(6);
  const placeholderCount = Math.max(0, 6 - featuredPackages.length);
  const placeholders = Array(placeholderCount).fill(null);
  return renderTemplate`${maybeRenderHead()}<section class="pt-64 pb-20 px-6"> <div class="max-w-6xl mx-auto"> <h2 class="text-4xl md:text-5xl font-serif text-center text-ocean mb-16">
Destinations That Breathe Calm
</h2> <div class="grid md:grid-cols-3 gap-6">  ${featuredPackages.map((pkg) => renderTemplate`<a${addAttribute(`/packages/${pkg.id}`, "href")} class="group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition block"> <img${addAttribute(
    pkg.image_url || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop`,
    "src"
  )}${addAttribute(pkg.name, "alt")} loading="lazy" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500"> <div class="p-6 bg-white"> <div class="flex items-center justify-between"> <h3 class="text-xl font-serif text-ocean">${pkg.name}</h3> <span class="text-teal text-2xl group-hover:translate-x-1 transition-transform">
→
</span> </div>  <p class="text-sm text-teal mt-1"> ${pkg.custom_destination || (pkg.destinations ? `${pkg.destinations.name}, ${pkg.destinations.countries?.name}` : "Custom Location")} </p>  <div class="flex items-center justify-between mt-3"> ${pkg.duration && renderTemplate`<span class="text-xs text-ocean/60">📅 ${pkg.duration}</span>`} ${pkg.price && renderTemplate`<span class="text-sm font-bold text-coral">$${pkg.price}</span>`} </div> ${pkg.is_featured && renderTemplate`<div class="mt-2"> <span class="inline-block px-2 py-1 bg-coral/10 text-coral text-xs rounded-full font-medium">
⭐ Featured
</span> </div>`} <p class="text-xs text-coral mt-2 font-medium">
Click to explore package →
</p> </div> </a>`)}  ${placeholders.map((_, index) => renderTemplate`<div class="group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition opacity-60"> <img${addAttribute(`https://images.unsplash.com/photo-148864695301${index}-85cb44e25828?w=800&h=600&fit=crop`, "src")} alt="Coming Soon" loading="lazy" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500"> <div class="p-6 bg-white"> <h3 class="text-xl font-serif text-ocean">More Destinations</h3> <p class="text-sm text-teal mt-1">Exciting new packages</p> <p class="text-xs text-ocean/50 mt-2 italic">Coming soon...</p> </div> </div>`)} </div> </div> </section>`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/Destinations.astro", void 0);

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  const testimonials = [
    {
      quote: "I used to dread planning. Now I just click and relax.",
      author: "Sarah L., London"
    },
    {
      quote: "The checklist saved me 3 hours. I arrived smiling.",
      author: "James K., Sydney"
    },
    {
      quote: "Best travel tool I\u2019ve ever used. Pure calm.",
      author: "Maria G., Barcelona"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 px-6 bg-teal/5"> <div class="max-w-4xl mx-auto"> <h2 class="text-4xl md:text-5xl font-serif text-center text-ocean mb-16">
What Calm Travelers Say
</h2> <div class="space-y-12"> ${testimonials.map((t) => renderTemplate`<blockquote class="text-center italic text-lg text-ocean/80"> <p class="mb-4">“${t.quote}”</p> <footer class="text-teal font-medium">— ${t.author}</footer> </blockquote>`)} </div> </div> </section>`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/Testimonials.astro", void 0);

const $$CTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="start" class="py-20 px-6 bg-gradient-to-r from-teal to-coral text-white"> <div class="max-w-4xl mx-auto text-center"> <h2 class="text-4xl md:text-5xl font-serif mb-6">
Start Your Calm Journey
</h2> <p class="text-lg mb-8 opacity-90">
Your stress-free holiday begins with one click.
</p> <form action="https://formspree.io/f/your-form-id" method="POST" class="max-w-md mx-auto flex gap-3"> <input type="email" name="email" placeholder="you@calm.com" required class="flex-1 px-6 py-3 rounded-full text-ocean"> <button type="submit" class="px-8 py-3 bg-white text-teal rounded-full font-medium hover:bg-sand transition">
Get Started
</button> </form> <p class="mt-4 text-sm opacity-75">No spam. Only calm.</p> </div> </section>`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/CTA.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Stress-Free Holiday Makers" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative"> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Process", $$Process, {})} </div> ${renderComponent($$result2, "Destinations", $$Destinations, {})} ${renderComponent($$result2, "Testimonials", $$Testimonials, {})} ${renderComponent($$result2, "CTA", $$CTA, {})} <footer class="py-12 px-6 text-center bg-gradient-to-br from-white to-teal/5"> <div class="flex justify-center mb-4"> <img src="/logo.png" alt="Stress-Free Holiday Makers" class="w-16 h-16 object-contain rounded-full"> </div> <p class="text-lg font-serif text-ocean mb-2"> <span class="font-bold">Stress-Free</span> <span class="text-teal">Holiday Makers</span> </p> <p class="text-sm text-ocean/70 mb-4">
Chill or thrill, the choice is yours, stress free holiday makers opens
      doors
</p> <p class="text-sm text-ocean/70">
© 2025 Stress-Free Holiday Makers. All rights reserved.
</p> <p class="mt-3"> <a href="/destinations" class="text-teal hover:text-coral transition-colors mx-2 font-medium">Destinations</a> |
<a href="/planner" class="text-teal hover:text-coral transition-colors mx-2 font-medium">Planner</a> |
<a href="/about" class="text-teal hover:text-coral transition-colors mx-2 font-medium">About</a> </p> </footer> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/index.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
