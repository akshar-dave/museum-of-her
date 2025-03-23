if (!('__import_unsupported' in globalThis)) {
  Object.defineProperty(globalThis, '__import_unsupported', {
    value: true,
    writable: false,
    configurable: true,
  });
}

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
