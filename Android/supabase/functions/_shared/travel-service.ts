import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

export * from './feasibility-engine.ts'

// ==========================================
// Trip Requirements & Result Interfaces
// ==========================================

export interface TripRequirements {
  fromLocation: string;
  toLocation: string;
  budget: number;
  currency?: string;
  numberOfPeople: number;
  numberOfDays: number;
}

export interface TravelDataResult {
  hotels: NormalizedHotel[];
  vehicles: NormalizedVehicle[];
  transport: NormalizedTransport[];
  suggestedPlaces: NormalizedSuggestedPlace[];
}

// ==========================================
// Normalized Structured Data Interfaces
// ==========================================

export interface NormalizedSuggestedPlace {
  id: number | string;
  title: string;
  category: string;
  location: string;
  distance: string;
  rating: string;
  imageurl: string;
  icon: string;
  description: string;
  reviews: string;
  tags: any[];
}

export interface NormalizedHotel {
  id: number | string;
  name: string;
  location: string;
  rating: number | null;
  pricePerNight: number;
  amenities: string[];
  available: boolean;
  latitude: number | null;
  longitude: number | null;
}

export interface NormalizedVehicle {
  id: number | string;
  name: string;
  type: string;
  provider: string;
  pricePerDay: number;
  seats: number;
  location: string;
  available: boolean;
}

export interface NormalizedTransport {
  id: number | string;
  type: string;
  provider: string;
  fromLocation: string;
  toLocation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  available: boolean;
}

// ==========================================
// Query Filter Interfaces
// ==========================================

export interface SuggestedPlacesFilter {
  location?: string;
  category?: string;
  tags?: string[];
  minRating?: number;
  limit?: number;
}

export interface HotelsFilter {
  location?: string;
  maxPrice?: number;
  minRating?: number;
  limit?: number;
}

export interface VehiclesFilter {
  location?: string;
  type?: string;
  maxPrice?: number;
  numberOfPeople?: number;
  limit?: number;
}

export interface TransportFilter {
  fromLocation?: string;
  toLocation?: string;
  type?: string;
  maxPrice?: number;
  limit?: number;
}

// ==========================================
// Backend Service Layer Functions
// ==========================================

/**
 * Retrieves suggested places from the EXISTING `destinations` table.
 * Uses available fields (location, category, tags, rating, distance).
 * Preserves missing fields as null/empty without inventing fake data.
 */
export async function getSuggestedPlaces(
  supabase: SupabaseClient,
  filter?: SuggestedPlacesFilter
): Promise<NormalizedSuggestedPlace[]> {
  try {
    let query = supabase.from('destinations').select('*');

    if (filter?.category) {
      query = query.eq('category', filter.category);
    }

    if (filter?.location && filter.location.trim().length > 0) {
      const loc = filter.location.trim();
      query = query.or(`location.ilike.%${loc}%,title.ilike.%${loc}%`);
    }

    // Limit to reasonable payload size (default max 20)
    query = query.limit(filter?.limit || 20);

    const { data, error } = await query;

    if (error || !data) {
      console.warn('getSuggestedPlaces error or no data:', error?.message);
      return [];
    }

    return data
      .filter((item: any) => item && (item.title || item.location))
      .map((item: any) => {
        let tagsArray: any[] = [];
        if (Array.isArray(item.tags)) {
          tagsArray = item.tags;
        } else if (typeof item.tags === 'string') {
          try {
            tagsArray = JSON.parse(item.tags);
          } catch {
            tagsArray = [];
          }
        }

        return {
          id: item.id,
          title: item.title || '',
          category: item.category || '',
          location: item.location || '',
          distance: item.distance || item.subtitle_or_distance || '',
          rating: item.rating ? String(item.rating) : '',
          imageurl: item.imageurl || item.image_key || '',
          icon: item.icon || '',
          description: item.description || item.desc_text || '',
          reviews: item.reviews ? String(item.reviews) : '',
          tags: tagsArray,
        };
      });
  } catch (err) {
    console.error('Unexpected error in getSuggestedPlaces:', err);
    return [];
  }
}

/**
 * Retrieves available hotels for a destination.
 * Filters out unavailable, invalid prices (<= 0), and unusable records.
 */
export async function getHotels(
  supabase: SupabaseClient,
  filter?: HotelsFilter
): Promise<NormalizedHotel[]> {
  try {
    let query = supabase
      .from('hotels')
      .select('*')
      .eq('available', true)
      .gt('price_per_night', 0);

    if (filter?.location && filter.location.trim().length > 0) {
      query = query.ilike('location', `%${filter.location.trim()}%`);
    }

    if (filter?.maxPrice && filter.maxPrice > 0) {
      query = query.lte('price_per_night', filter.maxPrice);
    }

    if (filter?.minRating && filter.minRating > 0) {
      query = query.gte('rating', filter.minRating);
    }

    query = query.limit(filter?.limit || 20);

    const { data, error } = await query;

    if (error || !data) {
      console.warn('getHotels query error:', error?.message);
      return [];
    }

    return data
      .filter((item: any) => item && item.name && item.location && Number(item.price_per_night) > 0)
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        location: item.location,
        rating: item.rating !== null && item.rating !== undefined ? Number(item.rating) : null,
        pricePerNight: Number(item.price_per_night),
        amenities: Array.isArray(item.amenities) ? item.amenities : [],
        available: Boolean(item.available),
        latitude: item.latitude !== null && item.latitude !== undefined ? Number(item.latitude) : null,
        longitude: item.longitude !== null && item.longitude !== undefined ? Number(item.longitude) : null,
      }));
  } catch (err) {
    console.error('Unexpected error in getHotels:', err);
    return [];
  }
}

