import {
  TripRequirements,
  TravelDataResult,
  NormalizedHotel,
  NormalizedVehicle,
  NormalizedTransport,
  NormalizedSuggestedPlace,
} from './travel-service.ts'

// ==========================================
// Feasibility & Budget Interfaces
// ==========================================

export interface FeasibleHotel {
  id: number | string;
  name: string;
  location: string;
  rating: number | null;
  pricePerNight: number;
  requiredNights: number;
  totalCost: number;
  amenities: string[];
  available: boolean;
  latitude: number | null;
  longitude: number | null;
}

export interface FeasibleVehicle {
  id: number | string;
  name: string;
  type: string;
  provider: string;
  pricePerDay: number;
  requiredDays: number;
  totalCost: number;
  seats: number;
  location: string;
  available: boolean;
}

export interface FeasibleTransport {
  id: number | string;
  type: string;
  provider: string;
  fromLocation: string;
  toLocation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  totalCost: number;
  available: boolean;
}

export interface FeasibleSuggestedPlace {
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
  costKnown: boolean;
  estimatedCost: number | null;
}

export interface BudgetAnalysis {
  budget: number;
  currency: string;
  minKnownTotal: number;
  remainingKnownBudget: number;
  isBudgetSufficient: boolean;
  estimatedCosts: {
    transport: number | null;
    hotel: number | null;
    vehicle: number | null;
    activities: number | null;
    food: number | null;
    other: number | null;
  };
  notes: string[];
}

export interface FeasibleOptions {
  hotels: FeasibleHotel[];
  vehicles: FeasibleVehicle[];
  transport: FeasibleTransport[];
  suggestedPlaces: FeasibleSuggestedPlace[];
}

export interface PlanningInputPayload {
  requirements: TripRequirements;
  feasibleOptions: FeasibleOptions;
  budgetAnalysis: BudgetAnalysis;
}

// ==========================================
// Structured Plan Schema for AI Output
// ==========================================

export interface StructuredTripPlan {
  success: boolean;
  tripSummary: {
    fromLocation: string;
    toLocation: string;
    numberOfDays: number;
    numberOfPeople: number;
    budget: number;
    currency: string;
  };
  transport: {
    selected: boolean;
    id: number | string | null;
    name: string | null;
    type: string | null;
    provider: string | null;
    price: number | null;
  };
  hotel: {
    selected: boolean;
    id: number | string | null;
    name: string | null;
    location: string | null;
    rating: number | null;
    pricePerNight: number | null;
    numberOfNights: number;
    totalPrice: number | null;
  };
  vehicle: {
    selected: boolean;
    id: number | string | null;
    name: string | null;
    type: string | null;
    pricePerDay: number | null;
    totalPrice: number | null;
  };
  suggestedPlaces: Array<{
    id: number | string;
    title: string;
    reason: string;
    distance: string;
    rating: string | null;
    costKnown: boolean;
    estimatedCost: number | null;
  }>;
  budget: {
    knownTotal: number;
    remainingKnownBudget: number;
    currency: string;
  };
  days: Array<{
    day: number;
    activities: Array<{
      placeId: number | string | null;
      title: string;
      startTime: string | null;
      endTime: string | null;
      duration: string | null;
      reason: string;
    }>;
  }>;
  notes: string[];
}

// ==========================================
// Deterministic Feasibility & Cost Engine
// ==========================================

