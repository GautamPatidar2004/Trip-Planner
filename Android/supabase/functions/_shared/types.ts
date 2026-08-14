// _shared/types.ts
// Shared data interfaces for the trip planning system.
// This file is intentionally kept free of any other imports to avoid circular dependencies.
// Both travel-service.ts and feasibility-engine.ts import from here.

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
