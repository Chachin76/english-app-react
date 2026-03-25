import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sovrhvgwazgkiaplbuhn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_e276ORbhRK5uPQp7o00ACA_z2ECJ5OW';  // tu publishable key completa

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);