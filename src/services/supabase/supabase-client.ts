import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kempfrnpsghbanirjqed.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbXBmcm5wc2doYmFuaXJqcWVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTM2MDg0NCwiZXhwIjoyMDE0OTM2ODQ0fQ.VQTmTs7D3XlYd1lp_5U6JZvOHjr_NyqzhjZJDLRE-w4';
//
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