/**
 * Retrieves available rental vehicles for a destination.
 * Filters out unavailable, vehicles with seats < numberOfPeople, and invalid prices.
 */
export async function getVehicles(
  supabase: SupabaseClient,
  filter?: VehiclesFilter
): Promise<NormalizedVehicle[]> {
  try {
    let query = supabase
      .from('vehicles')
      .select('*')
      .eq('available', true)
      .gt('price_per_day', 0);

    if (filter?.location && filter.location.trim().length > 0) {
      query = query.ilike('location', `%${filter.location.trim()}%`);
    }

    if (filter?.type) {
      query = query.eq('type', filter.type);
    }

    if (filter?.numberOfPeople && filter.numberOfPeople > 0) {
      query = query.gte('seats', filter.numberOfPeople);
    }

    if (filter?.maxPrice && filter.maxPrice > 0) {
      query = query.lte('price_per_day', filter.maxPrice);
    }

    query = query.limit(filter?.limit || 20);

    const { data, error } = await query;

    if (error || !data) {
      console.warn('getVehicles query error:', error?.message);
      return [];
    }

    return data
      .filter((item: any) => item && item.name && item.type && Number(item.price_per_day) > 0)
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        provider: item.provider || '',
        pricePerDay: Number(item.price_per_day),
        seats: Number(item.seats || 0),
        location: item.location || '',
        available: Boolean(item.available),
      }));
  } catch (err) {
    console.error('Unexpected error in getVehicles:', err);
    return [];
  }
}

/**
 * Retrieves available transport (flights, buses, trains, cabs) for fromLocation -> toLocation.
 * Filters out unavailable, invalid prices, and missing routes.
 */
export async function getTransport(
  supabase: SupabaseClient,
  filter?: TransportFilter
): Promise<NormalizedTransport[]> {
  try {
    let query = supabase
      .from('transport')
      .select('*')
      .eq('available', true)
      .gt('price', 0);

    if (filter?.fromLocation && filter.fromLocation.trim().length > 0) {
      query = query.ilike('from_location', `%${filter.fromLocation.trim()}%`);
    }

    if (filter?.toLocation && filter.toLocation.trim().length > 0) {
      query = query.ilike('to_location', `%${filter.toLocation.trim()}%`);
    }

    if (filter?.type) {
      query = query.eq('type', filter.type);
    }

    if (filter?.maxPrice && filter.maxPrice > 0) {
      query = query.lte('price', filter.maxPrice);
    }

    query = query.limit(filter?.limit || 20);

    const { data, error } = await query;

    if (error || !data) {
      console.warn('getTransport query error:', error?.message);
      return [];
    }

    return data
      .filter((item: any) => item && item.type && Number(item.price) > 0 && item.from_location && item.to_location)
      .map((item: any) => ({
        id: item.id,
        type: item.type,
        provider: item.provider || '',
        fromLocation: item.from_location,
        toLocation: item.to_location,
        departureTime: item.departure_time || '',
        arrivalTime: item.arrival_time || '',
        duration: item.duration || '',
        price: Number(item.price),
        available: Boolean(item.available),
      }));
  } catch (err) {
    console.error('Unexpected error in getTransport:', err);
    return [];
  }
}

/**
 * Comprehensive travel data retrieval for a trip planning request.
 * Coordinates querying hotels, vehicles, transport, and suggested places concurrently.
 * Guaranteed safe: failure in one category yields an empty array without crashing the overall request.
 */
export async function retrieveTravelData(
  supabase: SupabaseClient,
  requirements: TripRequirements
): Promise<TravelDataResult> {
  const { fromLocation, toLocation, numberOfPeople } = requirements;

  // Execute all 4 category retrievals concurrently with individual error safety
  const [hotelsResult, vehiclesResult, transportResult, placesResult] = await Promise.allSettled([
    getHotels(supabase, { location: toLocation, limit: 20 }),
    getVehicles(supabase, { location: toLocation, numberOfPeople, limit: 20 }),
    getTransport(supabase, { fromLocation, toLocation, limit: 20 }),
    getSuggestedPlaces(supabase, { location: toLocation, limit: 20 }),
  ]);

  return {
    hotels: hotelsResult.status === 'fulfilled' ? hotelsResult.value : [],
    vehicles: vehiclesResult.status === 'fulfilled' ? vehiclesResult.value : [],
    transport: transportResult.status === 'fulfilled' ? transportResult.value : [],
    suggestedPlaces: placesResult.status === 'fulfilled' ? placesResult.value : [],
  };
}
