module.exports = {
  "knex": {
    "client": "postgresql",
    "connection": {
      "database": process.env.DATABASE_NAME || "thesis",
      "user": process.env.DATABASE_USER || "postgres",
      "password": process.env.DATABASE_PASSWORD || "postgres",
      "host": process.env.DATABASE_HOST || "localhost",
      "port": 5432
    },
    "pool": {
      "min": 1,
      "max": 2
    },
    "migrations": {
      "tableName": "knex_migrations",
      "directory": "db/migrations"
    },
    "seeds": {
      "directory": "db/seeds"
    }
  },

  "passport": {
    "Google": {},
    "Facebook": {},
    "Twitter": {}
  },

  "Eventbrite": {},
  "Meetups": {},
  "Google_Places": {},
  "Google_Coords": {},
  "Google": {}, 
  "News": {}
}