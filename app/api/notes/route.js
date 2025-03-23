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

export async function POST(request) {
  try {
    const { noteId, userId } = await request.json();

    if (!noteId || !userId) {
      return new Response(JSON.stringify({ error: 'Missing noteId or userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabase
      .from('notes')
      .update({ approved: true, approved_by: userId })
      .eq('id', noteId);

    if (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to approve note' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Note approved successfully' }), {
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
