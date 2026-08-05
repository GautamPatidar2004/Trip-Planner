import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables with hardcoded fallbacks to prevent bundling failures
const supabaseUrl = 
  process.env.EXPO_PUBLIC_SUPABASE_URL || 
  process.env.VITE_SUPABASE_URL || 
  'https://rwdcrwibkslyqcgbylpp.supabase.co';

const supabaseAnonKey = 
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.VITE_SUPABASE_ANON_KEY || 
  'sb_publishable_1fFqVDu_dZBnvN1cKUalxQ_Thn4QRpF';

console.log('[Supabase] Initializing client...');
console.log('[Supabase] URL:', supabaseUrl);
console.log('[Supabase] Key:', `${supabaseAnonKey.substring(0, 15)}...`);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
