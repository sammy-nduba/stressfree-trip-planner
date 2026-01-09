/* empty css                                          */
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../../chunks/Layout_DoNu6l0o.mjs';
import { s as supabase } from '../../../../chunks/supabase_BNy4ncF3.mjs';
import { loadStripe } from '@stripe/stripe-js';
export { renderers } from '../../../../renderers.mjs';

const stripePublishableKey = "pk_test_your-stripe-publishable-key";
loadStripe(stripePublishableKey);
const createPaymentIntent = async (amount, bookingId) => {
  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      // Convert to cents
      currency: "usd",
      bookingId
    })
  });
  if (!response.ok) {
    throw new Error("Failed to create payment intent");
  }
  return response.json();
};

const $$Astro = createAstro();
const $$Payment = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Payment;
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/auth/login" }
    });
  }
  const { bookingId } = Astro2.params;
  const { data: booking, error } = await supabase.from("bookings").select(
    `
    *,
    packages (
      title,
      destination,
      price,
      duration_days,
      images
    )
  `
  ).eq("id", bookingId).eq("user_id", session.user.id).single();
  if (error || !booking) {
    return Astro2.redirect("/dashboard");
  }
  let clientSecret = "";
  try {
    const response = await createPaymentIntent(booking.total_price, bookingId);
    clientSecret = response.client_secret;
  } catch (error2) {
    console.error("Payment intent creation failed:", error2);
    return Astro2.redirect(
      `/packages/${booking.package_id}/book?error=payment_failed`
    );
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Complete Payment - Stress-Free Holiday Makers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="pt-24 pb-20 bg-gradient-to-b from-sky to-white min-h-screen"> <div class="max-w-4xl mx-auto px-6"> <!-- Header --> <div class="text-center mb-8"> <h1 class="text-4xl md:text-5xl font-serif text-ocean mb-4">
Complete Your Booking
</h1> <p class="text-ocean/70 text-lg">
Secure payment for your <strong>${booking.packages.title}</strong> adventure
</p> </div> <div class="grid lg:grid-cols-2 gap-12"> <!-- Payment Form --> <div class="bg-white rounded-3xl shadow-lg p-8"> <h2 class="text-2xl font-serif text-ocean mb-6">Payment Details</h2> <!-- Stripe Elements will be mounted here --> <div id="payment-element" class="mb-6"${addAttribute(clientSecret, "data-client-secret")}></div> <!-- Error messages --> <div id="payment-message" class="hidden text-red-600 mb-4"></div> <!-- Payment Buttons --> <div class="space-y-3"> <button id="submit-payment" disabled class="w-full py-4 bg-teal text-white rounded-xl font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"> <span id="button-text">Pay $${booking.total_price}</span> <div id="spinner" class="hidden inline-block ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> </button> <a${addAttribute(`/packages/${booking.package_id}/book`, "href")} class="block w-full text-center py-3 text-ocean/70 hover:text-ocean transition-colors">
← Back to Booking Details
</a> </div> </div> <!-- Booking Summary --> <div class="space-y-6"> <!-- Package Card --> <div class="bg-white rounded-3xl shadow-lg overflow-hidden"> ${booking.packages.images && booking.packages.images.length > 0 && renderTemplate`<div class="aspect-video"> <img${addAttribute(booking.packages.images[0], "src")}${addAttribute(booking.packages.title, "alt")} class="w-full h-full object-cover"> </div>`} <div class="p-6"> <h3 class="text-2xl font-serif text-ocean mb-2"> ${booking.packages.title} </h3> <p class="text-ocean/70 mb-4"> ${booking.packages.destination} • ${booking.packages.duration_days} days
</p> <div class="space-y-3"> <div class="flex justify-between"> <span class="text-ocean/70">Travel Dates</span> <span class="font-semibold"> ${new Date(
    booking.travel_dates.start_date
  ).toLocaleDateString()} -
${new Date(
    booking.travel_dates.end_date
  ).toLocaleDateString()} </span> </div> <div class="flex justify-between"> <span class="text-ocean/70">Travelers</span> <span class="font-semibold"> ${booking.participants.adults} adult${booking.participants.adults !== 1 ? "s" : ""},
${booking.participants.children} child${booking.participants.children !== 1 ? "ren" : ""} </span> </div> <hr class="border-gray-200"> <div class="flex justify-between text-xl font-bold"> <span>Total Amount</span> <span class="text-teal">$${booking.total_price}</span> </div> </div> </div> </div> <!-- Payment Security --> <div class="bg-white rounded-3xl shadow-lg p-6"> <h3 class="text-lg font-serif text-ocean mb-4">
🔒 Secure Payment
</h3> <div class="space-y-2"> <div class="flex items-center gap-3"> <span class="text-green-500">✓</span> <span class="text-sm text-ocean/80">SSL encrypted payment</span> </div> <div class="flex items-center gap-3"> <span class="text-green-500">✓</span> <span class="text-sm text-ocean/80">PCI DSS compliant</span> </div> <div class="flex items-center gap-3"> <span class="text-green-500">✓</span> <span class="text-sm text-ocean/80">Money-back guarantee</span> </div> <div class="flex items-center gap-3"> <span class="text-green-500">✓</span> <span class="text-sm text-ocean/80">24/7 customer support</span> </div> </div> </div> </div> </div> </div> </section> ` })} ${renderScript($$result, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/book/[bookingId]/payment.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/book/[bookingId]/payment.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/packages/book/[bookingId]/payment.astro";
const $$url = "/packages/book/[bookingId]/payment";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Payment,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
