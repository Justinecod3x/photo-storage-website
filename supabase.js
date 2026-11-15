
import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://zigyunbxqonjxlnqwiqv.supabase.co";

const SUPABASE_KEY = "sb_publishable_lWYTeaJZHLuzEvFCXkktOw_u2KXPlVD";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

export { supabase };
