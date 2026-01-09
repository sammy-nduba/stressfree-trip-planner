import { e as createComponent, f as createAstro, n as renderHead, o as renderSlot, l as renderScript, r as renderTemplate } from './astro/server_C1SB2yiH.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  const { user } = Astro2.locals;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Admin Panel</title>${renderHead()}</head> <body class="bg-gray-100"> <div class="flex h-screen overflow-hidden"> <!-- Admin Sidebar --> <aside class="w-64 bg-gray-800 text-white flex flex-col"> <!-- Logo/Brand --> <div class="p-6 border-b border-gray-700"> <h1 class="text-2xl font-bold flex items-center gap-2"> <span class="text-3xl">⚙️</span> <span>Admin</span> </h1> ${user && renderTemplate`<p class="text-sm text-gray-400 mt-2 truncate"> ${user.email} </p>`} </div> <!-- Navigation --> <nav class="flex-1 py-4"> <ul class="space-y-1"> <li> <a href="/admin" class="block px-6 py-3 hover:bg-gray-700 transition-colors">
📊 Dashboard
</a> </li> <li> <a href="/admin/packages" class="block px-6 py-3 hover:bg-gray-700 transition-colors">
📦 Packages
</a> </li> <li> <a href="/admin/trip-requests" class="block px-6 py-3 hover:bg-gray-700 transition-colors">
💬 Trip Requests
</a> </li> </ul> </nav> <!-- Footer Actions --> <div class="p-4 border-t border-gray-700"> <a href="/" class="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-center mb-2 transition-colors">
🏠 View Site
</a> <button id="logout-btn" class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-center transition-colors">
🚪 Logout
</button> </div> </aside> <!-- Main Content Area --> <main class="flex-1 overflow-y-auto bg-gray-100"> <div class="p-8 max-w-7xl mx-auto"> ${renderSlot($$result, $$slots["default"])} </div> </main> </div> ${renderScript($$result, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
