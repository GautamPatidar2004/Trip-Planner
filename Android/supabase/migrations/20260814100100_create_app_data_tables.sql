-- Schema
CREATE TABLE holidays (
  id SERIAL PRIMARY KEY,
  date_num TEXT,
  date_month TEXT,
  title TEXT,
  day TEXT,
  flag TEXT,
  desc_text TEXT,
  badge_type TEXT,
  image_key TEXT,
  icon TEXT
);

CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  category TEXT, -- 'hotspot', 'season_spot', 'family', 'romantic', 'local', 'nature'
  title TEXT,
  subtitle_or_distance TEXT,
  rating TEXT,
  image_key TEXT,
  icon TEXT,
  location TEXT,
  description TEXT,
  reviews TEXT,
  tags JSONB -- Array of {text, color, textColor}
);

CREATE TABLE tips (
  id SERIAL PRIMARY KEY,
  icon TEXT,
  text_content TEXT,
  bg_color TEXT,
  icon_color TEXT
);

CREATE TABLE map_markers (
  id SERIAL PRIMARY KEY,
  lat TEXT,
  lng TEXT,
  type TEXT,
  title TEXT,
  distance TEXT,
  bg_color TEXT,
  icon TEXT
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  title TEXT,
  date_range TEXT,
  image_key TEXT,
  progress INTEGER
);

-- Seed Data for Holidays
INSERT INTO holidays (date_num, date_month, title, day, flag, desc_text, badge_type, image_key, icon) VALUES
('15', 'AUG', 'Independence Day', 'Friday', '🇮🇳', NULL, NULL, NULL, NULL),
('05', 'SEP', 'Teachers'' Day', 'Friday', '🇮🇳', NULL, NULL, NULL, NULL),
('02', 'OCT', 'Gandhi Jayanti', 'Thursday', '🇮🇳', NULL, NULL, NULL, NULL),
('31', 'OCT', 'Diwali', 'Friday', '🇮🇳', NULL, NULL, NULL, NULL),
('01', 'JAN', 'New Year''s Day', 'WED', NULL, 'Start the year with new beginings and new adventures.', 'national', 'season_manali', 'calendar-outline'),
('14', 'JAN', 'Makar Sankranti', 'TUE', NULL, 'Celebrate the festival of harvest with joy and gratitude.', 'festival', 'season_darjeeling', 'leaf-outline'),
('26', 'FEB', 'Mahashivratri', 'WED', NULL, 'A divine night dedicated to Lord Shiva.', 'festival', 'season_udaipur', 'flame-outline'),
('14', 'MAR', 'Holi', 'FRI', NULL, 'Festival of colors, joy and happiness.', 'festival', 'trip_kashmir', 'color-palette-outline'),
('06', 'APR', 'Ram Navami', 'SUN', NULL, 'Celebrate the birth of Lord Rama.', 'festival', 'trip_kerala', 'home-outline'),
('12', 'MAY', 'Buddha Purnima', 'MON', NULL, 'A day of peace, compassion and enlightenment.', 'national', 'season_manali', 'flower-outline');

-- Seed Data for Destinations
INSERT INTO destinations (category, title, subtitle_or_distance, rating, image_key, icon, location, description, reviews, tags) VALUES
('hotspot', 'Brewed Awakenings', 'Cafe • 1.2 km', '4.6', 'hotspot_cafe', 'cafe-outline', 'Connaught Place', 'Great coffee and ambiance', '1.2k', '[{"text":"Cafe","color":"#E0E7FF","textColor":"#4F46E5"}]'),
('hotspot', 'Greenview Garden', 'Park • 2.4 km', '4.7', 'hotspot_garden', 'leaf-outline', 'Lodhi Road', 'Peaceful garden for morning walks', '2.1k', '[{"text":"Park","color":"#ECFDF5","textColor":"#059669"}]'),
('hotspot', 'Sunset Point', 'Viewpoint • 3.1 km', '4.8', 'hotspot_sunset', 'triangle-outline', 'Hauz Khas', 'Beautiful view of the sunset', '800', '[{"text":"Viewpoint","color":"#FEF2F2","textColor":"#DC2626"}]'),

