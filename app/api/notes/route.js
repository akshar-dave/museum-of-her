export const runtime = 'edge';

import { supabase } from "@/app/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('notes_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ notes: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}