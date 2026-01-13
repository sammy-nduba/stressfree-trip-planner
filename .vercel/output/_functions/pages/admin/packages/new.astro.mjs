/* empty css                                       */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_C_-UUSIl.mjs';
import { c as createServerSupabaseClient } from '../../../chunks/supabase_CBNaP4JO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const supabase = createServerSupabaseClient(Astro2.cookies);
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const title = formData.get("title");
      const description = formData.get("description");
      const price = formData.get("price");
      const duration = formData.get("duration");
      const destination_id = formData.get("destination_id");
      const custom_destination = formData.get("custom_destination");
      const imageFiles = formData.getAll("images");
      const imageUrls = [];
      for (const imageFile of imageFiles) {
        if (imageFile && imageFile.size > 0) {
          const fileExt = imageFile.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from("packages").upload(fileName, imageFile);
          if (uploadError) {
            console.error("Upload error:", uploadError);
            throw uploadError;
          }
          const {
            data: { publicUrl }
          } = supabase.storage.from("packages").getPublicUrl(fileName);
          imageUrls.push(publicUrl);
        }
      }
      if (imageUrls.length === 0) {
        throw new Error("At least one image is required");
      }
      const inclusions = formData.get("included")?.toString().split("\n").filter((i) => i.trim());
      const exclusions = formData.get("not_included")?.toString().split("\n").filter((i) => i.trim());
      const { error } = await supabase.from("packages").insert({
        name: title,
        description,
        price: parseFloat(price?.toString() || "0"),
        duration: parseInt(duration?.toString() || "0"),
        destination_id: destination_id ? parseInt(destination_id.toString()) : null,
        custom_destination: custom_destination?.toString() || null,
        images: imageUrls,
        // Store array of image URLs
        image_url: imageUrls[0],
        // First image for backward compatibility
        inclusions,
        exclusions
      });
      if (error) throw error;
      return Astro2.redirect("/admin/packages");
    } catch (error) {
      console.error("Error creating package:", error);
    }
  }
  const { data: countries } = await supabase.from("countries").select("id, name").order("name");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Create Package" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto"> <div class="flex items-center justify-between mb-8"> <h1 class="text-3xl font-bold text-gray-800">Create New Package</h1> <a href="/admin/packages" class="text-gray-600 hover:text-gray-800 font-medium">
Cancel
</a> </div> <form method="POST" enctype="multipart/form-data" class="bg-white rounded-xl shadow-lg p-8 space-y-6"> <!-- Basic Info --> <div class="grid md:grid-cols-2 gap-6"> <div class="space-y-2"> <label for="title" class="block text-sm font-medium text-gray-700">Package Title</label> <input type="text" id="title" name="title" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="e.g., Magical Maldives"> </div> <div class="space-y-2"> <label for="country_id" class="block text-sm font-medium text-gray-700">Country (Optional)</label> <select id="country_id" name="country_id" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"> <option value="">Select a country...</option> ${countries?.map((country) => renderTemplate`<option${addAttribute(country.id, "value")}> ${country.name} </option>`)} </select> </div> <div class="space-y-2"> <label for="custom_destination" class="block text-sm font-medium text-gray-700">Destination</label> <input type="text" id="custom_destination" name="custom_destination" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="e.g., Paris, France or Custom Location"> <p class="text-sm text-gray-500">
Type any destination name - you can create custom locations beyond the predefined ones
</p> </div> </div> <div class="space-y-2"> <label for="description" class="block text-sm font-medium text-gray-700">Description</label> <textarea id="description" name="description" rows="4" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="Detailed description of the package..."></textarea> </div> <!-- Details --> <div class="grid md:grid-cols-2 gap-6"> <div class="space-y-2"> <label for="price" class="block text-sm font-medium text-gray-700">Price ($)</label> <input type="number" id="price" name="price" min="0" step="0.01" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"> </div> <div class="space-y-2"> <label for="duration" class="block text-sm font-medium text-gray-700">Duration (days)</label> <input type="number" id="duration" name="duration" min="1" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="e.g., 5"> </div> </div> <div class="space-y-2"> <label for="images" class="block text-sm font-medium text-gray-700">Package Images</label> <input type="file" id="images" name="images" accept="image/*" multiple required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"> <p class="text-sm text-gray-500">
Upload 1-5 high-quality images for the package gallery.
                    First image will be the main display image.
</p> </div> <!-- Lists --> <div class="grid md:grid-cols-2 gap-6"> <div class="space-y-2"> <label for="included" class="block text-sm font-medium text-gray-700">Included (One per line)</label> <textarea id="included" name="included" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="Accommodation
Breakfast
Transfers"></textarea> </div> <div class="space-y-2"> <label for="not_included" class="block text-sm font-medium text-gray-700">Not Included (One per line)</label> <textarea id="not_included" name="not_included" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="Flights
Visa
Personal Expenses"></textarea> </div> </div> <div class="pt-6 border-t border-gray-200 flex justify-end gap-4"> <a href="/admin/packages" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
Cancel
</a> <button type="submit" class="px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 font-medium transition-colors">
Create Package
</button> </div> </form> </div> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/packages/new.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/admin/packages/new.astro";
const $$url = "/admin/packages/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
