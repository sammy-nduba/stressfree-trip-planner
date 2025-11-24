import { createServerSupabaseClient } from './supabase';
import type { AstroCookies } from 'astro';

export const isAdmin = async (cookies: AstroCookies) => {
  const supabase = createServerSupabaseClient(cookies);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
    return false;
  }

  return data?.role === 'admin';
};