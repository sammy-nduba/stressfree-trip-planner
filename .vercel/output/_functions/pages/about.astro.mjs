/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DoNu6l0o.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-6 max-w-3xl mx-auto text-center"> <h1 class="text-5xl font-serif mb-8">We Make Holidays Stress-Free</h1> <p class="text-lg leading-relaxed">
Founded by travelers tired of chaos. We believe planning should feel like the vacation.
</p> </section> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/About.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/About.astro";
const $$url = "/About";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
