INSERT INTO users (name, email, password) 
VALUES ('Eva stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'Speed lamp', 'description', 'tbn', 'cp', 80.61, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 20.50, true),
(2, 'Blank Corner', 'description', 'tbn', 'cp', '85234', 6, 6, 7, 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', '83680', true),
(3, 'Habit Mix', 'description', 'tbn', 'cp', 56.20, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Jaebvap', 'Ontario', '38051', true);

INSERT INTO reservations (start_date, end_date, guest_id, property_id) 
VALUES ('2018-09-11', '2018-09-26', 2, 3),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 1, 2);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (2, 3, 3, 3, 'messages'),
(1, 2, 1, 4, 'messages'),
(2, 1, 2, 4, 'messages');
