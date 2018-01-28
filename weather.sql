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
  temperature VARCHAR,
  comment VARCHAR
);

INSERT INTO cities (name, location)
  VALUES ('Tokio', '35.6584421,139.7328635');
  INSERT INTO cities (name, location)
  VALUES ('Helsinki', '60.1697530,24.9490830');
  INSERT INTO cities (name, location)
  VALUES ('New York', '40.7406905,-73.9938438');
  INSERT INTO cities (name, location)
  VALUES ('Amsterdam', '52.3650691,4.9040238');
  INSERT INTO cities (name, location)
  VALUES ('Dubai', '25.092535,55.1562243');


INSERT INTO perceptions (city_id, temperature, comment) VALUES (1, '15', 'Windy');

INSERT INTO perceptions (city_id, temperature, comment) VALUES (2, '-5', 'Snowing');

INSERT INTO perceptions (city_id, temperature, comment) VALUES (2, '15', 'Windy');

INSERT INTO perceptions (city_id, temperature, comment) VALUES (4, '5', 'Raining');

INSERT INTO perceptions (city_id, temperature, comment) VALUES (5, '30', 'Sunny');