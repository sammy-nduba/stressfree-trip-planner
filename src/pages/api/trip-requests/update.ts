import type { APIRoute } from 'astro';
import { createServerSupabaseClient } from '../../../lib/supabase';
import { isAdmin } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        // Check if user is admin
        const admin = await isAdmin(cookies);
        if (!admin) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized. Admin access required.' }),
                {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const supabase = createServerSupabaseClient(cookies);
        const data = await request.json();
        const { id, status, admin_notes } = data;

        if (!id) {
            return new Response(
                JSON.stringify({ error: 'Request ID is required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Update the trip request
        const { data: updatedRequest, error } = await supabase
            .from('trip_requests')
            .update({
                status,
                admin_notes,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating trip request:', error);
            return new Response(
                JSON.stringify({ error: 'Failed to update trip request' }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Trip request updated successfully',
                data: updatedRequest
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error processing update:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};
