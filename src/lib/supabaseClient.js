/* ============================================================
   Supabase client — shared across the app.

   SETUP:
   1. Create a project at https://supabase.com
   2. Replace the values below with your project's URL and anon key
      (Project Settings → API).
   3. Run /supabase/schema.sql in the Supabase SQL editor.
   The anon key is safe to expose in frontend code — Row Level
   Security policies in schema.sql control read/write access.
   ============================================================ */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://llrsyhcbtkdxnrpnjbid.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FBQ-2A0ypIILhIcXtGg9AA_14uc2o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);