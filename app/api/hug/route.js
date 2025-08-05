export const runtime = "edge";

import { supabase } from "@/app/lib/supabaseClient";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req) {
  try {
    const { noteId, turnstileToken } = await req.json();

    if (!noteId) {
      return new Response(
        JSON.stringify({ error: "Note ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: "Turnstile token is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Get the current user using the token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify Turnstile token
    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
    formData.append("response", turnstileToken);

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      console.error("Turnstile verification failed:", verificationResult);
      return new Response(
        JSON.stringify({ error: "Turnstile verification failed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user has already hugged this note
    const { data: existingHug, error: checkError } = await supabaseAdmin
      .from("hugs")
      .select("id")
      .eq("user_id", user.id)
      .eq("note_id", noteId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error("Error checking existing hug:", checkError);
      return new Response(
        JSON.stringify({ error: "Failed to check hug status" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // If user has already hugged this note, return success (no-op)
    if (existingHug) {
      return new Response(
        JSON.stringify({ message: "Already hugged", hugged: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Insert the hug record
    const { error: insertError } = await supabaseAdmin
      .from("hugs")
      .insert([{ user_id: user.id, note_id: noteId }]);

    if (insertError) {
      console.error("Error inserting hug:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to add hug" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Update the hugs count in the notes table
    const { error: updateError } = await supabaseAdmin.rpc('hug', { note_id: noteId });

    if (updateError) {
      console.error("Error updating hugs count:", updateError);
      // Don't fail the request if count update fails, just log it
    }

    return new Response(
      JSON.stringify({ message: "Hug added successfully", hugged: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in hug API:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 