export function analyzeFeasibilityAndBudget(
  requirements: TripRequirements,
  travelData: TravelDataResult
): PlanningInputPayload {
  const budget = Math.max(Number(requirements.budget) || 0, 0);
  const currency = requirements.currency || 'INR';
  const numberOfDays = Math.max(Number(requirements.numberOfDays) || 1, 1);
  const numberOfPeople = Math.max(Number(requirements.numberOfPeople) || 1, 1);
  const requiredNights = Math.max(numberOfDays - 1, 0);
  const requiredDays = numberOfDays;

  const notes: string[] = [];

  // 1. HOTEL COST CALCULATION & FILTERING
  const feasibleHotels: FeasibleHotel[] = [];
  for (const hotel of travelData.hotels || []) {
    if (!hotel.available || !hotel.pricePerNight || hotel.pricePerNight <= 0) {
      continue;
    }

    const totalCost = Number((hotel.pricePerNight * requiredNights).toFixed(2));
    if (totalCost > budget && budget > 0) {
      continue;
    }

    feasibleHotels.push({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
      rating: hotel.rating,
      pricePerNight: hotel.pricePerNight,
      requiredNights,
      totalCost,
      amenities: hotel.amenities || [],
      available: hotel.available,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
    });
  }

  feasibleHotels.sort((a, b) => a.totalCost - b.totalCost);

  if (travelData.hotels && travelData.hotels.length > 0 && feasibleHotels.length === 0) {
    notes.push('All verified hotels in database exceed specified budget.');
  } else if (!travelData.hotels || travelData.hotels.length === 0) {
    notes.push('No verified hotels found in database for destination.');
  }

  // 2. VEHICLE COST CALCULATION & FILTERING
  const feasibleVehicles: FeasibleVehicle[] = [];
  for (const vehicle of travelData.vehicles || []) {
    if (!vehicle.available || !vehicle.pricePerDay || vehicle.pricePerDay <= 0) {
      continue;
    }

    if (vehicle.seats < numberOfPeople) {
      continue;
    }

    const totalCost = Number((vehicle.pricePerDay * requiredDays).toFixed(2));
    if (totalCost > budget && budget > 0) {
      continue;
    }

    feasibleVehicles.push({
      id: vehicle.id,
      name: vehicle.name,
      type: vehicle.type,
      provider: vehicle.provider,
      pricePerDay: vehicle.pricePerDay,
      requiredDays,
      totalCost,
      seats: vehicle.seats,
      location: vehicle.location,
      available: vehicle.available,
    });
  }

  feasibleVehicles.sort((a, b) => a.totalCost - b.totalCost);

  // 3. TRANSPORT COST CALCULATION & FILTERING
  const feasibleTransport: FeasibleTransport[] = [];
  for (const t of travelData.transport || []) {
    if (!t.available || !t.price || t.price <= 0) {
      continue;
    }

    const totalCost = Number(t.price.toFixed(2));
    if (totalCost > budget && budget > 0) {
      continue;
    }

    feasibleTransport.push({
      id: t.id,
      type: t.type,
      provider: t.provider,
      fromLocation: t.fromLocation,
      toLocation: t.toLocation,
      departureTime: t.departureTime,
      arrivalTime: t.arrivalTime,
      duration: t.duration,
      price: t.price,
      totalCost,
      available: t.available,
    });
  }

  feasibleTransport.sort((a, b) => a.totalCost - b.totalCost);

  if (travelData.transport && travelData.transport.length > 0 && feasibleTransport.length === 0) {
    notes.push('All verified transport options exceed budget.');
  } else if (!travelData.transport || travelData.transport.length === 0) {
    notes.push(`No verified transport route found for: ${requirements.fromLocation} -> ${requirements.toLocation}.`);
  }

  // 4. SUGGESTED PLACES PROCESSING
  const feasibleSuggestedPlaces: FeasibleSuggestedPlace[] = [];
  for (const place of travelData.suggestedPlaces || []) {
    feasibleSuggestedPlaces.push({
      id: place.id,
      title: place.title,
      category: place.category,
      location: place.location,
      distance: place.distance,
      rating: place.rating,
      imageurl: place.imageurl,
      icon: place.icon,
      description: place.description,
      reviews: place.reviews,
      tags: place.tags || [],
      costKnown: false,
      estimatedCost: null,
    });
  }

  // 5. BUDGET ANALYSIS
  const minHotelCost = feasibleHotels.length > 0 ? feasibleHotels[0].totalCost : 0;
  const minTransportCost = feasibleTransport.length > 0 ? feasibleTransport[0].totalCost : 0;
  const minKnownTotal = Number((minHotelCost + minTransportCost).toFixed(2));
  const remainingKnownBudget = Number(Math.max(budget - minKnownTotal, 0).toFixed(2));
  const isBudgetSufficient = budget === 0 || minKnownTotal <= budget;

  if (!isBudgetSufficient) {
    notes.push(`Minimum base travel cost (${currency} ${minKnownTotal}) exceeds budget (${currency} ${budget}).`);
  }

  const budgetAnalysis: BudgetAnalysis = {
    budget,
    currency,
    minKnownTotal,
    remainingKnownBudget,
    isBudgetSufficient,
    estimatedCosts: {
      transport: minTransportCost > 0 ? minTransportCost : null,
      hotel: minHotelCost > 0 ? minHotelCost : null,
      vehicle: feasibleVehicles.length > 0 ? feasibleVehicles[0].totalCost : null,
      activities: null,
      food: null,
      other: null,
    },
    notes,
  };

  return {
    requirements,
    feasibleOptions: {
      hotels: feasibleHotels,
      vehicles: feasibleVehicles,
      transport: feasibleTransport,
      suggestedPlaces: feasibleSuggestedPlaces,
    },
    budgetAnalysis,
  };
}

