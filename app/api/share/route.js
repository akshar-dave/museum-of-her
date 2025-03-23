import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req) {
  try {
    const { name, note, turnstileToken, categories } = await req.json();

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
      return new Response(
        JSON.stringify({ error: "Turnstile verification failed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await supabase
      .from("notes")
      .insert([{ name, note, categories }]);

    if (error) {
      console.error(error);
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
