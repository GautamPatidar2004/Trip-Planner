import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { target } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    let responseData: any = {};

    if (target === 'dashboard') {
      const [holidaysRes, hotspotsRes, seasonRes, tipsRes] = await Promise.all([
        supabase.from('holidays').select('*').limit(4),
        supabase.from('destinations').select('*').eq('category', 'hotspot').limit(3),
        supabase.from('destinations').select('*').eq('category', 'season_spot').limit(4),
        supabase.from('tips').select('*')
      ]);

      responseData = {
        upcomingHolidays: holidaysRes.data || [],
        hotspotsNearYou: hotspotsRes.data || [],
        popularSeasonSpots: seasonRes.data || [],
        tipsForTravelers: tipsRes.data || []
      };

    } else if (target === 'holidays') {
      const { data } = await supabase.from('holidays').select('*');
      responseData = data || [];
      
    } else if (target === 'explore_map') {
      const [markersRes, placesRes] = await Promise.all([
        supabase.from('map_markers').select('*'),
        supabase.from('destinations').select('*').limit(5)
      ]);
      responseData = {
        markers: markersRes.data || [],
        places: placesRes.data || []
      };
      
    } else if (target === 'hotspots') {
      const { data } = await supabase.from('destinations').select('*').eq('category', 'hotspot');
      responseData = data || [];
      
    } else if (target === 'season_spots') {
      const { data } = await supabase.from('destinations').select('*').eq('category', 'season_spot');
      responseData = data || [];
      
    } else if (target === 'family') {
      const { data } = await supabase.from('destinations').select('*').eq('category', 'family');
      responseData = data || [];
      
    } else if (target === 'romantic') {
      const { data } = await supabase.from('destinations').select('*').eq('category', 'romantic');
      responseData = data || [];
      
    } else if (target === 'local') {
      const { data } = await supabase.from('destinations').select('*').eq('category', 'local');
      responseData = data || [];
      
    } else if (target === 'nature') {
      const { data } = await supabase.from('destinations').select('*').eq('category', 'nature');
      responseData = data || [];
      
    } else if (target === 'trips') {
      const { data } = await supabase.from('trips').select('*');
      responseData = data || [];
      
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Target not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
