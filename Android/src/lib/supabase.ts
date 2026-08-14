import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables with safety warnings
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Warning: EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY is not defined in environment variables.'
  );
}

console.log('[Supabase] Initializing client...');
console.log('[Supabase] URL:', supabaseUrl);
console.log('[Supabase] Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 15)}...` : 'undefined');


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * --- SUPABASE EDGE FUNCTIONS DEV GUIDE ---
 * 
 * 1. To run functions locally:
 *    npx supabase start
 *    npx supabase functions serve --no-verify-jwt
 * 
 * 2. To invoke a function from your code:
 *    import { supabase } from './supabase';
 * 
 *    // Example: Invoke generate-itinerary function
 *    const { data, error } = await supabase.functions.invoke('generate-itinerary', {
 *      body: { 
 *        destination: 'Manali', 
 *        duration: 3, 
 *        budget: '₹15,000', 
 *        companions: 'couple' 
 *      }
 *    });
 * 
 *    // Example: Invoke search-places function
 *    const { data, error } = await supabase.functions.invoke('search-places', {
 *      body: { query: 'Hadimba Temple', limit: 5 }
 *    });
 */

