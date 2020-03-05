const pg = require('pg');
const Client = pg.Client;

const pool = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
};

const client = new Client(pool);

client.connect();

module.exports = client;