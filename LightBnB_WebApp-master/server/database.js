const db = require('../db')

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email=$1;
  `, [email])
  .then(res => res.rows[0])
  .catch(err=> err);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query(`SELECT * FROM users WHERE id=$1;`, [id])
  .then(res => res.rows[0])
  .catch(err=> err);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return db.query(`
  INSERT INTO users(name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err=> err);

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query(`
  SELECT reservations.*, properties.*, AVG(rating)
  FROM  reservations 
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON reservations.id = reservation_id
  WHERE end_date < now()::date AND reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows)
  .catch(err => err);

  }
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    if (queryParams.length - 1 === 0) {
      queryString += `WHERE city LIKE $${queryParams.length} `;
    } else {
      queryString += `AND city LIKE $${queryParams.length} `;
    }
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    if (queryParams.length - 1 === 0) {
      queryString += `WHERE owner_id LIKE $${queryParams.length} `;
    } else {
      queryString += `AND owner_id LIKE $${queryParams.length} `;
    }
  }

  
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.push(options.maximum_price_per_night * 100);
    if (queryParams.length - 1 === 0) {
      queryString += `WHERE cost_per_night <= $${queryParams.length} AND cost_per_night >= $${queryParams.length-1} `;
    } else {
      queryString += `AND cost_per_night <= $${queryParams.length} AND cost_per_night >= $${queryParams.length-1} `;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    if (queryParams.length - 1 === 0) {
      queryString += `WHERE rating >= $${queryParams.length} `;
    } else {
      queryString += `AND rating >= $${queryParams.length} `;
    }
  }

  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams)
    .then(res => res.rows);

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return db.query(`
    INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `, [property.owner_id, 
      property.title, 
      property.description, 
      property.thumbnail_photo_url, 
      property.cover_photo_url, 
      property.cost_per_night, 
      property.parking_spaces, 
      property.number_of_bathrooms, 
      property.number_of_bedrooms, 
      property.country, 
      property.street, 
      property.city, 
      property.province, 
      property.post_code])
  .then(res => res.rows[0])
  .catch(err=> err);
}
exports.addProperty = addProperty;
