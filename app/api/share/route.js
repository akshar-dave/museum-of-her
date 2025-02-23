export const runtime = 'edge';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const delay = new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const { note } = await req.json();

    const insertPromise = supabase.from("notes").insert([{ note }]);

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
