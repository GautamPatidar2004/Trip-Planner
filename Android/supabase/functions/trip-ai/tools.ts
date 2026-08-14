// tools.ts
// Travel Data Tool Architecture & Service Layer
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import {
  NormalizedSuggestedPlace,
  NormalizedHotel,
  NormalizedVehicle,
  NormalizedTransport,
  SuggestedPlacesFilter,
  HotelsFilter,
  VehiclesFilter,
  TransportFilter,
  TripRequirements,
  TravelDataResult,
  FeasibleHotel,
  FeasibleVehicle,
  FeasibleTransport,
  FeasibleSuggestedPlace,
  BudgetAnalysis,
  FeasibleOptions,
  PlanningInputPayload,
  StructuredTripPlan,
  getSuggestedPlaces,
  getHotels,
  getVehicles,
  getTransport,
  retrieveTravelData,
  analyzeFeasibilityAndBudget,
  validateAndNormalizeAiPlan,
} from '../_shared/travel-service.ts'

export {
  type NormalizedSuggestedPlace,
  type NormalizedHotel,
  type NormalizedVehicle,
  type NormalizedTransport,
  type SuggestedPlacesFilter,
  type HotelsFilter,
  type VehiclesFilter,
  type TransportFilter,
  type TripRequirements,
  type TravelDataResult,
  type FeasibleHotel,
  type FeasibleVehicle,
  type FeasibleTransport,
  type FeasibleSuggestedPlace,
  type BudgetAnalysis,
  type FeasibleOptions,
  type PlanningInputPayload,
  type StructuredTripPlan,
  getSuggestedPlaces,
  getHotels,
  getVehicles,
  getTransport,
  retrieveTravelData,
  analyzeFeasibilityAndBudget,
  validateAndNormalizeAiPlan,
}

export interface Weather {
  date: string;
  temperature?: number;
  condition?: string;
  precipitation?: number;
}

export interface ToolResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function getSupabaseClient(): SupabaseClient | null {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * Searches places from the existing `destinations` table.
 */
export async function search_places(query: string, location: string): Promise<ToolResult<NormalizedSuggestedPlace[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Database client not configured." };
  }
  const places = await getSuggestedPlaces(supabase, { location: location || query, limit: 20 });
  return { success: true, data: places };
}

/**
 * Searches available hotels from the `hotels` database table.
 */
export async function search_hotels(location: string, checkInDate?: string, checkOutDate?: string, guests?: number): Promise<ToolResult<NormalizedHotel[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Database client not configured." };
  }
  const hotels = await getHotels(supabase, { location, limit: 20 });
  return { success: true, data: hotels };
}

/**
 * Searches available transport from the `transport` database table.
 */
export async function search_transport(from: string, to: string, date?: string): Promise<ToolResult<NormalizedTransport[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Database client not configured." };
  }
  const transports = await getTransport(supabase, { fromLocation: from, toLocation: to, limit: 20 });
  return { success: true, data: transports };
}

export async function search_flights(from: string, to: string, date?: string): Promise<ToolResult<NormalizedTransport[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) return { success: false, error: "Database client not configured." };
  const flights = await getTransport(supabase, { fromLocation: from, toLocation: to, type: 'flight', limit: 20 });
  return { success: true, data: flights };
}

export async function search_buses(from: string, to: string, date?: string): Promise<ToolResult<NormalizedTransport[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) return { success: false, error: "Database client not configured." };
  const buses = await getTransport(supabase, { fromLocation: from, toLocation: to, type: 'bus', limit: 20 });
  return { success: true, data: buses };
}

export async function search_trains(from: string, to: string, date?: string): Promise<ToolResult<NormalizedTransport[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) return { success: false, error: "Database client not configured." };
  const trains = await getTransport(supabase, { fromLocation: from, toLocation: to, type: 'train', limit: 20 });
  return { success: true, data: trains };
}

export async function get_weather(location: string, date: string): Promise<ToolResult<Weather>> {
  return { success: false, error: "Weather API not configured yet." };
}

export async function get_route(from: string, to: string): Promise<ToolResult<any>> {
  return { success: false, error: "Route API not configured yet." };
}

export async function calculate_distance(from: string, to: string): Promise<ToolResult<{ distanceKm: number }>> {
  return { success: false, error: "Distance calculation API not configured yet." };
}

export async function calculate_budget(requirements: any, selectedItems: any): Promise<ToolResult<{ totalEstimated: number; breakdown: any }>> {
  return { success: false, error: "Budget calculator not configured yet." };
}

// Tool definitions schema for AI function calling
export const travelToolsSchema = [
  {
    name: "getSuggestedPlaces",
    description: "Search for suggested places or attractions from the destinations table near a location or category.",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
        category: { type: "string" },
        tags: { type: "array", items: { type: "string" } }
      }
    }
  },
  {
    name: "getHotels",
    description: "Search for available hotels in a specific location with optional price and rating filters.",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
        maxPrice: { type: "number" },
        minRating: { type: "number" }
      },
      required: ["location"]
    }
  },
  {
    name: "getVehicles",
    description: "Search for rental vehicles in a specific location.",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
        type: { type: "string" },
        seats: { type: "number" }
      },
      required: ["location"]
    }
  },
  {
    name: "getTransport",
    description: "Search for available transport (flights, buses, trains, cabs) between origin and destination.",
    parameters: {
      type: "object",
      properties: {
        fromLocation: { type: "string" },
        toLocation: { type: "string" },
        type: { type: "string" }
      },
      required: ["fromLocation", "toLocation"]
    }
  }
];
