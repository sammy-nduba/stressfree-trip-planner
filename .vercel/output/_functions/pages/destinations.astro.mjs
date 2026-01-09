/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DoNu6l0o.mjs';
export { renderers } from '../renderers.mjs';

const $$Destinations = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Destinations" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-6"> <h1 class="text-5xl font-serif text-center mb-10">All Destinations</h1> <p class="text-center max-w-2xl mx-auto">More calm coming soon...</p> </section> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/Destinations.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/Destinations.astro";
const $$url = "/Destinations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Destinations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
