/* empty css                                       */
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_D0jjlpkZ.mjs';
import { s as supabase } from '../../../chunks/supabase_CBNaP4JO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Book = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Book;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/auth/login" }
    });
  }
  const { id } = Astro2.params;
  const { data: pkg, error } = await supabase.from("packages").select("*").eq("id", id).single();
  if (error || !pkg) {
    return Astro2.redirect("/packages");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Book ${pkg.title} - Stress-Free Holiday Makers` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="pt-24 pb-20 bg-gradient-to-b from-sky to-white min-h-screen"> <div class="max-w-4xl mx-auto px-6"> <!-- Header --> <div class="text-center mb-8"> <h1 class="text-4xl md:text-5xl font-serif text-ocean mb-4">
Book Your Adventure
</h1> <p class="text-ocean/70 text-lg">
Complete your booking for <strong>${pkg.title}</strong> in ${pkg.destination} </p> </div> <!-- Package Summary --> <div class="bg-white rounded-3xl shadow-lg p-6 mb-8"> <div class="flex items-center justify-between"> <div> <h2 class="text-2xl font-serif text-ocean mb-1">${pkg.title}</h2> <p class="text-ocean/70">${pkg.destination} • ${pkg.duration_days} days</p> </div> <div class="text-right"> <div class="text-3xl font-bold text-teal">$${pkg.price}</div> <div class="text-sm text-ocean/60">per person</div> </div> </div> </div> <!-- Booking Form --> <div class="bg-white rounded-3xl shadow-lg p-8"> <form id="booking-form" class="space-y-6"> <!-- Travel Dates --> <div class="grid md:grid-cols-2 gap-6"> <div> <label class="block text-ocean font-medium mb-2">
Start Date <span class="text-red-500">*</span> </label> <input type="date" id="start-date" name="startDate" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal" required> </div> <div> <label class="block text-ocean font-medium mb-2">
End Date <span class="text-red-500">*</span> </label> <input type="date" id="end-date" name="endDate" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal" required> </div> </div> <!-- Travelers --> <div class="grid md:grid-cols-2 gap-6"> <div> <label class="block text-ocean font-medium mb-2">
Number of Adults <span class="text-red-500">*</span> </label> <div class="flex items-center gap-4"> <button type="button" id="adults-minus" class="w-10 h-10 rounded-full bg-gray-100 text-ocean hover:bg-teal hover:text-white transition-colors font-bold">
−
</button> <input type="number" id="adults" name="adults" value="2" min="1" max="10" class="w-16 text-center px-3 py-2 rounded-lg border border-gray-200" readonly> <button type="button" id="adults-plus" class="w-10 h-10 rounded-full bg-gray-100 text-ocean hover:bg-teal hover:text-white transition-colors font-bold">
+
</button> </div> </div> <div> <label class="block text-ocean font-medium mb-2">
Number of Children
</label> <div class="flex items-center gap-4"> <button type="button" id="children-minus" class="w-10 h-10 rounded-full bg-gray-100 text-ocean hover:bg-teal hover:text-white transition-colors font-bold">
−
</button> <input type="number" id="children" name="children" value="0" min="0" max="10" class="w-16 text-center px-3 py-2 rounded-lg border border-gray-200" readonly> <button type="button" id="children-plus" class="w-10 h-10 rounded-full bg-gray-100 text-ocean hover:bg-teal hover:text-white transition-colors font-bold">
+
</button> </div> </div> </div> <!-- Special Requests --> <div> <label class="block text-ocean font-medium mb-2">
Special Requests (Optional)
</label> <textarea id="special-requests" name="specialRequests" rows="4" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal" placeholder="Any special dietary requirements, accessibility needs, or other requests..."></textarea> </div> <!-- Booking Summary --> <div id="booking-summary" class="bg-gray-50 rounded-2xl p-6"> <h3 class="text-lg font-serif text-ocean mb-4">Booking Summary</h3> <div class="space-y-3"> <div class="flex justify-between"> <span class="text-ocean/70">Package:</span> <span class="font-medium">${pkg.title}</span> </div> <div class="flex justify-between"> <span class="text-ocean/70">Duration:</span> <span class="font-medium">${pkg.duration_days} days</span> </div> <div class="flex justify-between"> <span class="text-ocean/70">Travelers:</span> <span id="summary-travelers" class="font-medium">2 adults, 0 children</span> </div> <div class="flex justify-between"> <span class="text-ocean/70">Price per person:</span> <span class="font-medium">$${pkg.price}</span> </div> <hr class="border-gray-200"> <div class="flex justify-between text-xl font-bold"> <span>Total Amount:</span> <span id="total-amount" class="text-teal">$0</span> </div> </div> </div> <!-- Terms and Conditions --> <div class="flex items-start gap-3"> <input type="checkbox" id="terms" name="terms" class="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal" required> <label for="terms" class="text-sm text-ocean/70">
I agree to the <a href="/terms" class="text-teal hover:underline">Terms and Conditions</a>
and <a href="/privacy" class="text-teal hover:underline">Privacy Policy</a>.
              I understand that this booking is subject to availability and confirmation.
</label> </div> <!-- Error Messages --> <div id="error-message" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"></div> <!-- Submit Button --> <button type="submit" id="submit-booking" class="w-full py-4 bg-teal text-white rounded-xl font-medium text-lg hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
Proceed to Payment
</button> </form> </div> </div> </section> ` })} ${renderScript($$result, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/[id]/book.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/[id]/book.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/[id]/book.astro";
const $$url = "/packages/[id]/book";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Book,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
