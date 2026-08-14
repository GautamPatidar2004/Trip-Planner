// travel-tools.ts
// Interfaces and mock implementations for travel data tools

export interface Place {
  id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  entryFee?: number;
  openingTime?: string;
  closingTime?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating?: number;
  pricePerNight?: number;
  amenities?: string[];
  availability: boolean;
}

export interface Transport {
  type: 'flight' | 'bus' | 'train' | 'car';
  provider?: string;
  from: string;
  to: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  price?: number;
  availability: boolean;
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

function notConfiguredResult<T>(): ToolResult<T> {
  return {
    success: false,
    error: "External API not configured yet. No real data available.",
  };
}

export async function search_places(query: string, location: string): Promise<ToolResult<Place[]>> {
  return notConfiguredResult<Place[]>();
}

export async function search_hotels(location: string, checkInDate: string, checkOutDate: string, guests: number): Promise<ToolResult<Hotel[]>> {
  return notConfiguredResult<Hotel[]>();
}

export async function search_transport(from: string, to: string, date: string): Promise<ToolResult<Transport[]>> {
  return notConfiguredResult<Transport[]>();
}

export async function search_flights(from: string, to: string, date: string): Promise<ToolResult<Transport[]>> {
  return notConfiguredResult<Transport[]>();
}

export async function search_buses(from: string, to: string, date: string): Promise<ToolResult<Transport[]>> {
  return notConfiguredResult<Transport[]>();
}

export async function search_trains(from: string, to: string, date: string): Promise<ToolResult<Transport[]>> {
  return notConfiguredResult<Transport[]>();
}

export async function get_weather(location: string, date: string): Promise<ToolResult<Weather>> {
  return notConfiguredResult<Weather>();
}

export async function get_route(from: string, to: string): Promise<ToolResult<any>> {
  return notConfiguredResult<any>();
}

export async function calculate_distance(from: string, to: string): Promise<ToolResult<{ distanceKm: number }>> {
  return notConfiguredResult<{ distanceKm: number }>();
}

export async function calculate_budget(requirements: any, selectedItems: any): Promise<ToolResult<{ totalEstimated: number; breakdown: any }>> {
  return notConfiguredResult<{ totalEstimated: number; breakdown: any }>();
}

// Tool definitions schema for AI function calling (to be used later with Gemini/Groq tools API)
export const travelToolsSchema = [
  {
    name: "search_places",
    description: "Search for tourist places, activities, or attractions in a specific location.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        location: { type: "string" }
      },
      required: ["query", "location"]
    }
  },
  {
    name: "search_hotels",
    description: "Search for hotels in a specific location.",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
        checkInDate: { type: "string" },
        checkOutDate: { type: "string" },
        guests: { type: "number" }
      },
      required: ["location", "checkInDate", "checkOutDate", "guests"]
    }
  },
  {
    name: "search_flights",
    description: "Search for flights between two locations.",
    parameters: {
      type: "object",
      properties: {
        from: { type: "string" },
        to: { type: "string" },
        date: { type: "string" }
      },
      required: ["from", "to", "date"]
    }
  },
  {
    name: "search_buses",
    description: "Search for bus routes between two locations.",
    parameters: {
      type: "object",
      properties: {
        from: { type: "string" },
        to: { type: "string" },
        date: { type: "string" }
      },
      required: ["from", "to", "date"]
    }
  },
  {
    name: "search_trains",
    description: "Search for train routes between two locations.",
    parameters: {
      type: "object",
      properties: {
        from: { type: "string" },
        to: { type: "string" },
        date: { type: "string" }
      },
      required: ["from", "to", "date"]
    }
  },
  {
    name: "get_weather",
    description: "Get the weather forecast for a specific location and date.",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
        date: { type: "string" }
      },
      required: ["location", "date"]
    }
  },
  {
    name: "get_route",
    description: "Get the travel route and path between two locations.",
    parameters: {
      type: "object",
      properties: {
        from: { type: "string" },
        to: { type: "string" }
      },
      required: ["from", "to"]
    }
  },
  {
    name: "calculate_distance",
    description: "Calculate the distance in kilometers between two locations.",
    parameters: {
      type: "object",
      properties: {
        from: { type: "string" },
        to: { type: "string" }
      },
      required: ["from", "to"]
    }
  }
];
