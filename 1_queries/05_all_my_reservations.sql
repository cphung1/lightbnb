-- Select all columns from the reservations table, all columns from the properties table, and the average rating of the property.
-- Order the results from most recent start_date to least recent start_date.
-- These will end up being filtered by either "Upcoming Reservations" or "Past Reservations", so only get reservations where the end_date is in the past.
-- Use now()::date to get today's date.
-- This will only be for a single user, so use 1 for the user_id.
-- Limit the results to 10.
-- We're only showing the id, title, start_date, and cost_per_night to save space on the screen

SELECT reservations.*, properties.*, AVG(rating)
FROM  reservations 
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON reservations.id = reservation_id
WHERE end_date < now()::date AND reservations.guest_id='1'
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;