// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres:///smartgoals'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
