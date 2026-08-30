import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://llrsyhcbtkdxnrpnjbid.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FBQ-2A0ypIILhIcXtGg9AA_14uc2o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);