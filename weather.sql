DROP DATABASE IF EXISTS weather;
CREATE DATABASE weather;

\c weather;

CREATE TABLE cities (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  location VARCHAR
);

CREATE TABLE perceptions (
  ID SERIAL PRIMARY KEY,
  city_id INTEGER,
  temperature NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE
);

-- Insert given observation locations to database.
INSERT INTO cities (name, location)
  VALUES ('Tokyo', '35.6584421,139.7328635');
  INSERT INTO cities (name, location)
  VALUES ('Helsinki', '60.1697530,24.9490830');
  INSERT INTO cities (name, location)
  VALUES ('New York', '40.7406905,-73.9938438');
  INSERT INTO cities (name, location)
  VALUES ('Amsterdam', '52.3650691,4.9040238');
  INSERT INTO cities (name, location)
  VALUES ('Dubai', '25.092535,55.1562243');

-- Insert some exampledata for observations in different locations
INSERT INTO perceptions (city_id, temperature, created_at) VALUES (1, 15, now());

INSERT INTO perceptions (city_id, temperature, created_at) VALUES (2, -5, now());

INSERT INTO perceptions (city_id, temperature, created_at) VALUES (3, 10, now());

INSERT INTO perceptions (city_id, temperature, created_at) VALUES (4, 5, now());

INSERT INTO perceptions (city_id, temperature, created_at) VALUES (5, 30, now());