// ==========================================
// Strict AI Response Validator & Normalizer
// ==========================================

/**
 * Validates AI's response against supplied feasible options.
 * Overrides any manipulated prices with exact database values and strips unsupplied IDs.
 */
export function validateAndNormalizeAiPlan(
  rawAiPlan: any,
  planningInput: PlanningInputPayload
): { valid: boolean; plan: StructuredTripPlan | null; error?: string } {
  if (!rawAiPlan || typeof rawAiPlan !== 'object') {
    return { valid: false, plan: null, error: 'AI returned non-object response' };
  }

  const { requirements, feasibleOptions, budgetAnalysis } = planningInput;

  // 1. HOTEL VALIDATION
  let validatedHotel = {
    selected: false,
    id: null as number | string | null,
    name: null as string | null,
    location: null as string | null,
    rating: null as number | null,
    pricePerNight: null as number | null,
    numberOfNights: Math.max(requirements.numberOfDays - 1, 0),
    totalPrice: null as number | null,
  };

  if (rawAiPlan.hotel && rawAiPlan.hotel.selected && rawAiPlan.hotel.id) {
    const matched = feasibleOptions.hotels.find(
      (h) => String(h.id) === String(rawAiPlan.hotel.id)
    );
    if (matched) {
      validatedHotel = {
        selected: true,
        id: matched.id,
        name: matched.name,
        location: matched.location,
        rating: matched.rating,
        pricePerNight: matched.pricePerNight,
        numberOfNights: matched.requiredNights,
        totalPrice: matched.totalCost,
      };
    }
  }

  // 2. VEHICLE VALIDATION
  let validatedVehicle = {
    selected: false,
    id: null as number | string | null,
    name: null as string | null,
    type: null as string | null,
    pricePerDay: null as number | null,
    totalPrice: null as number | null,
  };

  if (rawAiPlan.vehicle && rawAiPlan.vehicle.selected && rawAiPlan.vehicle.id) {
    const matched = feasibleOptions.vehicles.find(
      (v) => String(v.id) === String(rawAiPlan.vehicle.id)
    );
    if (matched) {
      validatedVehicle = {
        selected: true,
        id: matched.id,
        name: matched.name,
        type: matched.type,
        pricePerDay: matched.pricePerDay,
        totalPrice: matched.totalCost,
      };
    }
  }

  // 3. TRANSPORT VALIDATION
  let validatedTransport = {
    selected: false,
    id: null as number | string | null,
    name: null as string | null,
    type: null as string | null,
    provider: null as string | null,
    price: null as number | null,
  };

  if (rawAiPlan.transport && rawAiPlan.transport.selected && rawAiPlan.transport.id) {
    const matched = feasibleOptions.transport.find(
      (t) => String(t.id) === String(rawAiPlan.transport.id)
    );
    if (matched) {
      validatedTransport = {
        selected: true,
        id: matched.id,
        name: `${matched.provider ? matched.provider + ' ' : ''}${matched.type}`.trim(),
        type: matched.type,
        provider: matched.provider || '',
        price: matched.price,
      };
    }
  }

  // 4. SUGGESTED PLACES VALIDATION
  const validatedPlaces: Array<{
    id: number | string;
    title: string;
    category?: string;
    reason: string;
    distance: string;
    rating: string | null;
    costKnown: boolean;
    estimatedCost: number | null;
  }> = [];

  if (Array.isArray(rawAiPlan.suggestedPlaces)) {
    for (const rawPlace of rawAiPlan.suggestedPlaces) {
      if (!rawPlace || !rawPlace.id) continue;
      const matched = feasibleOptions.suggestedPlaces.find(
        (p) => String(p.id) === String(rawPlace.id)
      );
      if (matched) {
        validatedPlaces.push({
          id: matched.id,
          title: matched.title,
          category: matched.category,
          reason: typeof rawPlace.reason === 'string' ? rawPlace.reason : '',
          distance: matched.distance,
          rating: matched.rating || null,
          costKnown: false,
          estimatedCost: null,
        });
      }
    }
  }

  // 5. DAYS & ACTIVITIES VALIDATION
  const validatedDays: Array<{
    day: number;
    activities: Array<{
      placeId: number | string | null;
      title: string;
      startTime: string | null;
      endTime: string | null;
      duration: string | null;
      reason: string;
    }>;
  }> = [];

  if (Array.isArray(rawAiPlan.days)) {
    for (const d of rawAiPlan.days) {
      const dayNum = Number(d.day) || validatedDays.length + 1;
      const activities: any[] = [];
      if (Array.isArray(d.activities)) {
        for (const act of d.activities) {
          if (!act || !act.title) continue;
          let validPlaceId: number | string | null = null;
          if (act.placeId) {
            const matchedPlace = feasibleOptions.suggestedPlaces.find(
              (p) => String(p.id) === String(act.placeId)
            );
            if (matchedPlace) {
              validPlaceId = matchedPlace.id;
            }
          }
          activities.push({
            placeId: validPlaceId,
            title: String(act.title),
            startTime: act.startTime ? String(act.startTime) : null,
            endTime: act.endTime ? String(act.endTime) : null,
            duration: act.duration ? String(act.duration) : null,
            reason: act.reason ? String(act.reason) : '',
          });
        }
      }
      validatedDays.push({
        day: dayNum,
        activities,
      });
    }
  }

  // Ensure all requested days are represented
  while (validatedDays.length < requirements.numberOfDays) {
    validatedDays.push({
      day: validatedDays.length + 1,
      activities: [],
    });
  }

  // 6. DETERMINISTIC BUDGET RE-CALCULATION
  const knownTotal = Number(
    (
      (validatedHotel.totalPrice || 0) +
      (validatedVehicle.totalPrice || 0) +
      (validatedTransport.price || 0)
    ).toFixed(2)
  );
  const remainingKnownBudget = Number(
    Math.max(requirements.budget - knownTotal, 0).toFixed(2)
  );

  const notes = Array.isArray(rawAiPlan.notes)
    ? rawAiPlan.notes.filter((n: any) => typeof n === 'string')
    : [];

  // Add deterministic notes if any
  for (const n of budgetAnalysis.notes) {
    if (!notes.includes(n)) {
      notes.push(n);
    }
  }

  const finalPlan: StructuredTripPlan = {
    success: true,
    tripSummary: {
      fromLocation: requirements.fromLocation,
      toLocation: requirements.toLocation,
      numberOfDays: requirements.numberOfDays,
      numberOfPeople: requirements.numberOfPeople,
      budget: requirements.budget,
      currency: requirements.currency || 'INR',
    },
    transport: validatedTransport,
    hotel: validatedHotel,
    vehicle: validatedVehicle,
    suggestedPlaces: validatedPlaces,
    budget: {
      knownTotal,
      remainingKnownBudget,
      currency: requirements.currency || 'INR',
    },
    days: validatedDays,
    notes,
  };

  return { valid: true, plan: finalPlan };
}