('season_spot', 'Manali', 'Himachal Pradesh', '4.8', 'season_manali', NULL, 'Manali', 'Snowy mountains', '5k', '[]'),
('season_spot', 'Goa', 'Goa', '4.7', 'season_goa', NULL, 'Goa', 'Sunny beaches', '8k', '[]'),
('season_spot', 'Udaipur', 'Rajasthan', '4.8', 'season_udaipur', NULL, 'Udaipur', 'City of lakes', '3k', '[]'),
('season_spot', 'Darjeeling', 'West Bengal', '4.7', 'season_darjeeling', NULL, 'Darjeeling', 'Tea gardens', '2k', '[]'),

('family', 'National Zoological Park', '6.2 km', '4.6', 'trip_kashmir', 'paw', 'Mathura Road, New Delhi', 'Explore amazing wildlife and learn about nature with your family.', '1.3k', '[{"text": "Animals", "color": "#ECFDF5", "textColor": "#059669"}, {"text": "Family", "color": "#F3E8FF", "textColor": "#7C3AED"}]'),
('family', 'Adventure Island', '15.4 km', '4.5', 'season_goa', 'ticket', 'Rohini, New Delhi', 'Thrilling rides and water fun for the whole family.', '980', '[{"text": "Fun", "color": "#EFF6FF", "textColor": "#2563EB"}, {"text": "Adventure", "color": "#FFF7ED", "textColor": "#EA580C"}]'),

('romantic', 'Lake Pichola', '2.1 km', '4.9', 'season_udaipur', 'heart-outline', 'Udaipur', 'Romantic boat rides', '1.2k', '[{"text": "Romantic", "color": "#FDF2F8", "textColor": "#F43F5E"}]'),
('romantic', 'Sunset Cruise', '1.5 km', '4.8', 'hotspot_sunset', 'boat-outline', 'Goa', 'Sunset view', '800', '[{"text": "Romantic", "color": "#FDF2F8", "textColor": "#F43F5E"}]'),

('local', 'Local Market', '0.5 km', '4.4', 'hotspot_cafe', 'cart-outline', 'Chandni Chowk', 'Bustling market', '5k', '[{"text": "Shopping", "color": "#FEF3C7", "textColor": "#D97706"}]'),
('local', 'Town Square', '1.0 km', '4.6', 'season_goa', 'business-outline', 'Connaught Place', 'City center', '4k', '[{"text": "City", "color": "#E0E7FF", "textColor": "#4F46E5"}]'),

('nature', 'Pine Forest', '12 km', '4.9', 'trip_kashmir', 'leaf-outline', 'Manali', 'Beautiful pine trees', '1.2k', '[{"text": "Nature", "color": "#ECFDF5", "textColor": "#059669"}]'),
('nature', 'Hidden Waterfall', '15 km', '4.8', 'season_manali', 'water-outline', 'Manali', 'Hidden waterfall', '800', '[{"text": "Nature", "color": "#ECFDF5", "textColor": "#059669"}]');

-- Seed Data for Tips
INSERT INTO tips (icon, text_content, bg_color, icon_color) VALUES
('shield-checkmark-outline', 'Keep a digital
copy of your
important docs.', '#EDF5FF', '#2260FF'),
('briefcase-outline', 'Pack light and
smart, always.', '#F6EDFF', '#8B5CF6'),
('airplane-outline', 'Book flights
early for better
deals.', '#E8FBF4', '#10B981'),
('wallet-outline', 'Keep local
currency for
small expenses.', '#FFF3E8', '#F97316');

-- Seed Data for Map Markers
INSERT INTO map_markers (lat, lng, type, title, distance, bg_color, icon) VALUES
('15%', '20%', 'nature', 'Delhi Zoo', '6.2 km', '#10B981', 'paw'),
('25%', '55%', 'romantic', 'India Gate Lawns', '2.1 km', '#EC4899', 'heart'),
('40%', '30%', 'adventure', 'Qutub Minar', '12 km', '#6366F1', 'business'),
('60%', '65%', 'family', 'Lotus Temple', '8.5 km', '#0D9488', 'flower'),
('75%', '25%', 'nature', 'Sunder Nursery', '4.3 km', '#10B981', 'leaf');

-- Seed Data for Trips
INSERT INTO trips (title, date_range, image_key, progress) VALUES
('Kashmir Valley Explorer', '12 Aug - 18 Aug', 'trip_kashmir', 65),
('Kerala Backwaters', '05 Sep - 10 Sep', 'trip_kerala', 10),
('Udaipur Royal Stay', '20 Oct - 25 Oct', 'season_udaipur', 0);
