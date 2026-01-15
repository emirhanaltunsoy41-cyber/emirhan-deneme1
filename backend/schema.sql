CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  plate VARCHAR(32),
  start_lat DOUBLE PRECISION,
  start_lng DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT,
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  service_id INTEGER REFERENCES services(id)
);

CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id),
  route_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
