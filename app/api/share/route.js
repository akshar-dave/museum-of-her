export const runtime = 'edge';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const delay = new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const { name, note, turnstileToken, categories } = await req.json();

    // Verify Turnstile token
    const formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
    formData.append('response', turnstileToken);

    const verificationResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      return new Response(
        JSON.stringify({ error: 'Turnstile verification failed' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const insertPromise = supabase.from("notes").insert([{ name, note, categories }]);

    const [insertResult] = await Promise.allSettled([insertPromise, delay]);

    if (insertResult.status === "rejected") {
      console.error(insertResult.reason);
      return new Response(
        JSON.stringify({ error: "Could not share the note" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ message: "Note shared" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
