-- Migration: Create travel data tables (hotels, vehicles, transport) around existing destinations table
-- Preservation of existing destinations table
ALTER TABLE IF EXISTS destinations ADD COLUMN IF NOT EXISTS distance TEXT;
ALTER TABLE IF EXISTS destinations ADD COLUMN IF NOT EXISTS imageurl TEXT;

-- 1. HOTELS Table
CREATE TABLE IF NOT EXISTS hotels (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating NUMERIC(3,2),
  price_per_night NUMERIC(10,2) NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT TRUE,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for location searches
CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels(location);
CREATE INDEX IF NOT EXISTS idx_hotels_available ON hotels(available);

-- 2. VEHICLES Table
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT,
  price_per_day NUMERIC(10,2) NOT NULL,
  seats INTEGER NOT NULL,
  location TEXT NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for location searches
CREATE INDEX IF NOT EXISTS idx_vehicles_location ON vehicles(location);
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);

-- 3. TRANSPORT Table
CREATE TABLE IF NOT EXISTS transport (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- flight, bus, train, cab, ferry
  provider TEXT,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  departure_time TEXT,
  arrival_time TEXT,
  duration TEXT,
  price NUMERIC(10,2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for route searches
CREATE INDEX IF NOT EXISTS idx_transport_route ON transport(from_location, to_location);
CREATE INDEX IF NOT EXISTS idx_transport_available ON transport(available);
