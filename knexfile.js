// Update with your config settings.
const path = require('path'); //Added path module
require("dotenv").config();
const { DATABASE_URL } = process.env

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: { //Added migrations property
      directory: path.join(__dirname, 'src', 'db', 'migrations'), //Added directory property for migrations
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"), //Added directory for seeds
    },
  },


};
