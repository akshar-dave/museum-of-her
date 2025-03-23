if (!globalThis.__import_unsupported) {
  try {
    Object.defineProperty(globalThis, '__import_unsupported', {
      value: true,
      writable: false,
      configurable: true,
    });
  } catch (e) {
    // Ignore errors if already defined
  }
}

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
