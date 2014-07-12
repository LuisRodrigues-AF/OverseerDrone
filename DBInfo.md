# Schema

## Users

id INTEGER AUTO_INCREMENT
name VARCHAR
last_seen_date TIMESTAMP

## Locations

id INTEGER AUTO_INCREMENT
user_id INTEGER
latitude REAL
longitude REAL
accuracy INTEGER
created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

# Queries

## Accepting location updates

INSERT INTO locations (user_id, latitude, longitude, accuracy) VALUES (locationData.userId, locationData.latitude, locationData.longitude);

## Where is user

SELECT * FROM locations WHERE user_id=userId ORDER BY id DESC LIMIT 1;
