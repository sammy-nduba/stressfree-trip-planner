import { c as createServerSupabaseClient } from '../../../chunks/supabase_CBNaP4JO.mjs';
import { i as isAdmin } from '../../../chunks/auth_BvXsYW-w.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const admin = await isAdmin(cookies);
    if (!admin) {
      return new Response(
        JSON.stringify({ error: "Unauthorized. Admin access required." }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const supabase = createServerSupabaseClient(cookies);
    const data = await request.json();
    const { id, status, admin_notes } = data;
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Request ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { data: updatedRequest, error } = await supabase.from("trip_requests").update({
      status,
      admin_notes,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id).select().single();
    if (error) {
      console.error("Error updating trip request:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update trip request" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Trip request updated successfully",
        data: updatedRequest
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error processing update:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
